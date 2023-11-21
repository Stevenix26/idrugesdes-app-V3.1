// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        "purple-dark": {
          extend: "dark",
          colors: {
            background: "#151c2c",
            foreground: "#ffffff",
            primary: {
              100: "#d0d2d5",
              200: "#a1a4ab",
              300: "#737780",
              400: "#444956",
              500: "#151c2c",
              600: "#111623",
              700: "#0d111a",
              800: "#080b12",
              900: "#040609",
              DEFAULT: "#151c2c",
              foreground: "#ffffff",
            },
            focus: "#111623",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        // Add pharmacy theme
        "pharmacy": {
          colors: {
            background: "#F5F5F5",
            foreground: "#000000",
            primary: {
              100: "#B3E0FF",
              200: "#80C7FF",
              300: "#4DA3FF",
              400: "#2673FF",
              500: "#0052CC",
              600: "#0041A2",
              700: "#00316F",
              800: "#001F3F",
              900: "#00121B",
              DEFAULT: "#0052CC",
              foreground: "#000000",
            },
            focus: "#80C7FF",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};

export default config;
