/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/**/*.{js,jsx,ts,tsx}"

  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        RubikPrimary: ['RubikPrimary'],
        RubikBold: ['RubikBold'],
        rubik: ['Rubik', 'sans-serif'],
      },
      colors: {
        body: "#E5E5E5",
        primary: "#030014",
        secondary: "#070417",
        light: {
          100: "#D6C7FF",
          200: "#A8B5DB",
          300: "#9CA4AB",
        },
        dark: {
          100: "#221F3D",
          200: "#0F0D23",
        },
        accent: "#AB8BFF",
      },
    },
  },
  plugins: [],
};
