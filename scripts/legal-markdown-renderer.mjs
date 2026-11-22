function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function applyEmphasis(value) {
  return value
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>");
}

function safeLinkTarget(value) {
  try {
    const parsed = new URL(value);
    if (!["https:", "http:", "mailto:", "tel:"].includes(parsed.protocol)) return null;
    if ((parsed.protocol === "https:" || parsed.protocol === "http:") && !parsed.hostname) return null;
    return parsed.href;
  } catch {
    return null;
  }
}

function inlineMarkdown(value) {
  const tokens = [];
  const hold = (html) => {
    const index = tokens.push(html) - 1;
    return "\u0000" + index + "\u0000";
  };

  let source = value.replace(
    /\[!\[([^\]]*)\]\(assets\/wcag22aa-blue\.svg\)\]\((https:\/\/www\.w3\.org\/WAI\/WCAG22\/quickref\/)\)/g,
    (match, alt, target) => {
      const safeTarget = safeLinkTarget(target);
      if (!safeTarget) return match;
      return hold(
        '<a href="' + escapeHtml(safeTarget) + '">' +
        '<img class="reference-mark" src="../assets/wcag22aa-blue.svg" width="88" height="31" alt="' +
        escapeHtml(alt) + '" loading="lazy"></a>'
      );
    }
  );

  source = source.replace(
    /!\[([^\]]*)\]\(assets\/wcag22aa-blue\.svg\)/g,
    (_match, alt) => hold(
      '<img class="reference-mark" src="../assets/wcag22aa-blue.svg" width="88" height="31" alt="' +
      escapeHtml(alt) + '" loading="lazy">'
    )
  );

  source = source.replace(
    /\[([^\]]+)\]\((https?:\/\/[^ )]+|mailto:[^ )]+|tel:[^ )]+)\)/g,
    (match, label, target) => {
      const safeTarget = safeLinkTarget(target);
      if (!safeTarget) return match;
      return hold(
        '<a href="' + escapeHtml(safeTarget) + '">' +
        applyEmphasis(escapeHtml(label)) + '</a>'
      );
    }
  );

  const rendered = applyEmphasis(escapeHtml(source));
  return rendered.replace(/\u0000(\d+)\u0000/g, (_match, index) => tokens[Number(index)]);
}

export function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const out = [];
  let paragraph = [];
  let list = null;
  const flushParagraph = () => {
    if (paragraph.length) {
      out.push("<p>" + inlineMarkdown(paragraph.join(" ")) + "</p>");
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      out.push("</" + list + ">");
      list = null;
    }
  };

  for (const line of lines) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      out.push("<h" + level + ">" + inlineMarkdown(heading[2]) + "</h" + level + ">");
      continue;
    }
    if (/^\s*---+\s*$/.test(line)) {
      flushParagraph();
      flushList();
      out.push("<hr>");
      continue;
    }
    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      if (list !== "ul") {
        flushList();
        list = "ul";
        out.push("<ul>");
      }
      out.push("<li>" + inlineMarkdown(unordered[1]) + "</li>");
      continue;
    }
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (list !== "ol") {
        flushList();
        list = "ol";
        out.push("<ol>");
      }
      out.push("<li>" + inlineMarkdown(ordered[1]) + "</li>");
      continue;
    }
    flushList();
    paragraph.push(line.trim());
  }
  flushParagraph();
  flushList();
  return out.join("\n");
}
