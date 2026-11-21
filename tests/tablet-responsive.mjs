import assert from "node:assert/strict";
import { createServer } from "node:http";
import { mkdir, readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("www");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".json": "application/json; charset=utf-8"
};
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const candidate = resolve(root, "." + pathname);
    assert.ok(candidate === root || candidate.startsWith(root + sep), "Path must remain inside the built app");
    const file = await stat(candidate);
    const target = file.isDirectory() ? resolve(candidate, "index.html") : candidate;
    response.writeHead(200, { "content-type": mime[extname(target)] ?? "application/octet-stream" });
    response.end(await readFile(target));
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
});

await mkdir("tablet-screenshots", { recursive: true });
await new Promise((resolveListen) => server.listen(4173, "127.0.0.1", resolveListen));
let browser;
try {
  browser = await chromium.launch({ headless: true });
  const cases = [
    { name: "tablet-portrait-768x1024", width: 768, height: 1024 },
    { name: "tablet-portrait-800x1280", width: 800, height: 1280 },
    { name: "tablet-portrait-834x1194", width: 834, height: 1194 },
    { name: "tablet-landscape-1024x768", width: 1024, height: 768 },
    { name: "tablet-landscape-1280x800", width: 1280, height: 800 },
    { name: "tablet-landscape-1366x1024", width: 1366, height: 1024 }
  ];
  for (const viewport of cases) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1.5,
      isMobile: false,
      hasTouch: true
    });
    const pageErrors = [];
    page.on("pageerror", error => pageErrors.push(error.message));
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    await page.locator("#launch-screen").click();
    await page.locator("#launch-screen").waitFor({ state: "hidden", timeout: 2000 });
    await page.locator("#joke-heading").waitFor({ state: "visible" });

    const layout = await page.evaluate(() => {
      const rect = selector => {
        const element = document.querySelector(selector);
        const box = element.getBoundingClientRect();
        return { x: box.x, y: box.y, width: box.width, height: box.height, right: box.right, bottom: box.bottom };
      };
      return {
        viewport: { width: innerWidth, height: innerHeight },
        document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
        main: rect("#main"),
        locale: rect(".locale-picker"),
        joke: rect(".joke-panel"),
        controls: ["#settings-button", "#locale-search", "#category-search", "#another-button", "#copy-button", "#share-button"]
          .map(selector => ({ selector, ...rect(selector) })),
        orientation: matchMedia("(orientation: landscape)").matches ? "landscape" : "portrait"
      };
    });
    assert.equal(layout.document.width, viewport.width, viewport.name + ": horizontal page overflow");
    for (const element of [layout.main, layout.locale, layout.joke, ...layout.controls]) {
      assert.ok(element.x >= -1 && element.right <= viewport.width + 1, viewport.name + ": element outside horizontal viewport: " + JSON.stringify(element));
    }
    for (const control of layout.controls) {
      assert.ok(control.height >= 44, viewport.name + ": touch target shorter than 44px: " + control.selector + " (" + control.height + "px)");
    }

    if (viewport.width >= 900 && viewport.width > viewport.height) {
      const areas = await page.evaluate(() => ({
        toolbar: getComputedStyle(document.querySelector(".joke-toolbar")).gridArea,
        joke: getComputedStyle(document.querySelector(".joke-content")).gridArea,
        actions: getComputedStyle(document.querySelector(".joke-actions")).gridArea
      }));
      assert.equal(areas.toolbar, "toolbar", viewport.name + ": landscape toolbar grid");
      assert.equal(areas.joke, "joke", viewport.name + ": landscape joke grid");
      assert.equal(areas.actions, "actions", viewport.name + ": landscape action grid");
    }

    await page.screenshot({ path: "tablet-screenshots/" + viewport.name + ".png", fullPage: true });
    await page.locator("#settings-button").click();
    assert.equal(await page.locator("#settings-dialog").evaluate(dialog => dialog.open), true, viewport.name + ": settings dialog did not open");
    const dialog = await page.locator("#settings-dialog").boundingBox();
    assert.ok(dialog && dialog.width <= viewport.width && dialog.height <= viewport.height, viewport.name + ": settings dialog exceeds viewport");
    await page.locator("#settings-dialog .close-dialog").click();
    assert.deepEqual(pageErrors, [], viewport.name + ": browser runtime errors");
    console.log("PASS " + viewport.name + " — no horizontal overflow; controls and settings dialog fit.");
    await page.close();
  }
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
