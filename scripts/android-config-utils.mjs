const WILDCARD_ACCESS = /<access\\b(?=[^>]*\\borigin\\s*=\\s*["']\\*["'])[^>]*\\/>/g;

export function restrictCordovaAccess(xml) {
  if (typeof xml !== "string") {
    throw new TypeError("Cordova config XML must be a string.");
  }

  const matches = xml.match(WILDCARD_ACCESS) ?? [];
  const restrictedXml = xml.replace(WILDCARD_ACCESS, "");
  const wildcardRemains = /<access\\b(?=[^>]*\\borigin\\s*=\\s*["']\\*["'])[^>]*\\/>/i.test(restrictedXml);

  if (wildcardRemains) {
    throw new Error("Wildcard Cordova network access remains after hardening.");
  }

  return { xml: restrictedXml, removed: matches.length };
}
