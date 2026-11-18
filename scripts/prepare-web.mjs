import { access, cp, mkdir, rm } from "node:fs/promises";
import { constants } from "node:fs";

const requiredFiles = ["index.html", "script.js", "styles.css"];
for (const file of requiredFiles) {
  await access(file, constants.R_OK);
}

await rm("www", { recursive: true, force: true });
await mkdir("www/assets", { recursive: true });

for (const file of requiredFiles) {
  await cp(file, `www/${file}`);
}

await cp("assets", "www/assets", { recursive: true });
console.log("Prepared local JestBox web assets in www/.");
