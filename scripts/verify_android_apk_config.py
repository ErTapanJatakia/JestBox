#!/usr/bin/env python3
"""Fail-closed verification of the Cordova access policy inside a built APK."""
from __future__ import annotations
import argparse
import os
import re
import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

APK_PATHS = {
    "assessment-signed": Path("android/app/build/outputs/apk/release/jestbox-hardened-assessment-signed.apk"),
    "release-unsigned": Path("android/app/build/outputs/apk/release/app-release-unsigned.apk"),
    "release-signed": Path("android/app/build/outputs/apk/release/jestbox-release-signed.apk"),
}
ALLOWED_ORIGIN = "http://localhost"

class VerificationError(Exception):
    pass

def verify_config(xml_text: str) -> dict:
    import xml.etree.ElementTree as ET
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        raise VerificationError(f"Invalid packaged Cordova config XML: {exc}") from exc
    if root.tag != "widget":
        raise VerificationError("Packaged Cordova config root is not <widget>.")
    rules = [node for node in root.iter() if node.tag == "access"]
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
    return {"result":"passed","accessRuleCount":len(rules),"accessOrigins":origins,"wildcardOrigins":0}

def verify_aapt2_dump(dump: str, resource: str) -> dict | None:
    # aapt2 decodes Android binary XML to a textual element/attribute tree.
    # Only the Cordova <widget> resource is relevant; unrelated XML is ignored.
    if not re.search(r"^\s*E:\s+widget(?:\s|$)", dump, re.MULTILINE):
        return None
    if not re.search(r"^\s*E:\s+access(?:\s|$)", dump, re.MULTILINE):
        raise VerificationError(f"{resource}: <widget> has no <access> rules.")
    origins = re.findall(r'origin(?:\([^)]*\))?[^\n]*?="([^"]*)"', dump)
    if not origins:
        raise VerificationError(f"{resource}: unable to decode access origin attributes.")
    unexpected = sorted(set(origins) - {ALLOWED_ORIGIN})
    if unexpected:
        raise VerificationError("Unapproved packaged Cordova access origin(s): " + ", ".join(unexpected))
    access_count = len(re.findall(r"^\s*E:\s+access(?:\s|$)", dump, re.MULTILINE))
    if access_count != len(origins):
        raise VerificationError(f"{resource}: one or more access rules have undecoded origins.")
    return {"result":"passed","resource":resource,"accessRuleCount":access_count,"accessOrigins":origins,"wildcardOrigins":0}

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", choices=tuple(APK_PATHS), default="assessment-signed")
    args = parser.parse_args()
    apk = APK_PATHS[args.artifact].resolve()
    if not apk.is_relative_to(Path.cwd().resolve()) or not apk.is_file():
        print("ERROR: APK path is missing or outside the workspace.", file=sys.stderr)
        return 2
    sdk = Path(os.environ.get("ANDROID_HOME", ""))
    aapt2 = sdk / "build-tools" / "36.0.0" / "aapt2"
    if not aapt2.is_file():
        found = shutil.which("aapt2")
        if found:
            aapt2 = Path(found)
    if not aapt2.is_file():
        print("ERROR: Android SDK aapt2 is unavailable.", file=sys.stderr)
        return 2
    try:
        with zipfile.ZipFile(apk) as archive:
            xml_paths = sorted(n for n in archive.namelist() if n.startswith("res/") and n.endswith(".xml"))
        if not xml_paths:
            raise VerificationError("APK contains no packaged res/*.xml resources.")
        widget_reports = []
        for resource in xml_paths:
            result = subprocess.run(
                [str(aapt2), "dump", "xmltree", str(apk), "--file", resource],
                check=False, capture_output=True, text=True, timeout=60, shell=False,
            )
            if result.returncode != 0:
                continue
            report = verify_aapt2_dump(result.stdout, resource)
            if report is not None:
                widget_reports.append(report)
        if len(widget_reports) != 1:
            raise VerificationError(f"Expected exactly one packaged Cordova widget resource; found {len(widget_reports)}.")
        report = widget_reports[0]
    except (zipfile.BadZipFile, subprocess.TimeoutExpired, VerificationError) as exc:
        print(f"ERROR: packaged Cordova policy verification failed: {exc}", file=sys.stderr)
        return 1
    report["apk"] = apk.name
    report["apkBytes"] = apk.stat().st_size
    print(report)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
