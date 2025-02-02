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
} from './src/tokens';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // container: {
      //   center: true,
      //   padding: '1rem',
      //   screens: {
      //     sm: '100%',
      //     '2xl': '1200px',
      //   },
      // },
      colors: {
        ...colors,
      },
      spacing: {
        ...spacing,
      },
      width: {
        ...width,
      },
      height: {
        ...height,
      },
      maxHeight: {
        ...maxHeight,
      },
      maxWidth: {
        ...maxWidth,
      },
      minHeight: {
        ...minHeight,
      },
      minWidth: {
        ...minWidth,
      },
      borderWidth: {
        ...borderWidth,
      },
      borderRadius: {
        ...borderRadius,
      },
      gridTemplateRows: { ...gridTemplateRows },
    },
  },
  plugins: [],
} satisfies Config;
