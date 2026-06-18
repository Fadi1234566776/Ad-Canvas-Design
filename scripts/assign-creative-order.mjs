import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const file = path.join(root, "data/creatives.json");
const creatives = JSON.parse(fs.readFileSync(file, "utf8"));

const counts = new Map();
for (const c of creatives) {
  const n = counts.get(c.categoryId) ?? 0;
  c.order = c.order ?? n;
  counts.set(c.categoryId, n + 1);
}

fs.writeFileSync(file, JSON.stringify(creatives, null, 2));
console.log(`Assigned order to ${creatives.length} creatives`);
