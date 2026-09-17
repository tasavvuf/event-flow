import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        darkbg: "#080305",
        surface: {
          dark: "#110609",
          card: "rgba(22, 8, 12, 0.65)",
          highlight: "rgba(255, 255, 255, 0.05)",
        },
        crimson: {
          50: "#fff1f2",
          100: "#ffe4e6",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#fb7185",
          500: "#f43f5e",
          600: "#e11d48",
          700: "#be123c",
          800: "#9f1239",
          900: "#881337",
          950: "#4c0519",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.04)",
          light: "rgba(255, 255, 255, 0.08)",
          card: "rgba(28, 9, 14, 0.55)",
          border: "rgba(255, 255, 255, 0.12)",
          accentBorder: "rgba(225, 29, 72, 0.35)",
        },
        accent: {
          DEFAULT: "#e11d48",
          hover: "#be123c",
          glow: "rgba(225, 29, 72, 0.4)",
        },
      },
      boxShadow: {
        glass: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 35px rgba(225, 29, 72, 0.15)",
        "glass-glow": "0 0 45px rgba(225, 29, 72, 0.25), 0 20px 50px -10px rgba(0, 0, 0, 0.8)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "pulse-slow": "pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float-slow": "float 8s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
