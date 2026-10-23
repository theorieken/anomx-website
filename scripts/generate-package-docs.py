#!/usr/bin/env python3
"""Build an import-free API reference from an Anomx source checkout (Python 3.11+).

Only stdlib AST inspection is used: optional dependencies and module code never run.
The committed JSON allows website-only checkouts to build without the Python repo.
"""
from __future__ import annotations

import argparse
import ast
import hashlib
import json
import os
from pathlib import Path
import subprocess
import tomllib

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "lib/generated/package-docs.json"
DOMAINS = {"base", "config", "data", "detection", "execution", "integrations", "metrics", "models"}
FUNCTIONS = (ast.FunctionDef, ast.AsyncFunctionDef)


def expression(node):
    return ast.unparse(node) if node is not None else ""


def literal(node, values):
    """Evaluate only literal containers and known export-list operations."""
    if isinstance(node, ast.Name):
        return values[node.id]
    if isinstance(node, (ast.List, ast.Tuple, ast.Set)):
        result = []
        for item in node.elts:
            result.extend(literal(item.value, values)) if isinstance(item, ast.Starred) else result.append(literal(item, values))
        return result
    if isinstance(node, ast.Call) and isinstance(node.func, ast.Name) and node.func.id in {"sorted", "list", "tuple"}:
        return list(literal(node.args[0], values))
    if isinstance(node, ast.BinOp) and isinstance(node.op, ast.Add):
        return literal(node.left, values) + literal(node.right, values)
    return ast.literal_eval(node)


def module_url(name):
    return "/documentation/package/" + ("/".join(name.split(".")[1:]) or "api") + "/"


def parameters(node):
    args = node.args
    positional = [*args.posonlyargs, *args.args]
    defaults = [None] * (len(positional) - len(args.defaults)) + args.defaults
    result = []
    for index, (arg, default) in enumerate(zip(positional, defaults)):
        if arg.arg in {"self", "cls"} and index == 0:
            continue
        result.append({"name": arg.arg, "annotation": expression(arg.annotation), "default": expression(default), "kind": "positional-only" if index < len(args.posonlyargs) else "positional"})
    if args.vararg:
        result.append({"name": "*" + args.vararg.arg, "annotation": expression(args.vararg.annotation), "default": "", "kind": "variadic"})
    for arg, default in zip(args.kwonlyargs, args.kw_defaults):
        result.append({"name": arg.arg, "annotation": expression(arg.annotation), "default": expression(default), "kind": "keyword-only"})
    if args.kwarg:
        result.append({"name": "**" + args.kwarg.arg, "annotation": expression(args.kwarg.annotation), "default": "", "kind": "variadic"})
    return result


def signature(name, params, returns=""):
    pieces = []
    for i, param in enumerate(params):
        if param["kind"] == "keyword-only" and not any(p["kind"] in {"keyword-only", "variadic"} for p in params[:i]):
            pieces.append("*")
        text = param["name"]
        if param["annotation"]:
            text += ": " + param["annotation"]
        if param["default"]:
            text += " = " + param["default"]
        pieces.append(text)
        if param["kind"] == "positional-only" and (i + 1 == len(params) or params[i + 1]["kind"] != "positional-only"):
            pieces.append("/")
    return name + "(" + ", ".join(pieces) + ")" + (" -> " + returns if returns else "")


