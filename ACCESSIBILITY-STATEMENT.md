# JestBox Accessibility Statement

**Last reviewed:** 18 November 2026  
**Product:** JestBox  
**Applies to:** The current browser-based JestBox interface in this repository.

## Our commitment

JestBox aims to be usable by as many people as possible, including people who navigate by keyboard, use assistive technologies, need enlarged text, or use operating-system accessibility settings. Accessibility is treated as an ongoing engineering and quality activity.

We use the **Web Content Accessibility Guidelines (WCAG) 2.2 Level AA** as our design and evaluation target. This is a target, not a declaration that the application has been independently audited or formally certified as conformant.

## Accessibility features implemented

The current source includes the following measures:

- Semantic page structure with header, main content, sections, and footer landmarks.
- A skip link that moves users to the main content.
- Programmatic labels for the language selector group and category control.
- Native buttons and a native select control for standard keyboard interaction.
- Visible keyboard-focus indicators.
- Accessible names for the home link and localized controls.
- Pressed-state information for the active language choice.
- A polite, atomic live region for joke content updates and a separate status region for Copy/Share feedback.
- Decorative emoji and action glyphs hidden from assistive technology where appropriate.
- Responsive layouts, text wrapping, and touch targets designed to be comfortably operable.
- Reduced-motion handling using the user's system preference.
- Forced-colors styling to preserve visible boundaries and focus indicators in high-contrast modes.
- Localized interface language metadata for American English (`en-US`) and Russian (`ru-RU`).

These are implementation measures, not proof that every user journey works with every browser or assistive technology.

## Conformance status and testing

JestBox is being developed toward WCAG 2.2 AA. **No formal WCAG conformance claim is made in this statement.** Conformance requires evaluation of the complete user experience against all applicable success criteria, including manual testing in representative environments.

The project maintainer has reported that manual QA has been completed. However, a detailed public test record identifying exact browser and operating-system versions, assistive technology, test results, and evidence has not yet been included in this repository. Therefore this statement does not claim independently verified screen-reader compatibility, formal WCAG 2.2 AA conformance, or third-party certification.

The repository's `QA-CHECKLIST.md` defines checks for keyboard operation, focus order, live announcements, language changes, contrast, zoom/reflow, reduced motion, forced colors, and responsive layouts. The checklist should be accompanied by a dated execution record before a formal conformance statement is considered.

## Known limitations and scope

- Accessibility behavior can vary by browser, operating system, screen reader, speech input, and device settings.
- Native clipboard and share dialogs are provided by the browser or operating system and are outside the app's direct control.
- This statement covers the browser application source. Any Android wrapper, native package, app-store listing, or future platform-specific interface requires its own accessibility review.
- No third-party accessibility audit or certification is represented here.

If you encounter a barrier, please report the affected page or control, the action you attempted, your browser/device and assistive-technology versions (if relevant), and the result you expected. Do not include sensitive personal information.

## WCAG auditor contact information

The contact information for the WCAG auditor is:

- **Name:** Er. Tapan Jatakia (C. Eng.)
- **Email — Russia:** [ertapanjatakia@yandex.com](mailto:ertapanjatakia@yandex.com)
- **Email — regions outside Russia:** [tapan_ditu_17.20@outlook.com](mailto:tapan_ditu_17.20@outlook.com)
- **Phone:** [+91 9664332984](tel:+919664332984)
- **Website:** [https://linktr.ee/ertapanjatakia](https://linktr.ee/ertapanjatakia)

## Feedback and accessibility requests

For accessibility barriers or questions about this statement, contact the WCAG auditor using the regional email address above or the telephone number. You may also use the [JestBox GitHub repository](https://github.com/ErTapanJatakia/JestBox).

When reporting a barrier, include the affected page or control, the action attempted, the expected result, and browser/device or assistive-technology versions where relevant. Do not include passwords, account credentials, or other sensitive personal information in a public issue.

## Review

This statement should be reviewed whenever the app's interface, supported platforms, accessibility implementation, or test evidence changes. Corrections and improvements are part of ongoing maintenance.

---

## Reference standards

- [W3C — Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WAI — Developing an Accessibility Statement](https://www.w3.org/WAI/planning/statements/)
