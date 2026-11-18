# Contributing to JestBox

Thank you for your interest in JestBox. Contributions should preserve the
project's lightweight, offline-first, privacy-conscious design and its two
distinct language experiences.

## Before you start

- Read the [README](README.md), [Product and Technical Documentation](DOCUMENTATION.md),
  [Privacy Policy](PRIVACY-POLICY.md), and [Accessibility Statement](ACCESSIBILITY-STATEMENT.md).
- Review the [Code of Conduct](CODE_OF_CONDUCT.md).
- The repository is currently distributed under a proprietary, all-rights-reserved
  notice. Public visibility does not grant permission to copy, modify, or
  redistribute the code. Obtain prior written authorization from the rights
  holder before submitting a patch or other material for incorporation.
- For substantial changes, open a discussion or issue first and wait for
  maintainer approval before investing in implementation.

## Project scope and invariants

The current product is a static, single-page browser application with two
supported locales only:

- American English: `en-US`
- Russian Federation Russian: `ru-RU`

Each locale has 20 jokes distributed across five categories:

| Category | Expected count per locale |
|---|---:|
| `everyday` | 5 |
| `work` | 4 |
| `tech` | 4 |
| `food` | 3 |
| `wordplay` | 4 |
| **Total** | **20** |

Unless the maintainer explicitly approves a scope change, contributions must
preserve these project principles:

- no external APIs, remote joke services, accounts, analytics, advertising,
  tracking, telemetry, or third-party runtime SDKs;
- no collection of personal information;
- no cookies or persistent browser storage;
- no dependency or build-system additions for functionality that can be
  implemented with the existing platform APIs;
- all core content and assets remain locally bundled and the core experience
  remains usable offline after files are loaded;
- both locales receive equivalent functional and accessibility improvements;
- user-initiated clipboard and share actions remain optional.

Any proposal that changes these assumptions must include an impact assessment
for privacy, security, accessibility, documentation, and release QA.

## Repository structure

The principal files include:

- `index.html` — semantic page structure and controls;
- `styles.css` — layout, responsive styling, focus, reduced-motion, and
  forced-colors behavior;
- `script.js` — locale dictionaries, joke content, selection, and interactions;
- `tests/smoke.test.js` — dependency-free Node.js regression checks;
- `QA-CHECKLIST.md` — manual verification checklist;
- `PRIVACY-POLICY*.md` and `ACCESSIBILITY-STATEMENT*.md` — user-facing
  policy and accessibility documentation.

## Development setup

No package installation or build step is required for the current web app.
Open `index.html` in a modern browser or serve the repository directory with
a static HTTP server.

The documented source checks for Node.js 22 or newer are:

```sh
node --check script.js
node --test
```

**Validation workflow:** GitHub Actions automatically runs the repository's
source checks on pushes and pull requests targeting `main`. Review the logs and
report the exact commit and result. Do not manually dispatch or repeatedly
rerun a failing workflow without first diagnosing the failure. Android
packaging/validation remains a separate release activity and requires explicit
maintainer authorization. Do not describe unexecuted tests as passing.

## Implementation and content guidelines

- Keep code readable, small, and consistent with the existing vanilla
  JavaScript, HTML, and CSS architecture.
- Prefer semantic HTML and native browser controls.
- Preserve keyboard operation, visible focus, accessible names, live
  announcements, responsive reflow, reduced-motion support, and forced-colors
  support.
- Keep interface strings localized in both locale dictionaries.
- Write or adapt jokes for their intended locale; do not rely on literal
  machine-style translation.
- Preserve the exact category distribution unless a scope change is approved.
- Avoid duplicate joke text within a locale after Unicode normalization and
  reasonable whitespace/case normalization.
- Do not introduce external fonts, scripts, images, APIs, or network requests
  without explicit approval and a documented privacy/security review.
- Never weaken or delete a regression test simply to make a change appear to
  pass.

## Pull request expectations

Before proposing a change:

1. Confirm that the change has been authorized for this proprietary project.
2. Keep the patch focused and explain the user-facing or maintenance benefit.
3. Update both locales wherever shared interface behavior or copy changes.
4. Add or update regression assertions for changed behavior without weakening
   existing coverage.
5. Update the relevant product, privacy, accessibility, security, and QA
   documentation when assumptions or behavior change.
6. Record manual QA steps and their actual results in the QA checklist when
   authorized to perform them. Identify browser, operating system, viewport,
   assistive technology (if applicable), and any blocked checks.
7. State clearly which checks were authored, which were executed, and which
   remain deferred.

A pull request description should include:
- summary and rationale;
- files or areas changed;
- privacy/security/accessibility impact;
- regression coverage added or updated;
- manual verification performed, with evidence where available;
- checks not run and the reason.

Do not claim WCAG conformance, security validation, or release readiness solely
because source assertions exist. Distinguish the maintainer's conformance claim
from independent evaluation or certification.

## Commit and review practices

Use concise, imperative commit messages with a clear scope, for example:

- `docs: clarify privacy disclosure`
- `fix: refresh daily joke after local date change`
- `test: cover locale dictionary parity`

Keep unrelated formatting changes out of functional patches. A maintainer may
request revisions, additional documentation, or a narrower change before
accepting a contribution.

## Three-failure engineering rule

If the same test or CI strategy fails three consecutive times, stop repeating
that strategy. Investigate a materially different design or workaround, or
defer the issue with a clear explanation. Do not weaken or delete tests to
force a green result.

## Security issues

Do not disclose vulnerabilities in public issues or pull requests. Follow the
private reporting process in [SECURITY.md](SECURITY.md). Do not test against
real users, third-party systems, or production infrastructure without
explicit authorization.

## Licence and contribution terms

JestBox is proprietary and all rights are reserved. A contribution submission
does not grant the contributor or the public a licence to the rest of the
repository. Do not submit material that you do not have the right to provide.
Any permission, ownership, attribution, or incorporation terms for a proposed
contribution must be agreed with the maintainer in writing before it is
merged. This document is not a substitute for a separate written agreement
where one is required.
