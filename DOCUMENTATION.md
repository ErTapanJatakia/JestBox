# JestBox — Product and Technical Documentation

**Documentation version:** 2.0 draft  
**Last updated:** 18 November 2026  
**Repository:** https://github.com/ErTapanJatakia/JestBox

## 1. Product overview

JestBox is an offline-first joke application with six regional language experiences:

| Locale | Audience |
|---|---|
| `en-US` | American English — United States |
| `es-PE` | Peruvian Spanish — Peru |
| `ru-RU` | Russian — Russian Federation |
| `es-ES` | Spanish — Spain |
| `en-IN` | Indian English — India |
| `hi-IN` | Indian Hindi — India |

English (`en-US`) is selected by default. The current content foundation contains 100 regionally authored jokes per locale. The product acceptance target is at least 100 unique jokes per locale (600 total), with regional language and cultural review.

## 2. User-facing features

- Searchable language/region picker with locale code and country.
- Ten selectable themes, with page-wide colour tokens.
- Five-second translucent welcome screen, dismissible by touch or keyboard.
- Searchable category field for All Jokes, Everyday Life, Work & Study, Tech & Internet, Food & Drink, and Wordplay.
- Daily joke, random joke, copy, and share dialog with native device sharing when supported.
- Settings for larger text, higher contrast, and reduced motion.
- Compact responsive home layout, keyboard navigation, focus visibility, and live announcements.
- Footer privacy and accessibility links plus the WCAG 2.2 AA graphic.

## 3. Content model

Jokes are stored in `jokes.js` as locale-specific arrays of category/text pairs. Category identifiers are `everyday`, `work`, `tech`, `food`, and `wordplay`. `all` is a filter, not a joke category. The current initial distribution is twenty jokes in each category per locale (20 total); the planned 100-joke minimum requires at least 20 per category.

Content should be independently written or culturally adapted for each locale. Avoid literal translation, duplicate punchlines, stereotypes, discriminatory humour, and jokes that depend on a culture-specific reference unfamiliar to the target audience.

## 4. Runtime and privacy model

The web app is static HTML, CSS, and JavaScript. Joke content, theme palettes, and UI dictionaries are bundled locally. The core experience makes no app-initiated network requests and does not use cookies or persistent browser storage. UI preferences remain in page memory and reset on a fresh load.

The share dialog invokes the official Capacitor Share plugin in Android builds, which opens the Android Sharesheet and exposes compatible installed share targets. Browser builds use the Web Share API where supported. The user initiates the action and chooses the recipient app; JestBox does not receive recipient details.

A web host, browser, operating system, app store, or distribution platform may process technical information independently. See the Privacy Policy for scope and limitations.

## 5. Accessibility

The implementation includes semantic landmarks, skip navigation, searchable labelled controls, visible focus, live status announcements, responsive reflow, reduced-motion support, forced-colors styles, and user-selectable larger text/high contrast. These features require browser, Android, keyboard, and assistive-technology verification.

The WCAG 2.2 AA mark is a graphic. It is not W3C endorsement, certification, or evidence of a completed independent audit. The maintainer's conformance statement must be limited to the exact pages, locales, builds, and test evidence actually reviewed. The new six-locale UI and native Android wrapper require a fresh conformance assessment; earlier claims for the former two-locale web build must not be silently extended.

## 6. Development and validation

No browser build step is required. Android staging uses the pinned Capacitor Share plugin and esbuild to bundle its bridge. With Node.js 22 or newer:

```sh
node --check script.js
node --check jokes.js
node --test
```

CI results apply only to the exact commit tested. Record manual checks with device/OS/browser, viewport, assistive technology, date, outcome, and evidence. Do not mark a check complete without observing it.

## 7. Repository governance

The repository contains a proprietary All Rights Reserved licence, Privacy Policy, Accessibility Statement, Security Policy, Code of Conduct, Contributing Guidelines, and QA checklist. Public visibility does not grant permission to reuse or redistribute project materials.

Android debug packaging is separate from production signing and store release. Do not claim release readiness until manifest permissions, native share behavior, accessibility, offline behavior, package integrity, and physical-device QA have been reviewed.
