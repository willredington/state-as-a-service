const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    colors: {
      gray: colors.trueGray
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
