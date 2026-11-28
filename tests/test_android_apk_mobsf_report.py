import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from summarize_mobsf_report import MobSFReportError, summarize_report


def fixture():
    return {
        "package_name": "com.jestbox.app", "version_name": "1.1", "version_code": 2,
        "appsec": {
            "high": [],
            "warning": [{"title": "external"}, {"title": "hardcoded"}, {"title": "temp"}],
            "info": [{"title": "logging"}], "security_score": 85,
        },
    }


class MobSFReportSummaryTests(unittest.TestCase):
    def summarize(self, data):
        return summarize_report(data, expected_package="com.jestbox.app",
                                source_commit="a" * 40, apk_sha256="b" * 64)

    def test_counts_nested_appsec_arrays_and_includes_build_identity(self):
        summary = self.summarize(fixture())
        for expected in ("High findings: 0", "Warning findings: 3",
                         "Informational findings: 1", "security score: 85/100",
                         "Version: 1.1 (code 2)", "APK SHA-256: " + "b" * 64,
                         "Source commit: " + "a" * 40):
            self.assertIn(expected, summary)

    def test_rejects_legacy_top_level_severity_arrays(self):
        with self.assertRaisesRegex(MobSFReportError, "appsec object"):
            self.summarize({"package_name": "com.jestbox.app", "high": [], "warning": [], "info": []})

    def test_rejects_missing_or_malformed_severity_arrays(self):
        data = fixture()
        del data["appsec"]["warning"]
        with self.assertRaisesRegex(MobSFReportError, "appsec.warning"):
            self.summarize(data)

    def test_rejects_findings_without_titles(self):
        data = fixture()
        data["appsec"]["high"] = [{"description": "no title"}]
        with self.assertRaisesRegex(MobSFReportError, "must contain a title"):
            self.summarize(data)

    def test_rejects_wrong_package(self):
        with self.assertRaisesRegex(MobSFReportError, "Unexpected package"):
            summarize_report(fixture(), expected_package="com.example.app",
                             source_commit="a" * 40, apk_sha256="b" * 64)

    def test_rejects_invalid_score(self):
        data = fixture()
        data["appsec"]["security_score"] = 101
        with self.assertRaisesRegex(MobSFReportError, "security_score"):
            self.summarize(data)


if __name__ == "__main__":
    unittest.main()
