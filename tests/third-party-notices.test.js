import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const read = (name) => fs.readFileSync(new URL("../" + name, import.meta.url), "utf8");

test("third-party licence notices are linked from the app footer", () => {
  const html = read("index.html");
  assert.match(html, /id="third-party-notices-link"[^>]+href="legal\/third-party-notices\.html"/);
});

test("Android web preparation copies the third-party notices into the packaged legal directory", () => {
  const script = read("scripts/prepare-web.mjs");
  assert.match(script, /cp\("THIRD_PARTY_NOTICES\.html",\s*"www\/legal\/third-party-notices\.html"\)/);
});

test("in-app notices preserve the required runtime licence texts and attribution", () => {
  const page = read("THIRD_PARTY_NOTICES.html");
  for (const marker of [
    "Capacitor Android 8.6.2 — MIT",
    "Capacitor Core 8.6.2 — MIT",
    "Copyright (c) 2017-present Drifty Co.",
    "Capacitor Share 8.0.3 — MIT",
    "Copyright 2020-present Ionic",
    "tslib 2.9.1 — 0BSD",
    "Copyright (c) Microsoft Corporation.",
    "Apache-2.0",
    "Playwright 1.56.1",
    "third-party notice record"
  ]) assert.ok(page.includes(marker), "Missing notice marker: " + marker);
  assert.match(page, /The above copyright notice and this permission notice shall be included in all/);
  assert.match(page, /permission to use, copy, modify, and\/or distribute this software/);
});
