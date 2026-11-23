import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { cp, mkdir, mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

test("Android staging script copies only the local web app and bundled assets", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "jestbox-android-staging-"));
  try {
    await cp("index.html", join(fixture, "index.html"));
    await cp("script.js", join(fixture, "script.js"));
    await cp("random-index.js", join(fixture, "random-index.js"));
    await cp("jokes.js", join(fixture, "jokes.js"));
    await cp("share-bridge.bundle.js", join(fixture, "share-bridge.bundle.js"));
    await cp("locale-detection.js", join(fixture, "locale-detection.js"));
    await cp("styles.css", join(fixture, "styles.css"));
    await cp("THIRD_PARTY_NOTICES.html", join(fixture, "THIRD_PARTY_NOTICES.html"));
    await cp("assets", join(fixture, "assets"), { recursive: true });
    for (const name of ["PRIVACY-POLICY", "ACCESSIBILITY-STATEMENT"]) {
      for (const locale of ["", ".es-PE", ".ru-RU", ".es-ES", ".en-IN", ".hi-IN", ".ur-IN", ".ur-PK"]) {
        await cp(`${name}${locale}.md`, join(fixture, `${name}${locale}.md`));
      }
    }
    await cp("scripts/prepare-web.mjs", join(fixture, "prepare-web.mjs"));
    await mkdir(join(fixture, "scripts"), { recursive: true });
    await cp("scripts/legal-markdown-renderer.mjs", join(fixture, "scripts/legal-markdown-renderer.mjs"));
    await cp("scripts/legal-page-bootstrap.mjs", join(fixture, "scripts/legal-page-bootstrap.mjs"));
    await execFileSync(process.execPath, [join(fixture, "prepare-web.mjs")], { cwd: fixture });

    for (const file of ["index.html", "script.js", "random-index.js", "jokes.js", "share-bridge.bundle.js", "locale-detection.js", "styles.css"]) {
      const source = await readFile(file, "utf8");
      const staged = await readFile(join(fixture, "www", file), "utf8");
      assert.equal(staged, source, `${file} must be copied byte-for-byte`);
    }

    const noticeSource = await readFile("THIRD_PARTY_NOTICES.html", "utf8");
    const noticeStaged = await readFile(join(fixture, "www/legal/third-party-notices.html"), "utf8");
    assert.equal(noticeStaged, noticeSource, "third-party notices must be packaged byte-for-byte");

    const stagedRenderer = await readFile(join(fixture, "www/legal/legal-markdown-renderer.mjs"), "utf8");
    const sourceRenderer = await readFile("scripts/legal-markdown-renderer.mjs", "utf8");
    assert.equal(stagedRenderer, sourceRenderer, "safe DOM renderer must be bundled with legal pages");
    const stagedBootstrap = await readFile(join(fixture, "www/legal/legal-page-bootstrap.mjs"), "utf8");
    const sourceBootstrap = await readFile("scripts/legal-page-bootstrap.mjs", "utf8");
    assert.equal(stagedBootstrap, sourceBootstrap, "legal-page bootstrap must be bundled with legal pages");
    const sourceAsset = await readFile("assets/wcag22aa-blue.svg", "utf8");
    const stagedAsset = await readFile(join(fixture, "www/assets/wcag22aa-blue.svg"), "utf8");
    assert.equal(stagedAsset, sourceAsset, "bundled accessibility asset must be copied unchanged");
    for (const locale of ["en-US", "es-PE", "ru-RU", "es-ES", "en-IN", "hi-IN", "ur-IN", "ur-PK"]) {
      for (const kind of ["privacy", "accessibility"]) {
        const page = await readFile(join(fixture, `www/legal/${kind}-${locale}.html`), "utf8");
        assert.match(page, new RegExp(`<html lang="${locale}" dir="${locale.startsWith("ur-") ? "rtl" : "ltr"}">`));
        assert.match(page, /JestBox/);
        assert.match(page, /id="legal-content" data-markdown="[A-Za-z0-9+/=]+"/);
        assert.match(page, /src="\.\/legal-page-bootstrap\.mjs"/);
      }
    }
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
