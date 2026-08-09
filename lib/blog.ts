import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  tags: string[];
  author: string;
  readingTime: string;
};

export type BlogPost = BlogPostMeta & {
  content: string;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function ensureDir() {
  if (!fs.existsSync(BLOG_DIR)) return [] as string[];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"));
}

export function getAllPosts(): BlogPostMeta[] {
  const files = ensureDir();
  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
      const { data, content } = matter(raw);
      const stats = readingTime(content);
      return {
        slug: String(data.slug || file.replace(/\.md$/, "")),
        title: String(data.title || "Sans titre"),
        date: String(data.date || "2026-01-01"),
        excerpt: String(data.excerpt || ""),
        cover: String(data.cover || "/images/articles/default.svg"),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        author: String(data.author || "EssentialAI Team"),
        readingTime: `${Math.max(1, Math.ceil(stats.minutes))} min de lecture`,
      } satisfies BlogPostMeta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const files = ensureDir();
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fileSlug = String(data.slug || file.replace(/\.md$/, ""));
    if (fileSlug !== slug) continue;
    const stats = readingTime(content);
    return {
      slug: fileSlug,
      title: String(data.title || "Sans titre"),
      date: String(data.date || "2026-01-01"),
      excerpt: String(data.excerpt || ""),
      cover: String(data.cover || "/images/articles/default.svg"),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      author: String(data.author || "EssentialAI Team"),
      readingTime: `${Math.max(1, Math.ceil(stats.minutes))} min de lecture`,
      content,
    };
  }
  return undefined;
}

export function getRelatedPosts(post: BlogPostMeta, limit = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.tags.some((tag) => post.tags.includes(tag)))
    .slice(0, limit);
}

export function extractHeadings(markdown: string): { id: string; text: string; level: number }[] {
  const lines = markdown.split("\n");
  const headings: { id: string; text: string; level: number }[] = [];
  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[2].replace(/[#*`]/g, "").trim();
    const id = text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    headings.push({ id, text, level: match[1].length });
  }
  return headings;
}

export function formatPostDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}
