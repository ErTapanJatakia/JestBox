# JestBox release QA checklist

**Scope:** six-locale redesign, ten themes, native share integration, accessibility controls, and Android wrapper.  
**Rule:** record device/browser/OS, viewport, assistive technology, date, outcome, and evidence. Do not mark a check complete without observing it.

## Functional and content checks

- [ ] Fresh launch defaults to American English (`en-US`).
- [ ] Search/select each locale: `en-US`, `es-PE`, `ru-RU`, `es-ES`, `en-IN`, and `hi-IN`.
- [ ] Confirm each locale displays its country on a separate line in the searchable selector.
- [ ] Confirm every visible line, heading, status, button label, accessible name, category, and dialog is localised after changing locale.
- [ ] Confirm changing locale resets the category to All Jokes and updates the page language/title.
- [ ] Confirm category search filters All Jokes, Everyday Life, Work & Study, Tech & Internet, Food & Drink, and Wordplay in every locale.
- [ ] Confirm every locale contains at least 100 unique, regionally appropriate jokes; minimum distribution is 20 per category.
- [ ] Confirm no exact joke text is reused across different locale collections; review model-assisted regional language and cultural fit without claiming native-speaker certification.
- [ ] Review jokes for natural language, local phrasing, cultural relevance, duplicates, offensive stereotypes, and category accuracy.
- [ ] Confirm the daily joke is stable for a given device-local date, locale, and category; confirm it changes appropriately after date/locale/category changes.
- [ ] Confirm the random-joke action does not immediately repeat when alternatives exist.
- [ ] Confirm Copy reports success only after the clipboard operation succeeds.
- [ ] On Android, confirm Share opens the native Android Sharesheet and exposes compatible installed sharing apps.
- [ ] On supported browsers, confirm Share uses the native Web Share API.
- [ ] Cancel the share panel and confirm cancellation is not reported as a successful share.
- [ ] Confirm unsupported sharing presents an explicit copy alternative without silently copying.
- [ ] Confirm the launch screen appears on every fresh launch, remains for five seconds by default, and dismisses on tap or keyboard activation.
- [ ] Confirm the mascot mark and consistent tagline appear on the launch screen.
- [ ] Confirm all ten themes update page, panel, input, dialog, button, focus, and footer colours consistently.
- [ ] Confirm theme changes do not reduce text or non-text contrast below the relevant WCAG 2.2 AA thresholds.

## Settings and accessibility

- [ ] Confirm larger-text setting visibly increases text and preserves usable controls.
- [ ] Confirm high-contrast setting improves visibility without hiding state or focus.
- [ ] Confirm reduced-motion setting suppresses non-essential animation and transitions.
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
- [ ] Inspect cookies and browser storage; app logic must not create cookies, localStorage, sessionStorage, or IndexedDB entries.
- [ ] Confirm no account, sign-in, analytics, advertising, tracking, or personal-data prompt appears.
- [ ] Confirm the app does not read existing clipboard contents.
- [ ] Confirm sharing is initiated only after an explicit user action and the user chooses the destination app.
- [ ] Review Android manifest permissions, packaged dependencies, and native plugin list.

## Documentation and release gates

- [ ] Verify all six localized Privacy Policies and Accessibility Statements match the current build.
- [ ] Verify developer/support, DPO, and WCAG auditor contact details.
- [ ] Verify Proprietary / All Rights Reserved licence remains in place.
- [ ] Verify Security Policy, Code of Conduct, Contributing Guidelines, and product documentation are current.
- [ ] Run source checks and review CI results for the exact final commit.
- [ ] Complete Android debug build and inspect APK contents/manifest/signature.
- [ ] Complete physical-device testing on supported Android versions and screen sizes.
- [ ] Do not sign a production release, create an AAB/release APK, or submit to RuStore until separately authorized.
