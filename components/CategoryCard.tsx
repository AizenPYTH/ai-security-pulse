import Link from "next/link";
import type { CategoryMeta } from "@/lib/categories";

type CategoryCardProps = {
  category: CategoryMeta;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="flex flex-col items-start border border-line bg-paper p-6 transition duration-300 ease-premium hover:shadow-soft"
    >
      <span className="text-2xl" aria-hidden="true">
        {category.emoji}
      </span>
      <h2 className="mt-4 text-lg font-bold tracking-tight text-ink">
        {category.name}
      </h2>
      <p className="mt-2 text-sm text-muted">10 outils</p>
    </Link>
  );
}
