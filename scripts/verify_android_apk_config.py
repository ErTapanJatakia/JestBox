#!/usr/bin/env python3
"""Fail-closed verification of the Cordova access policy inside a built APK."""
from __future__ import annotations
import argparse
import os
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path
import xml.etree.ElementTree as ET

APK_PATHS = {
    "assessment-signed": Path("android/app/build/outputs/apk/release/jestbox-hardened-assessment-signed.apk"),
    "release-unsigned": Path("android/app/build/outputs/apk/release/app-release-unsigned.apk"),
    "release-signed": Path("android/app/build/outputs/apk/release/jestbox-release-signed.apk"),
}
ALLOWED_ORIGIN = "http://localhost"

class VerificationError(Exception):
    pass

def local_name(tag):
    return tag.rsplit("}", 1)[-1] if isinstance(tag, str) else tag

def verify_config(xml_text: str) -> dict:
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        raise VerificationError(f"Invalid packaged Cordova config XML: {exc}") from exc
    # Cordova config.xml commonly declares the W3C Widgets default namespace.
    # ElementTree then expands tags to {namespace}widget/access; compare local names.
    if local_name(root.tag) != "widget":
        raise VerificationError("Packaged Cordova config root is not <widget>.")
    rules = [node for node in root.iter() if local_name(node.tag) == "access"]
    if not rules:
        raise VerificationError("Packaged Cordova config contains no <access> rule.")
    origins = []
    for rule in rules:
        origin = rule.get("origin")
        if not origin:
            raise VerificationError("Packaged <access> rule has no origin attribute.")
        origins.append(origin)
    unexpected = sorted(set(origins) - {ALLOWED_ORIGIN})
    if unexpected:
        raise VerificationError("Unapproved packaged Cordova access origin(s): " + ", ".join(unexpected))
    return {"result": "passed", "accessRuleCount": len(rules), "accessOrigins": origins, "wildcardOrigins": 0}

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", choices=tuple(APK_PATHS), default="assessment-signed")
    args = parser.parse_args()
    apk = APK_PATHS[args.artifact].resolve()
    if not apk.is_relative_to(Path.cwd().resolve()) or not apk.is_file():
        print("ERROR: APK path is missing or outside the workspace.", file=sys.stderr)
        return 2

    sdk = Path(os.environ.get("ANDROID_HOME", ""))
    analyzer = sdk / "cmdline-tools" / "latest" / "bin" / "apkanalyzer"
    if not analyzer.is_file():
        found = shutil.which("apkanalyzer")
        if found:
            analyzer = Path(found)
    if not analyzer.is_file():
        print("ERROR: Android SDK apkanalyzer is unavailable.", file=sys.stderr)
        return 2

    try:
        with zipfile.ZipFile(apk) as archive:
            xml_paths = sorted(name for name in archive.namelist()
                               if name.startswith("res/") and name.endswith(".xml"))
        if not xml_paths:
            raise VerificationError("APK contains no packaged res/*.xml resources.")

        reports = []
        decode_errors = []
        decode_samples = []
        for resource in xml_paths:
            result = subprocess.run(
                [str(analyzer), "resources", "xml", "--file", resource, str(apk)],
                check=False, capture_output=True, text=True, timeout=60, shell=False,
            )
            if result.returncode != 0:
                decode_errors.append(f"{resource}: rc={result.returncode}; {result.stderr.strip() or result.stdout.strip()}")
                continue
            if len(decode_samples) < 8:
                decode_samples.append(f"{resource}: {result.stdout[:1200]!r}")
            try:
                root = ET.fromstring(result.stdout)
            except ET.ParseError:
                continue
            if local_name(root.tag) == "widget":
                report = verify_config(result.stdout)
                report["resource"] = resource
                reports.append(report)

        if len(reports) != 1:
            detail = "; ".join(decode_errors[:5])
            samples = " | ".join(decode_samples[:8])
            suffix = f" Decoder diagnostics: {detail}. Successful decode samples: {samples}" if (detail or samples) else ""
            raise VerificationError(
                f"Expected exactly one decoded packaged Cordova <widget> resource; found {len(reports)}."
                + suffix
            )
        report = reports[0]
    except (zipfile.BadZipFile, subprocess.TimeoutExpired, VerificationError) as exc:
        print(f"ERROR: packaged Cordova policy verification failed: {exc}", file=sys.stderr)
        return 1

    report["apk"] = apk.name
    report["apkBytes"] = apk.stat().st_size
    print(report)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
