/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#facc15",
        accent: "#6366f1",
      },
    },
  },
  extend: {
    ringColor: {
      DEFAULT: "#3b82f6", // azul
    },
  },
  plugins: [],
};
