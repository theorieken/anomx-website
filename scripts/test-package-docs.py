"""Regression checks for the source-to-reference boundary (no package imports)."""
import importlib.util
import io
import json
from contextlib import redirect_stderr, redirect_stdout
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location("generator", Path(__file__).with_name("generate-package-docs.py"))
generator = importlib.util.module_from_spec(spec)
spec.loader.exec_module(generator)


class ReferenceTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.addCleanup(self.directory.cleanup)
        self.root = Path(self.directory.name)
        self.write("__init__.py", '_EXPORTS = {"Widget": "anomx.data", "old_name": "anomx.data"}\n__all__ = sorted(_EXPORTS)')
        self.write("data/__init__.py", 'from .example import Widget, transform as old_name\n__all__ = ["Widget", "old_name"]')
        self.write("data/example.py", '''
import unavailable_scientific_dependency
raise RuntimeError("Source must never execute")
from dataclasses import dataclass, field
from typing import ClassVar
class Base:
    def __init__(self, size: int = 3):
        """Build the base."""
    def fit(self, data, /, *, mode: str = "batch") -> "Base":
        """Fit observations."""
class Widget(Base):
    """Widget documentation."""
    @property
    def shape(self) -> tuple[int, ...]:
        """Return dimensions."""
    @shape.setter
    def shape(self, value): pass
    def _private(self): pass
async def transform(value: float, /, *, scale: int = 1) -> float:
    """Transform a value."""
@dataclass
class Record:
    name: str
    tags: list[str] = field(default_factory=list)
    hidden: int = field(default=0, init=False)
    category: ClassVar[str] = "record"
    flag: bool = field(default=False, kw_only=True)
''')
        self.write("agent/__init__.py", "class AgentSecret: pass")
        self.write("data/_private.py", "class PrivateHelper: pass")

    def write(self, relative, source):
        path = self.root / "src/anomx" / relative
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(source)

    def build(self):
        return {module["name"]: module for module in generator.Reference(self.root).build()}

    def test_lazy_exports_relative_imports_and_aliases_resolve_without_imports(self):
        modules = self.build()
        alias = next(alias for alias in modules["anomx"]["aliases"] if alias["name"] == "old_name")
        self.assertEqual(alias["href"], "/documentation/package/data/example/#transform")
        self.assertNotIn("anomx.agent", modules)
        self.assertNotIn("anomx.data._private", modules)

    def test_signatures_inheritance_and_property_setters(self):
        symbols = {symbol["name"]: symbol for symbol in self.build()["anomx.data.example"]["symbols"]}
        self.assertEqual(symbols["transform"]["signature"], "transform(value: float, /, *, scale: int = 1) -> float")
        self.assertTrue(symbols["transform"]["async"])
        widget = symbols["Widget"]
        self.assertEqual(widget["signature"], "Widget(size: int = 3)")
        self.assertEqual(widget["inherited"][0]["href"], "/documentation/package/data/example/#Base.fit")
        self.assertEqual([member["name"] for member in widget["members"]], ["shape"])
        self.assertEqual(widget["members"][0]["kind"], "property")

    def test_dataclass_constructor_handles_factories_and_non_init_fields(self):
        record = next(symbol for symbol in self.build()["anomx.data.example"]["symbols"] if symbol["name"] == "Record")
        self.assertEqual(record["signature"], "Record(name: str, tags: list[str] = <factory: list>, *, flag: bool = False)")

    def test_new_source_symbols_are_discovered_automatically(self):
        self.write("models/new_model.py", 'def forecast(steps: int = 5):\n    """Predict future values."""\n    pass')
        module = self.build()["anomx.models.new_model"]
        self.assertEqual(module["symbols"][0]["signature"], "forecast(steps: int = 5)")

    def test_snapshot_links_and_anchors_are_complete(self):
        reference = json.loads(generator.OUTPUT.read_text())
        anchors = {module["href"]: {symbol["name"] for symbol in module["symbols"]} | {symbol["name"] + "." + member["name"] for symbol in module["symbols"] for member in symbol["members"]} for module in reference["modules"]}
        self.assertEqual(len(anchors), len(reference["modules"]))
        for module in reference["modules"]:
            self.assertFalse(module["name"].startswith("anomx.agent"))
            links = [alias["href"] for alias in module["aliases"] if alias["href"]]
            for symbol in module["symbols"]:
                links += [base["href"] for base in symbol["bases"] if base["href"]]
                links += [member["href"] for member in symbol["inherited"]]
            for link in links:
                url, anchor = link.split("#")
                self.assertIn(anchor, anchors[url], link)

    def test_unresolvable_exports_fail_instead_of_silently_dropping_api(self):
        self.write("data/broken.py", "__all__ = arbitrary_runtime_function()")
        with self.assertRaisesRegex(ValueError, "Cannot resolve __all__"):
            self.build()

    def test_website_only_checkout_uses_committed_snapshot(self):
        snapshot = self.root / "snapshot.json"
        snapshot.write_text('{"version": "1.2.3"}')
        output = io.StringIO()
        with patch.object(generator, "ROOT", self.root / "website"), patch.object(generator, "OUTPUT", snapshot), patch.dict("os.environ", {}, clear=True), patch("sys.argv", ["generator"]), redirect_stdout(output):
            generator.main()
        self.assertIn("Using committed package reference v1.2.3", output.getvalue())

    def test_explicit_missing_source_never_silently_uses_snapshot(self):
        with patch("sys.argv", ["generator", "--source", str(self.root / "missing")]), redirect_stderr(io.StringIO()):
            with self.assertRaises(SystemExit) as failure:
                generator.main()
        self.assertEqual(failure.exception.code, 2)


if __name__ == "__main__":
    unittest.main()
