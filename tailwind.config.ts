/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  // WICHTIG: Hier wurde "./lib" hinzugefügt, damit deine Komponenten erkannt werden!
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./.storybook/**/*.{ts,tsx,js,jsx,mdx}",
    "./lib/**/*.{ts,tsx,js,jsx,mdx}", 
  ],
  theme: {
    extend: {
      colors: {
        // Semantic Mapping für Valantic DXA Style
        primary: {
          DEFAULT: "#FF514B", // Valantic Orange (Left)
          light: "#FCA28B",   // Valantic Orange (Right)
          hover: "#E64545",   // Slightly darker for hover
        },
        secondary: {
          DEFAULT: "#3643B3", // Valantic Blue
          hover: "#2A3494",   // Slightly darker for hover
        },
        // Deine alten Brand-Farben (optional behalten)
        brand: {
          red:       "#FF5050",
          redLight:  "#FF6A6A",
          orange:      "#FF7A00",
          orangeLight: "#FF9A3D",
          purple:      "#6B2EFF",
          purpleLight: "#8C5CFF",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'], // Professioneller Look
      },
      boxShadow: {
        inset: "inset 0 0 0 1px rgba(0,0,0,0.15)",
      },
      borderRadius: {
        pill: "3em",
      },
    },
  },
  plugins: [],
};

export default config;