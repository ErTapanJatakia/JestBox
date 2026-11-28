# JestBox Accessibility Review

## Scope

Review the web application, Android wrapper, language selector, jokes/content, themes, settings, legal pages, keyboard operation, screen-reader announcements and responsive layouts.

## Requirements

- Use semantic HTML and logical heading hierarchy.
- Provide meaningful accessible names for controls and informative images.
- Preserve keyboard operation, visible focus and sensible focus order.
- Support text resizing, reflow, contrast, reduced motion and forced-colors presentation.
- Ensure status is not conveyed by colour alone.
- Support right-to-left layout and correct language metadata for Urdu.
- Keep all interface labels and announcements localized.
- Avoid flashing content and provide alternatives for motion-dependent information.

## Review procedure

For material UI changes:
1. Run automated regression and responsive checks.
2. Inspect keyboard-only operation and focus visibility.
3. Inspect representative narrow and wide viewports.
4. Check text enlargement, contrast modes, reduced motion and forced colours.
5. Test screen-reader names and announcements on supported platforms where available.
6. Record device, OS, browser, assistive technology, viewport, date, observed result and evidence.

## Limitations

Automated checks and source review do not establish full WCAG conformance. Do not claim independent accessibility certification or complete assistive-technology coverage without recorded testing.

## Maintenance

Review when UI, themes, localization, navigation, native bridge or legal pages change.
