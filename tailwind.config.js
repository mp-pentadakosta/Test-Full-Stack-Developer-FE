import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './apps/**/*.{js,ts,jsx,tsx,mdx}',
    './module/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E63946",
          50: "#FFE5E5",
          100: "#FFC9C9",
          200: "#FFA3A3",
          300: "#FF7D7D",
          400: "#FF5757",
          500: "#E63946", // Default merah
          600: "#B92D38",
          700: "#8A212A",
          800: "#5C151C",
          900: "#2E0A0E",
        },
        secondary: {
          50: "#FFF8E5",
          100: "#FFECC9",
          200: "#FFD999",
          300: "#FFC569",
          400: "#FFB84C",
          500: "#CC9200",
          600: "#997000",
          700: "#664D00",
          800: "#332900",
          900: "#1A1400",
        },
        success: {
            DEFAULT: "#4CAF50",
          50: "#EAF6EA",
          100: "#C4E4C4",
          200: "#9ED39E",
          300: "#78C278",
          400: "#52B152",
          500: "#4CAF50", // Hijau
          600: "#3A803C",
          700: "#285128",
          800: "#1A391A",
          900: "#0D1C0D",
        },
        danger: {
            DEFAULT: "#C81E1E",
          50: "#FDE8E8",
          100: "#FACDCD",
          200: "#F29B9B",
          300: "#E66A6A",
          400: "#D64545",
          500: "#C81E1E", // Merah untuk error
          600: "#9E1515",
          700: "#730B0B",
          800: "#4A0303",
          900: "#210101",
        },
        warning: {
          DEFAULT: "#FFD700",
          50: "#FFFAEB",
          100: "#FCEFC7",
          200: "#F8DF9A",
          300: "#F4CA64",
          400: "#EAAA00",
          500: "#CA8500", // Kuning untuk peringatan
          600: "#A66900",
          700: "#7A4C00",
          800: "#4E2E00",
          900: "#231500",
        },
        info: {
          DEFAULT: "#0967D2",
          50: "#E6F6FF",
          100: "#BAE3FF",
          200: "#7CC4FA",
          300: "#47A3F3",
          400: "#2186EB",
          500: "#0967D2", // Biru untuk info
          600: "#0552B5",
          700: "#03449E",
          800: "#01337D",
          900: "#002159",
        },
        gray: {
          DEFAULT: "#6B7280",
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
        },
        black: "#000000",
        white: "#FFFFFF",
        header: "#E5E7EB",
        footer: "#E5E7EB",
        background: "#F3F4F6",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
}
