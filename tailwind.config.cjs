module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],

  darkMode: "class",

  theme: {
    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      fontFamily: {
        sans: ['"Instrument Sans"', "sans-serif"],
      },

      colors: {
        primary: "#C9E2FF",
      },

      screens: {
        content: "1350px",
      },
    },
  },

  plugins: [],
};