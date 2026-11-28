# JestBox User Guide

## Purpose

JestBox is an offline-first joke application. This guide describes the current product experience at a high level; exact interface labels may change as the app evolves.

## First use and language selection

Choose one of the available language/region experiences:
- en-US — American English
- es-PE — Peruvian Spanish
- ru-RU — Russian
- es-ES — Spanish (Spain)
- en-IN — Indian English
- hi-IN — Indian Hindi
- ur-IN — Indian Urdu
- ur-PK — Pakistani Urdu

The default locale is en-US. Content is intended to reflect regional language usage rather than literal word-for-word translation.

## Reading and sharing jokes

Browse the locally bundled joke content. When the user chooses the share action, Android's share interface is invoked through the Capacitor Share integration. The user chooses whether and where to share the displayed joke.

## Offline behaviour and privacy

The application is designed to work offline using bundled content. Preferences are stored locally on the device. The application does not require an account for its core experience. Device backup, OS-level sharing and third-party destinations remain subject to Android and the selected destination's behaviour.

## Support and security reports

For defects, use the repository's issue/reporting process. For suspected security vulnerabilities, do not publish exploit details in a public issue; follow the private reporting instructions in SECURITY.md.

## Limitations

This guide is not a device compatibility guarantee. Android version, manufacturer customizations and share-target availability may affect behaviour. Consult current release notes and supported distribution information before installing a build.
