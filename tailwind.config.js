/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
        rosegold: {
          light: '#fde68a',
          DEFAULT: '#f59e0b',
          dark: '#d97706',
        }
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
      },
      boxShadow: {
        'pink-glow': '0 10px 30px -10px rgba(236, 72, 153, 0.35)',
        'pink-glow-lg': '0 20px 40px -15px rgba(236, 72, 153, 0.45)',
        'glass': '0 8px 32px 0 rgba(236, 72, 153, 0.12)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
};
