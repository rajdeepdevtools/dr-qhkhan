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
        adminDark: '#1A0706', // Coffee Bean
        adminIndigo: '#55100D', // Black Cherry
        adminAccent: '#DD0200', // Racing Red
      },
    },
  },
  plugins: [],
};

export default config;
