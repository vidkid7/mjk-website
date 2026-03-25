import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#dc2626',
          dark: '#991b1b',
          light: '#ef4444',
          50: '#fef2f2',
          100: '#fee2e2',
        },
        royal: {
          DEFAULT: '#1e3a5f',
          dark: '#0f172a',
          light: '#2563eb',
        },
        gold: {
          DEFAULT: '#d97706',
          light: '#fbbf24',
          dark: '#b45309',
          50: '#fffbeb',
        },
        emerald: {
          DEFAULT: '#059669',
          light: '#34d399',
          50: '#ecfdf5',
        },
        violet: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          50: '#f5f3ff',
        },
        cream: '#faf9f7',
        offwhite: '#f8fafc',
        dark: '#0f172a',
        'text-dark': '#1e293b',
      },
      fontFamily: {
        yatra: ['Yatra One', 'cursive'],
        playfair: ['Playfair Display', 'serif'],
        sans: ['Inter', 'DM Sans', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'gradient-crimson': 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
        'gradient-navy': 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
        'gradient-hero': 'linear-gradient(160deg, #0f172a 0%, #1e293b 50%, #1e3a5f 100%)',
        'gradient-warm': 'linear-gradient(135deg, #dc2626 0%, #d97706 100%)',
        'gradient-cool': 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
        'gradient-fresh': 'linear-gradient(135deg, #059669 0%, #2563eb 100%)',
      },
      boxShadow: {
        'glow-crimson': '0 0 24px rgba(220, 38, 38, 0.15)',
        'glow-blue': '0 0 24px rgba(37, 99, 235, 0.15)',
        'glow-gold': '0 0 24px rgba(217, 119, 6, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
