const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        atlas: {
          'blue': '#11b8de',
          'gold': '#d4af37',
          'silver': '#aaa9ad',
          'bronze': '#a97142',
        }
      }
    }
  },
  plugins: [],
}
