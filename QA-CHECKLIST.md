# JestBox release QA checklist

Use this checklist on the feature branch before approving PR #1 or preparing an Android package. Record the browser/device and date for each run. Do not mark a check complete without observing the result.

## Functional checks

- [ ] Launch the app with the default American English locale.
- [ ] Switch to Russian and confirm the page language, labels, category names, joke content, and document title update.
- [ ] Switch back to American English and confirm the same fields return to English.
- [ ] Confirm changing locale resets the category filter to all jokes and updates the document title.
- [ ] Check all five categories in both locales; every displayed joke must match the selected category.
- [ ] Confirm the daily joke remains stable after reload on the same device-local date; after crossing device-local midnight, reload and confirm the date-based selection is recalculated. Confirm locale and category changes also recalculate the selection.
- [ ] Keep the app open across device-local midnight, return to it or make it visible, and confirm the daily joke refreshes without a manual reload.
- [ ] Confirm a hidden app defers the rollover update until it becomes visible.
- [ ] Select “Another joke” and confirm the card label changes from the daily-joke label to the random-joke label in both locales; changing locale or category should restore the daily label.
- [ ] Select “Another joke” repeatedly; consecutive results should differ whenever more than one joke is available.
- [ ] Confirm Copy reports success only after a successful clipboard write; test the unavailable-permission fallback.
- [ ] Confirm Share invokes the platform share sheet where supported; dismissing it should not report a successful share.
- [ ] Confirm the fallback behavior when native sharing is unavailable.
- [ ] Confirm a native share failure (other than user cancellation) falls back to clipboard and reports the fallback accurately.
- [ ] Confirm a successful native share reports success without invoking clipboard fallback.

- [ ] Start a clipboard copy, switch locales before the clipboard operation completes, and confirm the stale completion does not overwrite the newly localized interface.
- [ ] Start Copy or Share, change the displayed joke or category before the operation completes, and confirm stale feedback for the previous joke is ignored.
- [ ] Start native sharing, switch locales before the share sheet completes, and confirm the stale completion does not overwrite the newly localized interface.

## Privacy and offline checks

- [ ] Load the app, then disable network access and verify all core joke and locale features still work.
- [ ] Inspect browser network activity; the app should not send requests to external services.
- [ ] Inspect cookies and browser storage; the app should not create cookies, localStorage, sessionStorage, or IndexedDB entries.
- [ ] Confirm no account, sign-in, personal-data, advertising, or tracking prompt is present.

## Accessibility and responsive checks

- [ ] Complete all controls using keyboard only; focus must remain visible.
- [ ] Check the visible focus outline against the dark page and panel surfaces; verify it remains clear on locale buttons, action buttons, links, the category selector, and the focused main landmark.
- [ ] Confirm locale buttons expose the correct pressed state to assistive technology.
- [ ] After switching locales, confirm keyboard focus remains on the activated locale button and its updated pressed state is announced.
- [ ] After changing the category, confirm focus remains on the category selector; after choosing another joke, confirm focus remains on that action button.
- [ ] After Copy or Share completes (including fallback and failure), confirm focus remains on the activated button and the status message is announced once.
- [ ] Confirm the skip link and home link have localized accessible names after switching locales.
- [ ] Confirm decorative action glyphs are ignored by assistive technology.
- [ ] Confirm daily, random, and category-filtered joke updates are announced by a screen reader.
- [ ] Confirm the joke panel is announced as one polite, atomic update without repeating the separate category or decorative quotation mark.
- [ ] Confirm locale changes announce the updated joke in the newly selected document language without a duplicate status announcement.
- [ ] Confirm the skip link moves keyboard focus to the main landmark.
- [ ] Check a 320px-wide viewport and narrower effective widths produced by 200% browser/text zoom; confirm the header can wrap, the category label and filter stack cleanly, and no content is clipped.
- [ ] Check narrow phones, portrait tablet, landscape tablet, and desktop layouts for clipping, overlap, and horizontal scrolling.
- [ ] Check short landscape viewports; confirm vertical spacing is compact and all joke actions remain reachable by scrolling.
- [ ] Check text zoom and reduced-motion preferences.
- [ ] Confirm the header home link and category filter provide at least 44px touch targets.

## Evidence and release gate

- [ ] Run `node --check script.js` using Node.js 22 or newer.
- [ ] Run `node --test` and retain the complete output.
- [ ] After the complete application implementation is finished and the repository owner re-enables CI, run the code-quality workflows and retain their results.
- [ ] Record browser/device versions and any defects found.
- [ ] Do not package Android or submit to RuStore until source tests and required manual QA checks pass.

**Status:** checklist prepared; no manual QA item is claimed complete by this document.
