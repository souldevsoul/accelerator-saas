# Setup Command - FIRST THING TO RUN

**Run this FIRST before any development work.** This ensures your development environment is properly configured and the style guide is stable.

## Your Task

This command will guide you through setting up a clean, working development environment with all quality checks in place.

## Step 1: Verify Installation

First, check that everything is installed:

```bash
# Check Node.js version (need 18+)
node --version

# Check that dependencies are installed
npm list next
npm list typescript
npm list eslint
```

If anything is missing:
```bash
npm install
```

## Step 2: Run ESLint Setup Check

```bash
# Test that ESLint is working
npx eslint --version

# Test that product quality plugin loads
npm run lint:product -- --help
```

**If you see errors:**
- "Plugin not found" → Run `npm install` again
- "Config not found" → Check that `eslint.config.product.mjs` exists in project root

## Step 3: Stabilize Style Guide

**CRITICAL:** Before writing any code, we need to ensure the style guide rules are working correctly and identify any false positives.

### Run Initial Product Quality Check

```bash
npm run lint:product
```

**You will see warnings/errors.** This is EXPECTED on first run.

### Review Each Error Carefully

For each error/warning, determine:

1. **Is this a real issue?**
   - ✅ **YES** → Fix it now (we'll help you)
   - ❌ **NO** → Mark it as false positive

2. **Examples of REAL issues to fix:**
   ```tsx
   // ❌ Using off-brand color (should be orange/coral/lime, not indigo)
   <button className="bg-indigo-500">Click</button>

   // ❌ Wrong company email
   <a href="mailto:support@wrongdomain.com">Contact</a>

   // ❌ Missing security attributes
   <a href="https://external.com">External link</a>
   ```

3. **Examples of FALSE POSITIVES:**
   ```tsx
   // Design system file that legitimately needs all colors
   export const colorPalette = { blue: '#0000FF', ... }

   // Testing file with mock data
   const mockEmail = 'test@example.com'

   // Third-party component that we can't control
   <ExternalComponent colorScheme="purple" />
   ```

### Document False Positives

For false positives, add inline disable comments with explanation:

```tsx
/* eslint-disable product-quality/use-styleguide-colors-only */
// Reason: Design system definition file needs all Tailwind colors
export const fullColorPalette = { ... }
/* eslint-enable product-quality/use-styleguide-colors-only */
```

OR disable for entire file at the top:

```tsx
/* eslint-disable product-quality/use-styleguide-colors-only */
// Reason: Third-party component showcase, colors come from external library
```

### Fix Real Issues

For real issues, I'll help you fix them following the design system:

**Nimbus Design System:**
- **Primary:** Coral/Orange (#FF7F50, orange-500)
- **Secondary:** Rose (#F43F5E, rose-500)
- **Accent:** Lime (#84CC16, lime-500)
- **Alternative:** Amber, Green, Emerald
- **Never use:** Indigo, Blue, Purple, Pink (except for specific utility cases)

**Fix examples:**
```tsx
// Before:
<button className="bg-blue-500">Click</button>

// After (using brand color):
<button className="bg-orange-500">Click</button>
```

## Step 4: Verify TypeScript

```bash
# Run TypeScript type checking
npx tsc --noEmit
```

**Fix any TypeScript errors** before proceeding. Common issues:
- Missing type definitions
- Incorrect imports
- `any` types (should have proper types)

## Step 5: Verify Build

```bash
# Test production build
npm run build
```

**If build fails:**
1. Read the error message carefully
2. Check if it's related to missing env variables
3. Check if it's a TypeScript error we missed
4. Ask me for help if unclear

## Step 6: Document Environment Setup

Create `.env.local` if it doesn't exist:

```bash
cp .env.example .env.local
```

Fill in required variables:
```env
DATABASE_URL="postgresql://..."
REPLICATE_API_TOKEN="r8_..."
BLOB_READ_WRITE_TOKEN="vercel_blob_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**Ask your team lead for development API keys.**

## Step 7: Test Database Connection

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (development only)
npx prisma db push
```

**If you see errors:**
- Check `DATABASE_URL` is set correctly in `.env.local`
- Verify database is accessible
- Ask team lead for correct database URL

## Step 8: Start Development Server

```bash
npm run dev
```

Open http://localhost:3000

**Verify:**
- ✅ Homepage loads
- ✅ No console errors
- ✅ Styles look correct (warm colors, rounded corners)
- ✅ Navigation works

## Step 9: Final Checklist

Before you start coding, verify:

- [ ] `npm run lint` passes (or only has documented false positives)
- [ ] `npm run lint:product` passes (or only has documented false positives)
- [ ] `npx tsc --noEmit` passes
- [ ] `npm run dev` works and site loads
- [ ] Database connection works
- [ ] You understand the design system (coral/orange/lime colors only)
- [ ] You have API keys for development
- [ ] You've read `DEVELOPER_SETUP.md`

## What's Next?

Now that your environment is stable and quality checks are working:

1. **Pick a task** from GitHub Issues or your team lead
2. **Use `/bug`** if fixing a bug
3. **Use `/feature`** if implementing a new feature
4. **Always use `/review`** before committing
5. **Use `/test`** to test your changes
6. **Use `/pre-production`** before deploying

## Common Setup Issues

### "ESLint plugin not found"
```bash
# Make sure you're in the project root
pwd

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### "Too many ESLint errors"
This is normal on first setup. Go through them one by one:
- Fix real design system violations
- Document false positives with comments
- Ask me if you're unsure about any error

### "Database connection failed"
- Check your `DATABASE_URL` in `.env.local`
- Verify the database exists
- Try running `npx prisma db push` again
- Contact team lead for correct connection string

### "Build fails with module not found"
```bash
# Clear Next.js cache
rm -rf .next

# Try building again
npm run build
```

---

**Once setup is complete, you're ready to develop!** 🎉

Remember:
- Always run `npm run lint:product` before committing
- Use the slash commands (`/bug`, `/feature`, `/review`, `/test`)
- Ask questions if anything is unclear
- Never ignore ESLint errors without understanding them first
