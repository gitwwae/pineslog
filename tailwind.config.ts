import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Surfaces
        cream: {
          DEFAULT: "#FFFAF0", // page background
          50:  "#FFFCF6",
          100: "#FAF3E2",
          200: "#F5EBD0",
          300: "#EDDDB6"
        },
        paper: "#FFFFFF",     // cards
        // Text
        ink: {
          DEFAULT: "#1F2017",
          dim:     "#5D5547",
          muted:   "#8B8474"
        },
        // Forest (primary brand)
        forest: {
          DEFAULT: "#004225", // headings, primary
          900: "#003820",
          800: "#004225",
          700: "#0A5C39",
          500: "#2E8159",
          300: "#6FA585",
          200: "#A8C8B5",
          100: "#D4E5DA"
        },
        // Amber (warm accent)
        amber: {
          900: "#7A4A20",
          700: "#A0613A",
          500: "#B8763D",
          400: "#C68A4E",
          300: "#D5A371",
          200: "#E2BD93",
          100: "#F0D8B8"
        },
        rust: "#A0492B"
      },
      fontFamily: {
        serif: ["Newsreader", "ui-serif", "Georgia", "serif"],
        sans:  ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono:  ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      letterSpacing: {
        tightest: "-0.04em"
      },
      gridTemplateColumns: {
        "48": "repeat(48, minmax(0, 1fr))"
      }
    }
  },
  plugins: []
};

export default config;
