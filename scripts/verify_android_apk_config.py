#!/usr/bin/env python3
"""Fail-closed check of res/xml/config.xml decoded from the actual APK."""
from __future__ import annotations
import argparse
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
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
    return {"result":"passed","resource":"res/xml/config.xml","accessRuleCount":len(rules),"accessOrigins":origins,"wildcardOrigins":0}

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", choices=tuple(APK_PATHS), default="assessment-signed")
    args = parser.parse_args()
    apk = APK_PATHS[args.artifact].resolve()
    if not apk.is_relative_to(Path.cwd().resolve()) or not apk.is_file():
        print("ERROR: APK path is missing or outside the workspace.", file=sys.stderr)
        return 2
    analyzer = shutil.which("apkanalyzer")
    if analyzer is None:
        print("ERROR: Android SDK apkanalyzer is unavailable.", file=sys.stderr)
        return 2
    try:
        result = subprocess.run(
            ["apkanalyzer", "resources", "xml", "--file", "res/xml/config.xml", str(apk)],
            executable=analyzer, check=True, capture_output=True, text=True,
            timeout=60, shell=False,
        )
        report = verify_config(result.stdout)
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired, VerificationError) as exc:
        print(f"ERROR: packaged Cordova policy verification failed: {exc}", file=sys.stderr)
        return 1
    report["apk"] = apk.name
    report["apkBytes"] = apk.stat().st_size
    print(report)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
