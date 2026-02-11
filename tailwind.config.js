/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9eeff',
          200: '#bce0ff',
          300: '#8dcbff',
          400: '#56aeff',
          500: '#2f8fff',
          600: '#1a72f6',
          700: '#175ede',
          800: '#194eb4',
          900: '#1a438d'
        }
      },
      boxShadow: {
        card: '0 8px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
