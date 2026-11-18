# JestBox — Product and Technical Documentation

**Documentation version:** 1.0  
**Last updated:** 18 November 2026  
**Repository:** [ErTapanJatakia/JestBox](https://github.com/ErTapanJatakia/JestBox)

## 1. Product overview

JestBox is a small, offline-first joke application built around two distinct language and culture experiences:

| Locale | Audience/content approach |
|---|---|
| `en-US` | American English; jokes written for a United States audience |
| `ru-RU` | Russian; jokes written for a Russian Federation audience |

The two joke collections are independently authored/adapted for their audiences rather than mechanically translated. The application contains 20 jokes per locale (40 total) across five categories.

## 2. Features

- Language selection between American English and Russian.
- Five categories: everyday life, work/study, technology/internet, food/drink, and wordplay.
- Daily joke selection based on the device's local calendar date, selected locale, and category.
- Random joke selection, avoiding an immediate repeat where possible.
- Copy-to-clipboard action.
- Native share action when supported, with clipboard fallback in applicable failure/unavailable cases.
- Responsive browser interface with keyboard and accessibility-oriented refinements.
- Offline operation after the application assets have been loaded.

## 3. Content model

Each joke is represented in source as a text string and category identifier. The category identifiers are:

- `everyday`
- `work`
- `tech`
- `food`
- `wordplay`

The intended distribution in each locale is:

| Category | Jokes per locale |
|---|---:|
| Everyday | 5 |
| Work | 4 |
| Tech | 4 |
| Food | 3 |
| Wordplay | 4 |
| **Total** | **20** |

Joke content is bundled in `script.js`; no content API or remote joke service is required.

## 4. User experience and behavior

### Locale selection

The page starts in `en-US`. Choosing a locale updates the document language, page title, interface labels, category labels, accessible names, and joke collection. Locale selection is session-only; it is not persisted to browser storage.

### Daily joke

The daily joke is deterministic for the combination of device-local date, locale, and selected category. The app checks for a local-date change when the page becomes visible or regains focus and refreshes the daily selection when appropriate.

### Random joke

The random action selects from the active locale/category collection and avoids the currently displayed joke and previous random index when alternatives are available.

### Copy and share

Copy requests a clipboard write for the displayed joke text. Share uses the browser/OS share interface when available. A non-cancellation share failure or unavailable share interface may fall back to clipboard. The app does not read clipboard contents or receive recipient information.

## 5. Technical architecture

The current web application is intentionally lightweight and has no build-time framework dependency.

| File | Responsibility |
|---|---|
| `index.html` | Document structure, semantic landmarks, controls, metadata, and script/style loading |
| `styles.css` | Visual styling, responsive behavior, focus states, reduced-motion and forced-colors handling |
| `script.js` | Locale dictionaries, joke data, selection logic, rendering, clipboard and share interactions |
| `tests/smoke.test.js` | Dependency-free Node.js source-level regression and smoke assertions |
| `QA-CHECKLIST.md` | Manual functional, privacy, accessibility, responsive, and release checks |
| `README.md` | Project introduction, feature summary, run instructions, and validation notes |
| `PRIVACY-POLICY.md` | User-facing privacy practices and scope |
| `ACCESSIBILITY-STATEMENT.md` | Accessibility commitment, implementation measures, and conformance-status disclosure |

### Runtime dependencies

The browser application uses standard web platform APIs and locally bundled content. The core experience does not require a server-side application, database, account system, or external API.

The app uses browser capabilities for clipboard and native sharing when the user explicitly invokes those actions. Availability and permission behavior vary by browser and operating system.

## 6. Privacy and security model

The application is designed to minimize data handling:
- no account or sign-in;
- no analytics, advertising, tracking SDK, or telemetry in the current source;
- no app-created cookies or persistent browser storage;
- no external API requests from the current application logic;
- locale, category, and joke state held in page memory;
- clipboard/share actions initiated by explicit user interaction.

See [Privacy Policy](PRIVACY-POLICY.md) for the user-facing explanation and important distinctions between application behavior and hosting/platform processing.

## 7. Accessibility approach

The source includes semantic landmarks, skip navigation, native controls, visible focus, localized accessible names, live announcements, responsive reflow, touch-target refinements, reduced-motion support, and forced-colors styling.

The project's evaluation target is WCAG 2.2 AA. That target must not be confused with a formal conformance claim. Browser/device/assistive-technology results should be recorded in `QA-CHECKLIST.md`. See [Accessibility Statement](ACCESSIBILITY-STATEMENT.md).

## 8. Local development and source checks

Open `index.html` in a modern browser or serve the repository directory using a static HTTP server. No package installation or build step is required for the current web app.

With Node.js 22 or newer, the repository documents these source checks:

```sh
node --check script.js
node --test
```

**Execution status is separate from test authorship.** Do not describe tests as passing unless they have actually been run and their output reviewed. CI workflows are intentionally deferred until the repository owner re-enables them after implementation completion.

## 9. Quality assurance and release gates

The QA checklist covers:
- both locales and all categories;
- daily/random selection and local-midnight rollover;
- clipboard/share success, fallback, and cancellation;
- offline behavior, network activity, and browser storage;
- keyboard-only navigation, focus, accessible names, and live announcements;
- contrast, zoom/reflow, reduced motion, forced colors, and responsive layouts;
- content integrity and release evidence.

A completed manual QA run should include the browser/device configuration, date, test areas, pass/fail/blocked results, and evidence references. A source review or authored assertion is not equivalent to a recorded user-interface observation.

Android packaging, native wrapper review, app-store metadata, and RuStore submission are separate activities. The browser application documentation does not certify a native package or store approval.

## 10. Supported scope and change control

The currently documented product scope is the two-locale joke application described above. Adding accounts, user-generated content, analytics, advertisements, external APIs, persistent preferences, or third-party SDKs changes the privacy and security model and requires review of the source, privacy policy, accessibility statement, tests, and release checklist.

Any future platform build must be reviewed independently for its runtime permissions, embedded SDKs, network behavior, accessibility, and store-specific declarations.
