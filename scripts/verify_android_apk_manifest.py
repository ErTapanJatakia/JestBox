#!/usr/bin/env python3
"""Fail-closed verification of security-relevant settings in a built Android APK."""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

# Android manifest namespace identifier, not an HTTP endpoint.
ANDROID = "{http://schemas.android.com/apk/res/android}"  # DevSkim: ignore DS137138
EXPECTED_APPLICATION_ID = "com.jestbox.app"
EXPECTED_MIN_SDK = 29
EXPECTED_APK_RELATIVE_PATHS = {
    "assessment-signed": Path("android/app/build/outputs/apk/release/jestbox-hardened-assessment-signed.apk"),
    "release-unsigned": Path("android/app/build/outputs/apk/release/app-release-unsigned.apk"),
    "production-signed": Path("production-signed.apk"),
}
MIN_SAFE_TARGET_SDK = 28

SENSITIVE_PERMISSIONS = {
    "android.permission.READ_SMS",
    "android.permission.RECEIVE_SMS",
    "android.permission.RECEIVE_MMS",
    "android.permission.SEND_SMS",
    "android.permission.READ_CONTACTS",
    "android.permission.WRITE_CONTACTS",
    "android.permission.GET_ACCOUNTS",
    "android.permission.RECORD_AUDIO",
    "android.permission.CAMERA",
    "android.permission.READ_CALL_LOG",
    "android.permission.WRITE_CALL_LOG",
    "android.permission.PROCESS_OUTGOING_CALLS",
    "android.permission.READ_PHONE_STATE",
    "android.permission.CALL_PHONE",
    "android.permission.ACCESS_FINE_LOCATION",
    "android.permission.ACCESS_COARSE_LOCATION",
    "android.permission.ACCESS_BACKGROUND_LOCATION",
    "android.permission.MANAGE_EXTERNAL_STORAGE",
    "android.permission.REQUEST_INSTALL_PACKAGES",
    "android.permission.SYSTEM_ALERT_WINDOW",
}


class VerificationError(Exception):
    """Raised when the packaged manifest violates a required invariant."""


def android_attr(element: ET.Element, name: str) -> str | None:
    return element.get(ANDROID + name)


def parse_sdk(value: str | None, label: str) -> int:
    if value is None:
        raise VerificationError(f"{label} is missing from the packaged manifest.")
    try:
        return int(value)
    except ValueError as exc:
        raise VerificationError(f"{label} is not a numeric API level: {value!r}") from exc


def verify_manifest(xml_text: str) -> dict:
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as exc:
        raise VerificationError(f"apkanalyzer returned invalid manifest XML: {exc}") from exc

    if root.tag != "manifest":
        raise VerificationError("The APK manifest root element is not <manifest>.")

    application_id = root.get("package")
    if application_id != EXPECTED_APPLICATION_ID:
        raise VerificationError(
            f"Unexpected application ID {application_id!r}; expected {EXPECTED_APPLICATION_ID!r}."
        )

    uses_sdk = root.find("uses-sdk")
    if uses_sdk is None:
        raise VerificationError("Packaged manifest has no <uses-sdk> element.")
    min_sdk = parse_sdk(android_attr(uses_sdk, "minSdkVersion"), "minSdkVersion")
    target_sdk = parse_sdk(android_attr(uses_sdk, "targetSdkVersion"), "targetSdkVersion")
    if min_sdk != EXPECTED_MIN_SDK:
        raise VerificationError(
            f"Packaged minSdkVersion is {min_sdk}; expected {EXPECTED_MIN_SDK}."
        )
    if target_sdk < MIN_SAFE_TARGET_SDK:
        raise VerificationError(
            f"targetSdkVersion {target_sdk} is below {MIN_SAFE_TARGET_SDK}; "
            "the Android default cleartext-traffic policy cannot be relied upon."
        )

    application = root.find("application")
    if application is None:
        raise VerificationError("Packaged manifest has no <application> element.")
    if android_attr(application, "allowBackup") != "false":
        raise VerificationError("Packaged application must explicitly set android:allowBackup=\"false\".")
    if android_attr(application, "debuggable") == "true":
        raise VerificationError("Packaged application is debuggable.")
    if android_attr(application, "testOnly") == "true":
        raise VerificationError("Packaged application is marked testOnly.")

    cleartext = android_attr(application, "usesCleartextTraffic")
    if cleartext == "true":
        raise VerificationError("Packaged application explicitly permits cleartext traffic.")
    network_config = android_attr(application, "networkSecurityConfig")
    if network_config:
        raise VerificationError(
            "A networkSecurityConfig is packaged; inspect its resource rules before this "
            "automated check can certify the effective cleartext policy."
        )

    component_tags = {"activity", "activity-alias", "service", "receiver", "provider"}
    components = []
    exported_true = []
    profile_receiver_seen = False
    launcher_components = []

    for component in application.iter():
        if component.tag not in component_tags:
            continue
        name = android_attr(component, "name") or "<unnamed>"
        exported = android_attr(component, "exported")
        if exported not in {"true", "false"}:
            raise VerificationError(
                f"Component {name} ({component.tag}) has no explicit android:exported boolean."
            )
        has_launcher_filter = any(
            intent_filter.find("action[@android:name='android.intent.action.MAIN']", {"android": ANDROID[1:-1]}) is not None
            and intent_filter.find("category[@android:name='android.intent.category.LAUNCHER']", {"android": ANDROID[1:-1]}) is not None
            for intent_filter in component.findall("intent-filter")
        )
        if has_launcher_filter:
            launcher_components.append((component.tag, name, exported))
        if exported == "true":
            exported_true.append((component.tag, name, has_launcher_filter))
        if name == "androidx.profileinstaller.ProfileInstallReceiver":
            profile_receiver_seen = True
            if exported != "false":
                raise VerificationError("ProfileInstallReceiver must remain non-exported.")
        components.append({"type": component.tag, "name": name, "exported": exported})

    if not profile_receiver_seen:
        raise VerificationError("Expected hardened ProfileInstallReceiver was not found in the APK.")
    if len(launcher_components) != 1:
        raise VerificationError(
            f"Expected exactly one launcher component; found {len(launcher_components)}."
        )
    if launcher_components[0][2] != "true":
        raise VerificationError("The sole launcher component must be exported for Android launch.")
    unexpected_exports = [item for item in exported_true if not item[2]]
    if unexpected_exports:
        raise VerificationError(
            "Unexpected exported Android components: "
            + ", ".join(f"{kind}:{name}" for kind, name, _ in unexpected_exports)
        )

    permission_tags = {"uses-permission", "uses-permission-sdk-23", "uses-permission-sdk-m"}
    permissions = sorted(
        permission
        for element in root.iter()
        if element.tag in permission_tags
        for permission in [android_attr(element, "name")]
        if permission
    )
    sensitive = sorted(set(permissions) & SENSITIVE_PERMISSIONS)
    if sensitive:
        raise VerificationError(
            "Unexpected sensitive Android permission(s) require documented feature review: "
            + ", ".join(sensitive)
        )

    return {
        "applicationId": application_id,
        "minSdkVersion": min_sdk,
        "targetSdkVersion": target_sdk,
        "allowBackup": android_attr(application, "allowBackup"),
        "debuggable": android_attr(application, "debuggable") or "false (platform default)",
        "testOnly": android_attr(application, "testOnly") or "false (platform default)",
        "usesCleartextTraffic": cleartext or "not enabled (Android target SDK default)",
        "networkSecurityConfig": network_config or "not declared",
        "launcher": {"type": launcher_components[0][0], "name": launcher_components[0][1]},
        "components": components,
        "declaredPermissions": permissions,
        "sensitivePermissionReview": "none detected",
        "result": "passed",
    }


