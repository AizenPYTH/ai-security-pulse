import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import RatingStars from "@/components/RatingStars";
import ToolCard from "@/components/ToolCard";
import ToolLogo from "@/components/ToolLogo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
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

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <Reveal>
          <ToolLogo name={tool.name} logo={tool.logo} size={128} />
          <p className="mt-7 text-sm text-muted">
            #{tool.rank} · {tool.category}
          </p>
          <h1 className="mt-3 text-h2 text-ink sm:text-[2.5rem]">{tool.name}</h1>
          <p className="mt-4 text-lead text-muted">{tool.tagline}</p>
          <div className="mt-6">
            <RatingStars rating={tool.rating} reviews={tool.reviews} />
          </div>
          <a
            href={tool.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-9"
          >
            Visiter le site
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>

        <aside className="space-y-5">
          <Reveal delay={0.05} className="rounded-2xl border border-line bg-surface p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
              Pricing
            </h2>
            <p className="mt-3 text-2xl font-bold tracking-tight text-ink">
              {tool.pricing}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="rounded-2xl border border-line p-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-muted">
              Features
            </h2>
            <ul className="mt-4 space-y-3">
              {tool.features.slice(0, 5).map((feature) => (
                <li key={feature} className="flex gap-2.5 text-sm text-ink">
                  <span className="text-accent">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </Reveal>
        </aside>
      </div>

      <Reveal className="mt-section border-t border-line pt-12">
        <h2 className="text-h3 text-ink">Description</h2>
        <p className="mt-5 max-w-3xl text-body text-muted">{tool.description}</p>
      </Reveal>

      <Reveal className="mt-14">
        <h2 className="text-h3 text-ink">Features</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {tool.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2.5 rounded-xl border border-line px-4 py-3.5 text-sm text-ink transition hover:border-accent/25 hover:shadow-soft"
            >
              <span className="text-accent">✓</span>
              {feature}
            </li>
          ))}
        </ul>
      </Reveal>

      {tool.whyBest && (
        <Reveal className="mt-14 rounded-2xl border border-accent/20 bg-accent-soft p-7 sm:p-9">
          <h2 className="text-xs font-bold uppercase tracking-wider text-accent">
            Why ranked #{tool.rank}
          </h2>
          <p className="mt-3 text-body text-ink">{tool.whyBest}</p>
        </Reveal>
      )}

      {related.length > 0 && (
        <section className="mt-section">
          <h2 className="mb-6 text-h3 text-ink">Outils liés</h2>
          <Stagger className="border-t border-line">
            {related.map((item) => (
              <StaggerItem key={item.id}>
                <ToolCard tool={item} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      <div className="mt-12">
        <Link
          href={`/category/${categoryToSlug(tool.category)}`}
          className="btn-link"
        >
          <span className="link-arrow rotate-180">→</span>
          Retour au classement
        </Link>
      </div>
    </div>
  );
}
