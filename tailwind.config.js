/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "bg-image": "url('/src/assets/1.png')",
      },
      keyframes: {
        imgUp: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-15px)' },
        },
      },
      animation: {
        imgUp: 'imgUp 0.7s linear infinite alternate',
      },
    },
  },
  plugins: [],
}

