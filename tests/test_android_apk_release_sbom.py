import hashlib
import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "verify_android_release_sbom.py"


def component(group, name, version, license_id="Apache-2.0"):
    item = {
        "type": "library",
        "group": group,
        "name": name,
        "version": version,
        "purl": f"pkg:maven/{group}/{name}@{version}",
        "bom-ref": f"pkg:maven/{group}/{name}@{version}",
    }
    if license_id:
        item["licenses"] = [{"license": {"id": license_id}}]
    return item


class AndroidReleaseSbomTests(unittest.TestCase):
    def run_verifier(self, root, components):
        sbom = root / "bom.json"
        apk = root / "app-release.apk"
        output = root / "binding.json"
        sbom.write_text(json.dumps({
            "bomFormat": "CycloneDX",
            "specVersion": "1.6",
            "version": 1,
            "components": components,
            "dependencies": [{
                "ref": components[0]["bom-ref"],
                "dependsOn": [item["bom-ref"] for item in components[1:]],
            }],
        }), encoding="utf-8")
        apk.write_bytes(b"test-apk-bytes")
        result = subprocess.run([
            sys.executable, str(SCRIPT),
            "--sbom", str(sbom),
            "--apk", str(apk),
            "--output", str(output),
            "--source-commit", "a" * 40,
            "--package-name", "com.jestbox.app",
            "--version-name", "1.1",
            "--version-code", "2",
        ], capture_output=True, text=True, check=False)
        return result, sbom, apk, output

    def test_accepts_resolved_android_release_graph_and_binds_exact_apk(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            components = [
                component("com.example", "app-root", "1.1"),
                component("androidx.core", "core", "1.17.0"),
                component("androidx.activity", "activity", "1.11.0"),
                component("androidx.appcompat", "appcompat", "1.7.1"),
                component("org.jetbrains.kotlin", "kotlin-stdlib", "2.0.0"),
                component("com.example", "transitive", "1.0", license_id=None),
            ]
            result, sbom, apk, output = self.run_verifier(root, components)
            self.assertEqual(result.returncode, 0, result.stderr)
            binding = json.loads(output.read_text(encoding="utf-8"))
            self.assertEqual(binding["apkSha256"], hashlib.sha256(apk.read_bytes()).hexdigest())
            self.assertEqual(binding["sbomSha256"], hashlib.sha256(sbom.read_bytes()).hexdigest())
            self.assertEqual(binding["componentCount"], 6)
            self.assertEqual(binding["androidxComponentCount"], 3)
            self.assertEqual(binding["componentsWithoutDeclaredLicense"], 1)
            self.assertEqual(binding["dependencyScope"], "Gradle :app releaseRuntimeClasspath")
            self.assertIn("exact APK bytes supplied to this verifier", binding["limitations"][-1])

    def test_rejects_graph_without_androidx_runtime_components(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            components = [
                component("com.example", f"library-{index}", "1.0")
                for index in range(6)
            ]
            result, _, _, _ = self.run_verifier(root, components)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn("AndroidX", result.stderr)

    def test_rejects_missing_dependency_relationship_graph(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            components = [
                component("androidx.core", f"core-{index}", "1.0")
                for index in range(6)
            ]
            sbom = root / "bom.json"
            apk = root / "app-release.apk"
            output = root / "binding.json"
            sbom.write_text(json.dumps({
                "bomFormat": "CycloneDX", "specVersion": "1.6",
                "components": components, "dependencies": [],
            }), encoding="utf-8")
            apk.write_bytes(b"apk")
            result = subprocess.run([
                sys.executable, str(SCRIPT), "--sbom", str(sbom),
                "--apk", str(apk), "--output", str(output),
                "--source-commit", "b" * 40,
                "--package-name", "com.jestbox.app",
                "--version-name", "1.1", "--version-code", "2",
            ], capture_output=True, text=True, check=False)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn("relationship graph", result.stderr)


    def test_rejects_dangling_dependency_reference(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            components = [
                component("androidx.core", f"core-{index}", "1.0")
                for index in range(6)
            ]
            sbom = root / "bom.json"
            apk = root / "app-release.apk"
            output = root / "binding.json"
            sbom.write_text(json.dumps({
                "bomFormat": "CycloneDX",
                "specVersion": "1.6",
                "components": components,
                "dependencies": [{
                    "ref": components[0]["bom-ref"],
                    "dependsOn": [components[1]["bom-ref"], "pkg:maven/ghost/missing@9.9"],
                }],
            }), encoding="utf-8")
            apk.write_bytes(b"apk")
            result = subprocess.run([
                sys.executable, str(SCRIPT), "--sbom", str(sbom),
                "--apk", str(apk), "--output", str(output),
                "--source-commit", "c" * 40,
                "--package-name", "com.jestbox.app",
                "--version-name", "1.1", "--version-code", "2",
            ], capture_output=True, text=True, check=False)
            self.assertNotEqual(result.returncode, 0)
            self.assertIn("unknown bom-ref", result.stderr)


if __name__ == "__main__":
    unittest.main()
