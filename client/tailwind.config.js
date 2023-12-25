/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["DM Serif Display", "serif"],
        secondary: ["Poppins", "sans-serif"],
      },
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
    },
  },
  plugins: [
    // ...
    require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/forms"),
  ],
};
