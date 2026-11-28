# Contributing to JestBox

JestBox is a proprietary, offline-first joke application. Contributions require prior maintainer authorization; public repository visibility does not grant reuse or redistribution rights.

## Product scope

Supported locales:
- `en-US` — American English
- `es-PE` — Peruvian Spanish
- `ru-RU` — Russian
- `es-ES` — Spanish (Spain)
- `en-IN` — Indian English
- `hi-IN` — Indian Hindi
- `ur-IN` — Indian Urdu (Republic of India)
- `ur-PK` — Pakistani Urdu (Islamic Republic of Pakistan)

The current joke data foundation has 100 jokes per locale. The product target is 100+ unique, locally written/adapted jokes per locale, ideally balanced across five categories. Do not submit literal translations that ignore regional usage, filler content, or duplicate punchlines.

## Engineering principles

- Preserve offline-first operation and local bundling.
- Do not add accounts, analytics, advertising, trackers, telemetry, remote APIs, or remote/synced user data. Local-only selected-locale, display, and accessibility preferences are permitted; any other persistent storage requires explicit approval and privacy/security review.
- Keep all interface strings localised across all eight locales, including right-to-left layout for Urdu.
- Preserve keyboard access, screen-reader names and announcements, visible focus, responsive reflow, text resizing, reduced motion, and forced-colors support.
- Keep themes accessible; verify text and non-text contrast for every palette.
- Never weaken or delete tests to make a change pass.

## Development

Use Node.js 22 or newer:

```sh
node --check script.js
node --check jokes.js
node --test
```

No web build step is required. Android packaging is separate and must not be treated as a production release.

## Pull requests

Explain the user impact, privacy/security/accessibility effects, test coverage, actual CI results, manual QA performed, and checks deferred. Update documentation whenever behavior or supported scope changes. Do not claim WCAG conformance or independent certification based solely on source assertions or a logo.

## Three-failure rule

After three consecutive failures of the same test/CI strategy, stop repeating it. Diagnose the cause and change strategy, implement a materially different workaround, or defer the item. Never weaken/delete tests.

## Licence

JestBox is proprietary / All Rights Reserved. Contributions are accepted only with prior written authorization and agreed ownership/permission terms. No public licence is granted by submitting or viewing a contribution.


## Contributor authorization and rights

JestBox is proprietary. Before contributing, obtain express written authorization and agree the applicable rights/ownership terms. Read [Contributor Authorization and Rights Certification](docs/CONTRIBUTOR-AUTHORIZATION.md). A pull-request submission or Git commit trailer does not itself grant public reuse rights or establish a proprietary rights agreement.

The standard DCO 1.1 text is not adopted as a substitute for the project's proprietary contribution authorization. At this stage, automated DCO sign-off validation is not configured as a required pull-request check. Do not claim DCO enforcement. Any later sign-off mechanism must be designed to remain consistent with the proprietary licence and written contributor authorization.
