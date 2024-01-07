/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors:{
        primary:"#3AA8F8",
        primary_dark:"#2491e0",
        secondary:'#1c1d22',
        dark:{
          hard:"#bababa",
          grey:'#808080',
          // soft:"#0D2436",
        },
        light:{
          soft:'#d5d5d5',
        }
      },
    },
  },
  plugins: [],
}
