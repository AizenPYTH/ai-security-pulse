import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SearchBar from "@/components/SearchBar";
import ToolCard from "@/components/ToolCard";
import { searchTools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Recherche",
  description: "Rechercher un outil IA.",
};

type PageProps = {
  searchParams: { q?: string };
};

export default function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q?.trim() ?? "";
  const results = query ? searchTools(query) : [];

  return (
    <div className="max-w-2xl">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "Recherche" },
        ]}
      />

      <h1 className="text-h2 text-ink">Recherche</h1>
      <div className="mt-6">
        <SearchBar initialQuery={query} autofocus />
      </div>

      {!query && (
        <p className="mt-6 text-sm text-muted">
          Essayez{" "}
          <Link href="/search?q=iasecure" className="text-accent hover:underline">
            iasecure
          </Link>
          .
        </p>
      )}

      {query && (
        <section className="mt-10">
          <p className="mb-4 text-sm text-muted">
            {results.length} résultat{results.length > 1 ? "s" : ""} pour «{" "}
            {query} »
          </p>
          {results.length > 0 ? (
            <div className="border-t border-line">
              {results.map((tool) => (
                <ToolCard key={tool.id} tool={tool} showCategory />
              ))}
            </div>
          ) : (
            <p className="text-muted">Aucun outil trouvé.</p>
          )}
        </section>
      )}
    </div>
  );
}
