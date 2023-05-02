const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    ...defaultTheme,
    extend: {
      colors: {
        primary: colors.emerald,
        success: colors.green,
        info: colors.blue,
        warning: colors.orange,
        danger: colors.red,
        neutral: colors.slate,
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
