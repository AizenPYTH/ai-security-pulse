import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        accent: {
          DEFAULT: "rgb(var(--accent) / <alpha-value>)",
          soft: "rgb(var(--accent-soft) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: [
          "clamp(2.5rem, 5vw, 3.5rem)",
          { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.03em" },
        ],
        h2: [
          "clamp(1.75rem, 3vw, 2rem)",
          { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        h3: [
          "1.25rem",
          { lineHeight: "1.3", fontWeight: "600", letterSpacing: "-0.015em" },
        ],
        body: ["1rem", { lineHeight: "1.7", fontWeight: "400" }],
        lead: ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
      },
      spacing: {
        section: "5rem",
        "section-lg": "7rem",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
        lift: "0 4px 6px rgba(0,0,0,0.02), 0 12px 40px rgba(59,130,246,0.10)",
        glow: "0 0 0 1px rgba(59,130,246,0.12), 0 8px 32px rgba(59,130,246,0.18)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "accent-glow":
          "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(59,130,246,0.12), transparent 70%)",
        "accent-glow-dark":
          "radial-gradient(ellipse 60% 40% at 50% -10%, rgba(59,130,246,0.18), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "underline-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.55s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
