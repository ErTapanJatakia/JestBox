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

  // Expanded multilingual visual coverage: 63 additional real-app screenshots.
  const visualViewports = {
    russian: [
      { name: "768x1024", width: 768, height: 1024 },
      { name: "800x1280", width: 800, height: 1280 },
      { name: "834x1194", width: 834, height: 1194 },
      { name: "900x1200", width: 900, height: 1200 },
      { name: "1024x768", width: 1024, height: 768 },
      { name: "1280x800", width: 1280, height: 800 }
    ],
    english: [
      { name: "768x1024", width: 768, height: 1024 },
      { name: "1280x800", width: 1280, height: 800 }
    ]
  };

  async function startVisualPage(viewport, captureLaunch = false) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1.5,
      isMobile: false,
      hasTouch: true
    });
    const errors = [];
    page.on("pageerror", error => errors.push(error.stack || error.message));
    await page.goto("http://127.0.0.1:4173/", { waitUntil: "domcontentloaded" });
    await page.locator("#launch-screen").waitFor({ state: "visible" });
    if (captureLaunch) {
      await page.screenshot({
        path: "tablet-screenshots/launch-en-US-" + viewport.name + ".png",
        fullPage: true
      });
    }
    await page.locator("#launch-screen").click();
    await page.locator("#launch-screen").waitFor({ state: "hidden", timeout: 2000 });
    await page.locator("#joke-heading").waitFor({ state: "visible" });
    return { page, errors };
  }

  async function chooseLocale(page, code) {
    const input = page.locator("#locale-search");
    await input.fill(code);
    await input.press("Enter");
    await page.waitForFunction(expected => document.documentElement.lang === expected, code);
    await page.locator("#joke-heading").waitFor({ state: "visible" });
  }

  async function captureVisual(page, name, errors) {
    const state = await page.evaluate(() => ({
      lang: document.documentElement.lang,
      width: document.documentElement.scrollWidth,
      viewport: innerWidth,
      heading: document.querySelector("#joke-heading")?.textContent?.trim() || "",
      category: document.querySelector("#joke-category")?.textContent?.trim() || ""
    }));
    assert.equal(state.width, state.viewport, name + ": horizontal overflow");
    assert.ok(state.heading.length > 0 && !state.heading.includes("Loading"), name + ": joke content missing");
    await page.screenshot({ path: "tablet-screenshots/" + name + ".png", fullPage: true });
    assert.deepEqual(errors, [], name + ": browser runtime errors");
    console.log("PASS visual " + name + " (" + state.lang + ")");
  }

  // Russian: every available category at six tablet dimensions (36 captures).
  for (const viewport of visualViewports.russian) {
    const { page, errors } = await startVisualPage(viewport);
    await chooseLocale(page, "ru-RU");
    await page.locator("#category-search").fill("");
    const categories = await page.locator("#category-options button").allTextContents();
    assert.equal(categories.length, 6, "ru-RU should expose All Jokes plus five joke categories");
    for (const [index, category] of categories.entries()) {
      await page.locator("#category-search").fill("");
      await page.getByRole("option", { name: category, exact: true }).click();
      await captureVisual(page, "ru-RU-" + viewport.name + "-category-" + String(index + 1).padStart(2, "0"), errors);
    }
    await page.close();
  }

  // English India and US: four representative categories at portrait and landscape sizes (16 captures).
  for (const localeCode of ["en-IN", "en-US"]) {
    for (const viewport of visualViewports.english) {
      const { page, errors } = await startVisualPage(viewport);
      await chooseLocale(page, localeCode);
      await page.locator("#category-search").fill("");
      const categories = await page.locator("#category-options button").allTextContents();
      assert.ok(categories.length >= 6, localeCode + ": expected the standard category set");
      for (const [index, category] of categories.slice(0, 4).entries()) {
        await page.locator("#category-search").fill("");
        await page.getByRole("option", { name: category, exact: true }).click();
        await captureVisual(page, localeCode + "-" + viewport.name + "-category-" + String(index + 1).padStart(2, "0"), errors);
      }
      await page.close();
    }
  }

  // One representative localized joke view for each remaining supported language.
  for (const localeCode of ["es-PE", "es-ES", "hi-IN", "ur-IN", "ur-PK"]) {
    const viewport = { name: "834x1194", width: 834, height: 1194 };
    const { page, errors } = await startVisualPage(viewport);
    await chooseLocale(page, localeCode);
    await captureVisual(page, localeCode + "-" + viewport.name + "-all-jokes", errors);
    await page.close();
  }

  // Russian interface states: category picker, accessibility settings and share preview.
  {
    const viewport = { name: "1024x768", width: 1024, height: 768 };
    const { page, errors } = await startVisualPage(viewport);
    await chooseLocale(page, "ru-RU");
    await page.locator("#category-search").fill("");
    await page.screenshot({ path: "tablet-screenshots/ru-RU-1024x768-category-picker-open.png", fullPage: true });
    await page.locator("#category-search").press("Escape");
    await page.locator("#settings-button").click();
    assert.equal(await page.locator("#settings-dialog").evaluate(dialog => dialog.open), true);
    await page.screenshot({ path: "tablet-screenshots/ru-RU-1024x768-accessibility-settings.png", fullPage: true });
    await page.locator("#settings-dialog .close-dialog").click();
    await page.locator("#share-button").click();
    assert.equal(await page.locator("#share-dialog").evaluate(dialog => dialog.open), true);
    await page.screenshot({ path: "tablet-screenshots/ru-RU-1024x768-share-preview.png", fullPage: true });
    assert.deepEqual(errors, [], "ru-RU interface states: browser runtime errors");
    await page.close();
  }

} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
