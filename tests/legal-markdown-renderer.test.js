import test from "node:test";
import assert from "node:assert/strict";
import { renderMarkdown } from "../scripts/legal-markdown-renderer.mjs";

test("renders the approved linked WCAG reference image without raw HTML input", () => {
  const output = renderMarkdown("[![WCAG reference](assets/wcag22aa-blue.svg)](https://www.w3.org/WAI/WCAG22/quickref/)");
  assert.match(output, /<a href="https:\/\/www\.w3\.org\/WAI\/WCAG22\/quickref\/">/);
  assert.match(output, /<img class="reference-mark" src="\.\.\/assets\/wcag22aa-blue\.svg"/);
  assert.match(output, /alt="WCAG reference"/);
});

test("escapes raw HTML instead of passing it through", () => {
  const output = renderMarkdown('<img src=x onerror="alert(1)">');
  assert.doesNotMatch(output, /<img\b/);
  assert.match(output, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("allows safe link schemes and escapes URL attribute content", () => {
  const output = renderMarkdown('[Docs](https://example.com/path?a=1&b=2) [Mail](mailto:help@example.com)');
  assert.match(output, /href="https:\/\/example\.com\/path\?a=1&amp;b=2"/);
  assert.match(output, /href="mailto:help@example\.com"/);
});

test("does not create active links for unsafe or attribute-injected targets", () => {
  const output = renderMarkdown('[Run](javascript:alert(1)) [Trap](https://example.com/%22%20onmouseover=%22alert(1))');
  assert.doesNotMatch(output, /href="javascript:/);
  assert.doesNotMatch(output, /onmouseover="alert/);
  assert.match(output, /&lpar;|javascript:alert/);
});

test("retains headings, emphasis, lists and plain text", () => {
  const output = renderMarkdown("# Heading\n\nA **bold** and *italic* paragraph.\n\n- First\n- Second");
  assert.match(output, /<h1>Heading<\/h1>/);
  assert.match(output, /<strong>bold<\/strong>/);
  assert.match(output, /<em>italic<\/em>/);
  assert.match(output, /<ul><li>First<\/li><li>Second<\/li><\/ul>/);
});
