/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        school: {
          navy: '#102D53',
          'navy-dark': '#081D38',
          'navy-light': '#1A4378',
          gold: '#C9A45C',
          'gold-light': '#D6B778',
          'gold-dark': '#B38D43',
          bg: '#FFFFFF',
          'bg-secondary': '#F6F8FB',
          text: '#182536',
          muted: '#64748B',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(16, 45, 83, 0.05), 0 1px 2px -1px rgba(16, 45, 83, 0.05)',
        'card': '0 4px 12px -2px rgba(16, 45, 83, 0.06), 0 2px 6px -1px rgba(16, 45, 83, 0.04)',
        'elevated': '0 12px 30px -8px rgba(16, 45, 83, 0.12), 0 4px 10px -2px rgba(16, 45, 83, 0.06)',
      }
    },
  },
  plugins: [],
}
