/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      colors: {
        whippet: {
          50: '#f8f6ff',
          100: '#f0ebff',
          200: '#e4d9ff',
          300: '#d0baff',
          400: '#b68fff',
          500: '#9c63ff',
          600: '#8f45ff',
          700: '#7e2df2',
          800: '#6a25d1',
          900: '#5a20b0',
        },
        cream: {
          50: '#fdfbf7',
          100: '#fbf5ed',
          200: '#f7eada',
          300: '#f2ddc1',
          400: '#ecc89d',
          500: '#e5b379',
          600: '#d89650',
          700: '#c47a3b',
          800: '#a35f2e',
          900: '#864d26',
        }
      },
      backgroundImage: {
        'whippet-pattern': "url('/patterns/whippet-pattern.svg')",
      },
      borderRadius: {
        'whippet': '6rem 2rem 6rem 2rem',
      },
    },
  },
  plugins: [],
} 