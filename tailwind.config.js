// tailwind.config.js
import {nextui} from "@nextui-org/react";

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
  plugins: [nextui({
    themes: {
        "purple-dark": {
          extend: "dark", // <- inherit default values from dark theme
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
              // 50: "#3B096C",
              // 100: "#520F83",
              // 200: "#7318A2",
              // 300: "#9823C2",
              // 400: "#c031e2",
              // 500: "#DD62ED",
              // 600: "#F182F6",
              // 700: "#FCADF9",
              // 800: "#FDD5F9",
              // 900: "#FEECFE",
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
      },

  
  }
  )]
}

export default config;
