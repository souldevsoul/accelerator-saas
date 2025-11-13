# Testing Command

You are helping test the Nimbus application systematically. Follow this comprehensive testing guide.

## Testing Levels

### Level 1: Quick Smoke Test (5 minutes)
Run these critical path tests first:

1. **Homepage loads** - Visit `/`
2. **Registration works** - Create a test account
3. **Login works** - Log in with test account
4. **Upload works** - Upload a pet photo
5. **Generation works** - Generate one portrait
6. **Download works** - Download the portrait

If any of these fail, stop and fix before continuing.

### Level 2: Core Functionality (20 minutes)

#### Authentication & User Management
- [ ] Register new account (email/password)
- [ ] Email verification sent
- [ ] Login with correct credentials
- [ ] Login with incorrect credentials (should fail gracefully)
- [ ] Logout works
- [ ] OAuth login (Google) - if configured
- [ ] OAuth login (GitHub) - if configured
- [ ] Password reset flow
- [ ] Profile page loads
- [ ] Profile update works

#### Pet Photo Upload
- [ ] Upload via drag-and-drop
- [ ] Upload via file picker
- [ ] Upload validates file type (JPG, PNG only)
- [ ] Upload validates file size (50MB max)
- [ ] Invalid file shows error
- [ ] Photo preview displays
- [ ] Pet name and breed can be entered
- [ ] Photo appears in gallery

#### Portrait Generation
- [ ] All 7 styles available:
  - [ ] Oil Painting
  - [ ] Watercolor
  - [ ] Renaissance
  - [ ] Pop Art
  - [ ] Cartoon
  - [ ] Anime
  - [ ] Minimalist
- [ ] Style selector works
- [ ] Generation button enabled when ready
- [ ] Progress indicator shows during generation
- [ ] Generation completes in 30-60 seconds
- [ ] Portrait displays after generation
- [ ] Before/after comparison works
- [ ] Credits deducted correctly
- [ ] Error handling if generation fails

#### Portrait Download
- [ ] Download SD quality
- [ ] Download HD quality
- [ ] Download 8K quality (premium plans)
- [ ] Downloaded file opens correctly
- [ ] File size is appropriate for quality level

#### Mockup Generation
- [ ] Canvas mockup generates
- [ ] Framed print mockup generates
- [ ] Mug mockup generates
- [ ] T-shirt mockup generates
- [ ] Mockups display correctly
- [ ] Mockup download works

#### Credit System
- [ ] Free plan has 2 credits/month
- [ ] Credit balance displays correctly
- [ ] Credits deduct on portrait generation
- [ ] Insufficient credits blocks generation
- [ ] Credit purchase button works
- [ ] Stripe checkout loads
- [ ] Test payment works (use Stripe test cards)
- [ ] Credits added after successful payment
- [ ] Webhook handles payment confirmation

#### Subscription Management
- [ ] Pricing page displays correctly
- [ ] Can upgrade from Free to Pet Lover
- [ ] Can upgrade from Pet Lover to Studio
- [ ] Can downgrade plans
- [ ] Subscription status shows correctly
- [ ] Plan limits enforced correctly

### Level 3: UI/UX Testing (15 minutes)

#### Design System
- [ ] Colors match design system (Coral, Rose, Lime)
- [ ] No off-brand colors used
- [ ] Rounded corners consistent (16-32px)
- [ ] Typography consistent
- [ ] Spacing follows design system

#### Responsive Design
- [ ] Desktop (1920x1080) looks good
- [ ] Laptop (1366x768) looks good
- [ ] Tablet (768x1024) looks good
- [ ] Mobile (375x667) looks good
- [ ] Navigation works on mobile
- [ ] Forms are usable on mobile

#### Loading States
- [ ] Loading spinners show during async operations
- [ ] Skeleton screens for data loading
- [ ] Buttons disabled during submission
- [ ] Progress bars for long operations

#### Error States
- [ ] Form validation errors display clearly
- [ ] API errors show user-friendly messages
- [ ] 404 page exists and looks good
- [ ] 500 error page exists
- [ ] Network errors handled gracefully

### Level 4: Content & Legal (10 minutes)

#### Legal Pages
- [ ] `/privacy` - Privacy Policy loads
- [ ] `/terms` - Terms of Service loads
- [ ] `/cookie-policy` - Cookie Policy loads
- [ ] `/gdpr` - GDPR Policy loads
- [ ] `/refund-policy` - Refund Policy loads
- [ ] `/payment-policy` - Payment Policy loads
- [ ] `/cancellation-policy` - Cancellation Policy loads
- [ ] `/delivery-policy` - Delivery Policy loads
- [ ] All legal pages have correct content
- [ ] All legal pages are readable and formatted

#### Footer
- [ ] Payment logos present (Stripe, Visa, Mastercard, Amex)
- [ ] Contact email correct: support@petportrait.ai
- [ ] Social links work (if present)
- [ ] All footer links work
- [ ] Copyright year is current

#### Honesty Check
- [ ] NO fake user counts
- [ ] NO fake testimonials
- [ ] NO fabricated ratings
- [ ] All example images are real AI-generated
- [ ] Pricing is honest and clear

### Level 5: Technical Testing (10 minutes)

#### Browser Console
- [ ] No errors in console (Chrome)
- [ ] No errors in console (Firefox)
- [ ] No errors in console (Safari)
- [ ] No warnings in console (or minimal)

#### Performance
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse Best Practices > 90
- [ ] Lighthouse SEO > 90
- [ ] Page load < 3 seconds
- [ ] Images load progressively

#### SEO
- [ ] Homepage has meta title (40-60 chars)
- [ ] Homepage has meta description (120-160 chars)
- [ ] Pricing page has meta tags
- [ ] Features page has meta tags
- [ ] Dashboard pages have meta tags
- [ ] OpenGraph images set

#### Links
- [ ] All internal links work (no 404s)
- [ ] All external links work
- [ ] External links open in new tab
- [ ] External links have rel="noopener noreferrer"

### Level 6: Edge Cases (10 minutes)

- [ ] Test with very large photo file
- [ ] Test with tiny photo file
- [ ] Test with corrupted image file
- [ ] Test with wrong file type (.pdf, .txt)
- [ ] Test rapid clicking of buttons
- [ ] Test with slow internet (throttle in DevTools)
- [ ] Test with ad blocker enabled
- [ ] Test with JavaScript disabled (graceful degradation)
- [ ] Test with cookies disabled
- [ ] Test browser back/forward buttons

## Test Reporting

After testing, report issues in this format:

### Critical Issues (Must Fix)
1. [Description of issue]
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots/video if helpful

### Minor Issues (Should Fix)
1. [Description]

### Suggestions (Nice to Have)
1. [Description]

---

What would you like to test? Choose one:
1. **Quick smoke test** (5 min)
2. **Full core functionality** (20 min)
3. **Specific feature** (tell me which one)
4. **Everything** (60 min comprehensive test)
