import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f2f9ff",
          100: "#dcedff",
          200: "#b8dbff",
          300: "#8fc5ff",
          400: "#60a9ff",
          500: "#3b8eff",
          600: "#226ce6",
          700: "#184fbe",
          800: "#183f90",
          900: "#173a72"
        },
        positive: "#22c55e",
        negative: "#ef4444",
        neutral: "#a1a1aa"
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(16, 60, 114, 0.35)"
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "BlinkMacSystemFont", "'Segoe UI'", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
