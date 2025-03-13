/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'theme': {
          'bg': '#0A0A0B',
          'card': 'rgba(28, 28, 35, 0.5)',
          'accent': '#FF4405',
          'text': '#FFFFFF',
          'text-secondary': 'rgba(255, 255, 255, 0.6)',
          'border': 'rgba(255, 255, 255, 0.1)'
        }
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        'gradient': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
};