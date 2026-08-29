import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        clinic: {
          indigo: '#1E1B4B',
          violet: '#4C1D95',
          crimson: '#C2410C',
          lightBg: '#F8FAFC',
          cardBorder: '#E2E8F0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
