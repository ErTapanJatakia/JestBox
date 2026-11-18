# JestBox Android device acceptance guide

**Purpose:** Manual acceptance of the generated Android **debug** APK before any release decision.

**Do not install an older artifact.** Wait until the maintainer confirms that the workflow for the latest feature-branch commit has passed the Android build, APK signature verification, APK alignment verification, and checksum generation. The current debug APK is not a production-signed release.

## 1. Obtain the correct build

1. Open the JestBox repository's Actions page: https://github.com/ErTapanJatakia/JestBox/actions
2. Open the successful **JestBox Android debug build** run for the latest \`feat/urdu-locales-ur-in-ur-pk\` commit.
3. Confirm the run includes successful steps named **Verify APK signature, alignment, and checksum** and **Upload debug APK and checksum**.
4. Download the \`jestbox-android-debug\` artifact ZIP and extract it.
5. Confirm the ZIP contains \`app-debug.apk\` and \`app-debug.apk.sha256\`. Use only the APK from this exact run.

## 2. Install on your Android device

Choose one method.

### Option A — Android file manager

1. Transfer \`app-debug.apk\` to the device.
2. Open it using the device's file manager.
3. If Android asks, temporarily allow this file manager to install unknown apps.
4. Install JestBox and open it.
5. Revoke the file manager's install-unknown-apps permission after installation if you enabled it only for this test.

### Option B — ADB from a computer

With USB debugging enabled and the device authorized:

\`\`\`bash
adb devices
adb install -r app-debug.apk
\`\`\`

The app ID is currently \`com.ertapanjatakia.jestbox\`. A debug build may not install over a differently signed production build. Do not uninstall an existing production app merely to force this test without first considering its local data.

## 3. Functional acceptance

- [ ] App installs and opens without a crash.
- [ ] Launch screen appears and can be skipped by tapping.
- [ ] Default locale is American English; all eight locales can be selected.
- [ ] Locale selection updates the interface and country/region presentation.
- [ ] Select `ur-IN` and `ur-PK`; confirm all screens switch to right-to-left and Urdu text remains readable.
- [ ] All Jokes and each of the five categories work, including Wordplay.
- [ ] Joke navigation works repeatedly without blank or malformed content.
- [ ] All ten themes apply across the app and remain readable.
- [ ] Larger text, high contrast, and reduced motion settings work.
- [ ] Copy action reports success only when copying succeeds.
- [ ] Share opens the Android Sharesheet; dismissing it is not reported as a successful share.
- [ ] Privacy Policy and Accessibility Statement pages open locally.
- [ ] App remains usable in airplane mode after first launch.
- [ ] Rotate the device and test both portrait and landscape layouts.
- [ ] Close and relaunch the app; confirm it opens normally.

## 4. Accessibility acceptance

- [ ] Navigate the app using TalkBack.
- [ ] Confirm buttons, selectors, dialogs, and joke content have understandable spoken labels.
- [ ] Confirm focus order is logical and focus is not lost after changing a joke or closing a dialog.
- [ ] Increase Android system font/display size and check that controls remain usable.
- [ ] Test high-contrast and reduced-motion settings.

## 5. Report results

Send the following information after testing:

- Device make/model:
- Android version:
- Display size/resolution (if known):
- Installation result:
- Functional checks that failed:
- TalkBack/accessibility findings:
- Screenshots or screen recordings for reproducible issues (avoid including personal notifications or private data):

Record failures rather than working around them silently. Do not change app data, permissions, or device settings beyond what is needed for the test without noting the change.

## Release boundary

This procedure tests a debug build only. It does not authorize production signing, release APK/AAB generation, publishing, or RuStore submission.
