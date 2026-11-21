# JestBox joke-content diversity audit

## Why this audit exists

The content suite already checks record counts, exact full-joke duplicates, category assignments, and minimum line count. Those checks do not catch a common templating failure: many records can have different full text while reusing the same setup, middle line, or punchline.

The new `scripts/audit-joke-diversity.mjs` reports the number of distinct normalized lines at each of the first three line positions, per locale and category. Run it with:

```sh
node scripts/audit-joke-diversity.mjs
```

Use `--strict` to return a non-zero exit code when any line-position uniqueness ratio falls below 80%:

```sh
node scripts/audit-joke-diversity.mjs --strict
```

The strict mode is intentionally not wired into CI yet. Existing content must be remediated category by category before a global threshold becomes a release gate. This avoids disguising known debt as a passing test or weakening the current checks.

## Baseline findings (en-IN expansion)

The 1,000 added records parse into ten categories of 100 records each, and there are no exact full-record duplicates. However, line-position diversity is uneven:

| Category | Distinct line 1 | Distinct line 2 | Distinct line 3 |
|---|---:|---:|---:|
| Characters | 100 | 10 | 100 |
| City | 100 | 100 | 10 |
| Culture Contrasts | 10 | 100 | 100 |
| Marriage | 10 | 100 | 100 |
| Middle-class Life | 10 | 10 | 10 |
| Relatives | 10 | 10 | 10 |
| Romance | 10 | 10 | 10 |
| Satire | 10 | 10 | 10 |
| Trickster Stories | 10 | 10 | 10 |
| Uncle / Cheesy | 10 | 10 | 10 |

A score of 10 distinct lines for 100 records means each line is repeated across ten records. It is a strong template-reuse signal, not proof that every joke is unfunny. Human editorial review remains necessary for humour, cultural nuance, clarity, and punchline quality.

## Remediation sequence

1. Replace repeated line structures with independently written jokes, beginning with Uncle / Cheesy.
2. Re-run the audit and preserve the 100-record category count.
3. Apply the same review to Trickster Stories, Satire, Romance, Relatives, Middle-class Life, City, Culture Contrasts, Marriage, and Characters.
4. Add strict thresholds to CI only after all categories meet the agreed diversity standard and the full regression suite passes.

No existing locale baseline, release artifact, signing configuration, or distribution setting is changed by this audit tooling.
