/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
      './pages/**/*.{ts,tsx}',
      './components/**/*.{ts,tsx}',
      './app/**/*.{ts,tsx,mdx}',
      './src/**/*.{ts,tsx,mdx}', // Si usas src/
      './components/theme-palette-button.tsx',
      ],
    prefix: "",
    theme: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1400px",
        },
      },
      extend: {
         fontFamily: {
           sans: ["var(--font-sans)", "system-ui", "sans-serif"],
         },
        colors: {
          border: "hsl(var(--border))",
          input: "hsl(var(--input))",
          ring: "hsl(var(--ring))",
          background: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))",
          primary: {
            DEFAULT: "hsl(var(--primary))", // Teal
            foreground: "hsl(var(--primary-foreground))", // Dark Teal/White
          },
          secondary: {
            DEFAULT: "hsl(var(--secondary))", // Light Gray
            foreground: "hsl(var(--secondary-foreground))", // Dark Gray
          },
          destructive: {
            DEFAULT: "hsl(var(--destructive))", // Red
            foreground: "hsl(var(--destructive-foreground))", // White
          },
          muted: {
            DEFAULT: "hsl(var(--muted))", // Lighter Gray
            foreground: "hsl(var(--muted-foreground))", // Medium Gray
          },
          accent: {
            DEFAULT: "hsl(var(--accent))", // Amber/Orange
            foreground: "hsl(var(--accent-foreground))", // Dark Gray/Black
          },
          popover: {
            DEFAULT: "hsl(var(--popover))",
            foreground: "hsl(var(--popover-foreground))",
          },
          card: {
            DEFAULT: "hsl(var(--card))",
            foreground: "hsl(var(--card-foreground))",
          },
        },
        borderRadius: {
          lg: "var(--radius)",
          md: "calc(var(--radius) - 2px)",
          sm: "calc(var(--radius) - 4px)",
        },
        keyframes: {
          "accordion-down": {
            from: { height: "0" },
            to: { height: "var(--radix-accordion-content-height)" },
          },
          "accordion-up": {
            from: { height: "var(--radix-accordion-content-height)" },
            to: { height: "0" },
          },
        },
        animation: {
          "accordion-down": "accordion-down 0.2s ease-out",
          "accordion-up": "accordion-up 0.2s ease-out",
        },
         // Add prose styles for markdown rendering
         typography: (theme) => ({
          DEFAULT: {
            css: {
              '--tw-prose-body': theme('colors.foreground'),
              '--tw-prose-headings': theme('colors.foreground'),
              '--tw-prose-lead': theme('colors.muted.foreground'),
              '--tw-prose-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-bold': theme('colors.foreground'),
              '--tw-prose-counters': theme('colors.muted.foreground'),
              '--tw-prose-bullets': theme('colors.muted.foreground'),
              '--tw-prose-hr': theme('colors.border'),
              '--tw-prose-quotes': theme('colors.foreground'),
              '--tw-prose-quote-borders': theme('colors.border'),
              '--tw-prose-captions': theme('colors.muted.foreground'),
              '--tw-prose-code': theme('colors.foreground'),
              '--tw-prose-pre-code': theme('colors.foreground'),
              '--tw-prose-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-th-borders': theme('colors.border'),
              '--tw-prose-td-borders': theme('colors.border'),
              '--tw-prose-invert-body': theme('colors.foreground'), // Assuming foreground is light in dark mode
              '--tw-prose-invert-headings': theme('colors.foreground'),
              '--tw-prose-invert-lead': theme('colors.muted.foreground'),
              '--tw-prose-invert-links': theme('colors.primary.DEFAULT'),
              '--tw-prose-invert-bold': theme('colors.foreground'),
              '--tw-prose-invert-counters': theme('colors.muted.foreground'),
              '--tw-prose-invert-bullets': theme('colors.muted.foreground'),
              '--tw-prose-invert-hr': theme('colors.border'),
              '--tw-prose-invert-quotes': theme('colors.foreground'),
              '--tw-prose-invert-quote-borders': theme('colors.border'),
              '--tw-prose-invert-captions': theme('colors.muted.foreground'),
              '--tw-prose-invert-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-code': theme('colors.foreground'),
              '--tw-prose-invert-pre-bg': theme('colors.muted.DEFAULT'),
              '--tw-prose-invert-th-borders': theme('colors.border'),
              '--tw-prose-invert-td-borders': theme('colors.border'),
              // Customizations
              code: {
                  padding: '0.2em 0.4em',
                  margin: '0',
                  fontSize: '85%',
                  backgroundColor: 'hsl(var(--muted))',
                  borderRadius: '0.25rem',
                  fontWeight: '400', // Ensure code block text isn't bold by default
                  color: 'inherit' // Inherit color
              },
              'code::before': { content: 'none' }, // Remove default quotes around inline code
              'code::after': { content: 'none' },
              pre: {
                   fontWeight: '400', // Ensure pre block text isn't bold
                   color: 'inherit', // Inherit color
                   backgroundColor: 'hsl(var(--muted))', // Match inline code bg
                   padding: theme('padding.4'),
                   borderRadius: theme('borderRadius.sm'),
                   overflowX: 'auto',
              },
              'pre code': { // Style code specifically inside pre blocks
                   backgroundColor: 'transparent', // No background for code inside pre
                   padding: '0',
                   margin: '0',
                   fontSize: 'inherit', // Inherit font size from pre
                   color: 'inherit', // Inherit color from pre
                   fontWeight: 'inherit', // Inherit font weight
               },
              'pre code::before': { content: 'none' }, // Remove quotes for code inside pre
              'pre code::after': { content: 'none' },
            },
          },
        }),
      },
    },
    plugins: [require("tailwindcss-animate"), require('@tailwindcss/typography')],
  }