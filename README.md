# EssentialAI

Site Next.js 14 de classements **Top 10** d’outils IA pour entreprises, avec blog et mode sombre.

Design **éditorial premium** (ink / paper / accent bleu `#3B82F6`) — Space Grotesk, respiration verticale, ombres soft, micro-interactions (Framer Motion), dark mode via classe `dark`.

## Stack

- Next.js 14 (App Router) + TypeScript + Tailwind CSS 3
- `framer-motion`, `lucide-react`, `react-markdown`, `remark-gfm`, `gray-matter`, `reading-time`
- Génération statique (`generateStaticParams`)
- SEO : `sitemap.ts`, `robots.ts`, `rss.xml`, OpenGraph

## Pages

| Route | Rôle |
|---|---|
| `/` | Catégories + derniers articles |
| `/category/[name]` | Top 10 outils |
| `/tool/[slug]` | Fiche outil |
| `/blog` | Liste des articles |
| `/blog/[slug]` | Article (Markdown + TOC + partage) |
| `/search` | Recherche |
| `/about` | À propos (disclosure iasecure #1) |

## Contenu

- `lib/categories.ts` / `lib/tools.ts` — classements
- `content/blog/*.md` — articles (frontmatter : title, slug, date, excerpt, cover, tags, author)
- `public/images/articles/` — covers blog
- `public/logos/` — logos locaux (Clearbit sunset)

## Lancer

```bash
npm install
npm run dev
```

## Notes

- Clearbit Logo API est hors service → logos SVG locaux + fallback `ui-avatars.com`
- Animations respectent `prefers-reduced-motion`
- `SITE_URL` via `NEXT_PUBLIC_SITE_URL` (fallback `https://aisecuritypulse.com`)
