
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brandYellow: "#FFEB3B"
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0px rgba(255,255,0,0.0)' },
          '50%': { boxShadow: '0 0 14px rgba(255,255,0,0.7)' }
        }
      },
      animation: {
        pulseGlow: 'pulseGlow 1.8s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}
