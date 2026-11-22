import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const prepareScript = resolve("scripts/prepare-web.mjs");
const locales = ["en-US", "es-PE", "ru-RU", "es-ES", "en-IN", "hi-IN", "ur-IN", "ur-PK"];
const requiredFiles = [
  "index.html", "script.js", "jokes.js", "random-index.js",
  "share-bridge.bundle.js", "styles.css"
];

test("legal-page generation escapes untrusted markup and restricts raw HTML", async () => {
  const root = await mkdtemp(join(tmpdir(), "jestbox-legal-html-"));
  try {
    for (const file of requiredFiles) await writeFile(join(root, file), "fixture");
    await writeFile(join(root, "THIRD_PARTY_NOTICES.html"), "<p>Notices</p>");
    await mkdir(join(root, "assets"), { recursive: true });
    await writeFile(join(root, "assets/wcag22aa-blue.svg"), "<svg></svg>");

    for (const locale of locales) {
      const suffix = locale === "en-US" ? "" : "." + locale;
      const privacy = locale === "en-US"
        ? [
            "# Privacy",
            "<script>alert(1)</script>",
            '[click](https://example.test/"onmouseover="alert(1))',
            "[javascript](javascript:alert(1))"
          ].join("\n")
        : "# Privacy";
      const accessibility = [
        "# Accessibility",
        '<p align="center"><a href="https://www.w3.org/WAI/WCAG22/quickref/" title="WCAG 2.2 guidance"><img src="assets/wcag22aa-blue.svg" width="88" height="31" alt="WCAG 2.2 conformance mark"></a></p>',
        "Accessibility details"
      ].join("\n");
      await writeFile(join(root, "PRIVACY-POLICY" + suffix + ".md"), privacy);
      await writeFile(join(root, "ACCESSIBILITY-STATEMENT" + suffix + ".md"), accessibility);
    }

    const run = spawnSync(process.execPath, [prepareScript], {
      cwd: root,
      encoding: "utf8",
      timeout: 30000
    });
    assert.equal(run.status, 0, run.stderr || run.stdout);

    const privacyHtml = await readFile(join(root, "www/legal/privacy-en-US.html"), "utf8");
    assert.match(privacyHtml, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
    assert.doesNotMatch(privacyHtml, /<script\b/i);
    assert.doesNotMatch(privacyHtml, /href="javascript:/i);

    const anchorTags = privacyHtml.match(/<a\\b[^>]*>/gi) ?? [];
    const injectedLink = anchorTags.find(tag => tag.includes("example.test"));
    assert.ok(injectedLink, "expected the URL to be retained as an escaped href value");
    assert.match(injectedLink, /&quot;/i);
    assert.doesNotMatch(injectedLink, /\\sonmouseover\\s*=/i);

    const accessibilityHtml = await readFile(join(root, "www/legal/accessibility-en-US.html"), "utf8");
    assert.match(accessibilityHtml, /<a href="https:\/\/www\.w3\.org\/WAI\/WCAG22\/quickref\/"[^>]*><img src="\.\.\/assets\/wcag22aa-blue\.svg"/);
    assert.match(accessibilityHtml, /alt="WCAG 2\.2 conformance mark"/);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
