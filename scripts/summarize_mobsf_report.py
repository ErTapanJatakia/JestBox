#!/usr/bin/env python3
"""Validate and summarize MobSF's machine-readable APK static-analysis report."""
from __future__ import annotations
import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

SEVERITIES = ("high", "warning", "info")
EXPECTED_PACKAGE = "com.jestbox.app"
SHA256_RE = re.compile(r"^[a-f0-9]{64}$")


class MobSFReportError(Exception):
    """Raised when the MobSF report is incomplete or does not match the APK."""


def summarize_report(report: Any, source_commit: str, apk_sha256: str) -> tuple[dict, str]:
    if not isinstance(report, dict):
        raise MobSFReportError("MobSF report root must be a JSON object.")
    if report.get("package_name") != EXPECTED_PACKAGE:
        raise MobSFReportError(
            f"Unexpected MobSF package_name {report.get('package_name')!r}; expected {EXPECTED_PACKAGE!r}."
        )
    if not isinstance(source_commit, str) or not source_commit.strip():
        raise MobSFReportError("Source commit must be a non-empty string.")
    if not isinstance(apk_sha256, str) or not SHA256_RE.fullmatch(apk_sha256):
        raise MobSFReportError("APK SHA-256 must be exactly 64 lowercase hexadecimal characters.")
    appsec = report.get("appsec")
    if not isinstance(appsec, dict):
        raise MobSFReportError("MobSF report is missing the appsec object.")
    counts = {}
    for severity in SEVERITIES:
        findings = appsec.get(severity)
        if not isinstance(findings, list):
            raise MobSFReportError(
                f"MobSF report appsec.{severity} must be an array; refusing to publish incomplete counts."
            )
        counts[severity] = len(findings)
    score = appsec.get("security_score")
    if score is not None and (isinstance(score, bool) or not isinstance(score, (int, float))):
        raise MobSFReportError("MobSF appsec.security_score must be numeric when supplied.")
    metadata = {
        "package": EXPECTED_PACKAGE,
        "version_name": str(report.get("version_name", "unknown")),
        "version_code": str(report.get("version_code", "unknown")),
        "source_commit": source_commit,
        "apk_sha256": apk_sha256,
        "high": counts["high"],
        "warning": counts["warning"],
        "info": counts["info"],
        "security_score": score,
    }
    lines = [
        "# MobSF production-signed APK static assessment", "",
        f"- Source commit: {source_commit}",
        f"- APK SHA-256: {apk_sha256}",
        f"- Package: {EXPECTED_PACKAGE}",
        f"- Version: {metadata['version_name']} (code {metadata['version_code']})",
        f"- High findings: {counts['high']}",
        f"- Warning findings: {counts['warning']}",
        f"- Informational findings: {counts['info']}",
    ]
    if score is not None:
        lines.append(f"- MobSF security score: {score}")
    lines.extend([
        "",
        "Static analysis of the exact signed APK. Findings require manual validation; this is not dynamic testing or a penetration test.",
        "",
    ])
    return metadata, "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("report", type=Path, help="MobSF JSON report")
    parser.add_argument("--source-commit", required=True)
    parser.add_argument("--apk-sha256", required=True)
    parser.add_argument("--output", type=Path, required=True)
    args = parser.parse_args()
    try:
        report = json.loads(args.report.read_text(encoding="utf-8"))
        _metadata, markdown = summarize_report(report, args.source_commit, args.apk_sha256)
        args.output.write_text(markdown, encoding="utf-8")
    except (OSError, json.JSONDecodeError, MobSFReportError) as exc:
        print(f"ERROR: MobSF report validation failed: {exc}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
