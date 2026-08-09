const fs = require("fs");
const path = require("path");

// Read tools data from stdin as JSON after marker - instead embed via separate file
const dataPath = process.argv[2];
const tools = JSON.parse(fs.readFileSync(dataPath, "utf8"));

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    if (value.every((v) => typeof v === "string" || typeof v === "number" || typeof v === "boolean")) {
      return `[${value.map((v) => JSON.stringify(v)).join(", ")}]`;
    }
    return `[\n${value.map((v) => `${padIn}${serialize(v, indent + 1)}`).join(",\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    return `{\n${Object.entries(value)
      .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
      .join(",\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const out = `import {
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

const targets = process.argv.slice(3);
for (const t of targets) {
  fs.writeFileSync(t, out);
  console.log("Wrote", tools.length, "tools ->", t);
}
