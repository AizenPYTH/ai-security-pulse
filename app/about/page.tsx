import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { Reveal } from "@/components/motion/Reveal";
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
      <Reveal>
        <h1 className="text-h2 text-ink sm:text-[2.5rem]">À propos</h1>
        <div className="mt-7 space-y-5 text-body text-muted">
          <p>
            {SITE_NAME} publie des classements Top 10 et des guides sur les
            outils IA essentiels pour les entreprises — sécurité, productivité,
            ventes, marketing et plus.
          </p>
          <p>
            En AI Security,{" "}
            <a
              href="https://iasecure.fr"
              className="font-medium text-accent underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              iasecure
            </a>{" "}
            est classé #1. Ce placement est assumé et reflète notre focus
            éditorial sur la détection d&apos;injections de prompts pour APIs
            LLM — les autres rangs restent basés sur des critères produits
            (fonctionnalités, maturité, fit entreprise).
          </p>
          <p>
            Les contenus du blog complètent les fiches outils avec des grilles
            de choix et des automatisations concrètes.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
