import Link from "next/link";
import type { Tool } from "@/lib/tools";
import RatingStars from "./RatingStars";
import ToolLogo from "./ToolLogo";

type ToolCardProps = {
  tool: Tool;
  showCategory?: boolean;
};

export default function ToolCard({ tool, showCategory = false }: ToolCardProps) {
  return (
    <article className="group border-b border-line transition duration-300 ease-premium hover:bg-[#F9FAFB]">
      <div className="flex flex-col gap-4 px-2 py-5 sm:flex-row sm:items-center sm:gap-4 sm:px-4">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <span className="w-10 shrink-0 text-lg font-bold tabular-nums text-ink sm:w-12">
            #{tool.rank}
          </span>

          <ToolLogo name={tool.name} logo={tool.logo} size={40} />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <h3 className="truncate text-base font-bold text-ink">
                <Link href={`/tool/${tool.slug}`} className="hover:text-accent">
                  {tool.name}
                </Link>
              </h3>
              {showCategory && (
                <span className="text-xs text-muted">{tool.category}</span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm text-muted sm:hidden">
              {tool.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 pl-14 sm:pl-0 sm:justify-end">
          <RatingStars rating={tool.rating} />
          <span className="hidden min-w-[88px] text-right text-sm text-muted md:inline">
            {tool.pricing}
          </span>
          <Link
            href={`/tool/${tool.slug}`}
            className="shrink-0 text-sm font-medium text-accent hover:underline"
          >
            Voir →
          </Link>
        </div>
      </div>
    </article>
  );
}
