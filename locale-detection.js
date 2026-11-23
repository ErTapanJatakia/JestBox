/* First-launch locale selection. Reads only the browser/WebView locale preferences. */
(function (root) {
  "use strict";

  const DEFAULT_LOCALE = "en-US";
  const LANGUAGE_DEFAULTS = Object.freeze({
    en: "en-US",
    es: "es-ES",
    hi: "hi-IN",
    ru: "ru-RU",
    ur: "ur-PK"
  });

  function detectPreferredLocale(preferences, supportedLocales) {
    const supported = Array.isArray(supportedLocales) && supportedLocales.length
      ? supportedLocales
      : [DEFAULT_LOCALE];
    const byTag = new Map(supported.map((code) => [String(code).toLowerCase(), code]));
    const requested = (Array.isArray(preferences) ? preferences : [preferences])
      .filter((value) => typeof value === "string" && value.trim())
      .map((value) => value.trim().replace(/_/g, "-").toLowerCase());

    // Prefer an exact regional match anywhere in the system's ordered language list.
    for (const tag of requested) {
      if (byTag.has(tag)) return byTag.get(tag);
    }

    // If the device supplies only a language or an unsupported region, use a
    // deterministic supported regional default for that language.
    for (const tag of requested) {
      const language = tag.split("-")[0];
      const fallback = LANGUAGE_DEFAULTS[language];
      if (fallback && byTag.has(fallback.toLowerCase())) return byTag.get(fallback.toLowerCase());
    }

    return byTag.get(DEFAULT_LOCALE.toLowerCase()) || supported[0];
  }

  root.JestBoxLocaleDetection = Object.freeze({ detectPreferredLocale });
})(globalThis);
