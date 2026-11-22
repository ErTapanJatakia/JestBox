const WCAG_IMAGE_SRC = "../assets/wcag22aa-blue.svg";
const WCAG_GUIDANCE_URL = "https://www.w3.org/WAI/WCAG22/quickref/";

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

export function parseInline(markdown) {
  const tokens = [];
  const pattern = /\[!\[([^\]]*)\]\(assets\/wcag22aa-blue\.svg\)\]\((https:\/\/www\.w3\.org\/WAI\/WCAG22\/quickref\/)\)|!\[([^\]]*)\]\(assets\/wcag22aa-blue\.svg\)|\[([^\]]+)\]\((https?:\/\/[^ )]+|mailto:[^ )]+|tel:[^ )]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let cursor = 0;

  for (const match of markdown.matchAll(pattern)) {
    if (match.index > cursor) {
      tokens.push({ type: "text", value: markdown.slice(cursor, match.index) });
    }

    if (match[1] !== undefined) {
      const href = safeLinkTarget(match[2]);
      if (href === WCAG_GUIDANCE_URL) {
        tokens.push({ type: "image", alt: match[1], src: WCAG_IMAGE_SRC, href });
      } else {
        tokens.push({ type: "text", value: match[0] });
      }
    } else if (match[3] !== undefined) {
      tokens.push({ type: "image", alt: match[3], src: WCAG_IMAGE_SRC });
    } else if (match[4] !== undefined) {
      const href = safeLinkTarget(match[5]);
      if (href) tokens.push({ type: "link", label: match[4], href });
      else tokens.push({ type: "text", value: match[0] });
    } else if (match[6] !== undefined) {
      tokens.push({ type: "strong", value: match[6] });
    } else if (match[7] !== undefined) {
      tokens.push({ type: "em", value: match[7] });
    }

    cursor = match.index + match[0].length;
  }

  if (cursor < markdown.length) {
    tokens.push({ type: "text", value: markdown.slice(cursor) });
  }
  return tokens;
}

export function parseMarkdown(markdown) {
  const blocks = [];
  let paragraph = [];
  let list = null;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push({ type: "paragraph", children: parseInline(paragraph.join(" ")) });
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const line of markdown.split(/\r?\n/)) {
    if (!line.trim()) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({ type: "heading", level: heading[1].length, children: parseInline(heading[2]) });
      continue;
    }

    if (/^\s*---+\s*$/.test(line)) {
      flushParagraph();
      flushList();
      blocks.push({ type: "rule" });
      continue;
    }

    const unordered = line.match(/^\s*[-*]\s+(.+)$/);
    const ordered = line.match(/^\s*\d+\.\s+(.+)$/);
    if (unordered || ordered) {
      flushParagraph();
      const orderedList = Boolean(ordered);
      const listType = orderedList ? "ordered-list" : "unordered-list";
      if (!list || list.type !== listType) {
        flushList();
        list = { type: listType, items: [] };
      }
      list.items.push(parseInline((ordered || unordered)[1]));
      continue;
    }

    flushList();
    paragraph.push(line.trim());
  }

  flushParagraph();
  flushList();
  return blocks;
}

function appendInline(tokens, parent, doc) {
  for (const token of tokens) {
    if (token.type === "text") {
      parent.appendChild(doc.createTextNode(token.value));
      continue;
    }

    if (token.type === "strong" || token.type === "em") {
      const element = doc.createElement(token.type);
      element.textContent = token.value;
      parent.appendChild(element);
      continue;
    }

    if (token.type === "link") {
      const anchor = doc.createElement("a");
      anchor.setAttribute("href", token.href);
      anchor.textContent = token.label;
      parent.appendChild(anchor);
      continue;
    }

    if (token.type === "image") {
      const image = doc.createElement("img");
      image.setAttribute("class", "reference-mark");
      image.setAttribute("src", token.src);
      image.setAttribute("width", "88");
      image.setAttribute("height", "31");
      image.setAttribute("alt", token.alt);
      image.setAttribute("loading", "lazy");
      if (token.href) {
        const anchor = doc.createElement("a");
        anchor.setAttribute("href", token.href);
        anchor.appendChild(image);
        parent.appendChild(anchor);
      } else {
        parent.appendChild(image);
      }
    }
  }
}

export function renderMarkdown(markdown, container, doc = document) {
  container.replaceChildren();
  for (const block of parseMarkdown(markdown)) {
    if (block.type === "rule") {
      container.appendChild(doc.createElement("hr"));
      continue;
    }

    if (block.type === "heading") {
      const heading = doc.createElement("h" + block.level);
      appendInline(block.children, heading, doc);
      container.appendChild(heading);
      continue;
    }

    if (block.type === "paragraph") {
      const paragraph = doc.createElement("p");
      appendInline(block.children, paragraph, doc);
      container.appendChild(paragraph);
      continue;
    }

    if (block.type === "ordered-list" || block.type === "unordered-list") {
      const list = doc.createElement(block.type === "ordered-list" ? "ol" : "ul");
      for (const item of block.items) {
        const listItem = doc.createElement("li");
        appendInline(item, listItem, doc);
        list.appendChild(listItem);
      }
      container.appendChild(list);
    }
  }
}
