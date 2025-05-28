import {
  borderRadius,
  borderWidth,
  colors,
  container,
  gridTemplateRows,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  screens,
  spacing,
  width,
} from './src/tokens';

import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      width,
      height,
      maxHeight,
      maxWidth,
      minHeight,
      minWidth,
      borderWidth,
      borderRadius,
      gridTemplateRows,
      screens,
    },
    container,
  },
  plugins: [],
} satisfies Config;
