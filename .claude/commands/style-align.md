# Style Alignment Command

You are helping a developer align a page or component to Nimbus's design system. This is for cases where the functionality works, but the visual style doesn't match the brand.

## IMPORTANT: Run Setup First

**If this is your first time working on the project**, run `/setup` command first to stabilize your environment and style guide.

---

## Your Task

Fix visual/style inconsistencies to match Nimbus's design system.

---

## Step 1: Identify What's Wrong

**Ask the developer to show you:**
- Which page/component needs style alignment?
- What specifically looks wrong? (colors, shadows, spacing, fonts, etc.)
- Do they have a reference of how it should look?

---

## Step 2: Nimbus Design System Reference

### Brand Colors (ONLY USE THESE!)

**Primary:**
- 🟢 Emerald/Teal: `emerald-500`, `teal-500`, `green-500`
- 🔵 Blue/Indigo: `blue-500`, `blue-600`, `indigo-500`

**Gradients:**
```tsx
bg-gradient-to-r from-blue-500 to-blue-600
bg-gradient-to-r from-indigo-500 to-teal-600
bg-gradient-to-br from-emerald-500 to-teal-500
```

**NEVER use (these are from VoiceCraft template):**
- ❌ Yellow (`yellow-*`)
- ❌ Orange (`orange-*`)
- ❌ Harsh black borders (`border-black`, `border-4`)

### Shadows (Soft, not harsh!)

**Use:**
```tsx
shadow-soft-sm    // Subtle shadow
shadow-soft-md    // Medium shadow
shadow-soft-lg    // Larger shadow
shadow-soft-xl    // Extra large shadow
shadow-glow-emerald  // Emerald glow effect
shadow-glow-teal     // Teal glow effect
```

**DON'T use:**
```tsx
shadow-brutalist-sm   // Too harsh
shadow-[0_8px_0_0_#000]  // Black drop shadow
```

### Corners (Rounded, smooth)

**Use:**
```tsx
rounded-xl     // Large radius
rounded-2xl    // Extra large
rounded-3xl    // Super large
rounded-full   // Perfect circle
```

**DON'T use:**
```tsx
rounded        // Too small
rounded-none   // Too sharp (unless intentional)
```

### Spacing (Generous, breathable)

**Use:**
```tsx
p-8, p-10, p-12    // Generous padding
gap-6, gap-8       // Good spacing between elements
space-y-6, space-y-8  // Vertical spacing
```

### Typography

**Headings:**
```tsx
text-5xl font-bold     // Large headings
text-4xl font-bold     // Medium headings
text-3xl font-semibold // Smaller headings
```

**Body:**
```tsx
text-lg leading-relaxed   // Readable body text
text-slate-600            // Subtle body color
```

---

## Step 3: Common Style Violations to Fix

### 1. Wrong Colors

**Before:**
```tsx
<button className="bg-yellow-500 hover:bg-yellow-600">
  Click me
</button>
```

**After:**
```tsx
<button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:shadow-glow-emerald">
  Click me
</button>
```

### 2. Harsh Shadows/Borders

**Before:**
```tsx
<div className="border-4 border-black shadow-[0_8px_0_0_#000]">
  Content
</div>
```

**After:**
```tsx
<div className="border border-slate-200 shadow-soft-lg rounded-2xl">
  Content
</div>
```

### 3. Not Enough Spacing

**Before:**
```tsx
<section className="py-8 px-4">
  <h2 className="text-2xl mb-2">Heading</h2>
  <p className="text-sm">Text</p>
</section>
```

**After:**
```tsx
<section className="py-24 px-6">
  <h2 className="text-5xl font-bold mb-6">Heading</h2>
  <p className="text-lg leading-relaxed text-slate-600">Text</p>
</section>
```

### 4. Sharp Corners

**Before:**
```tsx
<div className="rounded">
  Content
</div>
```

**After:**
```tsx
<div className="rounded-2xl">
  Content
</div>
```

### 5. Missing Hover States

**Before:**
```tsx
<button className="bg-blue-500 text-white px-6 py-3">
  Button
</button>
```

**After:**
```tsx
<button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-soft-md hover:shadow-glow-emerald hover:scale-105 transition-all duration-300">
  Button
</button>
```

---

## Step 4: Systematic Alignment Process

1. **Read the file** - Understand current structure
2. **Identify violations** - Find all design system violations
3. **Fix colors first** - Replace yellow/orange with emerald/blue
4. **Fix shadows** - Replace harsh shadows with soft ones
5. **Fix spacing** - Add more padding and gaps
6. **Fix corners** - Make everything more rounded
7. **Add transitions** - Smooth hover/active states
8. **Test visually** - Check in browser

---

## Step 5: Run Quality Checks

After making style changes:

```bash
# Check TypeScript
npx tsc --noEmit

# Check standard lint
npm run lint

# Check product quality (design system enforcement)
npm run lint:product
```

**Product quality ESLint will catch:**
- ❌ Wrong brand colors
- ❌ Off-brand styling patterns
- ❌ Missing accessibility attributes
- ❌ Inconsistent spacing

---

## Step 6: Visual Testing

1. **Start dev server** (if not running): `npm run dev`
2. **Open page in browser**
3. **Check on desktop** - Does it look professional?
4. **Check on mobile** - Toggle device toolbar (F12 → device icon)
5. **Check hover states** - Hover over buttons, links
6. **Check interactions** - Click things, make sure they work

**Checklist:**
- [ ] Colors match Nimbus palette (emerald/blue)
- [ ] Shadows are soft, not harsh
- [ ] Corners are rounded (xl, 2xl, 3xl)
- [ ] Spacing is generous
- [ ] Typography is readable
- [ ] Hover states are smooth
- [ ] Mobile responsive
- [ ] No console errors

---

## Example: Aligning a Pricing Card

### Before (VoiceCraft style - brutalist, yellow)
```tsx
<div className="border-4 border-black shadow-[0_8px_0_0_#000] rounded p-6">
  <h3 className="text-2xl font-black mb-2">Free</h3>
  <div className="text-4xl font-black text-yellow-400 mb-4">$0</div>
  <button className="bg-yellow-400 text-black border-4 border-black px-6 py-2 font-black">
    Start Free
  </button>
</div>
```

### After (Nimbus style - soft, emerald/blue)
```tsx
<div className="bg-white rounded-3xl shadow-soft-xl p-10 hover:shadow-glow-emerald transition-all duration-300 border border-slate-100">
  <h3 className="text-3xl font-bold mb-4 text-slate-900">Free</h3>
  <div className="text-5xl font-bold text-gradient-emerald mb-8">$0</div>
  <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:scale-105 hover:shadow-glow-emerald transition-all duration-300">
    Start Free
  </button>
</div>
```

---

## Common Mistakes to Avoid

❌ Only fixing some instances (fix ALL violations on the page)
❌ Mixing old and new styles (be consistent)
❌ Breaking functionality while fixing style
❌ Not testing on mobile
❌ Ignoring ESLint warnings about design system

---

## When Done

1. **Commit with clear message**: `git commit -m "Align [PageName] to Nimbus design system"`
2. **Document changes**: Note what was changed and why
3. **Run `/review`** before pushing

---

Now, please tell me which page/component needs style alignment and what looks wrong!
