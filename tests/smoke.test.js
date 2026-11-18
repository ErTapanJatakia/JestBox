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

function bootApp(now = new Date()) {
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
    documentElement: root, title: "", visibilityState: "visible", listeners: {},
    addEventListener(name, callback) { this.listeners[name] = callback; },
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
  class FixedDate extends Date {
    constructor(...args) {
      if (args.length) super(...args);
      else super(now.getTime());
    }
    static now() { return now.getTime(); }
  }
  const window = { listeners: {}, addEventListener(name, callback) { this.listeners[name] = callback; } };
  const context = { document, window, navigator, Date: FixedDate, Math: deterministicMath };
  vm.runInNewContext(
    source + "\nglobalThis.__testJokes = jokes; globalThis.__testCopy = copy; globalThis.__testDailySeed = () => daySeed() + elements.category.value;",
    context
  );
  return { elements, localeButtons, root, navigator, clipboardWrites, document, window, context };
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

test("startup is English by default and runtime uses no browser storage or network APIs", () => {
  const app = bootApp();
  assert.equal(app.root.lang, "en-US");
  assert.equal(app.elements["daily-label"].textContent, app.context.__testCopy["en-US"].daily);
  assert.doesNotMatch(source, /\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/);
  assert.doesNotMatch(source, /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(/);
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
  assert.match(html, /<p class="status-text" id="status" role="status">/);
  assert.doesNotMatch(html, /id="status"[^>]*aria-live=/);
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
  assert.match(css, /@media \(max-width: 560px\)/);
  assert.match(css, /\.locale-buttons\s*\{\s*grid-template-columns: 1fr;/);
  assert.match(css, /\.joke-toolbar\s*\{\s*align-items: flex-start;\s*flex-direction: column;/);
  assert.match(css, /\.joke-actions\s*\{\s*display: grid;\s*grid-template-columns: 1fr 1fr;/);
  assert.match(css, /h1, h2, h3, p\s*\{\s*overflow-wrap: anywhere;/);
  assert.match(css, /\.jestbox \.locale-button\s*\{\s*overflow-wrap: anywhere;/);
  assert.match(css, /\.jestbox \.joke-content h2\s*\{[^}]*overflow-wrap: anywhere;/);

  assert.match(css, /\.jestbox \.joke-actions button\s*\{\s*min-height: 44px;/);
  assert.match(css, /\.jestbox \.category-control select\s*\{\s*min-height: 44px;/);
  assert.match(css, /\.site-header a\s*\{[^}]*min-height: 44px;/);
  assert.match(css, /orientation: landscape/);
  assert.match(css, /\.site-header\s*\{\s*flex-wrap: wrap;/);
  assert.match(css, /\.jestbox \.category-control\s*\{\s*align-items: stretch;\s*flex-direction: column;/);
  assert.match(css, /\.jestbox \.category-control select\s*\{\s*width: 100%;\s*max-width: 100%;/);
  assert.match(css, /\.jestbox\s*\{\s*padding-top: \.5rem;\s*padding-bottom: 1rem;/);
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

test("both locale dictionaries have identical complete interface and category keys", () => {
  const { context } = bootApp();
  const english = context.__testCopy["en-US"];
  const russian = context.__testCopy["ru-RU"];
  assert.deepEqual(Object.keys(russian).sort(), Object.keys(english).sort());

  for (const key of Object.keys(english)) {
    if (key === "categories" || key === "categoryNames") continue;
    assert.equal(typeof english[key], "string", `English ${key} must be a string`);
    assert.ok(english[key].trim(), `English ${key} must not be empty`);
    assert.equal(typeof russian[key], "string", `Russian ${key} must be a string`);
    assert.ok(russian[key].trim(), `Russian ${key} must not be empty`);
  }

  const expectedCategoryKeys = ["all", "everyday", "food", "tech", "wordplay", "work"];
  assert.deepEqual(Object.keys(english.categories).sort(), expectedCategoryKeys);
  assert.deepEqual(Object.keys(russian.categories).sort(), expectedCategoryKeys);
  assert.deepEqual(Object.keys(english.categoryNames).sort(), expectedCategoryKeys.slice(1));
  assert.deepEqual(Object.keys(russian.categoryNames).sort(), expectedCategoryKeys.slice(1));
  for (const key of expectedCategoryKeys) {
    assert.ok(english.categories[key].trim(), `Missing English category label: ${key}`);
    assert.ok(russian.categories[key].trim(), `Missing Russian category label: ${key}`);
    if (key !== "all") {
      assert.ok(english.categoryNames[key].trim(), `Missing English joke category: ${key}`);
      assert.ok(russian.categoryNames[key].trim(), `Missing Russian joke category: ${key}`);
    }
  }
});

test("joke text is unique within each locale after whitespace normalization", () => {
  const { context } = bootApp();
  for (const locale of ["en-US", "ru-RU"]) {
    const normalized = context.__testJokes[locale].map((joke) =>
      joke.text.normalize("NFC").replace(/\s+/g, " ").trim().toLocaleLowerCase(locale)
    );
    assert.equal(new Set(normalized).size, normalized.length, `${locale} contains duplicate joke text`);
  }
});

test("each locale has the intended 20-joke category distribution", () => {
  const { context } = bootApp();
  const expected = { everyday: 5, work: 4, tech: 4, food: 3, wordplay: 4 };
  for (const locale of ["en-US", "ru-RU"]) {
    const counts = context.__testJokes[locale].reduce((result, joke) => {
      result[joke.category] = (result[joke.category] || 0) + 1;
      return result;
    }, {});
    assert.deepEqual(counts, expected, locale);
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

test("the daily-joke seed changes with local date, locale, and category", () => {
  const app = bootApp(new Date(2026, 0, 2, 12, 0, 0));
  const originalSeed = app.context.__testDailySeed();

  const nextDay = bootApp(new Date(2026, 0, 3, 12, 0, 0));
  assert.notEqual(nextDay.context.__testDailySeed(), originalSeed);

  app.elements.category.value = "food";
  assert.notEqual(app.context.__testDailySeed(), originalSeed);

  app.localeButtons[1].listeners.click();
  assert.notEqual(app.context.__testDailySeed(), originalSeed);
});

test("the daily joke refreshes after local midnight when the app becomes visible", () => {
  const deviceDate = new Date(2026, 0, 2, 23, 59, 0);
  const app = bootApp(deviceDate);
  const nextDay = bootApp(new Date(2026, 0, 3, 0, 1, 0));
  const originalJoke = app.elements["joke-heading"].textContent;

  deviceDate.setTime(new Date(2026, 0, 3, 0, 1, 0).getTime());
  app.document.listeners.visibilitychange();

  assert.equal(app.elements["joke-heading"].textContent,
    nextDay.elements["joke-heading"].textContent);
  assert.notEqual(app.elements["joke-heading"].textContent, originalJoke);
});

test("a hidden app defers daily-joke rollover until it becomes visible", () => {
  const deviceDate = new Date(2026, 0, 2, 23, 59, 0);
  const app = bootApp(deviceDate);
  const originalJoke = app.elements["joke-heading"].textContent;

  deviceDate.setTime(new Date(2026, 0, 3, 0, 1, 0).getTime());
  app.document.visibilityState = "hidden";
  app.document.listeners.visibilitychange();
  assert.equal(app.elements["joke-heading"].textContent, originalJoke);

  app.document.visibilityState = "visible";
  app.document.listeners.visibilitychange();
  assert.notEqual(app.elements["joke-heading"].textContent, originalJoke);
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

test("the joke label distinguishes random selections and resets for daily selections", () => {
  const app = bootApp();
  assert.equal(app.elements["daily-label"].textContent, "TODAY'S LITTLE LAUGH");

  app.elements["another-button"].listeners.click();
  assert.equal(app.elements["daily-label"].textContent, "ANOTHER LITTLE LAUGH");

  app.elements.category.value = "food";
  app.elements.category.listeners.change();
  assert.equal(app.elements["daily-label"].textContent, "TODAY'S LITTLE LAUGH");

  app.elements["another-button"].listeners.click();
  app.localeButtons[1].listeners.click();
  assert.equal(app.elements["daily-label"].textContent, "ШУТКА НА СЕГОДНЯ");

  app.elements["another-button"].listeners.click();
  assert.equal(app.elements["daily-label"].textContent, "ЕЩЁ ОДНА ШУТКА");
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


test("a pending copy does not overwrite the interface after a locale change", async () => {
  const app = bootApp();
  let completeWrite;
  app.navigator.clipboard.writeText = () => new Promise((resolve) => {
    completeWrite = resolve;
  });

  const pendingCopy = app.elements["copy-button"].listeners.click();
  app.localeButtons[1].listeners.click();
  completeWrite();
  await pendingCopy;

  assert.equal(app.root.lang, "ru-RU");
  assert.equal(app.elements.status.textContent, "");
});

test("a pending native share does not overwrite the interface after a locale change", async () => {
  const app = bootApp();
  let completeShare;
  let payload;
  app.navigator.share = (value) => {
    payload = value;
    return new Promise((resolve) => {
      completeShare = resolve;
    });
  };

  const pendingShare = app.elements["share-button"].listeners.click();
  app.localeButtons[1].listeners.click();
  completeShare();
  await pendingShare;

  assert.equal(payload.title, "A joke from JestBox");
  assert.equal(app.root.lang, "ru-RU");
  assert.equal(app.elements.status.textContent, "");
});

test("the app has no network or persistent-storage integration", () => {
  assert.doesNotMatch(source,
    /\b(?:fetch|XMLHttpRequest|WebSocket|EventSource|sendBeacon)\s*\(|\b(?:localStorage|sessionStorage|indexedDB)\b|document\.cookie/);
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


test("high-contrast mode retains visible control boundaries and system-color focus indicators", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(css, /@media \(forced-colors: active\)/);
  assert.match(css, /border: 1px solid CanvasText/);
  assert.match(css, /outline: 3px solid Highlight/);
  assert.match(css, /\.locale-button\.active\s*\{\s*outline: 2px solid Highlight;/);
});

test("interactive controls expose accessible names, states, and visible focus styles", () => {
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  assert.match(html, /<section class="locale-picker panel" aria-labelledby="locale-heading">/);
  assert.match(html, /<section class="joke-panel panel" aria-labelledby="joke-heading">/);
  assert.match(html, /<a class="skip-link" id="skip-link" href="#main">/);
  assert.match(html, /<main id="main" class="container jestbox" tabindex="-1">/);
  assert.match(html, /<div class="locale-buttons" id="locale-buttons" role="group" aria-label="Choose joke language">/);
  assert.match(html, /data-locale="en-US" aria-pressed="true">[\s\S]*?<strong>American English<\/strong>/);
  assert.match(html, /data-locale="ru-RU" aria-pressed="false">[\s\S]*?<strong>Русский<\/strong>/);
  assert.match(html, /<label class="category-control" for="category">[\s\S]*?<select id="category">/);
  for (const id of ["another-label", "copy-label", "share-label"]) {
    assert.match(html, new RegExp(`<span id="${id}">[^<]+<\/span>`));
  }

  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  assert.match(css, /button:focus-visible,[\s\n]*a:focus-visible,[\s\n]*select:focus-visible[\s\S]*?outline: 3px solid var\(--accent\)/);
  assert.match(css, /\.jestbox :focus-visible,[\s\n]*\.jestbox:focus[\s\S]*?outline: 3px solid var\(--accent\)/);
  assert.match(css, /a:focus-visible/);
  assert.match(css, /\.skip-link:focus\s*\{\s*transform: translateY\(0\);/);
});


test("a pending copy does not report completion after the displayed joke changes", async () => {
  const app = bootApp();
  let completeWrite;
  app.navigator.clipboard.writeText = () => new Promise((resolve) => {
    completeWrite = resolve;
  });

  const pendingCopy = app.elements["copy-button"].listeners.click();
  app.elements["another-button"].listeners.click();
  completeWrite();
  await pendingCopy;

  assert.equal(app.elements.status.textContent, "");
});

test("a pending native share does not report completion after the displayed joke changes", async () => {
  const app = bootApp();
  let completeShare;
  app.navigator.share = () => new Promise((resolve) => {
    completeShare = resolve;
  });

  const pendingShare = app.elements["share-button"].listeners.click();
  app.elements["another-button"].listeners.click();
  completeShare();
  await pendingShare;

  assert.equal(app.elements.status.textContent, "");
});


test("interactive component boundaries meet the 3:1 non-text contrast threshold", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const token = (name) => {
    const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
    assert.ok(match, `Missing six-digit --${name} color token`);
    return match[1];
  };
  const border = token("border");
  const page = token("page");
  const text = token("text");
  const muted = token("muted");
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const accentMatch = html.match(/--accent:\s*(#[0-9a-fA-F]{6})/);
  const buttonTextMatch = css.match(/button, \.button \{[^}]*color:\s*(#[0-9a-fA-F]{6})/);
  assert.ok(accentMatch, "Missing six-digit page accent color");
  assert.ok(buttonTextMatch, "Missing six-digit button label color");
  const accent = accentMatch[1];
  const buttonText = buttonTextMatch[1];

  const luminance = (hex) => {
    const channels = [1, 3, 5].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
    const linear = channels.map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const ratio = (first, second) => {
    const values = [luminance(first), luminance(second)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };

  for (const surface of [page, "#111f33", "#0c1727"]) {
    assert.ok(ratio(border, surface) >= 3,
      `Border contrast against ${surface} must be at least 3:1`);
    assert.ok(ratio(text, surface) >= 4.5,
      `Primary text contrast against ${surface} must be at least 4.5:1`);
    assert.ok(ratio(muted, surface) >= 4.5,
      `Muted text contrast against ${surface} must be at least 4.5:1`);
    assert.ok(ratio(accent, surface) >= 4.5,
      `Accent text/focus contrast against ${surface} must be at least 4.5:1`);
  }
  assert.ok(ratio(buttonText, accent) >= 4.5,
    "Button label contrast against the accent fill must be at least 4.5:1");
});

test("reduced-motion preference disables nonessential animation and transitions", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const rule = css.match(/@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/);
  assert.ok(rule, "Missing reduced-motion media query");
  assert.match(rule[1], /scroll-behavior: auto !important/);
  assert.match(rule[1], /animation-duration: 0\.01ms !important/);
  assert.match(rule[1], /animation-iteration-count: 1 !important/);
  assert.match(rule[1], /transition-duration: 0\.01ms !important/);
});

test("short landscape viewports receive compact vertical spacing", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const rule = css.match(/@media \(max-height: 480px\) and \(orientation: landscape\) \{([\s\S]*?)\n\}/);
  assert.ok(rule, "Missing short-landscape responsive rule");
  assert.match(rule[1], /\.jestbox\s*\{[^}]*padding-top:\s*\.5rem/s);
  assert.match(rule[1], /\.jestbox\s*\{[^}]*padding-bottom:\s*1rem/s);
  assert.match(rule[1], /\.jestbox \.locale-picker,\s*\.jestbox \.joke-panel\s*\{[^}]*margin-top:\s*\.5rem/s);
  assert.match(rule[1], /\.jestbox \.hero\.compact\s*\{[^}]*padding-block:\s*\.75rem/s);
});

test("380px and narrower layouts stack category controls and joke actions", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const rule = css.match(/@media \(max-width: 380px\) \{([\s\S]*?)\n\}/);
  assert.ok(rule, "Missing 380px narrow-screen responsive rule");
  assert.match(rule[1], /\.jestbox \.category-control\s*\{[^}]*align-items:\s*stretch;\s*flex-direction:\s*column;/s);
  assert.match(rule[1], /\.jestbox \.category-control select\s*\{[^}]*width:\s*100%;\s*max-width:\s*100%;/s);
  assert.match(rule[1], /\.jestbox \.joke-actions\s*\{[^}]*grid-template-columns:\s*1fr;/s);
  assert.match(rule[1], /\.jestbox \.joke-content\s*\{[^}]*padding-inline:\s*\.25rem;/s);
  assert.match(rule[1], /\.jestbox h1\s*\{[^}]*font-size:\s*clamp\(2rem, 11vw, 2\.6rem\);/s);
});

test("localized daily labels can wrap inside the narrow-screen joke toolbar", () => {
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const rule = css.match(/@media \(max-width: 380px\) \{([\s\S]*?)\n\}/);
  assert.ok(rule, "Missing narrow-screen responsive rule");
  assert.match(rule[1], /\.jestbox \.daily-label\s*\{[^}]*max-width:\s*100%;\s*overflow-wrap:\s*anywhere;/s);
});


test("WCAG 2.2 AA conformance mark is locally bundled and consistently placed", () => {
  const root = new URL("../", import.meta.url);
  const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");
  const css = fs.readFileSync(new URL("../styles.css", import.meta.url), "utf8");
  const english = fs.readFileSync(new URL("../ACCESSIBILITY-STATEMENT.md", import.meta.url), "utf8");
  const russian = fs.readFileSync(new URL("../ACCESSIBILITY-STATEMENT.ru-RU.md", import.meta.url), "utf8");
  const logoPath = new URL("../assets/wcag22aa-blue.svg", import.meta.url);

  assert.ok(fs.existsSync(logoPath), "The local WCAG logo asset must exist");
  assert.match(fs.readFileSync(logoPath, "utf8"), /<svg[\s\S]*?WCAG[\s\S]*?2\.2 AA/);
  assert.match(html, /<footer>[\s\S]*?class="wcag-conformance-mark"[\s\S]*?assets\/wcag22aa-blue\.svg/);
  assert.match(html, /href="https:\/\/www\.w3\.org\/WAI\/WCAG2AA-Conformance"/);
  assert.match(css, /\.wcag-conformance-mark\s*\{[^}]*justify-content:\s*center/s);
  assert.equal((english.match(/assets\/wcag22aa-blue\.svg/g) || []).length, 2,
    "English statement must show the logo at the top and bottom");
  assert.equal((russian.match(/assets\/wcag22aa-blue\.svg/g) || []).length, 2,
    "Russian statement must show the logo at the top and bottom");
});
