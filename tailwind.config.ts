import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"]
      },
      backgroundImage: {
        "hero-gradient": "radial-gradient(circle at top, rgba(168,85,247,.35) 0%, rgba(59,130,246,.2) 35%, transparent 70%)"
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.25)"
      }
    }
  },
  plugins: []
};

export default config;
