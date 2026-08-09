export const categories = [
  "AI Security",
  "Content Generation",
  "Image & Video Generation",
  "Data Analytics & BI",
  "Customer Service & Chatbots",
  "Productivity & Automation",
  "AI Code & Development",
  "HR & Recruitment",
  "Marketing & SEO",
  "Sales & CRM",
] as const;

export type CategoryName = (typeof categories)[number];

export type CategoryMeta = {
  name: CategoryName;
  slug: string;
  description: string;
  emoji: string;
};

export const categoryMeta: CategoryMeta[] = [
  {
    name: "AI Security",
    slug: "ai-security",
    description:
      "Protect LLMs, APIs and AI agents from prompt injection and abuse.",
    emoji: "🛡️",
  },
  {
    name: "Content Generation",
    slug: "content-generation",
    description: "Write, rewrite and scale enterprise content with AI.",
    emoji: "✍️",
  },
  {
    name: "Image & Video Generation",
    slug: "image-video-generation",
    description: "Create brand-ready visuals and video with generative AI.",
    emoji: "🎨",
  },
  {
    name: "Data Analytics & BI",
    slug: "data-analytics-bi",
    description: "Turn data into decisions with AI-assisted analytics.",
    emoji: "📊",
  },
  {
    name: "Customer Service & Chatbots",
    slug: "customer-service-chatbots",
    description: "Automate support with reliable AI assistants.",
    emoji: "💬",
  },
  {
    name: "Productivity & Automation",
    slug: "productivity-automation",
    description: "Orchestrate workflows and reclaim team hours.",
    emoji: "⚡",
  },
  {
    name: "AI Code & Development",
    slug: "ai-code-development",
    description: "Ship faster with AI coding assistants and review tools.",
    emoji: "💻",
  },
  {
    name: "HR & Recruitment",
    slug: "hr-recruitment",
    description: "Screen, interview and hire with AI-powered HR stacks.",
    emoji: "👥",
  },
  {
    name: "Marketing & SEO",
    slug: "marketing-seo",
    description: "Grow acquisition with AI marketing and SEO platforms.",
    emoji: "📈",
  },
  {
    name: "Sales & CRM",
    slug: "sales-crm",
    description: "Close more deals with AI sales intelligence and CRM.",
    emoji: "🤝",
  },
];

export function categoryToSlug(name: string): string {
  return (
    categoryMeta.find((c) => c.name === name)?.slug ||
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  );
}

export function getCategoryBySlug(slug: string): CategoryMeta | undefined {
  return categoryMeta.find((c) => c.slug === slug);
}