def resolve_workspace_path(
    value: str,
    label: str,
    *,
    must_exist: bool,
    workspace: Path | None = None,
) -> Path:
    """Resolve a file path and reject traversal or symlink escapes from the workspace."""
    root = (workspace or Path.cwd()).resolve()
    candidate = Path(value)
    if not candidate.is_absolute():
        candidate = root / candidate
    try:
        resolved = candidate.resolve(strict=must_exist)
    except (OSError, RuntimeError) as exc:
        raise VerificationError(f"{label} path cannot be resolved: {value!r}") from exc
    if not resolved.is_relative_to(root):
        raise VerificationError(f"{label} path must remain inside the repository workspace.")
    if must_exist and not resolved.is_file():
        raise VerificationError(f"{label} does not exist or is not a regular file: {value!r}")
    if not must_exist and not resolved.parent.is_dir():
        raise VerificationError(f"{label} parent directory does not exist: {resolved.parent}")
    return resolved


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--artifact", choices=tuple(EXPECTED_APK_RELATIVE_PATHS), default="assessment-signed", help="Select one of the fixed, approved build artifacts")
    parser.add_argument("--output", help="Optional JSON evidence report path inside the repository workspace")
    args = parser.parse_args()

    try:
        apk = resolve_workspace_path(str(EXPECTED_APK_RELATIVE_PATHS[args.artifact]), "APK", must_exist=True)
        output = (
            resolve_workspace_path(args.output, "Output report", must_exist=False)
            if args.output
            else None
        )
        if output == apk:
            raise VerificationError("Output report path must not overwrite the APK.")
    except VerificationError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    analyzer = shutil.which("apkanalyzer")
    if analyzer is None:
        print("ERROR: fixed Android SDK executable 'apkanalyzer' was not found on PATH.", file=sys.stderr)
        return 2

    try:
        completed = subprocess.run(
            ["apkanalyzer", "manifest", "print", str(apk)],
            executable=analyzer,
            check=True,
            capture_output=True,
            text=True,
            timeout=60,
            shell=False,
        )
        report = verify_manifest(completed.stdout)
        report["apk"] = apk.name
        report["apkBytes"] = apk.stat().st_size
        if output:
            output.write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
        print(json.dumps(report, indent=2))
        return 0
    except (subprocess.CalledProcessError, subprocess.TimeoutExpired) as exc:
        detail = getattr(exc, "stderr", None) or str(exc)
        print(f"ERROR: apkanalyzer failed; refusing to certify APK manifest. {detail}", file=sys.stderr)
        return 2
    except VerificationError as exc:
        print(f"ERROR: APK manifest verification failed: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
