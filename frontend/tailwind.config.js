/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#E48027',
        'secondary-100': '#03827E',
        'secondary-200': '#047D8D',
        'secondary-300': '#036B7D',
        'backdrop': 'rgba(128, 128, 128, .25)',
      },
    },
  },
  plugins: [],
}
