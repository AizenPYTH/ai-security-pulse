"use client";

import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import type { ReactNode } from "react";

function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function plainText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(plainText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return plainText(
      (children as { props: { children?: ReactNode } }).props.children
    );
  }
  return "";
}

const components: Components = {
  h2: ({ children }) => <h2 id={slugify(plainText(children))}>{children}</h2>,
  h3: ({ children }) => <h3 id={slugify(plainText(children))}>{children}</h3>,
  a: ({ href, children }) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className="font-medium text-accent underline underline-offset-4"
        >
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export default function MarkdownContent({ content }: { content: string }) {
  return (
    <div className="prose-blog">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
