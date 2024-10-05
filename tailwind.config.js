const { nextui } = require("@nextui-org/theme");
/** @type {import('tailwindcss').Config} */
const { nextui, colors } = require("@nextui-org/theme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3050EB",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
