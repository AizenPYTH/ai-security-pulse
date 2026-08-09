import Link from "next/link";
import Image from "next/image";
import type { BlogPostMeta } from "@/lib/blog";
import { formatPostDate } from "@/lib/blog";

export default function BlogCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex h-full flex-col overflow-hidden border border-line bg-paper transition duration-300 ease-premium hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lift"
    >
      <div className="relative aspect-video overflow-hidden bg-surface">
        <Image
          src={post.cover}
          alt=""
          fill
          unoptimized
          className="object-cover transition duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold uppercase tracking-wider text-accent"
            >
              {tag}
            </span>
          ))}
        </div>
        <h2 className="mt-3 text-lg font-bold tracking-tight text-ink transition group-hover:text-accent">
          {post.title}
        </h2>
        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted">
          {post.excerpt}
        </p>
        <p className="mt-4 text-xs text-muted">
          {formatPostDate(post.date)} · {post.readingTime}
        </p>
      </div>
    </Link>
  );
}
