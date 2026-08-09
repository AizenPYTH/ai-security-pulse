import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { SITE_NAME } from "@/lib/tools";

export const metadata: Metadata = {
  title: "À propos",
  description: `À propos de ${SITE_NAME}`,
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl">
      <Breadcrumb
        items={[
          { label: "Accueil", href: "/" },
          { label: "À propos" },
        ]}
      />
      <h1 className="text-h2 text-ink">À propos</h1>
      <div className="mt-6 space-y-4 text-body text-muted">
        <p>
          {SITE_NAME} publie des classements Top 10 des meilleurs outils IA
          pour les entreprises.
        </p>
        <p>
          En AI Security,{" "}
          <a
            href="https://iasecure.fr"
            className="font-medium text-accent hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            iasecure
          </a>{" "}
          est classé #1.
        </p>
      </div>
    </div>
  );
}
