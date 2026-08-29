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
        adminDark: '#0F172A',
        adminIndigo: '#1E1B4B',
        adminAccent: '#C2410C',
      },
    },
  },
  plugins: [],
};

export default config;
