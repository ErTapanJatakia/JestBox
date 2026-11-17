import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const source = fs.readFileSync(new URL("../script.js", import.meta.url), "utf8");

function makeElement(value = "") {
  return {
    value, textContent: "", attributes: {}, listeners: {}, options: [],
    classList: { values: new Set(), toggle(name, force) { if (force) this.values.add(name); else this.values.delete(name); } },
    addEventListener(name, callback) { this.listeners[name] = callback; },
    setAttribute(name, value) { this.attributes[name] = value; }
  };
}

function bootApp() {
  const ids = [
    "locale-label", "skip-link", "home-link", "headline", "eyebrow", "intro", "locale-eyebrow",
    "locale-heading", "locale-buttons", "daily-label", "category-label",
    "category", "joke-heading", "joke-category", "status", "another-label",
    "copy-label", "share-label", "privacy-note", "footer-line",
    "another-button", "copy-button", "share-button"
  ];
  const elements = Object.fromEntries(ids.map((id) => [id, makeElement()]));
  elements.category.value = "all";
  elements.category.options = ["all", "everyday", "work", "tech", "food", "wordplay"]
    .map((value) => ({ value, textContent: "" }));
  const localeButtons = ["en-US", "ru-RU"].map((locale) => {
    const button = makeElement();
    button.dataset = { locale };
    return button;
  });
  const root = { lang: "", dir: "" };
  const document = {
    documentElement: root, title: "",
    querySelector(selector) {
      if (selector === "#locale-buttons") return elements["locale-buttons"];
      return elements[selector.slice(1)];
    },
    querySelectorAll(selector) {
      return selector === "[data-locale]" ? localeButtons : [];
    }
  };
  const clipboardWrites = [];
  const navigator = { clipboard: { async writeText(value) { clipboardWrites.push(value); } } };
  const deterministicMath = Object.create(Math);
  deterministicMath.random = () => 0;
  const context = { document, navigator, Date, Math: deterministicMath };
  vm.runInNewContext(source + "
globalThis.__testJokes = jokes;", context);
  return { elements, localeButtons, root, navigator, clipboardWrites, context };
}

test("every JavaScript ID selector exists in the HTML document", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const selectors = [...source.matchAll(/querySelector\("#([a-z0-9-]+)"\)/g)]
    .map((match) => match[1]);
  assert.ok(selectors.length > 0);
  for (const id of selectors) {
    assert.ok(html.includes(`id="${id}"`), `Missing HTML id: ${id}`);
  }
});

test("the page provides a keyboard skip link to its main landmark", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<a class="skip-link" id="skip-link" href="#main">Skip to main content<\/a>/);
  assert.match(html, /<main id="main"/);
  assert.match(fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8"),
    /\.skip-link:focus\s*\{\s*transform: translateY\(0\);/);
});

test("live joke updates are announced and the main landmark is programmatically focusable", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<main id="main"[^>]*tabindex="-1"/);
  assert.match(html, /<div class="joke-content" aria-live="polite" aria-atomic="true">/);
  assert.match(html, /<p class="status-text" id="status" role="status" aria-live="polite">/);
});

test("decorative action glyphs are hidden from assistive technology", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  for (const id of ["another-button", "copy-button", "share-button"]) {
    const button = html.match(new RegExp(`<button[^>]*id="${id}"[^>]*>([\\s\\S]*?)</button>`));
    assert.ok(button, `Missing button: ${id}`);
    assert.match(button[1], /<span aria-hidden="true">/);
  }
});

