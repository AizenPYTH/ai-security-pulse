import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row sm:px-8 lg:px-10">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} EssentialAI
        </p>
        <div className="flex gap-5 text-sm text-muted">
          <Link href="/blog" className="transition hover:text-accent">
            Blog
          </Link>
          <Link href="/about" className="transition hover:text-accent">
            À propos
          </Link>
          <Link href="/search" className="transition hover:text-accent">
            Recherche
          </Link>
        </div>
      </div>
    </footer>
  );
}
