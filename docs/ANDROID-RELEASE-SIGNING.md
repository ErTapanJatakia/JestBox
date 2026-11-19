# JestBox Android release signing

## Selected Android architecture

JestBox uses the Capacitor Android project generated from the canonical web application. The repository's locked Capacitor 8 toolchain, `@capacitor/share` integration, offline web asset preparation, and Android branding script are the release build inputs.

The standalone native WebView implementation in the draft Android wrapper PR is not the selected production architecture. Do not merge a second Android application module alongside Capacitor.

## Release candidate workflow

Run **JestBox Android release candidate** from GitHub Actions and select the branch, tag, or commit to build. The workflow:

1. Installs the locked npm dependencies and Android SDK in an ephemeral GitHub-hosted runner.
2. Runs the JavaScript regression suite.
3. Generates and synchronizes the Capacitor Android project.
4. Builds the unsigned release APK.
5. checks the application ID, version code/name, non-debuggable release manifest, bundled offline entry point, and APK alignment.
6. Uploads the unsigned candidate with a SHA-256 checksum.
7. Signs and verifies a second APK only when all four production signing secrets are configured.

An unsigned APK is an engineering artifact only. It must not be distributed, uploaded to RuStore, or treated as a production release.

## Signing secrets

Configure these repository Actions secrets only after the production signing identity has been decided:

- `ANDROID_KEYSTORE_BASE64`: base64-encoded Java keystore bytes.
- `ANDROID_KEYSTORE_PASSWORD`: keystore password.
- `ANDROID_KEY_ALIAS`: private-key alias inside the keystore.
- `ANDROID_KEY_PASSWORD`: private-key password.

Never commit the keystore or passwords, print secret values, pass them as workflow inputs, or place them in build logs. The workflow writes the decoded keystore only to the ephemeral runner's temporary directory, restricts file permissions, uses it for signing, and removes the temporary copy after successful signing. GitHub-hosted runners are ephemeral; do not rely on runner storage for backup.

## Unknown or existing keystore

The maintainer has not confirmed whether a production keystore already exists. This workflow deliberately does not generate, replace, or rotate a signing key.

Before creating a new key, establish whether any APK for package `com.ertapanjatakia.jestbox` has already been distributed or uploaded to a store, and whether a signing key was created for it. If an existing release identity exists, preserve and use that exact key. If no production identity exists, create one dedicated long-lived JestBox release key, securely back it up in at least two controlled locations, then add the four secrets above. Losing the key can prevent updates to installations signed with it.

Do not use the debug signing key. Do not publish the unsigned candidate.

## Release identity currently encoded in source

- Application ID: `com.ertapanjatakia.jestbox` (from `capacitor.config.json`).
- npm project version: `1.0.0`.
- The generated Android version code/name are validated from the actual APK at build time. Increase versionCode for each subsequent store release and keep the application ID stable.

The package ID is treated as the current engineering identity; confirm it matches the RuStore app card before the first store upload.

## Out of scope for this workflow

This workflow does not upload to RuStore, submit moderation, publish, create or rotate signing keys, or modify the live application. Those are separate gated release stages. The RuStore workflow must require explicit approval before moderation submission, with automatic publication only after RuStore has approved moderation, as specified in the release architecture decision.