test("narrow-screen layout rules preserve usable action targets", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(css, /@media \(max-width: 380px\)/);
  assert.match(css, /\.jestbox \.joke-actions button\s*\{\s*min-height: 44px;/);
  assert.match(css, /\.jestbox \.category-control select\s*\{\s*min-height: 44px;/);
  assert.match(css, /\.site-header a\s*\{[^}]*min-height: 44px;/);
  assert.match(css, /orientation: landscape/);
});

test("both locales contain 20 original jokes and all five categories", () => {
  const { context } = bootApp();
  for (const locale of ["en-US", "ru-RU"]) {
    const jokes = context.__testJokes[locale];
    assert.equal(jokes.length, 20, locale);
    assert.deepEqual([...new Set(jokes.map((joke) => joke.category))].sort(),
      ["everyday", "food", "tech", "wordplay", "work"]);
    assert.ok(jokes.every((joke) => typeof joke.text === "string" && joke.text.trim()));
  }
});

test("Russian selection localizes the document, controls, and category filter", () => {
  const app = bootApp();
  app.localeButtons[1].listeners.click();
  assert.equal(app.root.lang, "ru-RU");
  assert.equal(app.elements["skip-link"].textContent, "Перейти к основному содержимому");
  assert.equal(app.elements["home-link"].attributes["aria-label"], "На главную JestBox");
  assert.equal(app.elements["locale-buttons"].attributes["aria-label"], "Выберите язык шуток");
  assert.equal(app.localeButtons[0].attributes["aria-pressed"], "false");
  assert.equal(app.localeButtons[1].attributes["aria-pressed"], "true");
  assert.equal(app.elements["another-label"].textContent, "Ещё шутку");
  app.elements.category.value = "food";
  app.elements.category.listeners.change();
  assert.equal(app.elements["joke-category"].textContent, "Еда и напитки");
  assert.ok(app.context.__testJokes["ru-RU"].some((joke) =>
    joke.category === "food" && joke.text === app.elements["joke-heading"].textContent));
});

test("the daily joke is stable for the same locale and device-local date", () => {
  const first = bootApp();
  const second = bootApp();
  assert.equal(first.elements["joke-heading"].textContent,
    second.elements["joke-heading"].textContent);

  first.localeButtons[1].listeners.click();
  second.localeButtons[1].listeners.click();
  assert.equal(first.root.lang, "ru-RU");
  assert.equal(first.elements["joke-heading"].textContent,
    second.elements["joke-heading"].textContent);
});

test("random selection respects the active category", () => {
  const app = bootApp();
  app.elements.category.value = "tech";
  app.elements.category.listeners.change();
  app.elements["another-button"].listeners.click();
  assert.equal(app.elements["joke-category"].textContent, "Tech & internet");
  assert.ok(app.context.__testJokes["en-US"].some((joke) =>
    joke.category === "tech" && joke.text === app.elements["joke-heading"].textContent));
});

test("consecutive random selections do not repeat the currently displayed joke", () => {
  const app = bootApp();
  let previous = app.elements["joke-heading"].textContent;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    app.elements["another-button"].listeners.click();
    const current = app.elements["joke-heading"].textContent;
    assert.notEqual(current, previous);
    previous = current;
  }
});

test("copy and share use clipboard only after explicit user actions", async () => {
  const app = bootApp();
  const joke = app.elements["joke-heading"].textContent;
  await app.elements["copy-button"].listeners.click();
  assert.deepEqual(app.clipboardWrites, [joke]);
  assert.equal(app.elements.status.textContent, "Copied!");
  await app.elements["share-button"].listeners.click();
  assert.equal(app.clipboardWrites.length, 2);
  assert.equal(app.elements.status.textContent,
    "Sharing isn't available here. The joke has been copied instead.");
});

test("cancelling the native share sheet does not report success or copy the joke", async () => {
  const app = bootApp();
  app.navigator.share = async () => {
    const error = new Error("Share cancelled");
    error.name = "AbortError";
    throw error;
  };

  await app.elements["share-button"].listeners.click();

  assert.deepEqual(app.clipboardWrites, []);
  assert.equal(app.elements.status.textContent, "");
});

test("the app has no network or persistent-storage integration", () => {
  assert.doesNotMatch(source,
    /\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(|\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/);
});

test("switching locale resets the category and updates document language and title", () => {
  const app = bootApp();
  app.elements.category.value = "food";
  app.elements.category.listeners.change();

  app.localeButtons[1].listeners.click();

  assert.equal(app.elements.category.value, "all");
  assert.equal(app.root.lang, "ru-RU");
  assert.equal(app.context.document.title, "JestBox — Немного хорошего настроения");
  assert.ok(app.context.__testJokes["ru-RU"].some((joke) =>
    joke.text === app.elements["joke-heading"].textContent));
});

test("clipboard failure is reported without claiming a successful copy", async () => {
  const app = bootApp();
  app.navigator.clipboard.writeText = async () => {
    throw new Error("Clipboard unavailable");
  };

  await app.elements["copy-button"].listeners.click();

  assert.equal(app.clipboardWrites.length, 0);
  assert.equal(app.elements.status.textContent,
    "Copy unavailable here. You can select the joke and copy it.");
});

test("successful native sharing reports success without using clipboard", async () => {
  const app = bootApp();
  let sharedPayload;
  app.navigator.share = async (payload) => {
    sharedPayload = payload;
  };

  await app.elements["share-button"].listeners.click();

  assert.equal(sharedPayload.text, app.elements["joke-heading"].textContent);
  assert.equal(sharedPayload.title, "A joke from JestBox");
  assert.deepEqual(app.clipboardWrites, []);
  assert.equal(app.elements.status.textContent, "Ready to share.");
});

test("a failed native share falls back to clipboard and reports the fallback", async () => {
  const app = bootApp();
  const joke = app.elements["joke-heading"].textContent;
  app.navigator.share = async () => {
    throw new Error("Share failed");
  };

  await app.elements["share-button"].listeners.click();

  assert.deepEqual(app.clipboardWrites, [joke]);
  assert.equal(app.elements.status.textContent,
    "Sharing isn't available here. The joke has been copied instead.");
});
