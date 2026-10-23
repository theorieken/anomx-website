#!/usr/bin/env python3
"""Read the Agent's bundled backend/model catalog without importing package code."""
from __future__ import annotations

import argparse
import ast
import hashlib
import json
import os
from pathlib import Path
import tomllib

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "lib/generated/agent-catalog.json"


def assignment(tree, name):
    for node in tree.body:
        targets = node.targets if isinstance(node, ast.Assign) else [node.target] if isinstance(node, ast.AnnAssign) else []
        if any(isinstance(target, ast.Name) and target.id == name for target in targets):
            return node.value
    raise ValueError(f"Agent catalog no longer defines {name}; update the documentation generator.")


def records(tree, name, constructor):
    node = assignment(tree, name)
    if not isinstance(node, (ast.Tuple, ast.List)):
        raise ValueError(f"Unsupported {name} catalog structure")
    result = []
    for item in node.elts:
        if not isinstance(item, ast.Call) or not isinstance(item.func, ast.Name) or item.func.id != constructor:
            raise ValueError(f"Unsupported {name} catalog entry")
        result.append(([ast.literal_eval(arg) for arg in item.args], {kw.arg: ast.literal_eval(kw.value) for kw in item.keywords}))
    return result


def generate(source):
    store = source / "src/anomx/agent/store.py"
    code = store.read_bytes()
    tree = ast.parse(code)
    project = tomllib.loads((source / "pyproject.toml").read_text())["project"]
    labels = {(args[0], args[1]): args[2] for args, _ in records(tree, "MODEL_MENU_OPTIONS", "ModelMenuOption")}
    providers = []
    for args, kwargs in records(tree, "AI_PROVIDERS", "ProviderOption"):
        key, label, models = args[:3]
        providers.append({
            "key": key, "label": label,
            "requiresApiKey": kwargs.get("requires_api_key", True),
            "models": [{"id": model, "label": labels.get((key, model), model)} for model in models],
        })
    if not providers or len({p["key"] for p in providers}) != len(providers):
        raise ValueError("Agent providers must be nonempty and unique")
    return {"schemaVersion": 1, "version": project["version"], "sourceDigest": hashlib.sha256(code).hexdigest(), "providers": providers}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path)
    parser.add_argument("--check", action="store_true")
    parser.add_argument("--require-source", action="store_true")
    args = parser.parse_args()
    configured = os.environ.get("ANOMX_PACKAGE_SOURCE")
    source = (args.source or Path(configured or ROOT.parent / "anomx-package")).resolve()
    if not source.exists():
        if args.source or configured or args.require_source or args.check or not OUTPUT.exists():
            parser.error(f"Anomx source not found at {source}. Set ANOMX_PACKAGE_SOURCE to a package checkout.")
        data = json.loads(OUTPUT.read_text())
        print(f"Using committed agent catalog v{data['version']} (source checkout unavailable).")
        return
    content = json.dumps(generate(source), ensure_ascii=False, indent=2) + "\n"
    if args.check:
        if not OUTPUT.exists() or OUTPUT.read_text() != content:
            parser.error("Agent catalog is stale. Run npm run docs:generate and commit the JSON.")
        print("Agent backend/model catalog is current.")
    else:
        OUTPUT.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT.write_text(content)
        print("Generated agent backend/model catalog from source.")


if __name__ == "__main__":
    main()
