import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import MarkdownContent from "@/components/MarkdownContent";
import ShareButtons from "@/components/ShareButtons";
import { Reveal } from "@/components/motion/Reveal";
import {
  extractHeadings,
  formatPostDate,
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
} from "@/lib/blog";
import { SITE_NAME, SITE_URL } from "@/lib/tools";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article introuvable" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
      siteName: SITE_NAME,
    },
  };
}

export default function BlogArticlePage({ params }: PageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const headings = extractHeadings(post.content);
  const related = getRelatedPosts(post, 3);
  const shareUrl = `${SITE_URL}/blog/${post.slug}`;

  return (
    <article>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Reveal>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="mt-4 max-w-3xl text-h2 text-ink sm:text-[2.5rem]">
          {post.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lead text-muted">{post.excerpt}</p>
        <p className="mt-5 text-sm text-muted">
          {post.author} · {formatPostDate(post.date)} · {post.readingTime}
        </p>
      </Reveal>

      <Reveal className="relative mt-10 aspect-[2/1] overflow-hidden rounded-2xl border border-line bg-surface" delay={0.05}>
        <Image
          src={post.cover}
          alt=""
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 960px"
        />
      </Reveal>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-16">
        <div>
          <MarkdownContent content={post.content} />
          <div className="mt-12 border-t border-line pt-8">
            <ShareButtons title={post.title} url={shareUrl} />
          </div>
        </div>

        {headings.length > 0 && (
          <aside className="hidden lg:block">
            <nav className="sticky top-28">
              <p className="text-xs font-bold uppercase tracking-wider text-muted">
                Sommaire
              </p>
              <ul className="mt-4 space-y-2.5 border-l border-line pl-4">
                {headings.map((heading) => (
                  <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      className={`block text-sm text-muted transition hover:text-accent ${
                        heading.level === 3 ? "pl-3" : ""
                      }`}
                    >
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>

      {related.length > 0 && (
        <section className="mt-section border-t border-line pt-section">
          <h2 className="text-h2 text-ink">Articles liés</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <BlogCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
      )}

      <div className="mt-10">
        <Link href="/blog" className="btn-link">
          ← Retour au blog
        </Link>
      </div>
    </article>
  );
}
