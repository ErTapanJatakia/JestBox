#!/usr/bin/env python3
"""Validate MobSF report structure and render accurate severity counts."""
from __future__ import annotations
import argparse
import json
from pathlib import Path
from typing import Any


class MobSFReportError(ValueError):
    """Raised for incomplete or unexpected MobSF report data."""


def summarize_report(report: Any, *, expected_package: str, source_commit: str, apk_sha256: str) -> str:
    if not isinstance(report, dict):
        raise MobSFReportError("MobSF report must be a JSON object.")
    if report.get("package_name") != expected_package:
        raise MobSFReportError(f"Unexpected package name: {report.get('package_name')!r}")
    appsec = report.get("appsec")
    if not isinstance(appsec, dict):
        raise MobSFReportError("MobSF report is missing the appsec object.")
    counts = {}
    for severity in ("high", "warning", "info"):
        findings = appsec.get(severity)
        if not isinstance(findings, list):
            raise MobSFReportError(f"MobSF appsec.{severity} must be an array.")
        for index, finding in enumerate(findings):
            if not isinstance(finding, dict) or not isinstance(finding.get("title"), str):
                raise MobSFReportError(f"MobSF appsec.{severity}[{index}] must contain a title.")
        counts[severity] = len(findings)
    score = appsec.get("security_score")
    if score is not None and (isinstance(score, bool) or not isinstance(score, int) or not 0 <= score <= 100):
        raise MobSFReportError("MobSF appsec.security_score must be an integer from 0 to 100.")
    version_name = report.get("version_name") or "unknown"
    version_code = report.get("version_code")
    if version_code is None:
        version_code = "unknown"
    lines = [
        "# MobSF production-signed APK static assessment", "",
        f"- Source commit: {source_commit}",
        f"- APK SHA-256: {apk_sha256}",
        f"- Package: {expected_package}",
        f"- Version: {version_name} (code {version_code})",
    ]
    if score is not None:
        lines.append(f"- MobSF security score: {score}/100")
    lines.extend([
        f"- High findings: {counts['high']}",
        f"- Warning findings: {counts['warning']}",
        f"- Informational findings: {counts['info']}", "",
        "Counts are derived from the MobSF report's appsec severity arrays. "
        "Static analysis of the exact signed APK only; findings require "
        "manual validation. This is not dynamic testing or a penetration test.", "",
    ])
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--report", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--source-commit", required=True)
    parser.add_argument("--apk-sha256", required=True)
    parser.add_argument("--expected-package", required=True)
    args = parser.parse_args()
    try:
        report = json.loads(args.report.read_text(encoding="utf-8"))
        summary = summarize_report(report, expected_package=args.expected_package,
                                   source_commit=args.source_commit, apk_sha256=args.apk_sha256)
        args.output.write_text(summary, encoding="utf-8")
    except (OSError, json.JSONDecodeError, MobSFReportError) as exc:
        parser.exit(1, f"MobSF report validation failed: {exc}\n")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
