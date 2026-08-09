import { getAllPosts } from "@/lib/blog";
import {
  categoryMeta,
  getToolsByCategory,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/tools";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const categoryItems = categoryMeta
    .map((category) => {
      const top = getToolsByCategory(category.name)[0];
      const url = `${SITE_URL}/category/${category.slug}`;
      return `
    <item>
      <title>${escapeXml(`Top 10 ${category.name}`)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escapeXml(
        top
          ? `#1 ${top.name} — ${category.description}`
          : category.description
      )}</description>
      <category>${escapeXml(category.name)}</category>
    </item>`;
    })
    .join("");

  const postItems = getAllPosts()
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <category>Blog</category>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>fr</language>${postItems}${categoryItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
