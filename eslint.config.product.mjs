import tsParser from '@typescript-eslint/parser';

import productQuality from './eslint-plugin-product-quality/index.js';

/**
 * Product Quality ESLint Config for Nimbus
 * Flat config format (ESLint 9+) with TypeScript support
 *
 * Enforces Nimbus brand standards:
 * - Blue/Sky/Cyan color palette only
 * - Company name: Nimbus
 * - Email: support@nimbusdev.com
 * - Payment provider: stripe
 */
export default [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      'product-quality': productQuality,
    },
    rules: {
      // ========================================
      // LINK VALIDATION (Critical for UX)
      // ========================================
      'product-quality/no-broken-internal-links': 'warn',

      // ========================================
      // BRAND CONSISTENCY - NIMBUS ONLY
      // ========================================
      'product-quality/use-styleguide-colors-only': ['warn', {
        allowedColors: [
          // Base colors
          'black',
          'white',
          'transparent',
          'current',
          'inherit',
          // Grayscale (always allowed)
          'gray-',
          'slate-',
          'zinc-',
          'neutral-',
          // Nimbus brand colors ONLY
          'blue-',      // Primary brand color (#3b82f6, #2563eb, #1d4ed8)
          'sky-',       // Secondary brand color (#0ea5e9, #0284c7)
          'cyan-',      // Accent color
          // Utility colors (allowed)
          'red-',       // For errors
        ],
      }],

      // ========================================
      // CONTENT CONSISTENCY - NIMBUS
      // ========================================
      'product-quality/consistent-payment-providers': ['warn', {
        provider: 'stripe',
      }],
      'product-quality/consistent-company-info': ['warn', {
        companyName: 'Nimbus',
        email: 'support@nimbusdev.com',
      }],

      // ========================================
      // UX CONSISTENCY RULES
      // ========================================
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-form-without-submit': 'error',
      'product-quality/no-missing-alt-text': 'error',
      'product-quality/no-generic-placeholders': 'warn',
      'product-quality/require-loading-state-on-async-button': 'warn',
      'product-quality/require-aria-label-on-icon-buttons': 'warn',

      // ========================================
      // ERROR HANDLING & QUALITY
      // ========================================
      'product-quality/require-try-catch-fetch': 'warn',
      'product-quality/require-empty-state': 'warn',

      // ========================================
      // PERFORMANCE
      // ========================================
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
