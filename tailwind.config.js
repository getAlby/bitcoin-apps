/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#111827",
        secondary: "#1F2937",
        tertiary: "#6B7280",
        "alby-yellow": "#FFDA4D",
      },
      fontFamily: {
        sans: ["Figtree", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        discover: "72rem",
      },
    },
  },
  plugins: [],
}
