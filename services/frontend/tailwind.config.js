/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          900: '#0B0A10',
          800: '#161324',
          700: '#231e3b',
          purple: '#8A2BE2',
          neon: '#A230ED',
          light: '#E6E0FF',
          dark: '#050408'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
