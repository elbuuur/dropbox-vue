/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "approx-teal": "#007d8a",
        "selective-yellow": "#FFB500",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
