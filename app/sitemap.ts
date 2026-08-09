import type { MetadataRoute } from "next";
import { categoryMeta, SITE_URL, tools } from "@/lib/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const categories = categoryMeta.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const toolPages = tools.map((tool) => ({
    url: `${SITE_URL}/tool/${tool.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/search`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...categories,
    ...toolPages,
  ];
}
