import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../jokes.js", import.meta.url), "utf8");
const hiInSource = readFileSync(new URL("../jokes-hi-IN.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
vm.runInNewContext(hiInSource, sandbox);
const jokes = sandbox.window.JESTBOX_JOKES;
const addedCategories = [
  "characters", "city", "culture-contrasts", "marriage",
  "middle-class-life", "relatives", "romance", "satire",
  "trickster-stories", "uncle-cheesy"
];
const hiInCategories = [
  "akbar-birbal", "jija-sali", "teacher-student", "doctor-patient",
  "tenali-ram", "pati-patni", "pappu-chintu", "bhojpuri", "corruption",
  "mulla-nasruddin", "politics", "rajasthani", "lawyer-client", "society",
  "saas-bahu", "haryanvi"
];
const normalized = value => value.normalize("NFKC").toLocaleLowerCase("en-IN")
  .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");
const normalizedHindi = value => value.normalize("NFKC").toLocaleLowerCase("hi-IN")
  .replace(/[^\p{L}\p{N}]+/gu, " ").trim().replace(/\s+/g, " ");

test("all non-expansion locales retain their established baselines", () => {
  for (const locale of Object.keys(jokes)) {
    if (locale !== "en-IN" && locale !== "hi-IN") assert.equal(jokes[locale].length, 100, locale);
  }
  assert.equal(jokes["hi-IN"].length, 1700, "hi-IN must contain its 100-joke baseline plus eight 200-joke batches");
});

test("en-IN retains its original 100-joke baseline", () => {
  assert.equal(jokes["en-IN"].length, 1100);
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
      assert.equal(records.length, 100, `${category} must contain exactly 100 jokes`);
      for (const [, text] of records) {
        assert.ok(text.split("\n").filter(line => line.trim()).length >= 3,
          `${category} joke must have at least three lines`);
      }
    }
  }
  assert.equal(jokes["en-IN"].length, 1100, "en-IN must contain exactly 1,100 unique records");
});

test("all hi-IN joke records remain unique after Unicode-aware normalization", () => {
  const seen = new Set();
  for (const [assigned, text] of jokes["hi-IN"]) {
    const key = normalizedHindi(text);
    assert.ok(key, "hi-IN joke text must not be empty");
    assert.ok(!seen.has(key), `duplicate hi-IN joke: ${text}`);
    seen.add(key);
    const ids = Array.isArray(assigned) ? assigned : [assigned];
    assert.ok(ids.length >= 1, "every hi-IN joke needs a category");
    assert.equal(new Set(ids).size, ids.length, "hi-IN category IDs must not repeat");
  }
});

test("hi-IN expansion categories, when populated, have exactly 100 four-line jokes each", () => {
  for (const category of hiInCategories) {
    const records = jokes["hi-IN"].filter(([assigned]) =>
      (Array.isArray(assigned) ? assigned : [assigned]).includes(category));
    assert.equal(records.length, 100, `${category} must contain exactly 100 jokes`);
    for (const [, text] of records) assert.ok(text.split("\n").filter(line => line.trim()).length >= 4,
      `${category} joke must have at least four non-empty lines`);
  }
});

test("hi-IN contains exactly 1,600 additional jokes across 16 new categories", () => {
  assert.equal(jokes["hi-IN"].length, 1700);
  assert.equal(hiInCategories.length, 16);
  for (const category of hiInCategories) {
    assert.equal(jokes["hi-IN"].filter(([assigned]) =>
      (Array.isArray(assigned) ? assigned : [assigned]).includes(category)).length, 100);
  }
});

test("hi-IN jokes pass a full-collection lexical near-duplicate screen", () => {
  const stop = new Set(["ने","है","हैं","था","थी","थे","और","का","की","के","को","से","में","पर","तो","भी","ही","यह","वह","एक","अब","कि","कर","करें","कहा","बोला","बोली","बोले","पूछा","जवाब","दिया","दिए","सब","किस","क्या","क्यूँ","क्यों","मैं","हम","आप","उस","उन","इस","इसे","इसी","जैसे","जब","तब","लिए","साथ","पहले","फिर"]);
  const shingles = text => {
    const words = text.normalize("NFKC").toLocaleLowerCase("hi-IN")
      .replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/)
      .filter(word => word && !stop.has(word));
    const result = new Set();
    for (let i = 0; i < words.length - 1; i++) result.add(words[i] + " " + words[i + 1]);
    return result;
  };
  const records = jokes["hi-IN"].map(([category, text]) => ({ category, text, grams: shingles(text) }));
  for (let i = 0; i < records.length; i++) {
    for (let j = i + 1; j < records.length; j++) {
      const a = records[i].grams, b = records[j].grams;
      if (!a.size || !b.size) continue;
      const smaller = a.size < b.size ? a : b;
      const larger = a.size < b.size ? b : a;
      let intersection = 0;
      for (const gram of smaller) if (larger.has(gram)) intersection++;
      const similarity = intersection / (a.size + b.size - intersection);
      assert.ok(similarity < 0.72,
        "Potential hi-IN near-duplicate (" + similarity.toFixed(3) + "): " + records[i].text + " / " + records[j].text);
    }
  }
});

test("new category IDs do not appear in other locales", () => {
  for (const [locale, records] of Object.entries(jokes)) {
    if (locale === "en-IN") continue;
    for (const [assigned] of records) {
      const ids = Array.isArray(assigned) ? assigned : [assigned];
      assert.ok(ids.every(id => !(addedCategories.includes(id)) && (locale === "hi-IN" || !hiInCategories.includes(id))), locale);
    }
  }
});
