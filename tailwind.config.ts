/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./.storybook/**/*.{ts,tsx,js,jsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      /* bestehende neutrals usw. gerne beibehalten */
      brand: {
        /* Rot (bereits genutzt) */
        red:       "#FF5050",
        redLight:  "#FF6A6A",

        /* Orange (für primary orange) – passe gern an eure exakten Brandwerte an */
        orange:        "#FF7A00",
        orangeLight:   "#FF9A3D",

        /* Purple (wie auf valantic) – ggf. an Corporate-Werte anpassen */
        purple:       "#6B2EFF",
        purpleLight:  "#8C5CFF",
      },
    },
    boxShadow: {
      inset: "inset 0 0 0 1px rgba(0,0,0,0.15)", // für .btn-secondary-base
    },
    borderRadius: {
      pill: "3em",
    },
  },
},
  plugins: [],
};

export default config;