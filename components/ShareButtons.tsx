"use client";

import { Link2, Share2 } from "lucide-react";
import { useState } from "react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div>
      <p className="text-sm font-semibold text-ink">Partager</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
          X
        </a>
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
        >
          <Share2 className="h-4 w-4" strokeWidth={1.5} />
          LinkedIn
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-xl border border-line px-3 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
        >
          <Link2 className="h-4 w-4" strokeWidth={1.5} />
          {copied ? "Copié" : "Copier le lien"}
        </button>
      </div>
    </div>
  );
}
