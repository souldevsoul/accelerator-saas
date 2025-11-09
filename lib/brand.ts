/**
 * Brand Configuration
 *
 * Centralized brand identity including name, colors, and typography.
 * Update this file to change branding across the entire application.
 */

export const brand = {
  // Brand Name
  name: 'Velocity',
  tagline: 'Ship features at the speed of thought',

  // Brand Description
  description: 'Velocity is an AI-powered platform that helps developers build MVPs and ship features faster than ever before.',

  // Color Palette
  colors: {
    // Primary brand colors (purple/violet gradient)
    primary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',  // Main brand color
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',  // Primary gradient start
      900: '#581c87',  // Primary gradient end
    },

    // Secondary colors (vibrant blue)
    secondary: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },

    // Accent color (electric cyan)
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

    // Gradient combinations
    gradients: {
      primary: 'from-purple-800 to-purple-900',
      vibrant: 'from-purple-600 to-blue-600',
      subtle: 'from-purple-50 to-blue-50',
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
    email: 'hello@velocitydev.com',
    support: 'support@velocitydev.com',
    legal: 'legal@velocitydev.com',
    privacy: 'privacy@velocitydev.com',
    enterprise: 'enterprise@velocitydev.com',
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
