# Code Review Command

You are helping review code changes in the Nimbus application before they go to production. Provide a thorough, constructive review.

## Review Areas

### 1. Code Quality
- [ ] TypeScript types are properly defined (no `any`)
- [ ] Functions are small and focused (< 50 lines ideally)
- [ ] Variable names are descriptive
- [ ] Comments exist for complex logic
- [ ] No commented-out code
- [ ] No console.log left in production code
- [ ] No TODO comments without tickets

### 2. Error Handling
- [ ] Try-catch blocks where needed
- [ ] API routes return proper error responses
- [ ] User-friendly error messages
- [ ] Errors are logged appropriately
- [ ] Loading states during async operations
- [ ] Error boundaries for React components (if needed)

### 3. Security
- [ ] No secrets or API keys in code
- [ ] Input validation on all user inputs (Zod)
- [ ] SQL injection prevention (using Prisma properly)
- [ ] XSS prevention
- [ ] CSRF protection (Next.js handles this)
- [ ] Rate limiting considered for API routes
- [ ] File upload validation strict

### 4. Performance
- [ ] No unnecessary re-renders
- [ ] Images optimized (using Next.js Image)
- [ ] Proper use of React Server Components
- [ ] Database queries are efficient (no N+1)
- [ ] Proper indexes on database queries
- [ ] Lazy loading where appropriate

### 5. Accessibility
- [ ] Semantic HTML elements used
- [ ] Alt text on images
- [ ] Keyboard navigation works
- [ ] Color contrast meets WCAG AA (4.5:1)
- [ ] Focus states visible
- [ ] ARIA labels where needed

### 6. Design System Compliance
- [ ] Uses approved colors only (Coral #FF7F50, Rose #F43F5E, Lime #84CC16)
- [ ] No random Tailwind colors (no indigo, no arbitrary values)
- [ ] Consistent spacing (using design system)
- [ ] Rounded corners match design system (16-32px)
- [ ] Typography follows design system

### 7. Testing Readiness
- [ ] Can be tested manually
- [ ] Clear steps to reproduce functionality
- [ ] Works in development
- [ ] Works in production build
- [ ] Mobile responsive
- [ ] No breaking changes to existing features

### 8. API Design (if applicable)
- [ ] RESTful conventions followed
- [ ] Proper HTTP status codes
- [ ] Request validation with Zod
- [ ] Proper response format
- [ ] Error responses are consistent
- [ ] API documented or self-explanatory

### 9. Database Changes (if applicable)
- [ ] Migration created properly
- [ ] Schema changes are backwards compatible (if needed)
- [ ] Indexes added for performance
- [ ] Relationships defined correctly
- [ ] Default values set appropriately

### 10. Documentation
- [ ] README updated if needed
- [ ] API endpoints documented
- [ ] Complex logic has comments
- [ ] Environment variables documented

## Review Feedback Template

I'll provide feedback in this format:

**✅ Strengths:**
- What was done well
- Good patterns followed
- Quality improvements

**⚠️ Issues to Fix:**
- Critical issues that must be fixed
- Security concerns
- Breaking changes

**💡 Suggestions:**
- Optional improvements
- Refactoring opportunities
- Performance optimizations

**📋 Checklist:**
- Things to verify before merging

---

Please share the code changes you'd like me to review. You can:
1. Describe what you changed
2. Share specific file paths
3. Paste code snippets
4. Or just tell me the feature/bug fix and I'll search for the changes
