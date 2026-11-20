import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../jokes.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const jokes = sandbox.window.JESTBOX_JOKES;
const addedCategories = [
  "characters", "city", "culture-contrasts", "marriage",
  "middle-class-life", "relatives", "romance", "satire",
  "trickster-stories", "uncle-cheesy"
];
const normalized = value => value.normalize("NFKC").toLocaleLowerCase("en-IN")
  .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

test("all eight locales retain their existing 100-joke baseline outside en-IN", () => {
  for (const locale of Object.keys(jokes)) {
    if (locale !== "en-IN") assert.equal(jokes[locale].length, 100, locale);
  }
});

test("en-IN joke records are unique regardless of category assignments", () => {
  const seen = new Set();
  for (const [assigned, text] of jokes["en-IN"]) {
    const key = normalized(text);
    assert.ok(key, "joke text must not be empty");
    assert.ok(!seen.has(key), `duplicate en-IN joke: ${text}`);
    seen.add(key);
    const ids = Array.isArray(assigned) ? assigned : [assigned];
    assert.ok(ids.length >= 1, "every joke needs at least one category");
    assert.equal(new Set(ids).size, ids.length, "category IDs must not repeat");
  }
});

test("new en-IN categories, when populated, have 100 three-line original records", () => {
  for (const category of addedCategories) {
    const records = jokes["en-IN"].filter(([assigned]) =>
      (Array.isArray(assigned) ? assigned : [assigned]).includes(category));
    if (records.length) {
      assert.equal(records.length, 100, category);
      for (const [, text] of records) {
        assert.ok(text.split("\n").filter(line => line.trim()).length >= 3,
          `${category} joke must have at least three lines`);
      }
    }
  }
  assert.ok(jokes["en-IN"].length <= 1100, "en-IN must not exceed the 1,100-record target");
});

test("new category IDs do not appear in other locales", () => {
  for (const [locale, records] of Object.entries(jokes)) {
    if (locale === "en-IN") continue;
    for (const [assigned] of records) {
      const ids = Array.isArray(assigned) ? assigned : [assigned];
      assert.ok(ids.every(id => !addedCategories.includes(id)), locale);
    }
  }
});
