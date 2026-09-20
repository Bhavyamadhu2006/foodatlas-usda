import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#08120B",
          900: "#0D1C11",
          850: "#112617",
          800: "#17311D",
          750: "#1C3A23",
          700: "#244A2C",
          600: "#35663A",
          500: "#578B4E",
          400: "#79A96B",
          300: "#A4C894",
          200: "#C9DEC0"
        },
        cream: {
          50: "#F7F3E8",
          100: "#EFE9DA",
          200: "#DED4C0"
        },
        olive: {
          300: "#B4BE72",
          400: "#93A65E",
          500: "#748A48"
        }
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Segoe UI", "Inter", "Arial", "sans-serif"],
        serif: ["Georgia", "Times New Roman", "serif"]
      },
      boxShadow: {
        soft: "0 24px 70px rgba(0,0,0,.28)"
      }
    }
  },
  plugins: []
};
export default config;
