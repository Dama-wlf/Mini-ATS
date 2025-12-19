/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
 theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#2563eb",
        secondary: "#1e40af",
        background: "#f6f7f9",
        card: "#ffffff",
        text: "#0f1729",
        muted: "#64748b",

        /* Sidebar */
        sidebar: "#0f1729",        // fond sidebar
        sidebarHover: "#1e293b",   // hover item
        sidebarActive: "#2563eb",  // item actif
        sidebarText: "#e5e7eb",    // texte
      },
    }
  },
  plugins: [],
};

