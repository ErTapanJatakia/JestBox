# JestBox Android Release Verification

## Scope

These steps apply to a specific JestBox Android APK. They do not authorize distribution or store submission.

## Verify artifact identity

Obtain the APK and associated verification evidence from the same protected signing workflow run. Confirm:
- package ID is com.jestbox.app;
- versionName/versionCode match the approved release record;
- APK SHA-256 matches workflow evidence;
- signing certificate SHA-256 fingerprint matches the established production identity;
- APK signature verification succeeds for the required signature scheme;
- alignment and manifest/configuration validators pass.

Never compare a checksum from one run with an APK from another.

## Verify signing evidence

Use the exact APK and evidence bundle from the protected production signing run. Do not download an unsigned candidate or debug APK and treat it as production-signed. Do not expose keystore contents, passwords or private keys during verification.

## Security assessment correlation

Confirm the MobSF report references the same APK/build evidence. Read machine-readable findings and summary metadata; do not rely solely on a human-written summary if it omits counts. Review warning/informational findings in context and preserve unresolved limitations.

## Retention and archival

GitHub Actions artifacts are temporary and currently subject to a 30-day repository retention cap. Download and verify required evidence promptly under the approved custody process. Creating a GitHub Release or other durable archive is a separate decision requiring explicit approval.

## Failure handling

Stop distribution consideration if package identity, checksum, certificate, signature, alignment or manifest verification fails. Preserve logs and artifacts, investigate the exact source commit, and rebuild only after the defect is understood and corrected.

## Release boundary

Successful verification does not constitute store acceptance, publication, deployment or authorization to distribute. Obtain explicit approval for each downstream action.
