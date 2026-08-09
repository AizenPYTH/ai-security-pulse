"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  initialQuery?: string;
  className?: string;
  autofocus?: boolean;
};

export default function SearchBar({
  initialQuery = "",
  className = "",
  autofocus = false,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <label htmlFor="search" className="sr-only">
        Rechercher
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Rechercher un outil..."
        autoFocus={autofocus}
        className="w-full border border-line bg-paper px-4 py-3 text-body text-ink outline-none transition placeholder:text-muted focus:border-accent"
      />
    </form>
  );
}
