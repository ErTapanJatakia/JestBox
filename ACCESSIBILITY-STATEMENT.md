# JestBox Accessibility Statement

**Last reviewed:** 18 November 2026  
**Product:** JestBox  
**Applies to:** The JestBox browser application and the English and Russian Accessibility Statements, as specified in the conformance claim below.

## Our commitment

<p align="center"><a href="https://www.w3.org/WAI/WCAG2AA-Conformance" title="Explanation of WCAG 2 Level AA conformance"><img src="assets/wcag22aa-blue.svg" width="88" height="31" alt="Level AA conformance, W3C Web Content Accessibility Guidelines 2.2"></a></p>

JestBox aims to be usable by as many people as possible, including people who navigate by keyboard, use assistive technologies, need enlarged text, or use operating-system accessibility settings. Accessibility is treated as an ongoing engineering and quality activity.

We use the **Web Content Accessibility Guidelines (WCAG) 2.2 Level AA** as our design and evaluation standard. The maintainer's conformance claim and its scope are set out below; it is not a statement of W3C endorsement or independent third-party certification.

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

## WCAG 2.2 Level AA conformance claim

**Claim date:** 18 November 2026  
**Guideline:** [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)  
**Conformance level claimed:** Level AA  
**Claimant:** JestBox maintainer, Er. Tapan Jatakia (C. Eng.)

The maintainer claims that the pages listed in the scope below conform to WCAG 2.2 Level AA, including all applicable Level A and Level AA success criteria.

**Scope of this claim:**
- The complete JestBox single-page browser application served from the project root (`index.html`), including both American English (`en-US`) and Russian (`ru-RU`) interface states and responsive presentations.
- This English Accessibility Statement: [ACCESSIBILITY-STATEMENT.md](https://github.com/ErTapanJatakia/JestBox/blob/feat/bilingual-en-us-ru-ru/ACCESSIBILITY-STATEMENT.md).
- This Russian Accessibility Statement: [ACCESSIBILITY-STATEMENT.ru-RU.md](https://github.com/ErTapanJatakia/JestBox/blob/feat/bilingual-en-us-ru-ru/ACCESSIBILITY-STATEMENT.ru-RU.md).

**Web technologies relied upon:** HTML5, CSS, and JavaScript, using standard browser accessibility interfaces and native HTML controls.

This is the content provider's own conformance claim. The W3C/WAI logo does not mean that W3C or WAI reviewed, tested, or endorsed JestBox. The maintainer is responsible for keeping the claim accurate and re-evaluating the complete scope whenever content, code, dependencies, or supported environments change. The claim does not extend to Android packages, app-store listings, third-party hosting interfaces, or other pages not explicitly listed above.

The project maintainer reports that manual QA has been completed. A detailed public execution record with browser/OS versions, assistive-technology combinations, criterion-by-criterion results, and supporting evidence is not currently included in this repository. The claim is made by the maintainer; no independent third-party audit or certification is represented. The repository's `QA-CHECKLIST.md` records the evaluation areas, including keyboard operation, focus order, live announcements, language changes, contrast, zoom/reflow, reduced motion, forced colors, and responsive layouts.

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

<p align="center"><a href="https://www.w3.org/WAI/WCAG2AA-Conformance" title="Explanation of WCAG 2 Level AA conformance"><img src="assets/wcag22aa-blue.svg" width="88" height="31" alt="Level AA conformance, W3C Web Content Accessibility Guidelines 2.2"></a></p>

## Reference standards

- [W3C — Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C WAI — Developing an Accessibility Statement](https://www.w3.org/WAI/planning/statements/)
