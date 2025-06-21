/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#6D28D9',
          DEFAULT: '#5B21B6',
          dark: '#4C1D95',
        },
        secondary: '#10B981',
        dark: {
          bg: '#111827',
          "bg-secondary": '#1F2937',
          text: '#F9FAFB',
        }
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}