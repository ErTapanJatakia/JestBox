# JestBox

**Small box. Big laughs. Offline, on your side of the world.**

JestBox is a lightweight, offline-first joke app with six independently localised language-and-region experiences:

| Locale | Experience |
|---|---|
| `en-US` | American English — United States of America |
| `es-PE` | Peruvian Spanish — Republic of Peru |
| `ru-RU` | Russian — Russian Federation |
| `es-ES` | Spanish — Kingdom of Spain |
| `en-IN` | Indian English — Republic of India |
| `hi-IN` | Indian Hindi — Republic of India |

The language selector is searchable. English (`en-US`) is the default. Joke text is written for its regional audience rather than mechanically translated. The current content foundation contains 20 jokes per locale; the approved content target is at least 100 per locale.

## Project documentation

- [Product and Technical Documentation](DOCUMENTATION.md)
- [Privacy Policy — English](PRIVACY-POLICY.md) · [Russian](PRIVACY-POLICY.ru-RU.md)
- [Accessibility Statement — English](ACCESSIBILITY-STATEMENT.md) · [Russian](ACCESSIBILITY-STATEMENT.ru-RU.md)
- [Release QA Checklist](QA-CHECKLIST.md)
- [Proprietary Licence — All Rights Reserved](LICENSE)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Android Implementation Plan](ANDROID-IMPLEMENTATION.md)

## Features

- Six searchable language/region choices and fully localised interface copy.
- Ten full-app colour themes.
- A five-second skippable launch screen with a locally bundled mascot mark.
- Searchable joke-category picker: All Jokes, Everyday Life, Work & Study, Tech & Internet, Food & Drink, and Wordplay.
- Daily and random joke selection, plus copy and native device sharing where supported.
- Settings with larger text, high contrast, and reduced-motion controls.
- Compact responsive layout, keyboard focus, screen-reader announcements, and forced-colors support.
- All joke content and interface assets are bundled locally.

## Privacy by design

- No app accounts, analytics, advertising SDKs, trackers, or app-initiated external API calls.
- No personal information is requested by the current app logic.
- No app-created cookies or persistent browser storage.
- Locale, category, and accessibility choices are held in the current page session.
- Sharing is user-initiated; the operating system and selected recipient app apply their own privacy practices.

## Run and validate

Open `index.html` in a modern browser or serve the repository directory with a static HTTP server. The web experience requires no build step.

```sh
node --check script.js
node --check jokes.js
node --test
```

## Validation and release boundaries

The new six-locale experience is under development on a review branch. Its current starter content is 20 jokes per locale; reaching and validating 100+ per locale remains an open acceptance item. New changes require fresh CI and manual verification. The WCAG logo is a conformance-mark graphic, not W3C approval or an independent audit. Do not infer AA conformance from the logo or source assertions alone.

Android integration is maintained separately. A successful debug build does not establish device compatibility, native accessibility, release signing, or RuStore acceptance. The proprietary licence remains in force; public source visibility grants no general reuse rights.
