/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "royal-blue": {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bedaff",
          300: "#92c4fe",
          400: "#5ea4fc",
          500: "#3980f8",
          600: "#2f69ee",
          700: "#1b4bda",
          800: "#1d3eb0",
          900: "#1d388b",
          950: "#162455",
        },
      },
    },
  },
  plugins: [],
};
