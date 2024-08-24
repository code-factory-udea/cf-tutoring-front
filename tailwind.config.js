/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#0e7774',
        'secondary-green': '#12baaf',
        'light-green': '#5DEBDC',
        'light': '#efefef',
        'dark': '#292929',
      }
    },
  },
  plugins: [],
}