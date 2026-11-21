import { readFileSync } from "node:fs";
import vm from "node:vm";

const source = readFileSync(new URL("../jokes.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox);
const collections = sandbox.window.JESTBOX_JOKES;

const normalize = value => value.normalize("NFKC")
  .toLocaleLowerCase("en-IN")
  .replace(/[^a-z0-9]+/g, " ")
  .trim()
  .replace(/\s+/g, " ");

const threshold = 0.8;
let failures = 0;
const report = [];

for (const [locale, records] of Object.entries(collections)) {
  const categories = new Map();
  for (const [assigned, text] of records) {
    const ids = Array.isArray(assigned) ? assigned : [assigned];
    for (const id of ids) {
      if (!categories.has(id)) categories.set(id, []);
      categories.get(id).push(text);
    }
  }

  for (const [category, jokes] of categories) {
    const lineStats = [0, 1, 2].map(index => {
      const lines = jokes.map(joke => normalize(joke.split("\n")[index] ?? ""));
      return new Set(lines.filter(Boolean)).size;
    });
    const ratios = lineStats.map(count => jokes.length ? count / jokes.length : 1);
    const weakLines = ratios.flatMap((ratio, index) =>
      ratio < threshold ? [index + 1] : []);
    if (weakLines.length) failures++;

    report.push({
      locale,
      category,
      jokes: jokes.length,
      distinctLines: lineStats,
      uniquenessRatios: ratios.map(value => Number(value.toFixed(2))),
      belowThreshold: weakLines
    });
  }
}

console.log(JSON.stringify({
  threshold,
  categoriesAudited: report.length,
  categoriesBelowThreshold: failures,
  results: report
}, null, 2));

if (process.argv.includes("--strict") && failures) {
  process.exitCode = 1;
}
