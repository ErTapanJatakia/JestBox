# JestBox release QA checklist

**Scope:** eight-locale redesign, ten themes, native share integration, accessibility controls, and Android wrapper.  
**Rule:** record device/browser/OS, viewport, assistive technology, date, outcome, and evidence. Do not mark a check complete without observing it.

## Functional and content checks

- [ ] Fresh launch defaults to American English (`en-US`).
- [ ] Search/select each locale: `en-US`, `es-PE`, `ru-RU`, `es-ES`, `en-IN`, `hi-IN`, `ur-IN`, and `ur-PK`.
- [ ] Confirm each locale displays its country on a separate line in the searchable selector.
- [ ] Confirm every visible line, heading, status, button label, accessible name, category, and dialog is localised after changing locale.
- [ ] Confirm changing locale resets the category to All Jokes and updates the page language/title.
- [ ] Confirm category search filters All Jokes, Everyday Life, Work & Study, Tech & Internet, Food & Drink, and Wordplay in every locale.
- [ ] Confirm every locale contains at least 100 unique, regionally appropriate jokes; minimum distribution is 20 per category.
- [ ] Confirm no exact joke text is reused across different locale collections; review grammar, idiom, humour, and regional cultural fit for each locale.
- [ ] Review jokes for natural language, local phrasing, cultural relevance, duplicates, offensive stereotypes, and category accuracy.
- [ ] Confirm the daily joke is stable for a given device-local date, locale, and category; confirm it changes appropriately after date/locale/category changes.
- [ ] Confirm the random-joke action does not immediately repeat when alternatives exist.
- [ ] Confirm Copy reports success only after the clipboard operation succeeds.
- [ ] On Android, confirm Share opens the native Android Sharesheet and exposes compatible installed sharing apps.
- [ ] On supported browsers, confirm Share uses the native Web Share API.
- [ ] Cancel the share panel and confirm cancellation is not reported as a successful share.
- [ ] Confirm unsupported sharing presents an explicit copy alternative without silently copying.
- [ ] Confirm the launch screen appears on every fresh launch, remains for five seconds by default, dismisses on tap or keyboard activation, and fits both portrait and landscape phone layouts.
- [ ] Confirm the dashboard begins with the locale and joke panels without the two launch-only marketing lines.
- [ ] Confirm locale and category menus open on the first tap, list every option, and sort options alphabetically.
- [ ] Confirm the mascot mark and consistent tagline appear on the launch screen.
- [ ] Confirm all ten theme buttons appear inside Settings below Accessibility, each uses its own palette, and the active theme is clearly indicated.
- [ ] Confirm the header contains only the Settings gear control.
- [ ] Confirm text size ranges from 50% to 200%, defaults to 85%, and remains usable at the extremes.
- [ ] Confirm extra contrast, reduced motion, underlined links, larger touch targets, increased line spacing, and stronger focus outlines work.
- [ ] Confirm theme changes do not reduce text or non-text contrast below the relevant WCAG 2.2 AA thresholds.

## Settings and accessibility

- [ ] Confirm every accessibility preference and selected theme persists after closing and reopening the app.
- [ ] Complete all actions using keyboard only; verify logical order, visible focus, Escape behavior, and no keyboard trap.
- [ ] Test searchable combobox/listbox controls with keyboard arrows, Enter, Escape, and screen readers.
- [ ] Confirm dialog names, close buttons, focus entry, focus containment, and focus restoration.
- [ ] Confirm joke changes and action feedback are announced politely and once.
- [ ] Test 200% and 400% zoom, text resizing, 320 CSS-pixel reflow, portrait, landscape, and short-height screens.
- [ ] Test all ten themes with text contrast and 3:1 non-text contrast measurements.
- [ ] Test system forced-colors/high-contrast mode and system reduced-motion preference.
- [ ] Verify footer privacy link, Accessibility Statement link, and WCAG graphic placement.
- [ ] Verify WCAG graphic at the top and bottom of every localized Accessibility Statement.
- [ ] Test TalkBack and at least one desktop screen reader/browser combination.

## Privacy and offline checks

- [ ] Verify the core experience works offline after app assets have loaded.
- [ ] Inspect network activity; app logic must not call external APIs or telemetry endpoints.
- [ ] Inspect browser storage; only the `jestbox.preferences.v1` local preference record may be written. Confirm it contains display/accessibility preferences only and is not transmitted or synced.
- [ ] Confirm no account, sign-in, analytics, advertising, tracking, or personal-data prompt appears.
- [ ] Confirm the app does not read existing clipboard contents.
- [ ] Confirm sharing is initiated only after an explicit user action and the user chooses the destination app.
- [ ] Review Android manifest permissions, packaged dependencies, and native plugin list.

## Documentation and release gates

- [ ] Verify all eight Privacy Policies and all eight Accessibility Statements are translated into their matching language locale and describe the current build.
- [ ] Verify developer/support, DPO, and WCAG auditor contact details.
- [ ] Verify Proprietary / All Rights Reserved licence remains in place.
- [ ] Verify Security Policy, Code of Conduct, Contributing Guidelines, and product documentation are current.
- [ ] Run source checks and review CI results for the exact final commit.
- [ ] Complete Android debug build and inspect APK contents/manifest/signature.
- [x] Complete physical-device acceptance for the Urdu locales (`ur-IN` and `ur-PK`) — maintainer-confirmed pass on 2026-11-19; device/OS matrix is not recorded here.
- [ ] Do not sign a production release, create an AAB/release APK, or submit to RuStore until separately authorized.
