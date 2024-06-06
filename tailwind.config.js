/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        Lobster: "'Lobster', sans-serif",
        Roboto: "'Roboto', sans-serif",
        Fira: "'Fira Sans', sans-serif"
      }
    },
  },
  plugins: [],
}
