import type { Config } from "tailwindcss";

import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FB8110',
        secondary: '#14213D',
        error: '#960F21',
        success: '#0083C1',
        faded: '#9E9E9E',
      },
      bg: {
        primary: '#FB8110',
        secondary: '#14213D',
        error: '#960F21',
        success: '#0083C1',
        faded: '#9E9E9E',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
export default config;