class Reference:
    def __init__(self, source):
        self.source = source
        self.modules = {}
        for path in sorted((source / "src/anomx").rglob("*.py")):
            relative = path.relative_to(source / "src")
            parts = list(relative.with_suffix("").parts)
            if parts[-1] == "__init__":
                parts.pop()
            if any(part.startswith("_") for part in parts) or (len(parts) > 1 and parts[1] not in DOMAINS):
                continue
            name = ".".join(parts)
            tree = ast.parse(path.read_text(), filename=str(relative))
            values, imports, definitions, assignments = {}, {}, {}, {}
            exports = None
            for node in tree.body:
                if isinstance(node, (ast.ClassDef, *FUNCTIONS)):
                    definitions[node.name] = node
                if isinstance(node, ast.ImportFrom):
                    package = name if path.name == "__init__.py" else name.rsplit(".", 1)[0]
                    base = ".".join(package.split(".")[:len(package.split(".")) - node.level + 1]) if node.level else ""
                    target = ".".join(filter(None, [base, node.module]))
                    for alias in node.names:
                        imports[alias.asname or alias.name] = (target, alias.name)
                if isinstance(node, (ast.Assign, ast.AnnAssign)):
                    targets = node.targets if isinstance(node, ast.Assign) else [node.target]
                    for target in targets:
                        if isinstance(target, ast.Name):
                            assignments[target.id] = node
                            try:
                                values[target.id] = literal(node.value, values)
                            except (ValueError, TypeError, KeyError, AttributeError):
                                pass
                            if target.id == "__all__":
                                if "__all__" not in values:
                                    raise ValueError(f"Cannot resolve __all__ in {name}")
                                exports = values["__all__"]
            lazy = {**values.get("_EXPORTS", {}), **values.get("_LAZY_IMPORTS", {})}
            imports.update({key: (value, key) for key, value in lazy.items()})
            # Catalogs re-export third-party objects; do not invent their signatures.
            catalogs = values.get("_CATALOG", [])
            if catalogs:
                for node in ast.walk(tree):
                    if isinstance(node, ast.Call) and expression(node.func) == "import_module" and node.args and isinstance(node.args[0], ast.Constant):
                        target = node.args[0].value
                        imports.update({key: (target, key) for key in catalogs})
            if lazy:
                exports = exports or list(lazy)
                # setup_lazy_imports can also publish computed collections.
                for node in ast.walk(tree):
                    if isinstance(node, ast.Call) and expression(node.func) == "setup_lazy_imports":
                        for keyword in node.keywords:
                            if keyword.arg == "extra_attrs" and isinstance(keyword.value, ast.Dict):
                                for key in keyword.value.keys:
                                    if isinstance(key, ast.Constant):
                                        exports.append(key.value)
            if exports is None:
                exports = [key for key in definitions if not key.startswith("_")]
                exports += [key for key, node in assignments.items() if not key.startswith("_") and (isinstance(node, ast.AnnAssign) or key.isupper())]
            self.modules[name] = {"name": name, "path": path, "tree": tree, "imports": imports, "definitions": definitions, "assignments": assignments, "exports": sorted(set(exports)), "docstring": ast.get_docstring(tree) or ""}

    def resolve(self, module, name, seen=()):
        key = (module, name)
        if key in seen or module not in self.modules:
            return module, name, None
        info = self.modules[module]
        if name in info["definitions"]:
            return module, name, info["definitions"][name]
        if name in info["imports"]:
            return self.resolve(*info["imports"][name], (*seen, key))
        node = info["assignments"].get(name)
        if node and isinstance(node.value, ast.Name):
            return self.resolve(module, node.value.id, (*seen, key))
        return module, name, node

    def source_ref(self, module, node):
        return {"path": self.modules[module]["path"].relative_to(self.source).as_posix(), "line": getattr(node, "lineno", 1)}

    def base_ref(self, module, base):
        name = expression(base)
        # Resolve simple local/imported bases; external generic expressions stay textual.
        target_module, target_name, node = self.resolve(module, name)
        return {"name": name, "href": module_url(target_module) + "#" + target_name if node is not None else None}

    def callable(self, module, node, name=None):
        name = name or node.name
        decorators = [expression(d) for d in node.decorator_list]
        kind = "property" if "property" in decorators else "classmethod" if "classmethod" in decorators else "staticmethod" if "staticmethod" in decorators else "method"
        params = parameters(node)
        returns = expression(node.returns)
        display = name + (": " + returns if returns else "") if kind == "property" else signature(name, params, returns)
        return {"name": name, "kind": kind, "signature": display, "parameters": params, "returns": returns, "docstring": ast.get_docstring(node) or "", "source": self.source_ref(module, node), "async": isinstance(node, ast.AsyncFunctionDef)}

    def inherited(self, module, node, seen=()):
        if (module, node.name) in seen:
            return []
        result = []
        own = {child.name for child in node.body if isinstance(child, FUNCTIONS)}
        for base in node.bases:
            base_module, base_name, base_node = self.resolve(module, expression(base))
            if not isinstance(base_node, ast.ClassDef):
                continue
            for child in base_node.body:
                if isinstance(child, FUNCTIONS) and not child.name.startswith("_") and child.name not in own:
                    result.append({"name": child.name, "from": base_name, "href": module_url(base_module) + "#" + base_name + "." + child.name})
                    own.add(child.name)
            for child in self.inherited(base_module, base_node, (*seen, (module, node.name))):
                if child["name"] not in own:
                    result.append(child)
                    own.add(child["name"])
        return result

    def constructor(self, module, node, seen=()):
        if (module, node.name) in seen:
            return None
        for child in node.body:
            if isinstance(child, FUNCTIONS) and child.name == "__init__":
                return self.callable(module, child, node.name)
        dataclass = next((decorator for decorator in node.decorator_list if expression(decorator).split("(")[0] in {"dataclass", "dataclasses.dataclass"}), None)
        if dataclass is not None:
            options = {item.arg: item.value for item in dataclass.keywords} if isinstance(dataclass, ast.Call) else {}
            if expression(options.get("init")) != "False":
                fields = {}
                for base in reversed(node.bases):
                    base_module, _, base_node = self.resolve(module, expression(base))
                    if isinstance(base_node, ast.ClassDef):
                        inherited = self.constructor(base_module, base_node, (*seen, (module, node.name)))
                        if inherited:
                            fields.update({param["name"]: param for param in inherited["parameters"]})
                kw_only = expression(options.get("kw_only")) == "True"
                for child in node.body:
                    if not isinstance(child, ast.AnnAssign) or not isinstance(child.target, ast.Name):
                        continue
                    annotation = expression(child.annotation)
                    if annotation in {"KW_ONLY", "dataclasses.KW_ONLY"}:
                        kw_only = True
                        continue
                    if annotation.startswith(("ClassVar[", "typing.ClassVar[")):
                        continue
                    default = expression(child.value)
                    field_options = {}
                    if isinstance(child.value, ast.Call) and expression(child.value.func) in {"field", "dataclasses.field"}:
                        field_options = {item.arg: item.value for item in child.value.keywords}
                        if expression(field_options.get("init")) == "False":
                            fields.pop(child.target.id, None)
                            continue
                        default = expression(field_options.get("default"))
                        if "default_factory" in field_options:
                            default = "<factory: " + expression(field_options["default_factory"]) + ">"
                    keyword = expression(field_options.get("kw_only")) == "True" if "kw_only" in field_options else kw_only
                    fields[child.target.id] = {"name": child.target.id, "annotation": annotation, "default": default, "kind": "keyword-only" if keyword else "positional"}
                params = sorted(fields.values(), key=lambda param: param["kind"] == "keyword-only")
                return {"parameters": params, "docstring": ""}
        for base in node.bases:
            base_module, _, base_node = self.resolve(module, expression(base))
            if isinstance(base_node, ast.ClassDef):
                constructor = self.constructor(base_module, base_node, (*seen, (module, node.name)))
                if constructor:
                    return constructor
        return None

    def symbol(self, module, name, node):
        common = {"name": name, "kind": "attribute", "docstring": "", "signature": name, "source": self.source_ref(module, node), "parameters": [], "returns": "", "members": [], "bases": [], "inherited": [], "constructorDocstring": ""}
        if isinstance(node, FUNCTIONS):
            return {**common, **self.callable(module, node), "kind": "function"}
        if not isinstance(node, ast.ClassDef):
            if node is not None:
                common["signature"] = expression(node)
            return common
        constructor = self.constructor(module, node)
        members = []
        for index, child in enumerate(node.body):
            if isinstance(child, FUNCTIONS) and not child.name.startswith("_"):
                # A property getter and setter have the same anchor; document the getter.
                if not any(member["name"] == child.name for member in members):
                    members.append(self.callable(module, child))
            elif isinstance(child, (ast.AnnAssign, ast.Assign)):
                target = child.target if isinstance(child, ast.AnnAssign) else child.targets[0]
                if isinstance(target, ast.Name) and not target.id.startswith("_"):
                    following = node.body[index + 1] if index + 1 < len(node.body) else None
                    doc = following.value.value if isinstance(following, ast.Expr) and isinstance(following.value, ast.Constant) and isinstance(following.value.value, str) else ""
                    members.append({"name": target.id, "kind": "attribute", "signature": expression(child), "parameters": [], "returns": "", "docstring": doc, "source": self.source_ref(module, child), "async": False})
        return {**common, "kind": "class", "docstring": ast.get_docstring(node) or "", "signature": signature(name, constructor["parameters"]) if constructor else name, "parameters": constructor["parameters"] if constructor else [], "constructorDocstring": constructor["docstring"] if constructor else "", "members": members, "bases": [self.base_ref(module, base) for base in node.bases], "inherited": self.inherited(module, node)}

    def build(self):
        modules = []
        for name, info in self.modules.items():
            symbols, aliases = [], []
            for public_name in info["exports"]:
                target_module, target_name, node = self.resolve(name, public_name)
                if target_module == name and target_name == public_name:
                    symbols.append(self.symbol(name, public_name, node))
                else:
                    aliases.append({"name": public_name, "target": target_module + "." + target_name, "href": module_url(target_module) + "#" + target_name if node is not None else None, "summary": (ast.get_docstring(node) or "").split("\n\n")[0] if isinstance(node, (ast.ClassDef, *FUNCTIONS)) else ""})
            modules.append({"name": name, "slug": name.split(".")[1:] or ["api"], "href": module_url(name), "docstring": info["docstring"], "source": self.source_ref(name, info["tree"]), "symbols": symbols, "aliases": aliases})
        # A re-export may point to a definition omitted by that module's __all__.
        # Include the target so every internal link has a real anchor.
        by_name = {module["name"]: module for module in modules}
        for module in modules:
            for alias in module["aliases"]:
                if alias["href"]:
                    target_module, target_name = alias["target"].rsplit(".", 1)
                    target = by_name[target_module]
                    if not any(s["name"] == target_name for s in target["symbols"]):
                        _, _, node = self.resolve(target_module, target_name)
                        target["symbols"].append(self.symbol(target_module, target_name, node))
        for module in modules:
            module["symbols"].sort(key=lambda symbol: ({"class": 0, "function": 1}.get(symbol["kind"], 2), symbol["name"]))
        return modules


