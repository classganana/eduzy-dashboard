import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const { nextui, colors } = require("@heroui/theme");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3050EB",
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(180deg, rgba(57, 91, 255, 1), rgba(33, 44, 142, 1))",
      },
    },
  },
  plugins: [
    heroui({
      addCommonColors: true,
    }),
  ],
};
