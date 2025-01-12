import type { Config } from 'tailwindcss';

export const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  safelist: [
    'hover:bg-ecole',
    'hover:bg-viescolaire',
    'hover:bg-classes',
    'hover:bg-blog',
    'hover:bg-espaceprive',
    'hover:bg-private',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'Raleway', 'sans-serif'], // Assurez-vous que Poppins et Raleway sont inclus
        cursive: ['Comfortaa', 'cursive'],
      },
      fontSize: {
        h1: '12em',
        h2: '1.1rem',
        h3: '1rem',
        subtitle: '0.9rem',
      },
      letterSpacing: {
        wider: '1px',
        widest: '2px',
        'extra-wide': '4px',
      },
      lineHeight: {
        tight: '1.2',
        relaxed: '3',
        normal: '1.1',
      },
      textTransform: {
        uppercase: 'uppercase',
        capitalize: 'capitalize',
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          dark: 'hsl(var(--primary-dark))',
          light: 'hsl(var(--primary-light))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          dark: 'hsl(var(--secondary-dark))',
          ligth: 'hsl(var(--secondary-light))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        ecole: {
          DEFAULT: 'hsl(187, 72%, 71%)',
          foreground: 'hsl(187, 72%, 93%)',
          light: 'hsl(187, 72%, 93%)',
        },
        viescolaire: {
          DEFAULT: '	hsl(46, 100%, 65%)',
          foreground: 'hsl(46, 100%, 94%)',
          light: 'hsl(46, 100%, 94%)',
        },
        classes: {
          DEFAULT: 'hsl(122, 39%, 49%)',
          foreground: 'hsl(125, 39%, 94%)',
          light: 'hsl(125, 39%, 94%)',
        },
        espaceprive: {
          DEFAULT: 'hsl(14, 100%, 63%)',
          foreground: 'hsl(6, 71%, 95%)',
          light: 'hsl(6, 71%, 95%)',
        },
        blog: {
          DEFAULT: 'hsl(262, 47%, 63%)',
          foreground: 'hsl(264, 45%, 94%)',
          light: 'hsl(264, 45%, 94%)',
        },
        private: {
          DEFAULT: 'hsl(187, 72%, 71%)',
          foreground: 'hsl(187, 72%, 93%)',
          light: 'hsl(187, 72%, 93%)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;

export default config;
