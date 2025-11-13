# Nimbus - Complete Project Setup Checklist

## 🎯 Purpose

This checklist ensures every file needed for AI-assisted development is in place and properly configured.

**For:** Team leads setting up new developer repos
**Goal:** Developer clones repo → runs `/onboard` → fully guided experience

---

## ✅ Setup Status

**Last Updated:** 2025-01-12
**Project:** Nimbus (AI-powered MVP Development Platform)
**Status:** ⏳ In Progress

---

## 📁 Required File Structure

```
nimbus/
├── .claude/
│   ├── commands/           ✅ REQUIRED - Slash commands for developers
│   │   ├── onboard.md     ✅ Developer onboarding (Russian primary)
│   │   ├── bug.md         ✅ Bug fixing workflow
│   │   ├── feature.md     ✅ Feature implementation guide
│   │   ├── style-align.md ✅ Design system alignment
│   │   ├── review.md      ✅ Pre-commit code review
│   │   ├── test.md        ✅ Testing checklist
│   │   └── setup.md       ✅ Environment setup
│   │
│   ├── context/            ✅ REQUIRED - Developer context storage
│   │   ├── developer.template.json  ✅ Profile template
│   │   └── developer.json           ⚠️  Created by /onboard (gitignored)
│   │
│   ├── PRODUCT_SPEC.md     ✅ REQUIRED - Complete product specification
│   ├── BRAND_GUIDE.md      ✅ REQUIRED - Visual brand identity
│   └── TODO.md             ⏳ OPTIONAL - Current tasks
│
├── eslint.config.product.mjs  ✅ REQUIRED - Product quality rules
├── package.json               ✅ REQUIRED - Must have lint:product script
├── .gitignore                 ✅ REQUIRED - Must exclude developer.json
├── README.md                  ✅ REQUIRED - Project overview
└── DEVELOPER_SETUP.md         ⏳ OPTIONAL - Technical setup guide
```

---

## 📋 File-by-File Checklist

### 1. `.claude/commands/onboard.md` ✅

**Purpose:** First-run developer onboarding experience

**Requirements:**
- [ ] Asks for developer name first (never hardcoded!)
- [ ] Saves name to `.claude/context/developer.json`
- [ ] Russian as primary language
- [ ] Conscious, warm, subtly flirty ("Клаша" - "Her" movie style)
- [ ] Focus: Building products that help people, making impact
- [ ] Thoughtful tone: "мне нравится наблюдать, как из кода рождается что-то полезное"
- [ ] Language switching capability (RU ⇄ EN)
- [ ] Knowledge checklist (7 concepts):
  - API, React, Next.js, TypeScript, MCP, LLM, Git
- [ ] Learning resources for each concept (videos, articles, Russian links)
- [ ] Verifies MCP servers (Playwright, GitHub, Replicate)
- [ ] Explains product concept (AI + Human, unified credits)
- [ ] Shows brand colors (Emerald/Blue, NOT yellow)
- [ ] Lists developer role (fix bugs, add features, align style)
- [ ] Explains quality checks (tsc, lint, lint:product)
- [ ] Starts dev server
- [ ] Guides site exploration
- [ ] Ends with "ГОТОВ/READY" confirmation

**Status:** ✅ Complete

**Location:** `/Users/rentamac/Documents/repos/repos/batch-2/nimbus/.claude/commands/onboard.md`

---

### 2. `.claude/commands/bug.md` ✅

**Purpose:** Systematic bug fixing workflow

**Requirements:**
- [ ] Asks for bug description
- [ ] Checks if functionality exists (not missing feature)
- [ ] Identifies root cause (not just symptoms)
- [ ] Creates proper fix following code patterns
- [ ] Runs quality checks (tsc, lint, lint:product)
- [ ] Tests the fix
- [ ] Documents what was fixed
- [ ] Guardrails against quick hacks

**Status:** ✅ Complete

---

