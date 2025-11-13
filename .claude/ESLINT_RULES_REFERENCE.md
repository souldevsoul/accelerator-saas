# ESLint Product Quality Rules - Complete Reference

## 🎯 Purpose

This document lists all custom ESLint rules used in LogoSmith to enforce product quality, brand consistency, and prevent common mistakes.

**Run with:** `npm run lint:product`

---

## 📋 Complete Rule Set (11 Rules)

### Category: Brand & Identity (3 rules)

#### 1. `use-styleguide-colors-only` ✅

**Purpose:** Enforce brand color palette consistency

**Configuration:**
```javascript
'product-quality/use-styleguide-colors-only': ['error', {
  allowedColors: [
    // Base
    'black', 'white', 'transparent', 'current', 'inherit',
    // Neutrals
    'slate-', 'gray-',
    // LogoSmith brand (emerald/teal)
    'emerald-', 'teal-',
    // Semantic
    'red-', // Errors only
  ],
}]
```

**Detects:**
- Wrong brand colors: `yellow-*`, `orange-*`, `purple-*`, etc.
- Template colors that shouldn't be in LogoSmith

**Example Violation:**
```tsx
<button className="bg-purple-500">  // ❌ Wrong color
  Click me
</button>
```

**Correct Usage:**
```tsx
<button className="bg-emerald-500">  // ✅ Brand color
  Click me
</button>
```

---

#### 2. `consistent-company-info` ✅

**Purpose:** Ensure company name and email are consistent across codebase

**Configuration:**
```javascript
'product-quality/consistent-company-info': ['error', {
  companyName: 'LogoSmith',
  email: 'support@logosmith.ai',
}]
```

**Detects:**
- Wrong company name: "VoiceCraft", "logosmith", "LOGOSMITH"
- Wrong email: "info@...", "hello@...", etc.

**Example Violation:**
```tsx
<a href="mailto:info@logosmith.com">  // ❌ Wrong email
  Contact Us
</a>
```

**Correct Usage:**
```tsx
<a href="mailto:support@logosmith.ai">  // ✅ Correct email
  Contact Us
</a>
```

---

#### 3. `consistent-payment-providers` ✅

**Purpose:** Ensure only one payment provider is referenced

**Configuration:**
```javascript
'product-quality/consistent-payment-providers': ['error', {
  provider: 'stripe',
}]
```

**Detects:**
- References to wrong payment provider: "paypal", "square", etc.

**Example Violation:**
```tsx
<p>We accept PayPal</p>  // ❌ Wrong provider
```

**Correct Usage:**
```tsx
<p>We use Stripe for secure payments</p>  // ✅ Correct provider
```

---

### Category: Template Migration (2 rules)

#### 4. `no-template-content` ✅

**Purpose:** Detect and eliminate content from the old VoiceCraft template

**Configuration:**
```javascript
'product-quality/no-template-content': ['error', {
  projectName: 'LogoSmith',
  forbiddenWords: [
    'voice', 'Voice', 'audio', 'Audio',
    'microphone', 'Microphone', 'waveform', 'Waveform',
    'synthesis', 'Synthesis', 'cloning', 'Cloning',
    'VoiceCraft', 'voicecraft',
    'Kokoro', 'Minimax', 'XTTS',
    'vocal', 'Vocal',
  ],
}]
```

**Detects:**
- Template keywords in JSX text
- Template keywords in strings
- Old project name references

**Example Violation:**
```tsx
<p>Choose from 300+ Voice Profiles</p>  // ❌ Template content
```

**Correct Usage:**
```tsx
<p>Choose from 7 Logo Design Styles</p>  // ✅ LogoSmith content
```

---

#### 5. `no-fake-statistics` ✅

**Purpose:** Prevent fake/placeholder marketing numbers before real metrics exist

**Configuration:**
```javascript
'product-quality/no-fake-statistics': 'error'
```

**Detects:**
- Large round numbers: "10000+", "50000+", "100000+"
- Perfect ratings: "4.9/5", "4.8 stars"
- Vague claims: "thousands of users", "millions of downloads"
- High percentages: "95% satisfaction", "99% uptime"

**Example Violations:**
```tsx
<p>10,000+ Happy Customers</p>  // ❌ Fake statistic
<p>4.9/5 Star Rating</p>  // ❌ Fake rating
<p>Thousands of users trust us</p>  // ❌ Vague claim
```

**Correct Usage:**
```tsx
<p>Create professional logos in minutes</p>  // ✅ No fake numbers
<p>Join our growing community</p>  // ✅ No specific claims
```

