# Bug Fix Command

You are helping a developer fix a bug in the Nimbus application. Follow these systematic steps to ensure a proper fix without cutting corners.

## IMPORTANT: Run Setup First

**If this is your first time working on the project**, run `/setup` command first to stabilize your environment and style guide.

## Your Task

1. **Understand the Bug**
   - Ask clarifying questions if the bug description is unclear
   - Identify what the expected behavior should be
   - Determine what is actually happening
   - Check browser console for errors
   - Check terminal/server logs for errors

2. **Check if Functionality Exists**
   - Search the codebase to see if this feature was already implemented
   - Check if the code exists but is not properly wired/connected
   - Look for commented out code or disabled features
   - Check environment variables and configuration

3. **Identify the Root Cause**
   - Don't just fix symptoms - find the actual problem
   - Check:
     - API routes and their connections
     - Database schema and migrations
     - Component imports and exports
     - State management
     - Props passing
     - Event handlers
     - Async operations and error handling

4. **Create a Proper Fix**
   - Fix the root cause, not just the symptom
   - Ensure the fix follows existing code patterns
   - Add proper error handling
   - Add proper TypeScript types
   - Update tests if they exist

5. **Verify the Fix**
   - Test the specific bug scenario
   - Test related functionality to ensure nothing broke
   - Check console for errors
   - Verify in both development and production builds

6. **Run Quality Checks**
   ```bash
   # Run TypeScript check
   npx tsc --noEmit

   # Run standard ESLint
   npm run lint

   # Run product quality checks
   npm run lint:product
   ```

   **Review any new errors:**
   - If error is a **false positive** (the code is actually correct):
     - Add inline `/* eslint-disable rule-name */` comment with explanation
     - Example: `/* eslint-disable product-quality/use-styleguide-colors-only */`
     - Add comment explaining WHY: `// Reason: Third-party component requires this color`

   - If error is **real** (code violates design system):
     - Fix it now following Nimbus design system
     - Use coral/orange/lime/green colors only
     - Fix any accessibility issues
     - Fix any broken links

7. **Document the Fix**
   - Explain what was wrong
   - Explain what you fixed
   - Note any side effects or related changes
   - Document any ESLint rules you disabled and why

## Guardrails - DO NOT

❌ Add quick hacks or temporary fixes
❌ Comment out code without understanding why
❌ Skip TypeScript type checking
❌ Ignore console warnings/errors
❌ Skip testing the fix
❌ Fix only in one place when the issue exists in multiple places
❌ Add duplicate code instead of refactoring

## Guardrails - ALWAYS

✅ Fix the root cause
✅ Maintain code quality standards
✅ Follow existing patterns in the codebase
✅ Add proper error handling
✅ Test your changes
✅ Check for similar issues in related code
✅ Update documentation if needed

## Example Questions to Ask

- "Can you show me the exact steps to reproduce the bug?"
- "What error messages do you see in the console?"
- "When did this bug start happening?"
- "Does this work in development but not production?"
- "Have you checked if the required environment variables are set?"

Now, please describe the bug you're experiencing.
