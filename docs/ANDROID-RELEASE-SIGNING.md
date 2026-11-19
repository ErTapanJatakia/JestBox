# JestBox Android release signing

## Selected Android architecture

JestBox uses the Capacitor Android project generated from the canonical web application. The repository's locked Capacitor 8 toolchain, `@capacitor/share` integration, offline web asset preparation, and Android branding script are the release build inputs.

The standalone native WebView implementation in the draft Android wrapper PR is not the selected production architecture. Do not merge a second Android application module alongside Capacitor.

## Android application identity

- **Application ID:** `com.jestbox.app` (canonical value in `capacitor.config.json`).
- The Android release-candidate workflow checks the source configuration before project generation and independently checks the final APK manifest after assembly.
- Keep this application ID stable after the first store release. Changing it later makes Android and app stores treat the application as a different app.
- Before the first store upload, confirm that the RuStore app card is created with exactly this application ID.

## Release candidate workflow

Run **JestBox Android release candidate** from GitHub Actions and select the branch, tag, or commit to build. The workflow:

1. Installs the locked npm dependencies and Android SDK in an ephemeral GitHub-hosted runner.
2. Runs the JavaScript regression suite.
3. Verifies that the canonical Capacitor application ID is `com.jestbox.app`.
4. Generates and synchronizes the Capacitor Android project.
5. Builds the unsigned release APK.
6. Checks the final APK application ID, version code/name, non-debuggable release manifest, bundled offline entry point, and APK alignment.
7. Uploads the unsigned candidate with a SHA-256 checksum.
8. Signs and verifies a second APK only when all four production signing secrets are configured.

An unsigned APK is an engineering artifact only. It must not be distributed, uploaded to RuStore, or treated as a production release.

## Cloud-only signing identity bootstrap

No local Android Studio, SDK, Gradle, Java, or command-line development is required. Key generation, encryption, recovery verification, and APK signing run on ephemeral GitHub-hosted Actions runners.

Before running **JestBox Android signing identity bootstrap** from the `main` branch, configure these three repository Actions secrets. Each must be a unique randomly generated password of at least 24 characters, stored in a password manager:

- `ANDROID_KEYSTORE_PASSWORD`: protects the JKS keystore.
- `ANDROID_KEY_PASSWORD`: protects the private key entry.
- `ANDROID_KEYSTORE_BACKUP_PASSWORD`: independent passphrase for the encrypted offline backup.

Do not reuse passwords. Do not paste them into chat, workflow inputs, source files, or logs. The key alias is fixed as `jestbox-release`.

The one-time manual workflow:

1. Validates the three secrets without printing their values.
2. Generates a 4096-bit RSA release key in a JKS keystore on the ephemeral runner.
3. Encrypts the keystore using GPG symmetric AES-256 encryption with a strong S2K work factor.
4. Decrypts the backup on the runner and verifies it byte-for-byte against the generated keystore.
5. Uploads only the encrypted backup as a 90-day GitHub Actions artifact.
6. Places only the base64-encoded encrypted ciphertext in the workflow summary so it can be copied through the GitHub browser UI into the repository secret `ANDROID_KEYSTORE_ENCRYPTED_BASE64`.
7. Removes temporary plaintext key files from the runner.

After the workflow succeeds, download the encrypted artifact through the GitHub browser and store it in at least two controlled offline locations. Keep the backup passphrase separately from the encrypted file. Then add the ciphertext from the workflow summary as `ANDROID_KEYSTORE_ENCRYPTED_BASE64`. The release workflow decrypts this secret on the ephemeral runner before signing; the plaintext keystore is never committed or uploaded as an artifact.

The artifact expires after 90 days, so the offline backup is the durable recovery copy. Do not delete the workflow run or artifact until the offline copies have been verified. Keep the three password secrets and encrypted-ciphertext secret in GitHub Actions Secrets.

## Production signing identity

The maintainer confirmed that no APK with the previous package ID `com.ertapanjatakia.jestbox` had been uploaded to RuStore or distributed outside development/testing. A new signing identity may therefore be created for the first production identity, subject to preserving the key securely.

Create one dedicated long-lived JestBox release key through the cloud-only bootstrap workflow, securely back it up in at least two controlled offline locations, then configure the five secrets above. Losing the key can prevent updates to installations signed with it.

Do not use the debug signing key. Do not publish the unsigned candidate.

## Release metadata

- Application ID: `com.jestbox.app`.
- npm project version: `1.0.0`.
- The generated Android version code/name are validated from the actual APK at build time. Increase versionCode for each subsequent store release and keep the application ID stable.

## Out of scope for this workflow

This workflow does not upload to RuStore, submit moderation, publish, create or rotate signing keys, or modify the live application. Those are separate gated release stages. The RuStore workflow must require explicit approval before moderation submission, with automatic publication only after RuStore has approved moderation, as specified in the release architecture decision.
