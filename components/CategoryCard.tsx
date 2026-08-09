"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { CategoryMeta } from "@/lib/categories";

type CategoryCardProps = {
  category: CategoryMeta;
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -3, scale: 1.01 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/category/${category.slug}`}
        className="group flex h-full flex-col items-start border border-line bg-paper p-7 transition duration-300 ease-premium hover:border-accent/30 hover:shadow-lift"
      >
        <span className="text-2xl transition duration-300 group-hover:scale-110" aria-hidden="true">
          {category.emoji}
        </span>
        <h2 className="mt-5 text-lg font-bold tracking-tight text-ink transition group-hover:text-accent">
          {category.name}
        </h2>
        <p className="mt-2 text-sm text-muted">10 outils</p>
      </Link>
    </motion.div>
  );
}
