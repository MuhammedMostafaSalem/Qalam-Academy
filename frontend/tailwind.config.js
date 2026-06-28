/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",

        secondary: "var(--color-secondary)",

        accent: "var(--color-accent)",

        success: "var(--color-success)",

        error: "var(--color-error)",

        warning: "var(--color-warning)",

        background: "var(--color-background)",

        "background-alt": "var(--color-background-alt)",

        card: "var(--color-card)",

        border: "var(--color-border)",

        text: {
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
        },
      },
      container: {
        center: true,
        padding: "1rem",

        screens: {
          xl: "1280px",
        },
      },
      borderRadius: {
        button: "12px",
        input: "12px",
        card: "20px",
        image: "24px",
      },
      boxShadow: {
        card: "0 10px 30px rgba(15,23,42,.08)",
      },
      transitionDuration: {
        300: "300ms",
      },
    },
  },
  plugins: [],
}