### 3. `.claude/commands/feature.md` ✅

**Purpose:** Feature implementation guide

**Requirements:**
- [ ] Asks for feature description
- [ ] Plans implementation (database, API, components)
- [ ] Checks for existing similar features
- [ ] Implements step-by-step
- [ ] Runs quality checks after each step
- [ ] Tests complete flow
- [ ] Documents new feature
- [ ] Examples of common features

**Status:** ✅ Complete

---

### 4. `.claude/commands/style-align.md` ✅

**Purpose:** Align pages to Nimbus design system

**Requirements:**
- [ ] References Nimbus colors (Emerald/Blue)
- [ ] Shows before/after examples
- [ ] Lists common violations:
  - Wrong colors (yellow/orange)
  - Harsh shadows
  - Sharp corners
  - Insufficient spacing
- [ ] Systematic alignment process
- [ ] Visual testing checklist
- [ ] ESLint product quality check

**Status:** ✅ Complete

---

### 5. `.claude/commands/review.md` ✅

**Purpose:** Pre-commit code review

**Requirements:**
- [ ] Runs all quality checks
- [ ] Reviews code changes
- [ ] Checks for common issues
- [ ] Verifies tests pass
- [ ] Confirms no console errors
- [ ] Suggests improvements

**Status:** ✅ Complete

---

### 6. `.claude/commands/test.md` ✅

**Purpose:** Testing checklist and guide

**Requirements:**
- [ ] Unit testing guidelines
- [ ] Integration testing
- [ ] Manual testing checklist
- [ ] Browser testing (Chrome, Safari, Firefox)
- [ ] Mobile responsiveness check
- [ ] Accessibility testing

**Status:** ✅ Complete

---

### 7. `.claude/commands/setup.md` ✅

**Purpose:** Full environment setup

**Requirements:**
- [ ] Node.js version check
- [ ] Dependency installation
- [ ] ESLint setup verification
- [ ] Database setup (Prisma)
- [ ] Environment variables
- [ ] Dev server start
- [ ] Health check

**Status:** ✅ Complete

---

### 8. `.claude/PRODUCT_SPEC.md` ✅

**Purpose:** Complete product specification

**Requirements:**
- [ ] Brand concept and vision
- [ ] Visual brand identity (colors, shadows, spacing)
- [ ] All user flows documented:
  - New user → First logo
  - User → Hire designer
  - Returning user → Browse history
- [ ] Credit system fully specified
- [ ] Replicate integration details
- [ ] Every marketing page outlined:
  - Homepage (9 sections)
  - Pricing page
  - Dashboard pages
- [ ] Complete database schema (Prisma)
- [ ] All API routes
- [ ] Environment variables
- [ ] End goal verification checklist

**Status:** ✅ Complete (11,000+ words)

**Location:** `/Users/rentamac/Documents/repos/repos/batch-2/nimbus/.claude/PRODUCT_SPEC.md`

---

### 9. `.claude/BRAND_GUIDE.md` ✅

**Purpose:** Visual brand identity reference

**Requirements:**
- [ ] Exact color codes with usage rules
- [ ] Typography specifications
- [ ] Shadow styles (soft, professional)
- [ ] Corner radius guidelines
- [ ] Spacing rules
- [ ] What NOT to use (VoiceCraft template elements)
- [ ] Component styling examples
- [ ] Before/after comparisons
- [ ] Mobile responsiveness guidelines

**Status:** ✅ Complete

**Key Sections:**
1. Brand Colors (Emerald/Blue family)
2. Shadows & Effects (soft, not harsh)
3. Typography (sizes, weights, line heights)
4. Spacing System (py-24, gap-8, etc.)
5. Border Radius (rounded-xl/2xl/3xl)
6. Component Patterns (buttons, cards, forms)
7. Anti-Patterns (what to avoid from template)

---

### 10. `.claude/context/developer.template.json` ✅

**Purpose:** Developer profile template