**Note:** Once you have real metrics, add them explicitly and disable the rule for that specific instance:
```tsx
{/* eslint-disable-next-line product-quality/no-fake-statistics */}
<p>1,247 Logos Created This Month</p>  // ✅ Real metric
```

---

### Category: UX & Functionality (3 rules)

#### 6. `no-button-without-handler` ✅

**Purpose:** Ensure buttons are functional (not just decorative)

**Configuration:**
```javascript
'product-quality/no-button-without-handler': 'warn'
```

**Detects:**
- `<button>` without `onClick`, `type`, or `asChild` prop

**Example Violation:**
```tsx
<button className="...">  // ❌ No handler
  Click Me
</button>
```

**Correct Usage:**
```tsx
<button onClick={handleClick}>  // ✅ Has onClick
  Click Me
</button>

<button type="submit">  // ✅ Has type
  Submit
</button>

<Button asChild>  // ✅ Has asChild (shadcn pattern)
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>
```

---

#### 7. `no-missing-alt-text` ✅

**Purpose:** Ensure images have alt text for accessibility

**Configuration:**
```javascript
'product-quality/no-missing-alt-text': 'error'
```

**Detects:**
- `<img>` without `alt` attribute
- `<Image>` (Next.js) without `alt` attribute

**Example Violation:**
```tsx
<img src="/logo.png" />  // ❌ No alt text
```

**Correct Usage:**
```tsx
<img src="/logo.png" alt="LogoSmith logo" />  // ✅ Has alt text

<Image
  src="/logo.png"
  alt="LogoSmith logo"  // ✅ Has alt text
  width={200}
  height={200}
/>
```

---

#### 8. `no-broken-internal-links` ✅

**Purpose:** Prevent 404 errors by detecting links to non-existent pages

**Configuration:**
```javascript
'product-quality/no-broken-internal-links': 'error'
```

**Detects:**
- `<Link href="/page">` where `/page.tsx` doesn't exist
- Internal links to missing routes

**Example Violation:**
```tsx
<Link href="/nonexistent">  // ❌ Page doesn't exist
  Go to page
</Link>
```

**Correct Usage:**
```tsx
<Link href="/dashboard">  // ✅ app/dashboard/page.tsx exists
  Go to Dashboard
</Link>
```

---

### Category: Layout & Content (3 rules)

#### 9. `require-consistent-layout` ✅

**Purpose:** Enforce correct layout components per page type

**Configuration:**
```javascript
'product-quality/require-consistent-layout': ['warn', {
  marketingPages: ['/', '/features', '/pricing', '/about', '/contact', '/blog'],
}]
```

**Detects:**
- Marketing pages without `<Header>` component
- Marketing pages without `<Footer>` component
- Dashboard pages without auth-aware layout

**Example Violations:**

**Marketing page (/):**
```tsx
export default function Home() {
  return (
    <div>  {/* ❌ No Header/Footer */}
      <h1>Welcome</h1>
    </div>
  )
}
```

**Correct Usage:**
```tsx
import { Header } from '@/components/marketing/layout/header'
import { Footer } from '@/components/marketing/layout/footer'

export default function Home() {
  return (
    <>
      <Header />  {/* ✅ Marketing header */}
      <main>
        <h1>Welcome</h1>
      </main>
      <Footer />  {/* ✅ Marketing footer */}
    </>
  )
}
```

---

#### 10. `require-policy-content` ✅

**Purpose:** Ensure Terms/Privacy pages have real content (not placeholders)

**Configuration:**
```javascript
'product-quality/require-policy-content': ['warn', {
  minimumLength: 500,
}]
```

**Detects:**
- Terms of Service pages with < 500 characters
- Privacy Policy pages with < 500 characters
- Pages with "Coming Soon" or "TBD" placeholders

**Example Violation:**

**app/terms/page.tsx:**
```tsx
export default function Terms() {
  return (
    <div>
      <h1>Terms of Service</h1>  {/* ❌ Only 50 chars - too short */}
      <p>Coming soon...</p>
    </div>
  )
}
```

**Correct Usage:**
```tsx
export default function Terms() {
  return (
    <div>
      <h1>Terms of Service</h1>  {/* ✅ 600+ chars of real content */}
      <p>Last updated: January 12, 2025</p>
      <h2>1. Acceptance of Terms</h2>
      <p>By accessing and using LogoSmith...</p>
      {/* ... real terms content ... */}
    </div>
  )
}
```

