/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0144D3',
        },
        secondary : {
          DEFAULT: '#00113F',
        },
        error: {
          DEFAULT: '#AD0000',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0F0F0F',
          cardLight: '#F3F6FD',
          cardDark: '#1F1F1F',
        },
        titleColor: {
          light: '#1F1F1F',
          dark: '#E3E3E3',
        },
        textColor: {
          light: '#AFAFAF',
          dark: '#7F7F7F',
        },
        border: {
          light: '#D8D8D8',
          dark: '#7F7F7F',
        },
      },
    },
  },
  darkMode: "selector",
  plugins: [],
};
