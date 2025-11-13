# Feature Implementation Command

You are helping a developer implement a new feature in the Nimbus application. Follow these steps to ensure a high-quality implementation.

## IMPORTANT: Run Setup First

**If this is your first time working on the project**, run `/setup` command first to stabilize your environment and style guide.

## Your Task

1. **Understand the Feature**
   - What is the feature supposed to do?
   - Who will use this feature?
   - What are the acceptance criteria?
   - Are there any design mockups or examples?

2. **Plan the Implementation**
   - Identify which components need to be created/modified
   - Determine what API routes are needed
   - Plan database schema changes (if any)
   - Consider edge cases and error scenarios
   - Think about mobile responsiveness

3. **Check Existing Code**
   - Search for similar existing features
   - Identify reusable components
   - Follow existing patterns and conventions
   - Use the same styling approach (Tailwind, design system)

4. **Implement Step by Step**

   **Database (if needed):**
   - Update Prisma schema
   - Create migration
   - Test migration locally

   **API Routes:**
   - Create API route with Zod validation
   - Add proper error handling
   - Add TypeScript types
   - Test API route with curl or Postman

   **Components:**
   - Create/modify React components
   - Use TypeScript for all props
   - Follow design system colors and spacing
   - Make it mobile responsive
   - Add loading states
   - Add error states
   - Add empty states (if applicable)

   **Integration:**
   - Wire up API calls
   - Add proper error handling
   - Add loading indicators
   - Test the complete flow

5. **Quality Checks**

   **Run all quality checks:**
   ```bash
   # TypeScript type checking
   npx tsc --noEmit

   # Standard ESLint
   npm run lint

   # Product quality checks (design system, accessibility, SEO)
   npm run lint:product

   # Build test
   npm run build
   ```

   **Review errors carefully:**
   - **False positives?** Document with inline comments explaining why
   - **Real violations?** Fix them following Nimbus design system
   - **Unsure?** Ask for clarification before proceeding

   **Manual checks:**
   - [ ] Feature works in development
   - [ ] Feature works in production build
   - [ ] Mobile responsive (test on small screen)
   - [ ] Accessible (keyboard navigation, screen readers)
   - [ ] No console errors in browser
   - [ ] Loading states display correctly
   - [ ] Error handling works (test error scenarios)
   - [ ] Design system colors used (coral/orange/lime, no indigo/blue/purple)

6. **Documentation**
   - Add comments for complex logic
   - Update README if needed
   - Document new API endpoints
   - Add to TODO if follow-up needed

## Implementation Guidelines

### DO
✅ Follow existing code patterns
✅ Use TypeScript strictly (no `any` types)
✅ Add proper error handling
✅ Use design system colors (Coral, Rose, Lime for PetPortrait)
✅ Make components reusable
✅ Add loading and error states
✅ Test thoroughly
✅ Keep functions small and focused
✅ Use meaningful variable names

### DON'T
❌ Copy-paste code without understanding it
❌ Skip TypeScript types
❌ Ignore errors or warnings
❌ Hardcode values that should be configurable
❌ Create duplicate code
❌ Skip testing
❌ Break existing functionality
❌ Use off-brand colors

## Example Feature Implementations

### Adding a New Portrait Style

1. Update `styles` array in configuration
2. Create prompt for Replicate in `generate-portraits.mjs`
3. Generate example image with the script
4. Add style to UI selector component
5. Test generation with new style
6. Update documentation

### Adding User Profile Feature

1. Check if User model needs new fields (Prisma schema)
2. Create API route: `app/api/user/profile/route.ts`
3. Create profile page: `app/dashboard/profile/page.tsx`
4. Add form with validation
5. Add update functionality
6. Test all edge cases

### Adding Export Format

1. Update Portrait model if needed
2. Modify generation API to support new format
3. Update UI to show new format option
4. Test generation in new format
5. Verify download works

## Common Pitfalls to Avoid

1. **Not checking if feature already exists** - Search first!
2. **Breaking existing features** - Test related functionality
3. **Poor error handling** - Add try-catch and user-friendly messages
4. **Ignoring mobile** - Test on small screens
5. **Skipping validation** - Use Zod for API validation
6. **Hardcoding** - Use configuration or environment variables
7. **Not following patterns** - Look at existing code first

Now, please describe the feature you want to implement.
