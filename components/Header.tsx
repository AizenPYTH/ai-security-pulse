"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { href: "/", label: "Classements" },
  { href: "/blog", label: "Blog" },
  { href: "/search", label: "Recherche" },
  { href: "/about", label: "À propos" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-line bg-paper/80 backdrop-blur-xl"
      animate={
        reduce
          ? undefined
          : {
              paddingTop: scrolled ? 10 : 18,
              paddingBottom: scrolled ? 10 : 18,
            }
      }
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 sm:px-8 lg:px-10">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-ink transition hover:text-accent"
        >
          EssentialAI
        </Link>

        <nav className="flex items-center gap-4 sm:gap-6">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hidden text-sm text-muted transition duration-300 hover:text-ink sm:inline"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/blog"
            className="text-sm text-muted transition hover:text-ink sm:hidden"
          >
            Blog
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </motion.header>
  );
}
