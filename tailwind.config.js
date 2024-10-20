/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./public/**/*.html",
    "./src/**/*.{js,jsx,ts,tsx,vue}",
    "./src/*.{js,jsx,ts,tsx,vue}",
  ],
  theme: {
    extend: {
      fontFamily: {
        workSans: ["Work Sans", 'sans-serif'] 
      }
    },
  },
  plugins: [],
}