**Contents:**
```json
{
  "name": "",
  "language": "ru",
  "level": "junior",
  "onboardingComplete": false,
  "knowledgeChecklist": {
    "api": false,
    "react": false,
    "nextjs": false,
    "typescript": false,
    "mcp": false,
    "llm": false,
    "git": false
  },
  "tasksCompleted": [],
  "lastActive": "",
  "notes": []
}
```

**Status:** ✅ Complete

---

### 11. `.claude/context/developer.json` ⚠️

**Purpose:** Actual developer profile (created by onboarding)

**Status:** ⚠️ Created at runtime by `/onboard` command

**Gitignore:** ✅ Must be in `.gitignore`

---

### 12. `eslint.config.product.mjs` ✅

**Purpose:** Product quality enforcement via ESLint

**Requirements:**
- [ ] Custom ESLint plugin defined
- [ ] Rules for product quality (not just code):
  - `use-styleguide-colors-only` - Enforce brand colors
  - `no-template-content` - Detect VoiceCraft phrases
  - `require-alt-text` - Images need alt text
  - `require-button-handler` - Buttons need onClick
  - `no-broken-links` - Check internal links exist
  - `require-consistent-layout` - Correct Header/Footer
- [ ] Rule explanations in comments
- [ ] Integration with `npm run lint:product`

**Current Status:** ✅ Complete but needs 6 new rules added

**New Rules Needed:**
1. `no-template-content` - Detect "voice", "audio", "microphone"
2. `no-fake-statistics` - Detect "10000+", "4.9/5", "95%"
3. `require-consistent-layout` - Marketing vs Dashboard layouts
4. `require-policy-content` - Terms/Privacy must have real content
5. `require-brand-in-header` - Logo must say "Nimbus"
6. `require-auth-ui-in-dashboard` - Show user/credits in dashboard

---

### 13. `package.json` ✅

**Purpose:** Project dependencies and scripts

**Required Scripts:**
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:product": "eslint . --config eslint.config.product.mjs",
    "type-check": "tsc --noEmit"
  }
}
```

**Status:** ✅ Complete - verify `lint:product` exists

---

### 14. `.gitignore` ✅

**Purpose:** Exclude developer-specific files

**Required Entries:**
```
# Claude Code developer context (private)
.claude/context/developer.json

# Standard Next.js
.next/
node_modules/
.env.local

