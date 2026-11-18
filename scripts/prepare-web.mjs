import { access, cp, mkdir, rm } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { constants } from "node:fs";

const requiredFiles = ["index.html", "script.js", "jokes.js", "share-bridge.bundle.js", "styles.css"];
for (const file of requiredFiles) {
  await access(file, constants.R_OK);
}

await rm("www", { recursive: true, force: true });
await mkdir("www/assets", { recursive: true });

for (const file of requiredFiles) {
  await cp(file, `www/${file}`);
}

await cp("assets", "www/assets", { recursive: true });

try {
  await access("node_modules/.bin/esbuild", constants.X_OK);
  execFileSync("node_modules/.bin/esbuild", ["share-bridge.entry.js", "--bundle", "--format=iife", "--outfile=www/share-bridge.bundle.js"], { stdio: "inherit" });
} catch (error) {
  if (error.code !== "ENOENT") throw error;
  console.warn("esbuild is not installed; retaining the browser-safe share bridge stub.");
}
console.log("Prepared local JestBox web assets in www/.");
