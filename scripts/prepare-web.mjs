import { access, cp, mkdir, rm, readFile, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { constants } from "node:fs";
import { marked } from "marked";

const requiredFiles = ["index.html", "script.js", "jokes.js", "share-bridge.bundle.js", "styles.css"];
for (const file of requiredFiles) await access(file, constants.R_OK);

await rm("www", { recursive: true, force: true });
await mkdir("www/assets", { recursive: true });
await mkdir("www/legal", { recursive: true });
for (const file of requiredFiles) await cp(file, `www/${file}`);
await cp("assets", "www/assets", { recursive: true });

try {
  await access("node_modules/.bin/esbuild", constants.X_OK);
  execFileSync("node_modules/.bin/esbuild", ["share-bridge.entry.js", "--bundle", "--format=iife", "--outfile=www/share-bridge.bundle.js"], { stdio: "inherit" });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  console.warn("esbuild is not installed; retaining the browser-safe share bridge stub.");
}

const locales = ["en-US", "es-PE", "ru-RU", "es-ES", "en-IN", "hi-IN"];
for (const locale of locales) {
  const suffix = locale === "en-US" ? "" : `.${locale}`;
  for (const [kind, prefix, title] of [
    ["privacy", "PRIVACY-POLICY", "Privacy Policy"],
    ["accessibility", "ACCESSIBILITY-STATEMENT", "Accessibility Statement"]
  ]) {
    const source = `${prefix}${suffix}.md`;
    const markdown = await readFile(source, "utf8");
    const body = marked.parse(markdown.replaceAll("assets/wcag22aa-blue.svg", "../assets/wcag22aa-blue.svg"));
    const page = `<!doctype html>
<html lang="${locale}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="dark light"><title>${title} — JestBox</title>
<style>
:root{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color-scheme:light dark}
body{margin:0;background:#101827;color:#f8f9ff;line-height:1.65}
main{width:min(900px,calc(100% - 2rem));margin:2rem auto;padding:clamp(1rem,4vw,2.5rem);background:#1b2940;border:1px solid #8092ad;border-radius:1rem}
a{color:#75e6da;overflow-wrap:anywhere}img{max-width:100%;height:auto}
h1,h2,h3{line-height:1.2}h1{font-size:clamp(1.6rem,4vw,2.3rem)}h2{margin-top:2rem}
li{margin:.35rem 0}code{overflow-wrap:anywhere}
.home{display:inline-block;margin:1rem 0;padding:.6rem 1rem;border:1px solid currentColor;border-radius:.6rem;text-decoration:none}
@media(prefers-color-scheme:light){body{background:#f4f0e7;color:#20252b}main{background:#fffdf7;border-color:#6d7884}a{color:#075d68}}
@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important;transition:none!important}}
</style></head><body><main><a class="home" href="../index.html">← JestBox</a><article>${body}</article><a class="home" href="../index.html">← JestBox</a></main></body></html>`;
    await writeFile(`www/legal/${kind}-${locale}.html`, page);
  }
}
console.log("Prepared local app assets and all 12 locale-specific legal pages in www/.");
