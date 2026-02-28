import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-body)", ...defaultTheme.fontFamily.sans],
        heading: ["var(--font-heading)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-mono)", ...defaultTheme.fontFamily.mono],
      },
      fontSize: {
        // Systematic typography scale (Audi-inspired)
        'h1': ['3.25rem', { lineHeight: '1.1', letterSpacing: '0.02%', fontWeight: '300' }], // 52px (reduced 13%)
        'h1-mobile': ['2.625rem', { lineHeight: '1.1', letterSpacing: '0.02%', fontWeight: '300' }], // 42px (reduced 12.5%)
        'h2': ['2rem', { lineHeight: '1.3', letterSpacing: '0.01%', fontWeight: '400' }], // 32px (reduced 11%)
        'h2-mobile': ['1.625rem', { lineHeight: '1.3', letterSpacing: '0.01%', fontWeight: '400' }], // 26px (reduced 13%)
        'h3': ['1.5rem', { lineHeight: '1.5', letterSpacing: '0.01%', fontWeight: '600' }], // 24px
        'h4': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '600' }], // 20px
        'body-lg': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '300' }], // 20px
        'body': ['1rem', { lineHeight: '1.7', letterSpacing: '0', fontWeight: '400' }], // 16px
        'body-sm': ['0.875rem', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '400' }], // 14px
        'label': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.25em', fontWeight: '500' }], // 12px
        'subhead': ['1rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '500' }], // 16px
      },
      letterSpacing: {
        'tightest': '-0.015em',
        'tighter': '-0.01em',
        'tight': '-0.005em',
        'normal': '0',
        'label': '0.1em',
        'wide': '0.25em',
      },
      lineHeight: {
        'display': '1.2',
        'heading': '1.5',
        'body': '1.7',
        'ui': '1.4',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'var(--color-foreground)',
            h1: { fontFamily: "var(--font-heading)", fontWeight: "600" },
            h2: { fontFamily: "var(--font-heading)", fontWeight: "600" },
            h3: { fontFamily: "var(--font-heading)", fontWeight: "500" },
            p: {
              fontFamily: "var(--font-body)",
              color: 'var(--color-muted)',
            },
          },
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "14px",
        xl: "20px",
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) translateX(10px) rotate(2deg)' },
          '66%': { transform: 'translateY(10px) translateX(-10px) rotate(-2deg)' },
        },
        'tilt': {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
      animation: {
        'float': 'float 15s ease-in-out infinite',
        'float-slow': 'float 20s ease-in-out infinite',
        'tilt': 'tilt 10s ease-in-out infinite',
        'shimmer': 'shimmer 8s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
      },
      colors: {
        // Typography color system aligned with Once UI tokens
        'text-primary': 'var(--color-foreground)',
        'text-secondary': 'var(--color-muted)',
        'text-muted': 'var(--color-muted-foreground)',

        brand: {
          gold: 'var(--brand-solid-medium)',
          gray: 'var(--brand-gray)',
          white: 'var(--brand-white)',
          black: 'var(--brand-black)',
        },
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: 'var(--color-primary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-accent-foreground)',
        },
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        surfaceAlt: 'var(--color-surface-alt)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        secondary: 'var(--color-muted)',
        border: 'var(--color-border)',
        foreground: 'var(--color-foreground)',
      },
    },
  },
  plugins: [typography],
};

export default config;
