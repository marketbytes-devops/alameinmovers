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
      
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
        'ripple-persist': {
          '0%': { transform: 'scale(0)', opacity: '0.5' },
          '100%': { transform: 'scale(2)', opacity: '0.5' },
        },
      },
      animation: {
        ripple: 'ripple 0.6s linear',
        'ripple-persist': 'ripple-persist 0.6s linear forwards',
      },
    },
  },
  plugins: [],
}