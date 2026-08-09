import { Stagger, StaggerItem, Reveal } from "@/components/motion/Reveal";
import CategoryCard from "@/components/CategoryCard";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { categoryMeta } from "@/lib/tools";
import { getAllPosts } from "@/lib/blog";

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <div>
      <Reveal className="mx-auto max-w-3xl pb-20 pt-10 text-center lg:pb-28 lg:pt-16">
        <h1 className="text-h1 text-ink">Les Meilleurs Outils IA</h1>
        <p className="mx-auto mt-7 max-w-xl text-lead text-muted">
          Classements et avis sur les outils IA essentiels en entreprise —
          sécurité, productivité, ventes et plus.
        </p>
      </Reveal>

      <section className="pb-section">
        <Reveal className="mb-8">
          <h2 className="text-h2 text-ink">Catégories</h2>
          <p className="mt-2 text-sm text-muted">
            Explorez les Top 10 par domaine.
          </p>
        </Reveal>
        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categoryMeta.map((category) => (
            <StaggerItem key={category.slug}>
              <CategoryCard category={category} />
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {latestPosts.length > 0 && (
        <section className="border-t border-line pt-section">
          <Reveal className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-h2 text-ink">Du blog</h2>
              <p className="mt-2 text-sm text-muted">
                Guides et analyses pour choisir vos outils.
              </p>
            </div>
            <Link href="/blog" className="btn-link shrink-0">
              Voir tout
              <span className="link-arrow">→</span>
            </Link>
          </Reveal>
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}
    </div>
  );
}
