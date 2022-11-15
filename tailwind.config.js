/** @type {import('tailwindcss').Config} */

const colors = require('./constants/colors')

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Black: 'Inter_900Black',
        ExtraBold: 'Inter_800ExtraBold',
        Bold: 'Inter_700Bold',
        SemiBold: 'Inter_600SemiBold',
        Medium: 'Inter_500Medium',
        Regular: 'Inter_400Regular',
      },
      colors,
    },
  },
  plugins: [],
}
