"""Check source extraction without importing or executing the agent."""
import importlib.util
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("agent_catalog", Path(__file__).with_name("generate-agent-catalog.py"))
catalog = importlib.util.module_from_spec(spec)
spec.loader.exec_module(catalog)


class AgentCatalogTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.source = Path(self.tmp.name)
        self.store = self.source / "src/anomx/agent/store.py"
        self.store.parent.mkdir(parents=True)
        (self.source / "pyproject.toml").write_text('[project]\nversion = "1.2.3"\n')
        self.store.write_text('''
raise RuntimeError("Must never execute package source")
AI_PROVIDERS = (
    ProviderOption("cloud", "Cloud label", ("model-v2",)),
    ProviderOption("local", "Local label", ("custom:7b",), requires_api_key=False),
)
MODEL_MENU_OPTIONS = (ModelMenuOption("cloud", "model-v2", "Model Two"),)
''')

    def test_labels_identifiers_and_access_come_from_source(self):
        data = catalog.generate(self.source)
        self.assertEqual(data["version"], "1.2.3")
        cloud, local = data["providers"]
        self.assertEqual(cloud["label"], "Cloud label")
        self.assertEqual(cloud["models"], [{"id": "model-v2", "label": "Model Two"}])
        self.assertTrue(cloud["requiresApiKey"])
        self.assertFalse(local["requiresApiKey"])
        self.assertEqual(local["models"][0]["label"], "custom:7b")

    def test_model_updates_change_snapshot(self):
        before = catalog.generate(self.source)
        self.store.write_text(self.store.read_text().replace("model-v2", "model-v3"))
        after = catalog.generate(self.source)
        self.assertNotEqual(before["sourceDigest"], after["sourceDigest"])
        self.assertEqual(after["providers"][0]["models"][0]["id"], "model-v3")

    def test_unknown_dynamic_catalog_fails_instead_of_omitting_models(self):
        self.store.write_text('AI_PROVIDERS = load_providers()\nMODEL_MENU_OPTIONS = ()\n')
        with self.assertRaisesRegex(ValueError, "Unsupported AI_PROVIDERS"):
            catalog.generate(self.source)

    def test_duplicate_provider_fails(self):
        self.store.write_text(self.store.read_text().replace('"local", "Local label"', '"cloud", "Local label"'))
        with self.assertRaisesRegex(ValueError, "unique"):
            catalog.generate(self.source)


if __name__ == "__main__":
    unittest.main()
