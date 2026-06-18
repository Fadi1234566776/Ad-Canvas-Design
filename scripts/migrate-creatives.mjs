import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = fs.readFileSync(
  path.join(root, "artifacts/portfolio/src/data/projects.ts"),
  "utf8",
);

const importMap = {};
for (const m of content.matchAll(/import (\w+) from "@assets\/([^"]+)"/g)) {
  importMap[m[1]] = m[2];
}

const sections = { feedAds: "feed", storyAds: "story", squareAds: "square" };
const creatives = [];
const orderCounts = {};

for (const [arrName, categoryId] of Object.entries(sections)) {
  const re = new RegExp(
    `export const ${arrName}[\\s\\S]*?\\[([\\s\\S]*?)\\];`,
    "m",
  );
  const block = content.match(re)?.[1] ?? "";
  for (const m of block.matchAll(
    /\{\s*id:\s*"([^"]+)",\s*imageUrl:\s*(\w+),\s*format:\s*"([^"]+)"\s*\}/g,
  )) {
    const [, id, varName, format] = m;
    const imagePath = importMap[varName];
    if (imagePath) {
      const order = orderCounts[categoryId] ?? 0;
      orderCounts[categoryId] = order + 1;
      creatives.push({ id, imagePath, aspectRatio: format, categoryId, order });
    }
  }
}

const out = path.join(root, "data/creatives.json");
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(creatives, null, 2));
console.log(`Wrote ${creatives.length} creatives to data/creatives.json`);
