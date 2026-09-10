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
          patrickBlue: '#1F0270', // Patrick's Royal Blue
          patrickBlueDark: '#120146', // Deep Royal Navy
          patrickBlueLight: '#2E0AB0', // Vibrant Royal Accent
          americanYellow: '#F5B800', // American Yellow / Radiant Gold
          americanYellowHover: '#D99B00', // Warm Gold Hover State
          americanYellowLight: '#FFF9E6', // Soft Yellow Glow Tint
          indigo: '#1F0270', // Primary Theme (Patrick's Blue)
          violet: '#120146', // Coffee/Navy Accent
          crimson: '#F5B800', // Accent Highlight (American Yellow)
          lightBg: '#F8FAFC', // Slate-Pearl Base Tint
          cardBorder: '#E2E8F0', // Soft Glass Border
        },
      },
    },
  },
  plugins: [],
};

export default config;
