import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "scripts"))
from verify_android_apk_manifest import VerificationError, verify_manifest


ANDROID = "http://schemas.android.com/apk/res/android"


def manifest(application_attributes="", components=None, extra_permissions=""):
    components = components if components is not None else """
      <activity android:name=".MainActivity" android:exported="true">
        <intent-filter>
          <action android:name="android.intent.action.MAIN" />
          <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
      </activity>
      <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver"
        android:exported="false" />
    """
    return f"""<?xml version="1.0" encoding="utf-8"?>
    <manifest xmlns:android="{ANDROID}" package="com.jestbox.app">
      <uses-sdk android:minSdkVersion="29" android:targetSdkVersion="36" />
      <uses-permission android:name="android.permission.INTERNET" />
      {extra_permissions}
      <application android:allowBackup="false" {application_attributes}>
        {components}
      </application>
    </manifest>"""


class PackagedApkManifestVerifierTests(unittest.TestCase):
    def test_accepts_expected_hardened_manifest(self):
        result = verify_manifest(manifest())
        self.assertEqual(result["result"], "passed")
        self.assertEqual(result["applicationId"], "com.jestbox.app")
        self.assertEqual(result["minSdkVersion"], 29)
        self.assertEqual(result["targetSdkVersion"], 36)
        self.assertEqual(result["allowBackup"], "false")
        self.assertEqual(result["sensitivePermissionReview"], "none detected")
        self.assertIn("android.permission.INTERNET", result["declaredPermissions"])
        self.assertEqual(result["launcher"]["name"], ".MainActivity")

    def test_rejects_backup_enabled(self):
        with self.assertRaisesRegex(VerificationError, "allowBackup"):
            verify_manifest(manifest(application_attributes='android:allowBackup="true"'))

    def test_rejects_debuggable_apk(self):
        with self.assertRaisesRegex(VerificationError, "debuggable"):
            verify_manifest(manifest(application_attributes='android:debuggable="true"'))

    def test_rejects_cleartext_traffic(self):
        with self.assertRaisesRegex(VerificationError, "cleartext"):
            verify_manifest(manifest(application_attributes='android:usesCleartextTraffic="true"'))

    def test_requires_manual_review_for_network_security_config(self):
        with self.assertRaisesRegex(VerificationError, "networkSecurityConfig"):
            verify_manifest(manifest(application_attributes='android:networkSecurityConfig="@xml/network_security_config"'))

    def test_rejects_unexpected_sensitive_permissions(self):
        with self.assertRaisesRegex(VerificationError, "READ_SMS"):
            verify_manifest(manifest(extra_permissions='<uses-permission android:name="android.permission.READ_SMS" />'))

    def test_rejects_sensitive_sdk_scoped_permission(self):
        with self.assertRaisesRegex(VerificationError, "READ_SMS"):
            verify_manifest(manifest(extra_permissions='<uses-permission-sdk-23 android:name="android.permission.READ_SMS" />'))

    def test_rejects_unexpected_exported_receiver(self):
        components = """
          <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
          </activity>
          <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver"
            android:exported="false" />
          <receiver android:name=".UnexpectedReceiver" android:exported="true" />
        """
        with self.assertRaisesRegex(VerificationError, "Unexpected exported"):
            verify_manifest(manifest(components=components))

    def test_requires_explicit_exported_value_for_components(self):
        components = """
          <activity android:name=".MainActivity" android:exported="true">
            <intent-filter>
              <action android:name="android.intent.action.MAIN" />
              <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
          </activity>
          <receiver android:name="androidx.profileinstaller.ProfileInstallReceiver" />
        """
        with self.assertRaisesRegex(VerificationError, "explicit android:exported"):
            verify_manifest(manifest(components=components))

    def test_rejects_wrong_package_and_sdk_levels(self):
        with self.assertRaisesRegex(VerificationError, "application ID"):
            verify_manifest(manifest().replace("com.jestbox.app", "com.example.other"))
        with self.assertRaisesRegex(VerificationError, "minSdkVersion"):
            verify_manifest(manifest().replace('android:minSdkVersion="29"', 'android:minSdkVersion="24"'))
        with self.assertRaisesRegex(VerificationError, "targetSdkVersion"):
            verify_manifest(manifest().replace('android:targetSdkVersion="36"', 'android:targetSdkVersion="27"'))

    def test_requires_profileinstaller_hardening_and_one_launcher(self):
        without_receiver = manifest().replace(
            '<receiver android:name="androidx.profileinstaller.ProfileInstallReceiver"\n        android:exported="false" />',
            ""
        )
        with self.assertRaisesRegex(VerificationError, "ProfileInstallReceiver"):
            verify_manifest(without_receiver)
        duplicate_launcher = manifest().replace(
            "</activity>",
            "</activity><activity android:name=\".SecondLauncher\" android:exported=\"true\"><intent-filter><action android:name=\"android.intent.action.MAIN\"/><category android:name=\"android.intent.category.LAUNCHER\"/></intent-filter></activity>",
            1
        )
        with self.assertRaisesRegex(VerificationError, "exactly one launcher"):
            verify_manifest(duplicate_launcher)


if __name__ == "__main__":
    unittest.main()
