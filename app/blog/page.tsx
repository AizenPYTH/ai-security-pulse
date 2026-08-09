import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import Breadcrumb from "@/components/Breadcrumb";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getAllPosts } from "@/lib/blog";
import { SITE_NAME } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Blog",
  description: `Guides et analyses ${SITE_NAME} pour choisir et déployer les outils IA en entreprise.`,
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div>
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Blog" },
        ]}
      />

      <Reveal className="mb-14 max-w-2xl">
        <h1 className="text-h2 text-ink sm:text-[2.5rem]">Blog</h1>
        <p className="mt-5 text-lead text-muted">
          Guides pratiques et analyses pour sélectionner les bons outils IA —
          sécurité, automatisation, productivité.
        </p>
      </Reveal>

      <Stagger className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
          <StaggerItem key={post.slug}>
            <BlogCard post={post} />
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
