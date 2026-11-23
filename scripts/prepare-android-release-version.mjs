import { readFile, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export async function prepareAndroidReleaseVersion({
  gradlePath = "android/app/build.gradle",
  versionCode = 2,
  versionName = "1.1"
} = {}) {
  if (!Number.isSafeInteger(versionCode) || versionCode < 2) {
    throw new Error("Android release versionCode must be an integer greater than or equal to 2.");
  }
  if (typeof versionName !== "string" || !/^\\d+\\.\\d+(?:\\.\\d+)?$/.test(versionName)) {
    throw new Error("Android release versionName must use a numeric dotted version.");
  }

  const source = await readFile(gradlePath, "utf8");
  const blocks = [...source.matchAll(/defaultConfig\\s*\\{([\\s\\S]*?)\\n\\s*\\}/g)];
  if (blocks.length !== 1) {
    throw new Error("Expected exactly one generated Android defaultConfig block; refusing to guess.");
  }

  const [blockMatch] = blocks;
  let config = blockMatch[1];
  const codeMatches = [...config.matchAll(/^\\s*versionCode\\s+\\d+\\s*$/gm)];
  const nameMatches = [...config.matchAll(/^\\s*versionName\\s+['"][^'"]+['"]\\s*$/gm)];
  if (codeMatches.length !== 1 || nameMatches.length !== 1) {
    throw new Error("Expected exactly one versionCode and one versionName in defaultConfig; refusing partial update.");
  }

  config = config.replace(/^\\s*versionCode\\s+\\d+\\s*$/m, `        versionCode ${versionCode}`);
  config = config.replace(/^\\s*versionName\\s+['"][^'"]+['"]\\s*$/m, `        versionName "${versionName}"`);
  const updated = source.replace(blockMatch[0], blockMatch[0].replace(blockMatch[1], config));

  if (!updated.includes(`versionCode ${versionCode}`) || !updated.includes(`versionName "${versionName}"`)) {
    throw new Error("Generated Android release version failed post-update verification.");
  }
  await writeFile(gradlePath, updated);
  return { versionCode, versionName };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const result = await prepareAndroidReleaseVersion();
  console.log(`Android release version prepared and verified: ${result.versionName} (${result.versionCode}).`);
}