**Note:** This is a warning (not error) because it's OK during development, but must be fixed before production.

---

#### 11. `require-auth-ui-in-dashboard` ✅

**Purpose:** Ensure dashboard pages show user information and auth UI

**Configuration:**
```javascript
'product-quality/require-auth-ui-in-dashboard': 'warn'
```

**Detects:**
- Dashboard pages (`/dashboard/*`) without:
  - User avatar/profile
  - User name
  - Credit balance
  - Any auth-related UI

**Example Violation:**

**app/dashboard/page.tsx:**
```tsx
export default function Dashboard() {
  return (
    <div>  {/* ❌ No user info or auth UI */}
      <h1>Dashboard</h1>
      <p>Coming soon...</p>
    </div>
  )
}
```

**Correct Usage:**
```tsx
import { UserProfile } from '@/components/dashboard/user-profile'
import { CreditBalance } from '@/components/dashboard/credit-balance'

export default function Dashboard() {
  return (
    <div>
      <header>
        <UserProfile />  {/* ✅ Shows user info */}
        <CreditBalance />  {/* ✅ Shows credits */}
      </header>
      <main>
        <h1>Dashboard</h1>
        {/* Dashboard content */}
      </main>
    </div>
  )
}
```

---

## 🔧 Using These Rules in Your Project

### Step 1: Copy ESLint Config

Copy `eslint.config.product.mjs` from LogoSmith to your project.

### Step 2: Customize Configuration

Update the configuration values for your project:

```javascript
// Brand colors (change to yours)
allowedColors: [
  'emerald-', 'teal-',  // Replace with your brand colors
]

// Company info (change to yours)
companyName: 'YourCompany',
email: 'support@yourcompany.com',

// Template content (add words from your old template)
forbiddenWords: [
  'OldProjectName', 'old-feature',
]

// Marketing pages (add your routes)
marketingPages: ['/', '/features', '/pricing'],
```

### Step 3: Add Script to package.json

```json
{
  "scripts": {
    "lint:product": "eslint . --config eslint.config.product.mjs"
  }
}
```

### Step 4: Run Lint

```bash
npm run lint:product
```

### Step 5: Fix Violations

Go through each error/warning:
- **Real issue?** Fix it
- **False positive?** Add inline comment:

```tsx
{/* eslint-disable-next-line product-quality/no-fake-statistics */}
<p>1,247 Real Users</p>  {/* Real metric, not fake */}
```

---

## 📊 Rule Severity Guide

**`error` (Must fix before commit):**
- `use-styleguide-colors-only` - Brand consistency critical
- `consistent-company-info` - Brand consistency critical
- `consistent-payment-providers` - User trust critical
- `no-template-content` - Template cleanup critical
- `no-fake-statistics` - User trust critical
- `no-missing-alt-text` - Accessibility critical
- `no-broken-internal-links` - UX critical

**`warn` (Should fix, but not blocking):**
- `no-button-without-handler` - UX improvement
- `require-consistent-layout` - Code organization
- `require-policy-content` - Legal requirement (pre-production)
- `require-auth-ui-in-dashboard` - Feature completeness

---

## 🎯 Best Practices

1. **Run after every change**
   ```bash
   npm run lint:product
   ```

2. **Don't ignore errors without understanding**
   - If you disable a rule, explain WHY in a comment

3. **Update forbidden words as you find them**
   - Add template content to `forbiddenWords` list

4. **Use warnings for work-in-progress**
   - Errors = must fix now
   - Warnings = fix before production

5. **Document false positives**
   ```tsx
   {/* eslint-disable product-quality/rule-name */}
   {/* Reason: This is a design system showcase, needs all colors */}
   <ColorPalette allColors={true} />
   ```

---

## 🚀 Integration with CI/CD

Add to your CI pipeline:

```yaml
# .github/workflows/lint.yml
- name: Run product quality checks
  run: npm run lint:product
```

This ensures all PRs are checked for product quality issues.

---

## 📝 Adding New Rules

To add a new rule:

1. **Define the rule** in `eslint-plugin-product-quality/index.js`
2. **Add configuration** in `eslint.config.product.mjs`
3. **Document it** in this file
4. **Test it** on the codebase
5. **Update** `.claude/PROJECT_SETUP_CHECKLIST.md`

---

**Last Updated:** 2025-01-12
**Version:** 1.0 (11 rules)
**Tested On:** LogoSmith (Next.js 16, TypeScript)
