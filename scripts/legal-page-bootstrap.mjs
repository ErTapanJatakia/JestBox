import { renderMarkdown } from "./legal-markdown-renderer.mjs";

const article = document.getElementById("legal-content");
if (!article) {
  throw new Error("The legal-page content container is missing.");
}

const encoded = article.getAttribute("data-markdown") || "";
const binary = atob(encoded);
const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
const markdown = new TextDecoder().decode(bytes);
renderMarkdown(markdown, article);
