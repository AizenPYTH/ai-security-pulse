const fs = require("fs");
const path = require("path");

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((v) => typeof v === "string")) {
      return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    }
    return `[\n${value
      .map((v) => `${padIn}${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value);
    return `{\n${entries
      .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

["gen-part2.js", "gen-part3.js", "gen-part4.js", "gen-part5.js"].forEach((f) => {
  require(path.join(__dirname, f));
});

const parts = [
  "tools-part1.json",
  "tools-part2.json",
  "tools-part3.json",
  "tools-part4.json",
  "tools-part5.json",
].map((f) => JSON.parse(fs.readFileSync(path.join(__dirname, f), "utf8")));

const tools = parts.flat();
if (tools.length !== 100) {
  console.error("Expected 100 tools, got", tools.length);
  process.exit(1);
}

const iasecure = tools.find((t) => t.slug === "iasecure");
if (!iasecure || iasecure.rank !== 1) {
  console.error("iasecure must be rank 1");
  process.exit(1);
}

const content = `import {
  categories,
  categoryToSlug,
  getCategoryBySlug,
  categoryMeta,
} from "./categories";

export { categories, categoryToSlug, getCategoryBySlug, categoryMeta };

export interface Tool {
  id: string;
  slug: string;
  name: string;
  category: string;
  rank: number;
  logo: string;
  description: string;
  features: string[];
  pricing: string;
  website: string;
  rating: number;
  reviews: number;
  image: string;
  whyBest?: string;
}

export const tools: Tool[] = ${serialize(tools)};

export const SITE_NAME = "AISecurityPulse";
export const SITE_DESCRIPTION =
  "Top 10 AI & cybersecurity tools classés par catégorie — comparatifs style ProductHunt / G2.";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aisecuritypulse.com";

export function getAllTools(): Tool[] {
  return [...tools].sort(
    (a, b) => a.rank - b.rank || a.name.localeCompare(b.name)
  );
}

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((tool) => tool.slug === slug);
}

export function getToolsByCategory(category: string): Tool[] {
  return tools
    .filter((tool) => tool.category.toLowerCase() === category.toLowerCase())
    .sort((a, b) => a.rank - b.rank);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return tools.filter((tool) => {
    const haystack = [
      tool.name,
      tool.description,
      tool.category,
      tool.pricing,
      ...tool.features,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return getToolsByCategory(tool.category)
    .filter((t) => t.slug !== tool.slug)
    .slice(0, limit);
}
`;

fs.writeFileSync(path.join(__dirname, "..", "lib", "tools.ts"), content);
console.log("Wrote lib/tools.ts with", tools.length, "tools");
console.log("iasecure:", iasecure.rank, iasecure.logo);
console.log(
  "categories:",
  [...new Set(tools.map((t) => t.category))].length
);
