# JestBox release QA checklist

Use this checklist on the feature branch before approving PR #1 or preparing an Android package. Record the browser/device and date for each run. Do not mark a check complete without observing the result.

## Functional checks

- [ ] Launch the app with the default American English locale.
- [ ] Switch to Russian and confirm the page language, labels, category names, joke content, and document title update.
- [ ] Switch back to American English and confirm the same fields return to English.
- [ ] Check all five categories in both locales; every displayed joke must match the selected category.
- [ ] Confirm the daily joke remains stable after reload on the same device-local date and changes only when the date/locale/category inputs change.
- [ ] Select “Another joke” repeatedly; consecutive results should differ whenever more than one joke is available.
- [ ] Confirm Copy reports success only after a successful clipboard write; test the unavailable-permission fallback.
- [ ] Confirm Share invokes the platform share sheet where supported; dismissing it should not report a successful share.
- [ ] Confirm the fallback behavior when native sharing is unavailable.

## Privacy and offline checks

- [ ] Load the app, then disable network access and verify all core joke and locale features still work.
- [ ] Inspect browser network activity; the app should not send requests to external services.
- [ ] Inspect cookies and browser storage; the app should not create cookies, localStorage, sessionStorage, or IndexedDB entries.
- [ ] Confirm no account, sign-in, personal-data, advertising, or tracking prompt is present.

## Accessibility and responsive checks

- [ ] Complete all controls using keyboard only; focus must remain visible.
- [ ] Confirm locale buttons expose the correct pressed state to assistive technology.
- [ ] Confirm the skip link and home link have localized accessible names after switching locales.
- [ ] Confirm decorative action glyphs are ignored by assistive technology.
- [ ] Confirm daily, random, and category-filtered joke updates are announced by a screen reader.
- [ ] Confirm locale changes announce the updated joke in the newly selected document language.
- [ ] Confirm the skip link moves keyboard focus to the main landmark.
- [ ] Check 320px-wide phones, narrow phones, portrait tablet, landscape tablet, and desktop layouts for clipping, overlap, and horizontal scrolling.
- [ ] Check short landscape viewports and 200% text zoom; action controls must remain usable.
- [ ] Check text zoom and reduced-motion preferences.

## Evidence and release gate

- [ ] Run `node --check script.js` using Node.js 22 or newer.
- [ ] Run `node --test` and retain the complete output.
- [ ] After the complete application implementation is finished and the repository owner re-enables CI, run the code-quality workflows and retain their results.
- [ ] Record browser/device versions and any defects found.
- [ ] Do not package Android or submit to RuStore until source tests and required manual QA checks pass.

**Status:** checklist prepared; no manual QA item is claimed complete by this document.
