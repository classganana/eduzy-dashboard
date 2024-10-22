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
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(180deg, rgba(57, 91, 255, 1), rgba(33, 44, 142, 1))",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: true,
    }),
  ],
};
