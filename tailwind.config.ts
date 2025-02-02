import type { Config } from 'tailwindcss';

import {
  colors,
  spacing,
  width,
  height,
  maxHeight,
  maxWidth,
  minHeight,
  minWidth,
  borderRadius,
  borderWidth,
  gridTemplateRows,
  container,
} from './src/tokens';

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
    },
    container,
  },
  plugins: [],
} satisfies Config;
