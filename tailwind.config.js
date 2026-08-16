/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0A0A0B",
        surface: "#141416",
        elevated: "#1C1C20",
        border: "#26262A",
        text: "#F4F4F5",
        muted: "#8A8A93",
        // Single acid-lime accent carries the whole system.
        accent: {
          DEFAULT: "#BEF264",
          dim: "#9DE02E",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      // Fluid type — smooth scaling between mobile and desktop, no awkward jumps.
      fontSize: {
        display: ["clamp(2.6rem, 7.5vw, 5.75rem)", { lineHeight: "1.02" }],
        h1: ["clamp(2.05rem, 5vw, 3.5rem)", { lineHeight: "1.06" }],
        h2: ["clamp(1.7rem, 4vw, 2.75rem)", { lineHeight: "1.1" }],
        h3: ["clamp(1.35rem, 2.6vw, 1.85rem)", { lineHeight: "1.2" }],
        lead: ["clamp(1.02rem, 1.4vw, 1.2rem)", { lineHeight: "1.6" }],
      },
      maxWidth: {
        content: "1120px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "pulse-dot": "pulse-dot 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
