/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bacground: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
      },
      borderRadius: {
        DEFAULT: "var(--border-radius)",
        sm: "calc(var(--border-radius) / 2)",
        md: "calc(var(--border-radius) * 1.5)",
        lg: "calc(var(--border-radius) * 2)",
        xl: "calc(var(--border-radius) * 3)",
        "2xl": "calc(var(--border-radius) * 4)",
        "3xl": "calc(var(--border-radius) * 6)",
      },
    },
  },
  plugins: [],
};
