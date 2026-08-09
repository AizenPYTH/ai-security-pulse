import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import RatingStars from "@/components/RatingStars";
import ToolCard from "@/components/ToolCard";
import ToolLogo from "@/components/ToolLogo";
import {
  categoryToSlug,
  getRelatedTools,
  getToolBySlug,
  tools,
  SITE_NAME,
  SITE_URL,
} from "@/lib/tools";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return { title: "Outil introuvable" };

  return {
    title: `${tool.name} — #${tool.rank} ${tool.category}`,
    description: tool.tagline || tool.description,
    openGraph: {
      title: `${tool.name} | ${SITE_NAME}`,
      description: tool.description,
      url: `${SITE_URL}/tool/${tool.slug}`,
      images: [{ url: tool.image, width: 1200, height: 600, alt: tool.name }],
      siteName: SITE_NAME,
    },
  };
}

export default function ToolPage({ params }: PageProps) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool, 3);

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          {
            label: tool.category,
            href: `/category/${categoryToSlug(tool.category)}`,
          },
          { label: tool.name },
        ]}
      />

      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
        <div>
          <ToolLogo name={tool.name} logo={tool.logo} size={128} />
          <p className="mt-6 text-sm text-muted">
            #{tool.rank} · {tool.category}
          </p>
          <h1 className="mt-2 text-h2 text-ink sm:text-[40px]">{tool.name}</h1>
          <p className="mt-3 text-body text-muted">{tool.tagline}</p>
          <div className="mt-5">
            <RatingStars rating={tool.rating} reviews={tool.reviews} />
          </div>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8"
          >
            Visiter le site →
          </a>
        </div>

        <aside className="space-y-6">
          <div className="border border-line bg-[#F9FAFB] p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Pricing
            </h2>
            <p className="mt-3 text-2xl font-bold text-ink">{tool.pricing}</p>
          </div>

          <div className="border border-line p-6">
            <h2 className="text-sm font-bold uppercase tracking-wide text-muted">
              Features
            </h2>
            <ul className="mt-4 space-y-2.5">
              {tool.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-ink">
                  <span className="text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-16 border-t border-line pt-12">
        <h2 className="text-h2 text-ink" style={{ fontSize: "24px" }}>
          Description
        </h2>
        <p className="mt-4 max-w-3xl text-body text-muted">{tool.description}</p>
      </section>

      <section className="mt-12">
        <h2 className="text-h2 text-ink" style={{ fontSize: "24px" }}>
          Features
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {tool.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 border border-line px-4 py-3 text-sm text-ink"
            >
              <span className="text-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </section>

      {tool.whyBest && (
        <section className="mt-12 border border-accent/20 bg-accent-soft p-6 sm:p-8">
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">
            Why ranked #{tool.rank}
          </h2>
          <p className="mt-3 text-body text-ink">{tool.whyBest}</p>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-4 text-h2 text-ink" style={{ fontSize: "24px" }}>
            Outils liés
          </h2>
          <div className="border-t border-line">
            {related.map((item) => (
              <ToolCard key={item.id} tool={item} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link
          href={`/category/${categoryToSlug(tool.category)}`}
          className="btn-link"
        >
          ← Retour au classement
        </Link>
      </div>
    </div>
  );
}
