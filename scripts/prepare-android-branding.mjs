import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { constants } from "node:fs";

const source = "assets/JestBox-Original.png";
const manifest = "android/app/src/main/AndroidManifest.xml";
await access(source, constants.R_OK);
await access(manifest, constants.R_OK);

const resources = "android/app/src/main/res";
await mkdir(`${resources}/drawable-nodpi`, { recursive: true });
await mkdir(`${resources}/drawable`, { recursive: true });
await copyFile(source, `${resources}/drawable-nodpi/jestbox_icon.png`);
await writeFile(
  `${resources}/drawable/jestbox_launcher.xml`,
  `<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="@drawable/jestbox_icon"
    android:gravity="center"
    android:filter="true" />
`
);

let xml = await readFile(manifest, "utf8");
if (!/android:icon="[^"]+"/.test(xml)) {
  throw new Error("Generated Android manifest has no application android:icon attribute.");
}
xml = xml.replace(/android:icon="[^"]+"/, 'android:icon="@drawable/jestbox_launcher"');
xml = xml.replace(/android:roundIcon="[^"]+"/, 'android:roundIcon="@drawable/jestbox_launcher"');
await writeFile(manifest, xml);
console.log("Applied the original JestBox artwork to standard and round Android launcher icons.");
