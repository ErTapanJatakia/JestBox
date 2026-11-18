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

The source is a browser application prototype. Verify both locales, all categories, daily-joke stability, clipboard/share behavior (including cancellation of the native share sheet), responsive layouts, keyboard operation and screen-reader announcements in target browsers before release. CI workflows are intentionally deferred until the complete application implementation is finished and the repository owner re-enables them. Source checks and regression tests remain part of development; no CI execution or pass status is implied. Android packaging and RuStore submission are separate release activities; this repository update does not itself certify an Android build or store approval.
