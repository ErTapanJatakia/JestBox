import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cp, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

test("Android staging script copies only the local web app and bundled assets", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "jestbox-android-staging-"));
  try {
    await cp("index.html", join(fixture, "index.html"));
    await cp("script.js", join(fixture, "script.js"));
    await cp("jokes.js", join(fixture, "jokes.js"));
    await cp("share-bridge.bundle.js", join(fixture, "share-bridge.bundle.js"));
    await cp("styles.css", join(fixture, "styles.css"));
    await cp("assets", join(fixture, "assets"), { recursive: true });
    await cp("scripts/prepare-web.mjs", join(fixture, "prepare-web.mjs"));
    await execFileSync(process.execPath, [join(fixture, "prepare-web.mjs")], { cwd: fixture });

    for (const file of ["index.html", "script.js", "jokes.js", "share-bridge.bundle.js", "styles.css"]) {
      const source = await readFile(file, "utf8");
      const staged = await readFile(join(fixture, "www", file), "utf8");
      assert.equal(staged, source, `${file} must be copied byte-for-byte`);
    }

    const sourceAsset = await readFile("assets/wcag22aa-blue.svg", "utf8");
    const stagedAsset = await readFile(join(fixture, "www/assets/wcag22aa-blue.svg"), "utf8");
    assert.equal(stagedAsset, sourceAsset, "bundled accessibility asset must be copied unchanged");
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
