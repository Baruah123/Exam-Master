/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: { animation: {
       'spin': 'spin 2s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-reverse': 'spin 2.5s linear infinite reverse',
        'gradient': 'gradient 3s ease infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
    keyframes: {
      gradient: {
        '0%, 100%': {
          'background-size': '200% 200%',
          'background-position': 'left center',
        },
        '50%': {
          'background-size': '200% 200%',
          'background-position': 'right center',
        },
    },},
  },
  plugins: [],

  
}
};

// tailwind.config.js

