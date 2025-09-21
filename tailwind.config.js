/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(220, 20%, 95%)',
        accent: 'hsl(320, 80%, 55%)',
        primary: 'hsl(240, 70%, 50%)',
        surface: 'hsl(0, 0%, 100%)',
        'text-primary': 'hsl(220, 20%, 15%)',
        'text-secondary': 'hsl(220, 20%, 45%)',
      },
      borderRadius: {
        'lg': '20px',
        'md': '12px',
        'sm': '8px',
      },
      boxShadow: {
        'card': '0 4px 16px hsla(0, 0%, 0%, 0.08)',
      },
      spacing: {
        'lg': '24px',
        'md': '16px',
        'sm': '8px',
      },
      animation: {
        'swipe-left': 'swipeLeft 0.3s ease-in-out',
        'swipe-right': 'swipeRight 0.3s ease-in-out',
      },
      keyframes: {
        swipeLeft: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(-100%) rotate(-30deg)', opacity: '0' },
        },
        swipeRight: {
          '0%': { transform: 'translateX(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateX(100%) rotate(30deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
