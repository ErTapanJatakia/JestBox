# JestBox

![Original JestBox laughing jester gift-box logo](assets/JestBox-Original.png)

**Small box. Big laughs. Offline, on your side of the world.**

JestBox is a lightweight, offline-first joke app with eight independently localised language-and-region experiences:

| Locale | Experience |
|---|---|
| `en-US` | American English — United States of America |
| `es-PE` | Peruvian Spanish — Republic of Peru |
| `ru-RU` | Russian — Russian Federation |
| `es-ES` | Spanish — Kingdom of Spain |
| `en-IN` | Indian English — Republic of India |
| `hi-IN` | Indian Hindi — Republic of India |
| `ur-IN` | Indian Urdu — Republic of India |
| `ur-PK` | Pakistani Urdu — Islamic Republic of Pakistan |

The language selector is searchable. English (`en-US`) is the default. Joke text is written for its regional audience in the selected locale. The current content library contains 100 original jokes per locale (800 total), with 20 jokes in each of five categories, including Wordplay. Joke text follows the selected locale's language and writing system; regional references are tailored to each audience.

## Project documentation

- [Product and Technical Documentation](DOCUMENTATION.md)
- [Build, Validation and Test Instructions](docs/BUILD-AND-TEST-INSTRUCTIONS.md)
- [Coding and Documentation Standards](docs/CODING-STANDARDS.md)
- [Project Governance](docs/PROJECT-GOVERNANCE.md)
- [Repository QA Policy](docs/REPOSITORY-QA-POLICY.md)
- [Repository Automation Architecture](docs/REPOSITORY-AUTOMATION-ARCHITECTURE.md)
- [Threat Model](docs/THREAT-MODEL.md)
- [Security Assurance Case](docs/SECURITY-ASSURANCE-CASE.md)
- [Security Assessment Roadmap](docs/SECURITY-BADGE-ROADMAP.md)
- [OpenSSF Baseline and Best Practices Assessment Registers](docs/OPENSSF-BASELINE-L1-IMPLEMENTATION.md)
- [Contributor Authorization and Rights Certification](docs/CONTRIBUTOR-AUTHORIZATION.md)
- [Access Governance](docs/ACCESS-GOVERNANCE.md)
- [Secrets and Credentials Policy](docs/SECRETS-AND-CREDENTIALS-POLICY.md)
- [SAST Policy](docs/SAST-POLICY.md) · [SCA and Dependency Policy](docs/SCA-AND-DEPENDENCY-POLICY.md)
- [Dependency and Licence Register](docs/DEPENDENCY-LICENSE-REGISTER.md)
- [External Software Interfaces](docs/EXTERNAL-SOFTWARE-INTERFACES.md)
- [Network and Cryptography Review](docs/NETWORK-CRYPTOGRAPHY-REVIEW.md)
- [Accessibility Review](docs/ACCESSIBILITY-REVIEW.md)
- [Regression Test Review Process](docs/REGRESSION-TEST-REVIEW.md)
- [Release Policy](docs/RELEASE-POLICY.md) · [Release Verification](docs/RELEASE-VERIFICATION.md)
- [VEX Process](docs/VEX-PROCESS.md)
- [Subproject Security Policy](docs/SUBPROJECT-SECURITY-POLICY.md)
- [Documentation Maintenance](docs/DOCUMENTATION-MAINTENANCE.md)
- Privacy Policies: [en-US](PRIVACY-POLICY.md) · [es-PE](PRIVACY-POLICY.es-PE.md) · [ru-RU](PRIVACY-POLICY.ru-RU.md) · [es-ES](PRIVACY-POLICY.es-ES.md) · [en-IN](PRIVACY-POLICY.en-IN.md) · [hi-IN](PRIVACY-POLICY.hi-IN.md) · [ur-IN](PRIVACY-POLICY.ur-IN.md) · [ur-PK](PRIVACY-POLICY.ur-PK.md)
- Accessibility Statements: [en-US](ACCESSIBILITY-STATEMENT.md) · [es-PE](ACCESSIBILITY-STATEMENT.es-PE.md) · [ru-RU](ACCESSIBILITY-STATEMENT.ru-RU.md) · [es-ES](ACCESSIBILITY-STATEMENT.es-ES.md) · [en-IN](ACCESSIBILITY-STATEMENT.en-IN.md) · [hi-IN](ACCESSIBILITY-STATEMENT.hi-IN.md) · [ur-IN](ACCESSIBILITY-STATEMENT.ur-IN.md) · [ur-PK](ACCESSIBILITY-STATEMENT.ur-PK.md)
- [Release QA Checklist](QA-CHECKLIST.md)
- [Proprietary Licence — All Rights Reserved](LICENSE)
- [Security Policy](SECURITY.md)
- [Security Assessment Programme](SECURITY.md#security-assessment-programme)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guidelines](CONTRIBUTING.md)
- [Android Implementation Plan](ANDROID-IMPLEMENTATION.md)

## Features

- Eight searchable language/region choices and fully localised interface copy.
- Ten full-app colour themes.
- A five-second skippable launch screen with a locally bundled mascot mark.
- Searchable joke-category picker: All Jokes, Everyday Life, Work & Study, Tech & Internet, Food & Drink, and Wordplay.
- Daily and random joke selection, plus copy and native device sharing where supported.
- Settings & Superpowers with a 50–200% text scale, extra contrast, reduced motion, underlined links, larger touch targets, line spacing, and stronger focus visibility.
- Ten theme buttons inside Settings, each displaying its own palette and the active selection.
- Compact responsive layout, keyboard focus, screen-reader announcements, and forced-colors support.
- All joke content and interface assets are bundled locally.

## Privacy by design

- No app accounts, analytics, advertising SDKs, trackers, or app-initiated external API calls.
- No personal information is requested by the current app logic.
- No app-created cookies, analytics, trackers, or remote preference sync.
- Locale, category, and current joke remain in page memory; display/accessibility preferences are saved locally on the device only.
- Sharing is user-initiated; the operating system and selected recipient app apply their own privacy practices.

## Security automation

The public repository is configured for automated source, dependency, supply-chain, and Android APK security checks. See [SECURITY.md](SECURITY.md#security-assessment-programme) for scanner scope, schedules, report locations, and known limitations. Automated scanning is not a substitute for manual assessment or physical-device testing.

## Run and validate

Open `index.html` in a modern browser or serve the repository directory with a static HTTP server. The web experience requires no build step.

```sh
node --check script.js
node --check jokes.js
node --test
```

## Validation and release boundaries

The eight-locale experience includes 100 jokes per locale (800 total), balanced across five categories. Urdu (`ur-IN` and `ur-PK`) uses independent regional collections and right-to-left interface and legal-page presentation. Automated validation and practical RTL/device review remain required for each release commit. New changes require fresh CI and manual verification. The WCAG graphic is a reference mark, not W3C approval or an independent audit. Do not infer AA conformance from the logo or source assertions alone.

Android integration is maintained separately. A successful debug build does not establish device compatibility, native accessibility, release signing, or RuStore acceptance. The proprietary licence remains in force; public source visibility grants no general reuse rights.
