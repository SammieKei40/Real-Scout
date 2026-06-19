/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/app/**/*.{js,jsx,ts,tsx}", "./src/components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        purple: "#8B5DFF",
        comet: "#666876",
        "black-russian": "#191d31",
        "ghost-white": "#FBFBFD",
        "dodger-blue": "#246BFD",
        "purple-light": "#8B5DFF0A"
      },
      fontFamily: {
        rubik: ["Rubik_400Regular"],
        "rubik-medium": ["Rubik_500Medium"],
        "rubik-semibold": ["Rubik_600SemiBold"],
        "rubik-bold": ["Rubik_700Bold"],
      },
      boxShadow: {
      "card": "0px 4px 120px 0px #00000033",
      "soft": "0px 4px 60px 0px #04060F0D"
    },
    },
  },
  plugins: [],
};