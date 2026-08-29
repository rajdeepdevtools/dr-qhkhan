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
          indigo: '#55100D', // Black Cherry
          violet: '#1A0706', // Coffee Bean
          crimson: '#DD0200', // Racing Red
          lightBg: '#F8F8F8', // Alabaster Base Tint
          cardBorder: '#D9D9D9', // Alabaster Grey
        },
      },
    },
  },
  plugins: [],
};

export default config;
