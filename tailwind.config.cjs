module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'hidden',
    'block',
    'flex',
    'lg:block',
    'lg:flex',
    'lg:hidden',
    'sm:block', 'sm:hidden',
    'md:block', 'md:hidden',
  ],
  theme: {
    extend: {
      fontFamily: {
        instrument: ['"Instrument Sans"', 'sans-serif'],
      },
      colors: {
        'menu-link': '#C9E2FF',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        'xlm': '1350px',
      },
    },
  },
  plugins: [],
};