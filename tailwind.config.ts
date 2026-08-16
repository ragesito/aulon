import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0a0c", // deep black background
          soft: "#111114", // elevated surfaces
          line: "#1c1c21", // hairline borders
        },
        gold: {
          DEFAULT: "#daa520", // rich metallic gold (goldenrod)
          light: "#eec95f", // light gold highlight
          deep: "#a1741b", // deep gold shadow
        },
        ivory: {
          DEFAULT: "#f5f0e6",
          dim: "#b9b3a6", // secondary text
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
      },
      backgroundImage: {
        "gold-sheen":
          "linear-gradient(105deg, #a1741b 0%, #daa520 40%, #eec95f 50%, #daa520 60%, #a1741b 100%)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        sheen: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "header-in": {
          from: { opacity: "0", transform: "translateY(-12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        rise: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "scroll-cue": {
          "0%": { transform: "translateY(0)", opacity: "0.9" },
          "60%": { transform: "translateY(10px)", opacity: "0" },
          "61%": { transform: "translateY(-4px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "0.9" },
        },
        "intro-fade": {
          "0%": { opacity: "1" },
          "70%": { opacity: "1" },
          "100%": { opacity: "0", visibility: "hidden" },
        },
        "intro-logo": {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "40%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.6s ease-out both",
        sheen: "sheen 7s linear infinite",
        "header-in": "header-in 0.7s cubic-bezier(0.22,1,0.36,1) both",
        rise: "rise 0.8s cubic-bezier(0.22,1,0.36,1) both",
        "scroll-cue": "scroll-cue 2.2s ease-in-out infinite",
        "intro-fade": "intro-fade 1.8s ease-in-out both",
        "intro-logo": "intro-logo 1.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
