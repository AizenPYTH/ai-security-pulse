import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        muted: "#666666",
        line: "#E5E7EB",
        accent: {
          DEFAULT: "#3B82F6",
          soft: "#EFF6FF",
        },
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      fontSize: {
        h1: ["56px", { lineHeight: "1.05", fontWeight: "700", letterSpacing: "-0.03em" }],
        h2: ["32px", { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" }],
        body: ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.06)",
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
