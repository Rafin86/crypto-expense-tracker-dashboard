/** @type {import('tailwindcss').Config} */
const palette = require('./src/constants/palette.json');

const fontSize = Object.fromEntries(
  Object.entries(palette.fontSize).map(([key, [size, lineHeight]]) => [
    key,
    [`${size}px`, `${lineHeight}px`],
  ])
);

module.exports = {
  darkMode: 'class',
  content: ['./src/app/**/*.{js,jsx,ts,tsx}', './src/components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: palette.background,
        'background-elevated': palette.backgroundElevated,
        'background-elevated-hover': palette.backgroundElevatedHover,
        border: palette.border,
        'border-strong': palette.borderStrong,
        text: palette.text,
        accent: palette.accent,
        gain: palette.gain,
        loss: palette.loss,
      },
      fontSize,
    },
  },
  plugins: [],
};
