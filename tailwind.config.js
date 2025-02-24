/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-color': '#242423',
        'mid-color': '#333533',
        'mid-lit-color': '#4A4A49',
        'light-color': '#737372',
        'lighter-color': '#A0A09E',
        'pop-color': '#E6835F',
        'dark-pop-color': '#AA502F'
      }
    },
  },
  plugins: [],
}

