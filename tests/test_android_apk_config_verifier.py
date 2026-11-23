import sys
import unittest
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from verify_android_apk_config import VerificationError, verify_config

class PackagedCordovaConfigTests(unittest.TestCase):
    def test_accepts_localhost_only(self):
        self.assertEqual(verify_config('<widget><access origin="http://localhost" /></widget>')["result"], "passed")
    def test_accepts_namespaced_cordova_config(self):
        xml = '<widget xmlns="http://www.w3.org/ns/widgets"><access origin="http://localhost" /></widget>'
        self.assertEqual(verify_config(xml)["accessOrigins"], ["http://localhost"])
    def test_rejects_wildcard(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="*" /></widget>')
    def test_rejects_external_origin(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="http://localhost"/><access origin="https://example.com"/></widget>')
    def test_checks_all_access_rules(self):
        with self.assertRaisesRegex(VerificationError, "Unapproved"):
            verify_config('<widget><access origin="http://localhost"/><access origin="*"/></widget>')
    def test_rejects_missing_access_policy(self):
        with self.assertRaisesRegex(VerificationError, "no <access>"):
            verify_config("<widget />")
    def test_rejects_missing_origin(self):
        with self.assertRaisesRegex(VerificationError, "no origin"):
            verify_config("<widget><access /></widget>")
    def test_rejects_invalid_xml_or_wrong_root(self):
        with self.assertRaisesRegex(VerificationError, "Invalid"):
            verify_config("<widget>")
        with self.assertRaisesRegex(VerificationError, "root"):
            verify_config("<manifest />")

if __name__ == "__main__":
    unittest.main()
