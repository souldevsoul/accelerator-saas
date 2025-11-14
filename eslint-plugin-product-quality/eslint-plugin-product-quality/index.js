/**
 * ESLint Plugin: Product Quality - FIXED VERSION
 * Only checks actual color values, not utility classes
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs');
const path = require('node:path');
/* eslint-enable @typescript-eslint/no-require-imports */

// List of Tailwind utility prefixes that are NOT colors
const NON_COLOR_UTILITIES = [
  'text-xs',
  'text-sm',
  'text-base',
  'text-lg',
  'text-xl',
  'text-2xl',
  'text-3xl',
  'text-4xl',
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
  'text-opacity-',
  'text-ellipsis',
  'text-clip',
  'text-wrap',
  'bg-opacity-',
  'bg-none',
  'bg-gradient-',
  'bg-fixed',
  'bg-local',
  'bg-scroll',
  'bg-clip-',
  'bg-origin-',
  'bg-contain',
  'bg-cover',
  'bg-auto',
  'border-',
  'border-solid',
  'border-dashed',
  'border-dotted',
  'border-double',
  'border-none',
  'border-0',
  'border-2',
  'border-4',
  'border-8',
  'border-t',
  'border-r',
  'border-b',
  'border-l',
  'border-x',
  'border-y',
  'border-t-',
  'border-r-',
  'border-b-',
  'border-l-',
  'border-opacity-',
];

function isColorClass(className) {
  // Check if it's a non-color utility
  if (NON_COLOR_UTILITIES.some(util => className.startsWith(util))) {
    return false;
  }

  // Check if it's an actual color class
  const colorPrefixes = ['text-', 'bg-', 'border-'];
  if (!colorPrefixes.some(prefix => className.startsWith(prefix))) {
    return false;
  }

  // Must have a color name after the prefix
  const parts = className.split('-');
  if (parts.length < 2) {
    return false;
  }

  // Check if second part is a color name (not a utility)
  const colorNames = [
    'slate',
    'gray',
    'zinc',
    'neutral',
    'stone',
    'red',
    'orange',
    'amber',
    'yellow',
    'lime',
    'green',
    'emerald',
    'teal',
    'cyan',
    'sky',
    'blue',
    'indigo',
    'violet',
    'purple',
    'fuchsia',
    'pink',
    'rose',
    'black',
    'white',
    'transparent',
    'current',
    'inherit',
  ];

  return colorNames.some(color => parts[1] === color || parts[1].startsWith(color));
}

