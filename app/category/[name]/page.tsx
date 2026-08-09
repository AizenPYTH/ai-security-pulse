import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ToolCard from "@/components/ToolCard";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
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

      <Reveal className="mb-14">
        <p className="text-3xl" aria-hidden="true">
          {category.emoji}
        </p>
        <h1 className="mt-5 text-h2 text-ink sm:text-[2.5rem]">
          {category.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-muted">
          {category.description}
        </p>
      </Reveal>

      <Stagger className="border-t border-line">
        {tools.map((tool) => (
          <StaggerItem key={tool.id}>
            <ToolCard tool={tool} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
