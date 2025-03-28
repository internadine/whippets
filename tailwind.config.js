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
          50: '#f0f7e6',
          100: '#e1f0cc',
          200: '#c9e4a4',
          300: '#a8d573',
          400: '#8BC34A',
          500: '#71a436',
          600: '#5b8929',
          700: '#476b20',
          800: '#365119',
          900: '#243612',
        },
        teal: {
          50: '#e0f2f5',
          100: '#b8e0e7',
          200: '#8ccdda',
          300: '#5ab8cb',
          400: '#2da4bd',
          500: '#0090aa',
          600: '#007C91',
          700: '#006273',
          800: '#004a57',
          900: '#00353f',
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