import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const portfolioDir = path.resolve(scriptDir, "..");
const rootDir = path.resolve(portfolioDir, "../..");
const outDir = path.resolve(portfolioDir, "dist/public");

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(srcPath, destPath);
    else fs.copyFileSync(srcPath, destPath);
  }
}

fs.mkdirSync(outDir, { recursive: true });

const assetsSrc = path.join(rootDir, "attached_assets");
const assetsDest = path.join(outDir, "attached-assets");
copyDir(assetsSrc, assetsDest);

console.log(`[copy-publish-assets] copied attached_assets → ${assetsDest}`);