module.exports = {
  rules: {
    'no-broken-internal-links': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure all internal links point to existing pages',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          brokenLink: 'Internal link "{{href}}" points to non-existent page. This will cause a 404 error.',
        },
      },
      create(context) {
        return {
          JSXAttribute(node) {
            if (node.name.name === 'href' && node.value?.type === 'Literal') {
              const href = node.value.value;

              if (typeof href === 'string' && href.startsWith('/') && !href.startsWith('//')) {
                const cleanPath = href.split('#')[0].split('?')[0];

                // Try both app and src/app directories
                const baseDirs = [
                  path.join(context.getCwd(), 'app'),
                  path.join(context.getCwd(), 'src', 'app'),
                ];

                let fileExists = false;

                for (const baseDir of baseDirs) {
                  // Check direct path
                  const directFiles = [
                    path.join(baseDir, cleanPath, 'page.tsx'),
                    path.join(baseDir, cleanPath, 'page.jsx'),
                  ];

                  if (directFiles.some(file => fs.existsSync(file))) {
                    fileExists = true;
                    break;
                  }

                  // Check with dynamic route patterns like [locale]
                  try {
                    const searchDir = fs.existsSync(baseDir) ? fs.readdirSync(baseDir) : [];
                    for (const entry of searchDir) {
                      // Check for [locale] or other dynamic segments
                      if (entry.startsWith('[') && entry.endsWith(']')) {
                        const dynamicPath = path.join(baseDir, entry);
                        const nestedFiles = [
                          path.join(dynamicPath, cleanPath, 'page.tsx'),
                          path.join(dynamicPath, cleanPath, 'page.jsx'),
                          path.join(dynamicPath, '(unauth)', cleanPath, 'page.tsx'),
                          path.join(dynamicPath, '(unauth)', cleanPath, 'page.jsx'),
                          path.join(dynamicPath, '(auth)', cleanPath, 'page.tsx'),
                          path.join(dynamicPath, '(auth)', cleanPath, 'page.jsx'),
                        ];

                        if (nestedFiles.some(file => fs.existsSync(file))) {
                          fileExists = true;
                          break;
                        }
                      }

                      // Check for route groups like (marketing), (dashboard), etc.
                      if (entry.startsWith('(') && entry.endsWith(')')) {
                        const routeGroupPath = path.join(baseDir, entry);
                        const routeGroupFiles = [
                          path.join(routeGroupPath, cleanPath, 'page.tsx'),
                          path.join(routeGroupPath, cleanPath, 'page.jsx'),
                        ];

                        if (routeGroupFiles.some(file => fs.existsSync(file))) {
                          fileExists = true;
                          break;
                        }
                      }
                    }
                  } catch {
                    // Ignore errors reading directory
                  }

                  if (fileExists) {
                    break;
                  }
                }

                if (!fileExists && cleanPath !== '/' && cleanPath !== '') {
                  context.report({
                    node,
                    messageId: 'brokenLink',
                    data: { href },
                  });
                }
              }
            }
          },
        };
      },
    },

    'use-styleguide-colors-only': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Only use colors defined in the style guide',
          category: 'Brand Consistency',
          recommended: true,
        },
        messages: {
          unauthorizedColor: 'Color "{{color}}" is not in the approved style guide. Use one of: {{approved}}',
          arbitraryColor: 'Avoid arbitrary color values like "{{color}}". Use Tailwind utility classes from the style guide.',
        },
        schema: [
          {
            type: 'object',
            properties: {
              allowedColors: {
                type: 'array',
                items: { type: 'string' },
              },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const allowedColors = options.allowedColors || ['black', 'white', 'gray-'];

        return {
          JSXAttribute(node) {
            if (node.name.name === 'className' && node.value?.value) {
              const classes = node.value.value.split(' ');

              classes.forEach((className) => {
                // Only check if it's actually a color class
                if (!isColorClass(className)) {
                  return;
                }

                const color = className.split('-').slice(1).join('-');
                const isAllowed = allowedColors.some(allowed => color.startsWith(allowed));

                if (!isAllowed && !color.includes('[') && !color.includes('inherit') && !color.includes('transparent')) {
                  context.report({
                    node,
                    messageId: 'unauthorizedColor',
                    data: {
                      color: className,
                      approved: allowedColors.join(', '),
                    },
                  });
                }

                // Check for arbitrary values like bg-[#FF0000]
                if (className.includes('[#') || className.includes('[rgb')) {
                  context.report({
                    node,
                    messageId: 'arbitraryColor',
                    data: { color: className },
                  });
                }
              });
            }
          },
        };
      },
    },

    'consistent-company-info': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure company information (address, phone, email) is consistent',
          category: 'Content Consistency',
          recommended: true,
        },
        messages: {
          inconsistentEmail: 'Email "{{found}}" doesn\'t match configured email "{{configured}}"',
        },
        schema: [
          {
            type: 'object',
            properties: {
              companyName: { type: 'string' },
              email: { type: 'string' },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};

        return {
          Literal(node) {
            if (typeof node.value === 'string' && options.email) {
              const emailMatch = node.value.match(/\b[\w.%+-]+@[A-Z0-9.-]+\.[A-Z|]{2,}\b/i);
              if (emailMatch && emailMatch[0] !== options.email && !emailMatch[0].includes('example.com')) {
                context.report({
                  node,
                  messageId: 'inconsistentEmail',
                  data: {
                    found: emailMatch[0],
                    configured: options.email,
                  },
                });
              }
            }
          },
        };
      },
    },

    'consistent-payment-providers': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure payment provider mentions are consistent',
          category: 'Content Consistency',
          recommended: true,
        },
        messages: {
          inconsistentProvider: 'Payment provider "{{provider}}" used here, but config specifies "{{configured}}". Keep consistent.',
        },
        schema: [
          {
            type: 'object',
            properties: {
              provider: {
                type: 'string',
                enum: ['stripe', 'ecommpay', 'paypal', 'square'],
              },
            },
          },
        ],
      },
      create(context) {
        const options = context.options[0] || {};
        const configuredProvider = options.provider || 'stripe';

        const providerPatterns = {
          stripe: /\bstripe\b/i,
          ecommpay: /\becommpay\b/i,
          paypal: /\bpaypal\b/i,
          square: /\bsquare\b/i,
        };

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              Object.entries(providerPatterns).forEach(([provider, pattern]) => {
                if (pattern.test(node.value) && provider !== configuredProvider) {
                  context.report({
                    node,
                    messageId: 'inconsistentProvider',
                    data: { provider, configured: configuredProvider },
                  });
                }
              });
            }
          },
        };
      },
    },

    // ========================================
    // UX CONSISTENCY RULES
    // ========================================

    'no-button-without-handler': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Buttons should have onClick handler or type attribute',
          category: 'UX Consistency',
          recommended: true,
        },
        messages: {
          missingHandler: 'Button has no onClick handler or type. Non-interactive buttons confuse users.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            const elementName = node.openingElement.name.name;

            if (elementName === 'button' || elementName === 'Button') {
              const attributes = node.openingElement.attributes;
              const hasOnClick = attributes.some(attr => attr.name?.name === 'onClick');
              const hasType = attributes.some(attr => attr.name?.name === 'type');
              const hasAsChild = attributes.some(attr => attr.name?.name === 'asChild');

              if (!hasOnClick && !hasType && !hasAsChild) {
                context.report({
                  node,
                  messageId: 'missingHandler',
                });
              }
            }
          },
        };
      },
    },

    'no-form-without-submit': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Forms must have onSubmit handler',
          category: 'UX Consistency',
          recommended: true,
        },
        messages: {
          missingSubmit: 'Form has no onSubmit handler. Forms should handle submission explicitly.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            if (node.openingElement.name.name === 'form') {
              const attributes = node.openingElement.attributes;
              const hasOnSubmit = attributes.some(attr => attr.name?.name === 'onSubmit');
              const hasAction = attributes.some(attr => attr.name?.name === 'action');

              if (!hasOnSubmit && !hasAction) {
                context.report({
                  node,
                  messageId: 'missingSubmit',
                });
              }
            }
          },
        };
      },
    },

    'no-missing-alt-text': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Images must have alt text for accessibility',
          category: 'Accessibility',
          recommended: true,
        },
        messages: {
          missingAlt: 'Image missing alt attribute. Add alt="" for decorative images or descriptive alt text.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            const elementName = node.openingElement.name.name;

            if (elementName === 'img' || elementName === 'Image') {
              const attributes = node.openingElement.attributes;
              const altAttr = attributes.find(attr => attr.name?.name === 'alt');

              if (!altAttr) {
                context.report({
                  node,
                  messageId: 'missingAlt',
                });
              }
            }
          },
        };
      },
    },

    'no-generic-placeholders': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Avoid generic placeholder text like "Enter text", "Click here"',
          category: 'UX Consistency',
          recommended: true,
        },
        messages: {
          genericPlaceholder: 'Generic placeholder "{{text}}" should be more specific. Example: "Enter your email address"',
        },
      },
      create(context) {
        const genericPhrases = [
          'click here',
          'click me',
          'enter text',
          'type here',
          'input text',
          'enter value',
        ];

        return {
          JSXAttribute(node) {
            if (node.name?.name === 'placeholder' && node.value?.value) {
              const value = node.value.value.toLowerCase().trim();

              if (genericPhrases.includes(value)) {
                context.report({
                  node,
                  messageId: 'genericPlaceholder',
                  data: { text: node.value.value },
                });
              }
            }
          },
        };
      },
    },

    'require-loading-state-on-async-button': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Buttons with async onClick should show loading state',
          category: 'UX Consistency',
          recommended: true,
        },
        messages: {
          missingLoadingState: 'Async button onClick should have loading state. Users need feedback during async operations.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            const elementName = node.openingElement.name.name;

            if (elementName === 'button' || elementName === 'Button') {
              const attributes = node.openingElement.attributes;
              const onClickAttr = attributes.find(attr => attr.name?.name === 'onClick');

              if (onClickAttr?.value?.expression) {
                const source = context.getSourceCode();
                const onClickCode = source.getText(onClickAttr.value.expression);

                const isAsync = onClickCode.includes('async') || onClickCode.includes('await')
                  || onClickCode.includes('fetch(') || onClickCode.includes('.then(');

                if (isAsync) {
                  const hasLoadingProp = attributes.some(attr =>
                    attr.name?.name === 'loading'
                    || attr.name?.name === 'isLoading'
                    || attr.name?.name === 'disabled',
                  );

                  if (!hasLoadingProp) {
                    context.report({
                      node: onClickAttr,
                      messageId: 'missingLoadingState',
                    });
                  }
                }
              }
            }
          },
        };
      },
    },

    'require-try-catch-fetch': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Fetch calls should be wrapped in try-catch',
          category: 'Error Handling',
          recommended: true,
        },
        messages: {
          missingTryCatch: 'Fetch call not wrapped in try-catch. API calls can fail and should handle errors gracefully.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.name === 'fetch'
              || (node.callee.type === 'MemberExpression' && node.callee.property.name === 'fetch')) {
              let parent = node.parent;
              let inTryCatch = false;

              while (parent) {
                if (parent.type === 'TryStatement') {
                  inTryCatch = true;
                  break;
                }
                parent = parent.parent;
              }

              if (!inTryCatch) {
                context.report({
                  node,
                  messageId: 'missingTryCatch',
                });
              }
            }
          },
        };
      },
    },

    'require-empty-state': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Lists/grids should handle empty state with helpful message',
          category: 'UX Consistency',
          recommended: true,
        },
        messages: {
          missingEmptyState: 'Array map without empty state check. Show helpful message when data is empty.',
        },
      },
      create(context) {
        return {
          CallExpression(node) {
            if (node.callee.type === 'MemberExpression'
              && node.callee.property.name === 'map') {
              let parent = node.parent;
              let hasLengthCheck = false;

              while (parent && parent.type !== 'Program') {
                if (parent.type === 'ConditionalExpression'
                  || parent.type === 'IfStatement'
                  || parent.type === 'LogicalExpression') {
                  const source = context.getSourceCode();
                  const parentText = source.getText(parent);

                  if (parentText.includes('.length')
                    || parentText.includes('?.length')
                    || parentText.includes('isEmpty')
                    || parentText.includes('hasData')) {
                    hasLengthCheck = true;
                    break;
                  }
                }
                parent = parent.parent;
              }

              if (!hasLengthCheck) {
                context.report({
                  node,
                  messageId: 'missingEmptyState',
                });
              }
            }
          },
        };
      },
    },

    'require-image-optimization': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Use Next.js Image component instead of img tag',
          category: 'Performance',
          recommended: true,
        },
        messages: {
          useNextImage: 'Use Next.js <Image> component instead of <img> for automatic optimization.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            if (node.openingElement.name.name === 'img') {
              const filename = context.getFilename();
              if (filename.includes('/app/') || filename.includes('/pages/') || filename.includes('/src/')) {
                context.report({
                  node,
                  messageId: 'useNextImage',
                });
              }
            }
          },
        };
      },
    },

    'require-aria-label-on-icon-buttons': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Icon-only buttons need aria-label for screen readers',
          category: 'Accessibility',
          recommended: true,
        },
        messages: {
          missingAriaLabel: 'Icon button missing aria-label. Screen readers need descriptive text.',
        },
      },
      create(context) {
        return {
          JSXElement(node) {
            const elementName = node.openingElement.name.name;

            if (elementName === 'button' || elementName === 'Button') {
              const attributes = node.openingElement.attributes;
              const hasAriaLabel = attributes.some(attr =>
                attr.name?.name === 'aria-label'
                || attr.name?.name === 'aria-labelledby',
              );

              const hasTextChild = node.children.some(child =>
                child.type === 'JSXText' && child.value.trim().length > 0,
              );

              const source = context.getSourceCode();
              const buttonContent = source.getText(node);
              const hasIcon = /Icon|icon|svg|SVG|Ri[A-Z]|Lucide|Menu|X|Close|Search|Arrow/.test(buttonContent);

              if (hasIcon && !hasTextChild && !hasAriaLabel) {
                context.report({
                  node,
                  messageId: 'missingAriaLabel',
                });
              }
            }
          },
        };
      },
    },

    // ========================================
    // NEW RULES - Template & Content Quality
    // ========================================

    'no-template-content': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Detect template remnants (VoiceCraft content)',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          templateContent: 'Template remnant "{{keyword}}" found. Replace with {{projectName}} equivalent.',
        },
        schema: [{
          type: 'object',
          properties: {
            projectName: { type: 'string' },
            forbiddenWords: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        }],
      },
      create(context) {
        const options = context.options[0] || {};
        const projectName = options.projectName || 'this project';
        const forbiddenWords = options.forbiddenWords || [];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              const value = node.value.toLowerCase();
              for (const word of forbiddenWords) {
                if (value.includes(word.toLowerCase())) {
                  context.report({
                    node,
                    messageId: 'templateContent',
                    data: {
                      keyword: word,
                      projectName,
                    },
                  });
                }
              }
            }
          },
          JSXText(node) {
            const text = node.value.toLowerCase();
            for (const word of forbiddenWords) {
              if (text.includes(word.toLowerCase())) {
                context.report({
                  node,
                  messageId: 'templateContent',
                  data: {
                    keyword: word,
                    projectName,
                  },
                });
              }
            }
          },
        };
      },
    },

    'no-fake-statistics': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Detect fake statistics and inflated user counts',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          fakeStatistic: 'Fake statistic detected: "{{text}}". Use real data or remove.',
        },
      },
      create(context) {
        const patterns = [
          /\b\d{4,}\+/,                    // 10000+, 5000+
          /\b\d+k\+/i,                     // 10K+, 5k+
          /\b\d\.\d\s*\/\s*5\b/,          // 4.9/5, 4.8/5
          /\b\d+%\s+(satisfaction|happy|success)/i,  // 95% satisfaction
          /\b(thousands|millions)\s+of\s+(users|customers|clients)/i,
        ];

        return {
          Literal(node) {
            if (typeof node.value === 'string') {
              for (const pattern of patterns) {
                if (pattern.test(node.value)) {
                  context.report({
                    node,
                    messageId: 'fakeStatistic',
                    data: { text: node.value },
                  });
                }
              }
            }
          },
          JSXText(node) {
            for (const pattern of patterns) {
              if (pattern.test(node.value)) {
                context.report({
                  node,
                  messageId: 'fakeStatistic',
                  data: { text: node.value.trim() },
                });
              }
            }
          },
        };
      },
    },

    'require-consistent-layout': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure pages use correct Header/Footer components',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          wrongHeader: 'Marketing pages must import Header from "@/components/marketing/layout/header"',
          missingHeader: 'Marketing page missing Header import',
          wrongFooter: 'Pages must import Footer from "@/components/marketing/layout/footer"',
          missingFooter: 'Page missing Footer component',
          dashboardNeedsNavbar: 'Dashboard pages should use Navbar from "@/components/shared/Navbar"',
        },
        schema: [{
          type: 'object',
          properties: {
            marketingPages: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        }],
      },
      create(context) {
        const filename = context.getFilename();
        const options = context.options[0] || {};
        const marketingPages = options.marketingPages || ['/', '/features', '/pricing', '/about', '/contact'];

        // Check if this is a marketing page
        const isMarketingPage = marketingPages.some(page => {
          const pagePath = `${page}/page.tsx`.replace('//', '/');
          return filename.includes(pagePath) || filename.endsWith('/page.tsx') && filename.includes(page);
        });

        const isDashboardPage = filename.includes('/dashboard/') || filename.includes('/admin/') || filename.includes('/specialist/');
        const isAuthPage = filename.includes('/login/') || filename.includes('/signup/') || filename.includes('/auth/');

        if (!isMarketingPage && !isDashboardPage || isAuthPage) {
          return {}; // Skip auth pages
        }

        let hasHeaderImport = false;
        let hasFooterImport = false;
        let hasNavbarImport = false;
        let headerSource = null;
        let footerSource = null;

        return {
          ImportDeclaration(node) {
            const source = node.source.value;

            if (node.specifiers.some(spec => spec.local?.name === 'Header')) {
              hasHeaderImport = true;
              headerSource = source;
            }
            if (node.specifiers.some(spec => spec.local?.name === 'Footer')) {
              hasFooterImport = true;
              footerSource = source;
            }
            if (node.specifiers.some(spec => spec.local?.name === 'Navbar')) {
              hasNavbarImport = true;
            }
          },
          'Program:exit'() {
            if (isMarketingPage) {
              if (!hasHeaderImport) {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'missingHeader',
                });
              } else if (headerSource !== '@/components/marketing/layout/header') {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'wrongHeader',
                });
              }

              if (!hasFooterImport) {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'missingFooter',
                });
              } else if (footerSource !== '@/components/marketing/layout/footer') {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'wrongFooter',
                });
              }
            }

            if (isDashboardPage && !hasNavbarImport && !hasHeaderImport) {
              context.report({
                loc: { line: 1, column: 0 },
                messageId: 'dashboardNeedsNavbar',
              });
            }
          },
        };
      },
    },

    'require-policy-content': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Ensure policy pages have real content, not placeholders',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          noContent: 'Policy page appears empty or has placeholder content. Add real {{pageType}} content.',
          tooShort: 'Policy content too short ({{length}} chars). Minimum {{minimum}} characters required.',
        },
        schema: [{
          type: 'object',
          properties: {
            minimumLength: { type: 'number' },
          },
        }],
      },
      create(context) {
        const filename = context.getFilename();
        const options = context.options[0] || {};
        const minimumLength = options.minimumLength || 500;

        const policyPages = {
          'terms': 'Terms of Service',
          'privacy': 'Privacy Policy',
          'refund': 'Refund Policy',
          'cancellation': 'Cancellation Policy',
          'payment': 'Payment Policy',
          'delivery': 'Delivery Policy',
          'cookie': 'Cookie Policy',
        };

        let pageType = null;
        for (const [key, value] of Object.entries(policyPages)) {
          if (filename.includes(`/${key}-`) || filename.includes(`/${key}/`)) {
            pageType = value;
            break;
          }
        }

        if (!pageType) {
          return {}; // Not a policy page
        }

        let totalTextLength = 0;
        const forbiddenPhrases = ['coming soon', 'under construction', 'lorem ipsum', 'placeholder'];

        return {
          JSXText(node) {
            const text = node.value.trim();
            if (text.length > 10) {
              totalTextLength += text.length;
            }

            const lowerText = text.toLowerCase();
            for (const phrase of forbiddenPhrases) {
              if (lowerText.includes(phrase)) {
                context.report({
                  node,
                  messageId: 'noContent',
                  data: { pageType },
                });
              }
            }
          },
          'Program:exit'() {
            if (totalTextLength < minimumLength) {
              context.report({
                loc: { line: 1, column: 0 },
                messageId: 'tooShort',
                data: {
                  length: totalTextLength,
                  minimum: minimumLength,
                },
              });
            }
          },
        };
      },
    },

    'require-auth-ui-in-dashboard': {
      meta: {
        type: 'problem',
        docs: {
          description: 'Dashboard pages must show user info and credits',
          category: 'Product Quality',
          recommended: true,
        },
        messages: {
          missingUserDisplay: 'Dashboard page should display user name/avatar',
          missingCreditsDisplay: 'Dashboard page should display user credits balance',
          missingLogout: 'Dashboard page should have logout functionality',
        },
      },
      create(context) {
        const filename = context.getFilename();
        const isDashboard = filename.includes('/dashboard/') || filename.includes('/admin/') || filename.includes('/specialist/');

        if (!isDashboard) {
          return {};
        }

        let hasUserDisplay = false;
        let hasCreditsDisplay = false;

        return {
          JSXText(node) {
            const text = node.value.toLowerCase();
            if (text.includes('user') || text.includes('profile') || text.includes('account')) {
              hasUserDisplay = true;
            }
            if (text.includes('credit') || text.includes('balance') || text.includes('token')) {
              hasCreditsDisplay = true;
            }
          },
          Identifier(node) {
            if (node.name === 'credits' || node.name === 'balance' || node.name === 'userCredits') {
              hasCreditsDisplay = true;
            }
            if (node.name === 'user' || node.name === 'session' || node.name === 'profile') {
              hasUserDisplay = true;
            }
          },
          'Program:exit'() {
            // Only warn if page has actual content (not "Coming Soon")
            const source = context.getSourceCode().getText();
            if (!source.includes('Coming Soon') && !source.includes('Under Development')) {
              if (!hasUserDisplay) {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'missingUserDisplay',
                });
              }
              if (!hasCreditsDisplay) {
                context.report({
                  loc: { line: 1, column: 0 },
                  messageId: 'missingCreditsDisplay',
                });
              }
            }
          },
        };
      },
    },
  },
};
