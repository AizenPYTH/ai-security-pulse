import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import {
  categoryMeta,
  getCategoryBySlug,
  getToolsByCategory,
} from "@/lib/tools";

type PageProps = {
  params: { name: string };
};

export function generateStaticParams() {
  return categoryMeta.map((category) => ({ name: category.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const category = getCategoryBySlug(params.name);
  if (!category) return { title: "Catégorie introuvable" };
  return {
    title: `Top 10 ${category.name}`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: PageProps) {
  const category = getCategoryBySlug(params.name);
  if (!category) notFound();

  const tools = getToolsByCategory(category.name);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: category.name },
        ]}
      />

      <header className="mb-10">
        <p className="text-2xl" aria-hidden="true">
          {category.emoji}
        </p>
        <h1 className="mt-3 text-h2 text-ink">{category.name}</h1>
        <p className="mt-3 max-w-2xl text-body text-muted">
          {category.description}
        </p>
      </header>

      <div className="border-t border-line">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
}
