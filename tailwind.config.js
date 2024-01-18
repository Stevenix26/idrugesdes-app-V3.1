
// tailwind.config.js
import { nextui } from "@nextui-org/react";
import daisyui from "daisyui";


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
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },


  // darkMode: "class",
  // plugins: [
  //   nextui({
  //     themes: {
  //       "purple-dark": {
  //         extend: "dark",
  //         colors: {
  //           background: "#151c2c",
  //           foreground: "#ffffff",
  //           primary: {
  //             100: "#d0d2d5",
  //             200: "#a1a4ab",
  //             300: "#737780",
  //             400: "#444956",
  //             500: "#151c2c",
  //             600: "#111623",
  //             700: "#0d111a",
  //             800: "#080b12",
  //             900: "#040609",
  //             DEFAULT: "#151c2c",
  //             foreground: "#ffffff",
  //           },
  //           focus: "#111623",
  //         },
  //         layout: {
  //           disabledOpacity: "0.3",
  //           radius: {
  //             small: "4px",
  //             medium: "6px",
  //             large: "8px",
  //           },
  //           borderWidth: {
  //             small: "1px",
  //             medium: "2px",
  //             large: "3px",
  //           },
  //         },
  //       },
  //       // Add pharmacy theme
  //       "pharmacy": {
  //         colors: {
  //           background: "a5a4b7",
  //           foreground: "#000000",
  //           primary: {
  //         100: "#d2d1db",
  //         200: "#a5a4b7",
  //         300: "#787693",
  //         400: "#4b496f",
  //         500: "#1e1b4b",
  //         600: "#18163c",
  //         700: "#12102d",
  //         800: "#0c0b1e",
  //         900: "#06050f",
  //             DEFAULT: "#1e1b4b",
  //             foreground: "#000000",
  //           },
  //           focus: "#a5a4b7",
  //         },
  //         layout: {
  //           disabledOpacity: "0.3",
  //           radius: {
  //             small: "4px",
  //             medium: "6px",
  //             large: "8px",
  //           },
  //           borderWidth: {
  //             small: "1px",
  //             medium: "2px",
  //             large: "3px",
  //           },
  //         },
  //       },
  //     },
  //   }),
  // ],
};

export default config;
