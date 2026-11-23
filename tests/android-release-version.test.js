import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { prepareAndroidReleaseVersion } from "../scripts/prepare-android-release-version.mjs";

const template = `android {
    defaultConfig {
        applicationId "com.jestbox.app"
        minSdkVersion 29
        targetSdkVersion 36
        versionCode 1
        versionName '1.0'
    }
}
`;

async function withGradleFile(contents, run) {
  const directory = await mkdtemp(join(tmpdir(), "jestbox-android-version-"));
  const gradlePath = join(directory, "build.gradle");
  try {
    await writeFile(gradlePath, contents);
    await run(gradlePath);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
}

test("sets and verifies the approved Android update version", async () => {
  await withGradleFile(template, async (gradlePath) => {
    const result = await prepareAndroidReleaseVersion({ gradlePath });
    const output = await readFile(gradlePath, "utf8");
    assert.deepEqual(result, { versionCode: 2, versionName: "1.1" });
    assert.match(output, /versionCode 2/);
    assert.match(output, /versionName "1.1"/);
    assert.match(output, /applicationId "com\.jestbox\.app"/);
    assert.match(output, /minSdkVersion 29/);
  });
});

test("fails closed when the generated version metadata is missing or ambiguous", async () => {
  await withGradleFile(template.replace("versionCode 1", "versionCode 1\n        versionCode 3"), async (gradlePath) => {
    await assert.rejects(prepareAndroidReleaseVersion({ gradlePath }), /exactly one versionCode/);
  });
});

test("rejects a version code that cannot advance the first store release", async () => {
  await withGradleFile(template, async (gradlePath) => {
    await assert.rejects(prepareAndroidReleaseVersion({ gradlePath, versionCode: 1 }), /greater than or equal to 2/);
  });
});
