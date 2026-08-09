import CategoryCard from "@/components/CategoryCard";
import { categoryMeta } from "@/lib/tools";

export default function HomePage() {
  return (
    <div>
      <section className="mx-auto max-w-3xl pb-16 pt-8 text-center lg:pb-20 lg:pt-12">
        <h1 className="text-h1 text-ink">Les Meilleurs Outils IA</h1>
        <p className="mx-auto mt-6 max-w-xl text-body text-muted">
          Classements indépendants des outils IA essentiels pour les
          entreprises — sécurité, productivité, ventes et plus.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryMeta.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </section>
    </div>
  );
}
