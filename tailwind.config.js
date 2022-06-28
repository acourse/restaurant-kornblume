/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'berringer': ['berringer-rough', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