def generate(source):
    project = tomllib.loads((source / "pyproject.toml").read_text())["project"]
    reference = Reference(source)
    modules = reference.build()
    digest = hashlib.sha256()
    for info in reference.modules.values():
        digest.update(info["path"].relative_to(source).as_posix().encode())
        digest.update(info["path"].read_bytes())
    digest.update((source / "pyproject.toml").read_bytes())
    try:
        revision = subprocess.check_output(["git", "-C", str(source), "rev-parse", "HEAD"], text=True, stderr=subprocess.DEVNULL).strip()
    except (subprocess.CalledProcessError, FileNotFoundError):
        revision = "main"
    return {"schemaVersion": 1, "version": project["version"], "python": project["requires-python"], "repository": project["urls"]["Repository"], "revision": revision, "sourceDigest": digest.hexdigest(), "extras": project.get("optional-dependencies", {}), "modules": modules}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path)
    parser.add_argument("--check", action="store_true", help="Fail if the committed reference is stale")
    parser.add_argument("--require-source", action="store_true")
    args = parser.parse_args()
    configured = os.environ.get("ANOMX_PACKAGE_SOURCE")
    source = (args.source or Path(configured or ROOT.parent / "anomx-package")).resolve()
    if not (source / "src/anomx/__init__.py").is_file():
        if args.source or configured or args.require_source or args.check or not OUTPUT.exists():
            parser.error(f"Anomx source not found at {source}. Set ANOMX_PACKAGE_SOURCE to a package checkout.")
        data = json.loads(OUTPUT.read_text())
        print(f"Using committed package reference v{data['version']} (source checkout unavailable).")
        return
    data = generate(source)
    content = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text() != content:
            parser.error("Package reference is stale. Run npm run docs:generate and commit the JSON.")
        print(f"Package reference v{data['version']} is current.")
    else:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(content)
        print(f"Generated package reference v{data['version']}: {len(data['modules'])} modules.")


if __name__ == "__main__":
    main()
