/**
 * Replace dead Clearbit logo URLs with local SVG logos in public/logos/
 * Usage: node scripts/migrate-logos-local.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const toolsPath = path.join(root, "lib", "tools.ts");
const logosDir = path.join(root, "public", "logos");

fs.mkdirSync(logosDir, { recursive: true });

const source = fs.readFileSync(toolsPath, "utf8");

// Split roughly by tool objects that have slug + logo
const toolBlocks = [...source.matchAll(/\{\s*id:\s*"[^"]+"[\s\S]*?\n\s*\}/g)];

function initials(name) {
  const cleaned = name.replace(/[^a-zA-Z0-9\s]/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return cleaned.slice(0, 2).toUpperCase() || "AI";
}

function svgFor(name, slug) {
  const label = initials(name);
  // Deterministic hue from slug
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  const hue = hash % 360;
  const bg = `hsl(${hue} 72% 46%)`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256" role="img" aria-label="${name}">
  <rect width="256" height="256" rx="48" fill="${bg}"/>
  <text x="128" y="142" text-anchor="middle" font-family="system-ui,Segoe UI,sans-serif" font-size="96" font-weight="700" fill="#fff">${label}</text>
</svg>
`;
}

let replaced = 0;
let generated = 0;
let next = source;

for (const match of toolBlocks) {
  const block = match[0];
  const slugMatch = /slug:\s*"([^"]+)"/.exec(block);
  const nameMatch = /name:\s*"([^"]+)"/.exec(block);
  const logoMatch = /logo:\s*"([^"]+)"/.exec(block);
  if (!slugMatch || !nameMatch || !logoMatch) continue;

  const slug = slugMatch[1];
  const name = nameMatch[1];
  const logo = logoMatch[1];

  if (!logo.includes("logo.clearbit.com")) continue;

  const localPath = `/logos/${slug}.svg`;
  const filePath = path.join(logosDir, `${slug}.svg`);
  fs.writeFileSync(filePath, svgFor(name, slug));
  generated++;

  const oldLogoLine = `logo: "${logo}"`;
  const newLogoLine = `logo: "${localPath}"`;
  if (next.includes(oldLogoLine)) {
    next = next.replace(oldLogoLine, newLogoLine);
    replaced++;
  }
}

fs.writeFileSync(toolsPath, next);
console.log(`Generated ${generated} SVGs in public/logos/`);
console.log(`Replaced ${replaced} Clearbit URLs in lib/tools.ts`);
