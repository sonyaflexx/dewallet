import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': 'rgb(33, 35, 37)',
        'secondary-bg': 'rgb(46, 53, 61)',
        'tertiary-bg': 'rgb(66, 75, 86)',
        "quadary-bg": "#40454A",
        'border': 'rgb(65, 69, 79)',
        'placeholder-primary': 'rgb(255, 255, 255)',
        'placeholder-secondary': 'rgb(148, 163, 184)',
        'placeholder-tertiary': 'rgb(138, 151, 170)',
        'accent-brand': 'rgb(0, 122, 255)',
        'accent-warning': 'rgb(251, 146, 60)',
        'accent-error': 'rgb(255, 28, 69)',
        'accent-success': 'rgb(16, 185, 129)',
        'accent-waiting': 'rgb(37, 99, 235)',
        'primary-blue': "#007AFF",
        "disabled": "#dcdcdc",
        'border-dark': 'rgba(116, 116, 128, 0.15)',
        'ghost': 'rgba(255, 255, 255, 0.3)',
        'hint': '#aaaaaa',
        'success': 'rgb(11, 167, 11)'
      },
    },
  },
  plugins: [],
};
export default config;
