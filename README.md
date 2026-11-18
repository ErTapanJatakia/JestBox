# JestBox

**Two locales. Two cultures. A little laughter wherever you are.**

JestBox is a lightweight, offline-first joke application with two distinct content locales:

- **American English (en-US)** — original, US-oriented everyday, workplace, technology, food and wordplay jokes.
- **Russian (ru-RU)** — original Russian-language jokes written for a Russian Federation audience, with local phrasing and familiar everyday references.

## Project documentation

- [Product and Technical Documentation](DOCUMENTATION.md)
- [Privacy Policy — English](PRIVACY-POLICY.md) · [Политика конфиденциальности — русский](PRIVACY-POLICY.ru-RU.md)
- [Accessibility Statement — English](ACCESSIBILITY-STATEMENT.md) · [Заявление о доступности — русский](ACCESSIBILITY-STATEMENT.ru-RU.md)
- [Release QA Checklist](QA-CHECKLIST.md)
- [Licence — Proprietary / All Rights Reserved](LICENSE)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guidelines](CONTRIBUTING.md)

## Features

- Two selectable locales with fully localized interface text.
- Separate joke collections for each locale; jokes are adapted for their audience, not literal translations.
- Daily joke selected deterministically from the device's local calendar date.
- Random joke button and category filtering.
- Copy and native share actions where supported, with a clipboard fallback.
- Responsive interface, visible keyboard focus, and reduced-motion support.
- All content is bundled locally; the application works offline.

## Privacy by design

- No accounts, sign-in, analytics, advertising SDKs, trackers or external APIs.
- No personal information is requested or collected.
- No cookies, localStorage, IndexedDB or application database.
- Locale and category choices exist only in the current page session.
- Joke text is copied or shared only after the user explicitly selects the relevant action.
- The application does not require network access for its core functionality.

## Run

Open `index.html` in a modern browser or serve the repository directory with a static HTTP server. No build step or package installation is required.

To run the dependency-free source checks locally with Node.js 22 or newer:

```sh
node --check script.js
node --test
```

## Validation status

The dependency-free regression suite and GitHub validation workflows have passed for the current reviewed feature-branch commit. The latest successful checks include the push and pull-request smoke-test workflows, CodeQL, JavaScript/TypeScript analysis, and GitHub Advanced Security. See the [pull-request checks](https://github.com/ErTapanJatakia/JestBox/pull/1) for the run records. Manual browser/device and assistive-technology QA remains a separate activity and should be recorded in `QA-CHECKLIST.md` with configuration details and evidence; maintainer-reported manual QA is not represented as an independent audit. Android packaging and RuStore submission are separate release activities and have not been validated by these browser-source checks.
