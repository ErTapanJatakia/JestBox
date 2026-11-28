import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / "scripts"))
from summarize_mobsf_report import MobSFReportError, summarize_report


def valid_report():
    return {
        "package_name": "com.jestbox.app",
        "version_name": "1.1",
        "version_code": "2",
        "appsec": {
            "security_score": 85,
            "high": [],
            "warning": [{"rule": "external"}, {"rule": "temp"}, {"rule": "hardcoded"}],
            "info": [{"rule": "logging"}],
        },
    }


class MobSFReportSummaryTests(unittest.TestCase):
    def test_counts_actual_appsec_arrays_and_renders_score(self):
        metadata, markdown = summarize_report(
            valid_report(),
            "a" * 40,
            "b" * 64,
        )
        self.assertEqual((metadata["high"], metadata["warning"], metadata["info"]), (0, 3, 1))
        self.assertEqual(metadata["security_score"], 85)
        self.assertIn("- High findings: 0", markdown)
        self.assertIn("- Warning findings: 3", markdown)
        self.assertIn("- Informational findings: 1", markdown)
        self.assertIn("- MobSF security score: 85", markdown)

    def test_rejects_wrong_package(self):
        report = valid_report()
        report["package_name"] = "com.example.other"
        with self.assertRaisesRegex(MobSFReportError, "Unexpected MobSF package_name"):
            summarize_report(report, "e16b467", "a" * 64)

    def test_rejects_missing_appsec_object(self):
        report = valid_report()
        del report["appsec"]
        with self.assertRaisesRegex(MobSFReportError, "missing the appsec object"):
            summarize_report(report, "e16b467", "a" * 64)

    def test_rejects_missing_severity_array_instead_of_silently_reporting_zero(self):
        report = valid_report()
        del report["appsec"]["warning"]
        with self.assertRaisesRegex(MobSFReportError, "appsec.warning must be an array"):
            summarize_report(report, "e16b467", "a" * 64)

    def test_rejects_wrong_severity_type(self):
        report = valid_report()
        report["appsec"]["high"] = 0
        with self.assertRaisesRegex(MobSFReportError, "appsec.high must be an array"):
            summarize_report(report, "e16b467", "a" * 64)

    def test_rejects_malformed_apk_hash(self):
        with self.assertRaisesRegex(MobSFReportError, "64 lowercase hexadecimal"):
            summarize_report(valid_report(), "e16b467", "not-a-hash")

    def test_rejects_invalid_security_score_type(self):
        report = valid_report()
        report["appsec"]["security_score"] = "85"
        with self.assertRaisesRegex(MobSFReportError, "must be numeric"):
            summarize_report(report, "e16b467", "a" * 64)

    def test_workflow_uses_validated_summary_and_repository_retention_cap(self):
        workflow = (ROOT / ".github" / "workflows" / "protected-production-signing.yml").read_text(encoding="utf-8")
        self.assertIn("python3 scripts/summarize_mobsf_report.py mobsf-report.json", workflow)
        self.assertNotIn("'.high //", workflow)
        self.assertNotIn("'.warning //", workflow)
        self.assertNotIn("'.info //", workflow)
        self.assertEqual(workflow.count("retention-days: 30"), 2)
        self.assertNotIn("retention-days: 90", workflow)


if __name__ == "__main__":
    unittest.main()
