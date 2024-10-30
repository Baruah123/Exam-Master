/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { animation: {
      spin3d: 'spin3d 2s linear infinite',
    },
    keyframes: {
      spin3d: {
        '0%, 100%': { transform: 'rotateX(0deg) rotateY(0deg)' },
        '25%': { transform: 'rotateX(90deg) rotateY(0deg)' },
        '50%': { transform: 'rotateX(90deg) rotateY(90deg)' },
        '75%': { transform: 'rotateX(0deg) rotateY(90deg)' },
      },
    },},
  },
  plugins: [],

  
}

// tailwind.config.js

