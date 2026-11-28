#!/usr/bin/env python3
"""Validate and bind a CycloneDX Android release SBOM to one exact APK."""

from __future__ import annotations

import argparse
import hashlib
import json
import sys
from pathlib import Path


def sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as stream:
        for chunk in iter(lambda: stream.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--sbom", required=True, type=Path)
    parser.add_argument("--apk", required=True, type=Path)
    parser.add_argument("--output", required=True, type=Path)
    parser.add_argument("--source-commit", required=True)
    parser.add_argument("--package-name", required=True)
    parser.add_argument("--version-name", required=True)
    parser.add_argument("--version-code", required=True)
    args = parser.parse_args()

    for path in (args.sbom, args.apk):
        if not path.is_file() or path.stat().st_size == 0:
            parser.error(f"Required non-empty file not found: {path}")

    try:
        bom = json.loads(args.sbom.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Invalid SBOM JSON: {exc}", file=sys.stderr)
        return 1

    if bom.get("bomFormat") != "CycloneDX":
        print("SBOM format is not CycloneDX.", file=sys.stderr)
        return 1
    if str(bom.get("specVersion", "")) not in {"1.5", "1.6", "1.7"}:
        print(f"Unsupported CycloneDX specVersion: {bom.get('specVersion')!r}", file=sys.stderr)
        return 1

    components = bom.get("components")
    dependencies = bom.get("dependencies")
    if not isinstance(components, list) or len(components) < 5:
        print("Release SBOM has fewer than five resolved components; refusing incomplete inventory.", file=sys.stderr)
        return 1
    if not isinstance(dependencies, list) or not dependencies:
        print("Release SBOM has no dependency relationship graph.", file=sys.stderr)
        return 1

    refs = [item.get("bom-ref") for item in components if isinstance(item, dict)]
    if len(refs) != len(components) or any(not ref for ref in refs) or len(set(refs)) != len(refs):
        print("SBOM component bom-ref values are missing or duplicated.", file=sys.stderr)
        return 1

    maven_components = [
        item for item in components
        if isinstance(item, dict) and str(item.get("purl", "")).startswith("pkg:maven/")
    ]
    androidx_components = [
        item for item in maven_components
        if str(item.get("group", "")).startswith("androidx.")
        or "androidx." in str(item.get("purl", ""))
    ]
    if len(maven_components) < 5 or not androidx_components:
        print(
            "SBOM does not contain the expected Maven/AndroidX release runtime inventory "
            f"(Maven={len(maven_components)}, AndroidX={len(androidx_components)}).",
            file=sys.stderr,
        )
        return 1

    # CycloneDX dependency records may reference the metadata root as well
    # as components. Every record and edge must resolve to a declared BOM ref.
    metadata_component = bom.get("metadata", {}).get("component", {})
    metadata_ref = metadata_component.get("bom-ref") if isinstance(metadata_component, dict) else None
    known_refs = set(refs)
    if metadata_ref:
        known_refs.add(metadata_ref)

    relationship_count = 0
    for item in dependencies:
        if not isinstance(item, dict):
            print("SBOM dependency relationship entry is not an object.", file=sys.stderr)
            return 1
        dependency_ref = item.get("ref")
        if not isinstance(dependency_ref, str) or dependency_ref not in known_refs:
            print(f"SBOM dependency record references an unknown bom-ref: {dependency_ref!r}.", file=sys.stderr)
            return 1
        targets = item.get("dependsOn", [])
        if not isinstance(targets, list):
            print(f"SBOM dependency targets are not a list for {dependency_ref!r}.", file=sys.stderr)
            return 1
        for target in targets:
            if not isinstance(target, str) or target not in known_refs:
                print(f"SBOM dependency edge references an unknown bom-ref: {target!r}.", file=sys.stderr)
                return 1
        relationship_count += len(targets)

    if relationship_count == 0:
        print("SBOM dependency relationship graph contains no edges.", file=sys.stderr)
        return 1

    license_missing = sum(
        1 for item in components
        if not item.get("licenses")
    )
    apk_digest = sha256(args.apk)
    sbom_digest = sha256(args.sbom)
    binding = {
        "bindingFormat": "JestBox Android APK/SBOM binding",
        "bindingVersion": 1,
        "sbomSchemaVersion": bom["specVersion"],
        "sbomFile": args.sbom.name,
        "sbomSha256": sbom_digest,
        "apkFile": args.apk.name,
        "apkSha256": apk_digest,
        "sourceCommit": args.source_commit,
        "packageName": args.package_name,
        "versionName": args.version_name,
        "versionCode": args.version_code,
        "dependencyScope": "Gradle :app releaseRuntimeClasspath",
        "componentCount": len(components),
        "mavenComponentCount": len(maven_components),
        "androidxComponentCount": len(androidx_components),
        "componentsWithoutDeclaredLicense": license_missing,
        "relationshipCount": relationship_count,
        "limitations": [
            "The SBOM inventories resolved Android release runtime dependencies from Gradle.",
            "Android platform APIs supplied by the Android SDK/device are not application-bundled libraries.",
            "Gradle build plugins and host runner packages are outside this runtime dependency SBOM.",
            "A missing licence declaration is reported, not inferred or silently assigned.",
            "The APK SHA-256 binds this dependency graph to the exact APK bytes supplied to this verifier; this statement does not assert that the supplied APK is signed."
        ],
    }
    args.output.write_text(json.dumps(binding, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({
        "apkSha256": apk_digest,
        "sbomSha256": sbom_digest,
        "componentCount": len(components),
        "mavenComponentCount": len(maven_components),
        "androidxComponentCount": len(androidx_components),
        "componentsWithoutDeclaredLicense": license_missing,
        "relationshipCount": binding["relationshipCount"],
        "bindingFile": str(args.output),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
