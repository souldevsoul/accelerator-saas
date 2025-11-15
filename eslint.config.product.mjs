import tsParser from '@typescript-eslint/parser';

import productQuality from './eslint-plugin-product-quality/index.js';

/**
 * Product Quality ESLint Config for Nimbus
 * Flat config format (ESLint 9+) with TypeScript support
 *
 * Enforces Nimbus brand standards:
 * - blue/sky/cyan color palette (clean professional theme)
 * - Company name: Nimbus (Title Case)
 * - Email: support@nimbusdev.com (single contact point)
 * - Payment provider: stripe
 */
export default [
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'out/**',
      'build/**',
      '*.config.js',
      '*.config.ts',
      'eslint-plugin-product-quality/**',
    ],
  },
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
      // PRODUCT QUALITY - CRITICAL
      // ========================================

      // Link validation - prevents 404 errors
      'product-quality/no-broken-internal-links': 'error',

      // Brand consistency - ensures correct branding
      'product-quality/consistent-company-info': ['error', {
        companyName: 'Nimbus',
        email: 'support@nimbusdev.com',
      }],

      // Payment provider consistency
      'product-quality/consistent-payment-providers': ['error', {
        provider: 'stripe',
      }],

      // Color palette enforcement - brand visual consistency
      'product-quality/use-styleguide-colors-only': ['error', {
        allowedColors: [
          // Base
          'black', 'white', 'transparent', 'current', 'inherit',
          // Neutrals
          'slate-', 'gray-', 'zinc-', 'neutral-',
          // Nimbus brand (blue/sky/cyan)
          'blue-', 'sky-', 'cyan-',
          // Semantic
          'red-', // Errors only
        ],
      }],

      // ========================================
      // TEMPLATE ADAPTATION (CRITICAL)
      // ========================================
      'product-quality/no-template-content': ['error', {
        projectName: 'Nimbus',
        forbiddenWords: [
          // No old project names
          'Accelerator', 'VoiceCraft', 'LogoSmith', 'Velocity', 'Aurora', 'Zenith',
          // No features we don't have
          'voice', 'Voice', 'audio', 'Audio',
          'logo', 'Logo',
        ],
      }],

      'product-quality/no-fake-statistics': 'error',

      'product-quality/require-consistent-layout': ['warn', {
        marketingPages: ['/', '/about', '/pricing', '/how-it-works', '/contact', '/experts', '/blog'],
      }],

      'product-quality/require-policy-content': ['warn', {
        minimumLength: 500,
      }],

      'product-quality/require-auth-ui-in-dashboard': 'warn',

      // ========================================
      // UX & FUNCTIONALITY
      // ========================================

      // Interactive elements must be functional
      'product-quality/no-button-without-handler': 'warn',
      'product-quality/no-form-without-submit': 'error',

      // Accessibility
      'product-quality/no-missing-alt-text': 'error',

      // Content quality
      'product-quality/no-generic-placeholders': 'warn',

      // ========================================
      // PERFORMANCE & OPTIMIZATION
      // ========================================
      'product-quality/require-image-optimization': 'warn',
    },
  },
];
