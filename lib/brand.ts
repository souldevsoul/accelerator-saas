/**
 * Brand Configuration
 *
 * Centralized brand identity including name, colors, and typography.
 * Update this file to change branding across the entire application.
 */

export const brand = {
  // Brand Name
  name: 'Nimbus',
  tagline: 'Ship features at the speed of thought',

  // Brand Description
  description: 'Nimbus is an AI-powered platform that helps developers build MVPs and ship features faster than ever before.',

  // Color Palette - Clean Fintech Sky Blue Theme
  colors: {
    // Primary brand colors (sky blue - clean, modern fintech vibe)
    primary: {
      50: '#f0f9ff',   // Lightest sky blue
      100: '#e0f2fe',  // Very light blue
      200: '#bae6fd',  // Light blue
      300: '#7dd3fc',  // Sky blue
      400: '#38bdf8',  // Bright sky blue
      500: '#0ea5e9',  // Main brand color
      600: '#0284c7',  // Primary blue
      700: '#0369a1',  // Deep blue
      800: '#075985',  // Dark blue - gradient start
      900: '#0c4a6e',  // Darkest blue - gradient end
    },

    // Secondary colors (slate grays for clean contrast)
    secondary: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },

    // Accent color (electric cyan for highlights)
    accent: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },

    // Gradient combinations - fintech clean gradients
    gradients: {
      primary: 'from-sky-600 to-blue-700',       // Clean blue gradient
      vibrant: 'from-sky-400 to-blue-600',       // Bright gradient
      subtle: 'from-sky-50 to-blue-50',          // Subtle background
      hero: 'from-white via-sky-50 to-blue-50'   // Hero section gradient
    }
  },

  // Typography
  typography: {
    fonts: {
      heading: 'var(--font-heading)',
      body: 'var(--font-body)',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
    }
  },

  // Contact Information
  contact: {
    email: 'support@nimbusdev.com',
    support: 'support@nimbusdev.com',
    legal: 'support@nimbusdev.com',
    privacy: 'support@nimbusdev.com',
    enterprise: 'support@nimbusdev.com',
  },

  // Social Media (placeholders)
  social: {
    twitter: '#',
    linkedin: '#',
    github: '#',
    instagram: '#',
  }
}

// Helper function to get gradient classes
export function getGradient(type: 'primary' | 'vibrant' | 'subtle' = 'primary'): string {
  return `bg-gradient-to-br ${brand.colors.gradients[type]}`
}

// Helper function to get primary color
export function getPrimaryColor(shade: keyof typeof brand.colors.primary = 600): string {
  return brand.colors.primary[shade]
}
