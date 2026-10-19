import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#fffdf7",
          100: "#fff9ea",
          200: "#fff3d7", // requested base
          300: "#feecbf",
          400: "#fde199",
          500: "#fad26b",
        },
        forest: {
          50: "#eaf6ed",
          100: "#c7e8cf",
          500: "#045d17", // requested primary
          600: "#034d13",
          700: "#023d0e",
          800: "#022c0a",
          900: "#011c06",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          500: "#045d17",
          600: "#034d13",
          700: "#023d0e",
          900: "#011c06",
        },
        surface: {
          50: "#fffdf7",
          100: "#fff9ea",
          200: "#fff3d7",
          800: "#132316",
          900: "#08150a",
        },
      },
      fontFamily: {
        sans: ["'League Spartan'", "system-ui", "-apple-system", "sans-serif"],
        spartan: ["'League Spartan'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
