# JestBox source guide

JestBox is an offline-first joke application with six language-and-region experiences, ten colour themes, locally saved accessibility preferences, and an Android wrapper.

## Source layout

- `index.html` — application structure, launch screen, dashboard, Settings & Superpowers, and dialogs.
- `styles.css` — responsive layouts, theme tokens, and accessibility presentation.
- `script.js` — locale dictionaries, searchable pickers, joke selection, sharing, themes, and on-device preferences.
- `jokes.js` — the bundled joke collections for all six locales.
- `assets/JestBox-Original.png` — canonical laughing jester gift-box logo used by the web app, browser icon, README, and generated Android launcher icon.
- `assets/wcag22aa-blue.svg` — WCAG reference graphic used in accessibility materials.
- `assets/` — other locally bundled visual assets.
- `scripts/prepare-web.mjs` — prepares the offline web bundle and localized legal pages for Android.
- `tests/` — source-level regression and Android staging tests.

## Run locally

Open `index.html` in a modern browser, or serve the repository directory with a static HTTP server. The browser experience requires no external API or account.

## Validate

Use Node.js 22 or newer:

```sh
node --check script.js
node --check jokes.js
node --test
```

## Android debug build

Install the pinned dependencies, prepare the bundled web assets, and run the Capacitor Android debug build:

```sh
npm install
npm run prepare:web
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

The debug build is not a production-signed release. Device compatibility, native accessibility, signing, and store publication require separate review and authorization.
