// tailwind.config.js
import daisyui from 'daisyui';

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Minimalistic color palette
        primary: '#1F2937', // Dark gray
        secondary: '#6B7280', // Medium gray
        accent: '#3B82F6', // Subtle blue
        neutral: '#F9FAFB', // Light background
        'base-100': '#FFFFFF', // White
        'base-200': '#F3F4F6', // Light gray
        'base-300': '#E5E7EB', // Medium light gray
        success: '#10B981', // Clean green
        warning: '#F59E0B', // Amber
        error: '#EF4444', // Clean red
        info: '#3B82F6', // Blue
        // Minimalistic card colors
        'card-dark': '#1F2937', // Dark card background
        'card-light': '#FFFFFF', // Light card background
        'text-primary': '#111827', // Dark text
        'text-secondary': '#6B7280', // Medium text
        'text-muted': '#9CA3AF', // Muted text
        'border-light': '#E5E7EB', // Light border
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Inter', 'system-ui', 'sans-serif'],
        'heading': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        minimal: {
          "primary": "#1F2937",
          "secondary": "#6B7280",
          "accent": "#3B82F6",
          "neutral": "#F9FAFB",
          "base-100": "#FFFFFF",
          "base-200": "#F3F4F6",
          "base-300": "#E5E7EB",
          "info": "#3B82F6",
          "success": "#10B981",
          "warning": "#F59E0B",
          "error": "#EF4444",
        },
      },
    ],
  },
};
