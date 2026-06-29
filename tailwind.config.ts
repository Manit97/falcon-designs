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
        "fd-black":  "#080808",
        "fd-surface":"#111111",
        "fd-card":   "#181818",
        "fd-border": "#1f1f1f",
        "fd-orange": "#f97316",
        "fd-orange-dark": "#c2410c",
        "fd-white":  "#ffffff",
        "fd-muted":  "#666666",
        "fd-dim":    "#999999",
      },
      fontFamily: {
        display: ["var(--font-syne)", "sans-serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter2: "-0.03em",
        widest2:  "0.2em",
        widest3:  "0.3em",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
