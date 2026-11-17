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
    "locale-label", "headline", "eyebrow", "intro", "locale-eyebrow",
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
  vm.runInNewContext(source + "\nglobalThis.__testJokes = jokes;", context);
  return { elements, localeButtons, root, navigator, clipboardWrites, context };
}

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
  assert.equal(app.elements["locale-buttons"].attributes["aria-label"], "Выберите язык шуток");
  assert.equal(app.elements["another-label"].textContent, "Ещё шутку");
  app.elements.category.value = "food";
  app.elements.category.listeners.change();
  assert.equal(app.elements["joke-category"].textContent, "Еда и напитки");
  assert.ok(app.context.__testJokes["ru-RU"].some((joke) =>
    joke.category === "food" && joke.text === app.elements["joke-heading"].textContent));
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

test("another joke does not repeat the currently displayed joke", () => {
  const app = bootApp();
  const firstJoke = app.elements["joke-heading"].textContent;
  app.elements["another-button"].listeners.click();
  assert.notEqual(app.elements["joke-heading"].textContent, firstJoke);
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

test("the app has no network or persistent-storage integration", () => {
  assert.doesNotMatch(source,
    /\b(?:fetch|XMLHttpRequest|WebSocket|sendBeacon)\s*\(|\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/);
});
