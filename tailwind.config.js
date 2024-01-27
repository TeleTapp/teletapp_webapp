/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|input).js",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [
    nextui({
      layout: {
        radius: {
          small: "4px", // rounded-small
          medium: "8px", // rounded-medium
          large: "16px", // rounded-large
        },
      },
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#efefef",
              foreground: "#11181c",
            },
          },
        },
      },
    }),
  ],
};
