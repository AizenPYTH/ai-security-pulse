import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-5xl items-center justify-center px-6 py-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-ink transition hover:text-accent"
        >
          EssentialAI
        </Link>
      </div>
    </header>
  );
}
