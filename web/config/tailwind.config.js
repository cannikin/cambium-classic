/** @type {import('tailwindcss').Config} */

const safelist = []

// For 0 to 3 values in 0.01 increments
for (let i = 0; i <= 3; i += 0.01) {
  const value = Math.round(i * 100) / 100
  safelist.push(`brightness-[${value}]`)
  safelist.push(`contrast-[${value}]`)
  safelist.push(`saturate-[${value}]`)
}

// For 0% to 100% values in 0.5 increments
for (let i = 0; i <= 100; i += 0.5) {
  const value = Math.round(i * 10) / 10
  safelist.push(`grayscale-[${value}%]`)
}

// For 0 to 1 values in 0.01 increments
for (let i = 0; i <= 1; i += 0.01) {
  const value = Math.round(i * 100) / 100
  safelist.push(`sepia-[${value}]`)
}

// For 0deg to 180deg values in 1 increments
for (let i = 0; i <= 360; i += 1) {
  safelist.push(`hue-rotate-[${i}deg]`)
}

console.info(safelist.filter((value) => value.match(/hue/)))

module.exports = {
  content: ['src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
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
  safelist,
}
