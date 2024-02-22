/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      maxHeight: {
        50: '12.5rem',
        52: '13rem',
        54: '13.5rem',
        168: '42rem',
      },
      maxWidth: {
        50: '12.5rem',
        52: '13rem',
        54: '13.5rem',
        200: '50rem',
      },
    },
  },
  plugins: [],
}