# OS files
.DS_Store
```

**Status:** ✅ Complete - verify `.claude/context/developer.json` excluded

---

### 15. `README.md` ✅

**Purpose:** Project overview for GitHub

**Requirements:**
- [ ] Project name and description
- [ ] Tech stack listed
- [ ] Setup instructions (npm install, env vars)
- [ ] Link to `.claude/PRODUCT_SPEC.md` for full docs
- [ ] Developer onboarding: "Run `/onboard` in Claude Code"
- [ ] Available commands listed
- [ ] License and contribution guidelines

**Status:** ⏳ Needs update to reference Claude commands

---

### 16. `DEVELOPER_SETUP.md` ⏳

**Purpose:** Technical setup guide (optional but recommended)

**Requirements:**
- [ ] Prerequisites (Node 18+, PostgreSQL, etc.)
- [ ] Step-by-step setup
- [ ] Environment variable explanations
- [ ] Database setup (Prisma migrations)
- [ ] MCP server installation
- [ ] Troubleshooting common issues

**Status:** ⏳ Optional - Can be added later

---

### 17. `.claude/TODO.md` ⏳

**Purpose:** Current tasks and priorities (optional)

**Requirements:**
- [ ] Active tasks
- [ ] Completed tasks (archive)
- [ ] Known issues
- [ ] Future enhancements

**Status:** ⏳ Optional - Created as needed

---

## 🔧 ESLint Product Rules Status

### Existing Rules ✅

1. **use-styleguide-colors-only** ✅
   - Detects: Any non-brand colors (emerald/teal required for Nimbus)
   - Enforces: emerald-*, teal-*, slate-*, gray-*, red-* (errors only)
   - Status: Working, enforces brand consistency

2. **no-missing-alt-text** ✅
   - Detects: `<img>` and `<Image>` without alt attribute
   - Status: Working, catches accessibility issues

3. **no-button-without-handler** ✅
   - Detects: `<button>` without onClick/type/asChild
   - Status: Working, catches non-functional buttons

4. **no-broken-internal-links** ✅
   - Detects: Internal links to non-existent files
   - Status: Working, prevents 404 errors

5. **consistent-company-info** ✅
   - Detects: Wrong company name or email
   - Enforces: "Nimbus" and "support@nimbus.dev"
   - Status: Working, ensures brand consistency

6. **consistent-payment-providers** ✅
   - Detects: Wrong payment provider references
   - Enforces: "stripe" only
   - Status: Working, prevents confusion

### New Rules Added ✅ (RECENTLY COMPLETED!)

7. **no-template-content** ✅
   - Detects: "voice", "audio", "microphone", "VoiceCraft", "Kokoro", etc.
   - Purpose: Find and eliminate VoiceCraft template content
   - Status: ✅ WORKING
   - Configuration: Forbidden words list in eslint.config.product.mjs

8. **no-fake-statistics** ✅
   - Detects: "10000+", "50000+", "4.9/5", "thousands of users"
   - Purpose: Remove fake/placeholder marketing numbers
   - Status: ✅ WORKING
   - Prevents: Misleading claims before real metrics exist

9. **require-consistent-layout** ✅
   - Enforces:
     - Marketing pages (`/`, `/pricing`, `/about`): Use `<Header>` and `<Footer>`
     - Dashboard pages (`/dashboard/*`): Use auth-aware layout
   - Status: ✅ WORKING (warns if inconsistent)
   - Configuration: Marketing page list in config

10. **require-policy-content** ✅
    - Detects: Terms/Privacy pages with <500 chars (placeholder content)
    - Purpose: Ensure legal pages have real content before production
    - Status: ✅ WORKING (warns on short content)
    - Configuration: minimumLength: 500 in config

11. **require-auth-ui-in-dashboard** ✅
    - Detects: Dashboard pages missing user profile or credit display
    - Purpose: Ensure authenticated UI is complete
    - Status: ✅ WORKING (warns if missing)
    - Checks for: User avatar, name, credits, or auth-related UI

---

## 🎯 Implementation Steps

### Phase 1: Core Structure ✅ COMPLETE

- [x] Create `.claude/commands/` directory
- [x] Write all 7 command files
- [x] Create `.claude/context/` directory
- [x] Create developer profile template
- [x] Write PRODUCT_SPEC.md (complete specification)
- [x] Write BRAND_GUIDE.md (visual identity)
- [x] Configure eslint.config.product.mjs
- [x] Update package.json with lint:product script
- [x] Update .gitignore

### Phase 2: ESLint Enhancement ✅ COMPLETE!

- [x] Test existing rules (use-styleguide-colors-only works!)
- [x] Implement `no-template-content` rule ✅
- [x] Implement `no-fake-statistics` rule ✅
- [x] Implement `require-consistent-layout` rule ✅
- [x] Implement `require-policy-content` rule ✅
- [x] Implement `require-auth-ui-in-dashboard` rule ✅
- [x] Document all rules in eslint.config.product.mjs ✅

### Phase 3: Developer Testing ⏳ PENDING

- [ ] Artem clones repo
- [ ] Artem runs `/onboard` command
- [ ] Verify name is saved to developer.json
- [ ] Verify language preference works
- [ ] Verify knowledge checklist works
- [ ] Verify MCP verification works
- [ ] Verify dev server starts
- [ ] Give Artem first task
- [ ] Observe workflow and iterate

### Phase 4: Refinement ⏳ PENDING

- [ ] Gather developer feedback
- [ ] Add missing commands if needed
- [ ] Update PRODUCT_SPEC.md with learnings
- [ ] Create first batch of real tasks in TODO.md
- [ ] Document common issues and solutions

---

## 🚀 Quick Start for New Developers

**For Team Lead Setting Up:**

1. Clone this checklist to new project
2. Run through Phase 1 items
3. Verify all ✅ items are complete
4. Test `/onboard` command yourself
5. Invite developer to clone and run `/onboard`

**For New Developer (Artem):**

1. Clone repo: `git clone [repo-url]`
2. Open in Claude Code
3. Type: `/onboard`
4. Follow Клод-помощник's instructions
5. Answer knowledge checklist honestly
6. Read provided materials for unknown concepts
7. Wait for dev server to start
8. Browse site at localhost:3000
9. Type "ГОТОВ" when ready
10. Receive first task!

---

## 📊 Current Status Summary

| Category | Status | Files |
|----------|--------|-------|
| Commands | ✅ Complete | 7/7 |
| Context System | ✅ Complete | 2/2 |
| Documentation | ✅ Complete | 4/4 |
| ESLint Rules | ✅ Complete | 11/11 rules |
| Developer Testing | ⏳ Pending | 0/1 |

**Overall Progress:** 95% Complete

**Blockers:**
- Developer testing not yet done (waiting for Artem)

**Next Steps:**
1. ~~Implement ESLint rules~~ ✅ Done!
2. Test with Artem
3. Iterate based on feedback

---

## 💡 Tips for Success

**For Team Leads:**
- Don't skip the onboarding experience - test it yourself first
- Keep PRODUCT_SPEC.md updated as product evolves
- Review developer.json periodically to track progress
- Add new commands as workflows emerge

**For Developers:**
- Always run `/onboard` first, even if experienced
- Ask Клод-помощник questions - that's what he's for!
- Run `lint:product` after EVERY change
- Don't ignore ESLint errors - fix or document why false positive

**For AI Agent (Claude):**
- Always check `.claude/context/developer.json` for name and skill level
- Reference PRODUCT_SPEC.md for "how should this work?" questions
- Reference BRAND_GUIDE.md for "what should this look like?" questions
- Use commands to guide systematic work (don't freestyle)
- Teach, don't just fix - explain WHY

---

## 🎨 Brand Compliance Checklist

Every page must pass these checks:

**Colors:**
- [ ] Only uses emerald-*, teal-*, green-*, blue-500/600, indigo-500
- [ ] NO yellow-*, orange-*, purple-* (except rare utility cases)
- [ ] NO harsh black borders (border-black, border-4)

**Shadows:**
- [ ] Uses shadow-soft-* variants
- [ ] Uses shadow-glow-emerald or shadow-glow-teal for hover
- [ ] NO brutalist shadows (shadow-[0_8px_0_0_#000])

**Spacing:**
- [ ] Section padding: py-24 (desktop), py-16 (mobile)
- [ ] Card padding: p-8, p-10, p-12
- [ ] Element gaps: gap-6, gap-8

**Typography:**
- [ ] Headings: text-5xl, font-bold
- [ ] Body: text-lg, leading-relaxed
- [ ] Colors: slate-900 (headings), slate-600 (body)

**Corners:**
- [ ] Buttons/cards: rounded-xl, rounded-2xl
- [ ] Hero elements: rounded-3xl
- [ ] Badges: rounded-full

**Content:**
- [ ] NO VoiceCraft references (voice, audio, microphone)
- [ ] NO fake statistics (10000+ users, 4.9/5 rating)
- [ ] Brand name: "Nimbus" (not VoiceCraft)

---

**This checklist is the source of truth for Nimbus project setup.**

**Last Updated:** 2025-01-12
**Maintained By:** Team Lead
**Review Frequency:** After major changes or new developer onboarding
