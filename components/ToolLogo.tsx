"use client";

import { useState } from "react";

type ToolLogoProps = {
  name: string;
  logo: string;
  size?: number;
  className?: string;
};

export default function ToolLogo({
  name,
  logo,
  size = 40,
  className = "",
}: ToolLogoProps) {
  const [src, setSrc] = useState(logo);
  const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=3B82F6&color=fff&size=${size * 2}`;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-xl border border-line bg-paper shadow-soft ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${name} logo`}
        width={size}
        height={size}
        loading="lazy"
        className="h-full w-full object-contain p-1"
        onError={() => {
          if (src !== fallback) setSrc(fallback);
        }}
      />
    </div>
  );
}
