/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",

        secondary: "var(--color-secondary)",
        "secondary-foreground": "var(--color-secondary-foreground)",

        accent: "var(--color-accent)",
        "accent-foreground": "var(--color-accent-foreground)",

        "light-accent": "var(--color-light-accent)",
        "light-accent-foreground": "var(--color-light-accent-foreground)",

        "dark-accent": "var(--color-dark-accent)",
        "dark-accent-foreground": "var(--color-dark-accent-foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
