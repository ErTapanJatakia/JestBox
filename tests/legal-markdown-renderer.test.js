import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { parseInline, parseMarkdown, renderMarkdown } from "../scripts/legal-markdown-renderer.mjs";

class FakeNode {
  constructor(tagName, text = "") {
    this.tagName = tagName;
    this.textContent = text;
    this.children = [];
    this.attributes = {};
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  replaceChildren(...children) {
    this.children = children;
  }
  setAttribute(name, value) {
    this.attributes[name] = value;
  }
}

const fakeDocument = {
  createElement: (tagName) => new FakeNode(tagName),
  createTextNode: (text) => new FakeNode("#text", text)
};

function findNodes(node, tagName) {
  const found = [];
  for (const child of node.children) {
    if (child.tagName === tagName) found.push(child);
    found.push(...findNodes(child, tagName));
  }
  return found;
}

test("parses only the approved linked WCAG reference image", () => {
  const tokens = parseInline("[![WCAG reference](assets/wcag22aa-blue.svg)](https://www.w3.org/WAI/WCAG22/quickref/)");
  assert.deepEqual(tokens, [{
    type: "image",
    alt: "WCAG reference",
    src: "../assets/wcag22aa-blue.svg",
    href: "https://www.w3.org/WAI/WCAG22/quickref/"
  }]);
});

test("keeps raw HTML as inert text rather than interpreting it", () => {
  const raw = '<img src=x onerror="alert(1)">';
  const tokens = parseInline(raw);
  assert.deepEqual(tokens, [{ type: "text", value: raw }]);

  const container = new FakeNode("article");
  renderMarkdown(raw, container, fakeDocument);
  assert.equal(findNodes(container, "img").length, 0);
  assert.equal(container.children[0].children[0].textContent, raw);
});

test("allows only safe link schemes and normalizes link destinations", () => {
  const tokens = parseInline('[Docs](https://example.com/path?a=1&b=2) [Mail](mailto:help@example.com) [Phone](tel:+123456789) [Bad](javascript:alert(1))');
  const links = tokens.filter((token) => token.type === "link");
  assert.equal(links.length, 3);
  assert.equal(links[0].href, "https://example.com/path?a=1&b=2");
  assert.equal(links[1].href, "mailto:help@example.com");
  assert.equal(links[2].href, "tel:+123456789");
  assert.ok(tokens.some((token) => token.type === "text" && token.value.includes("javascript:alert")));
});

test("link destinations cannot inject HTML attributes", () => {
  const tokens = parseInline('[Trap](https://example.com/%22%20onmouseover=%22alert(1))');
  const link = tokens.find((token) => token.type === "link");
  assert.ok(link);
  assert.ok(link.href.includes("%22"));
  assert.ok(!link.href.includes('"'));
});

test("renders headings, emphasis, lists, links and reference images using DOM nodes", () => {
  const markdown = "# Heading\n\nA **bold** and *italic* paragraph with [Docs](https://example.com).\n\n- First\n- Second\n\n[![Mark](assets/wcag22aa-blue.svg)](https://www.w3.org/WAI/WCAG22/quickref/)";
  const container = new FakeNode("article");
  renderMarkdown(markdown, container, fakeDocument);
  assert.equal(findNodes(container, "h1").length, 1);
  assert.equal(findNodes(container, "strong").length, 1);
  assert.equal(findNodes(container, "em").length, 1);
  assert.equal(findNodes(container, "ul").length, 1);
  assert.equal(findNodes(container, "li").length, 2);
  assert.equal(findNodes(container, "a").length, 2);
  const images = findNodes(container, "img");
  assert.equal(images.length, 1);
  assert.equal(images[0].attributes.src, "../assets/wcag22aa-blue.svg");
  assert.equal(images[0].attributes.alt, "Mark");
});

test("all eight localized accessibility statements use the approved safe image syntax", async () => {
  const locales = ["", ".en-IN", ".es-PE", ".es-ES", ".ru-RU", ".hi-IN", ".ur-IN", ".ur-PK"];
  for (const locale of locales) {
    const markdown = await readFile(new URL("../ACCESSIBILITY-STATEMENT" + locale + ".md", import.meta.url), "utf8");
    const blocks = parseMarkdown(markdown);
    const images = blocks.flatMap((block) => block.children ?? [])
      .flatMap((token) => token.type === "image" ? [token] : []);
    assert.equal(images.length, 2, locale || "en-US");
    assert.ok(images.every((image) => image.src === "../assets/wcag22aa-blue.svg"));
  }
});
