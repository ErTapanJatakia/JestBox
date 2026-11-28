# Android release SBOM

## Purpose

JestBox generates a CycloneDX SBOM from the resolved Android release runtime dependency graph and binds that document to the exact production-signed APK by SHA-256. The SBOM is retained alongside the signed APK and verification evidence in the protected production-signing workflow.

## Generation boundary

- Generator: CycloneDX Gradle plugin **3.6.1**, invoked through `scripts/android-release-sbom.init.gradle`.
- Generator licence: Apache-2.0. This is build-time tooling and is not bundled into the JestBox APK.
- Dependency configuration: Gradle `:app:releaseRuntimeClasspath`.
- Resolution mode: metadata resolution and licence metadata enabled; unresolved runtime dependencies fail the SBOM task.
- Output: `android/build/reports/cyclonedx/jestbox-android-release-sbom.json`.
- Format: CycloneDX JSON, schema 1.6.
- Validation: `scripts/verify_android_release_sbom.py` checks document format, component identifiers, dependency relationships, Maven and AndroidX component presence, and creates an APK/SBOM binding manifest.

The Gradle plugin is applied by an initialization script, so the generated Capacitor Android project and its committed build files are not modified.

## Exact APK binding

After the production APK has been signed and its original signing certificate, package ID, minimum SDK, debuggable state, alignment and signature have been verified, the workflow generates the SBOM from the already-resolved release graph. It then calculates SHA-256 digests for both the signed APK and SBOM and writes `android-release-sbom-binding.json`.

The binding manifest records:
- source commit;
- exact signed APK filename and SHA-256;
- CycloneDX SBOM filename and SHA-256;
- Android package name and version;
- dependency configuration;
- component, Maven, AndroidX and relationship counts;
- count of components without declared licence metadata.

This links the dependency graph used for the release build to the exact signed APK bytes. The SBOM is not a cryptographic attestation and does not claim that Gradle metadata alone can prove every byte in the APK.

## Scope and limitations

Included:
- direct and transitive dependencies resolved for the Android `releaseRuntimeClasspath`;
- Maven components, including AndroidX and Capacitor Android dependencies when present in the resolved graph;
- available POM metadata and licence declarations;
- dependency relationship data emitted by the CycloneDX Gradle plugin.

Not represented as bundled application dependencies:
- Android platform APIs supplied by the SDK/device;
- Gradle build plugins, host runner packages and build-only tools;
- npm development dependencies that are not part of the Android runtime graph;
- operating-system packages in the GitHub Actions runner.

A missing licence declaration is surfaced as a count in the binding manifest. It is not silently replaced with an assumed licence. The dependency/licence register remains the place to investigate and disposition such gaps.

The unsigned validation workflow exercises the same Gradle init script and verifier without access to signing secrets. The protected production workflow independently generates and retains the SBOM only after the exact production APK has been signed and verified.

## Security boundaries preserved

The SBOM change does not:
- change the production-signing Environment approval gate;
- change the four existing signing secrets or their scope;
- change encrypted keystore decryption, temporary key handling or cleanup;
- change the original signing alias, certificate fingerprint or RSA identity;
- change APK build inputs, hardening, package ID, SDK levels, signature checks or alignment checks;
- publish a release, distribute the APK, or upload it to an app store.

The production artifact remains subject to the existing protected manual workflow and 90-day artifact retention policy.
