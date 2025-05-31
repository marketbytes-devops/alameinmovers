/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4C7085',
        secondary: '#FFD31D',
        secondaryGradient:'#FEEE91',
        primary_white:'#FFFFF',
        primary_blue:'#BDDDE4',
        
        
      },
    },
  },
  plugins: [],
}