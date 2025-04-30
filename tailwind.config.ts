import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        custom: {
          header: '#000100',
          body: '#F4FAFF',
          platinum: '#DEE7E7',
        },
      },
      keyframes: {
        appear: {
          '0%': {
            transform: 'scale(0.62)',
            opacity: '0%',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '100%',
          },
        },
        disappear: {
          '0%': {
            transform: 'scale(1)',
            opacity: '100%',
          },
          '100%': {
            transform: 'scale(0.62)',
            opacity: '0%',
          },
        },
        shake: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(1deg)',
          },
          '50%': {
            transform: 'rotate(0deg)',
          },
          '75%': {
            transform: 'rotate(-1deg)',
          },
          '100%': {
            transform: 'rotate(0deg)',
          },
        },
      },
      animation: {
        appear: 'appear 100ms ease-in',
        disappear: 'disappear 100ms ease-in',
        shake: 'shake 0.3s infinite',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
