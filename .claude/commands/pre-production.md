# Pre-Production Checklist Command

You are helping a developer prepare the Nimbus application for production deployment. Follow this comprehensive checklist systematically.

## Phase 1: Code Quality & Testing

### 1.1 Code Quality
- [ ] Run TypeScript type checking: `npx tsc --noEmit`
- [ ] Run ESLint: `npm run lint`
- [ ] Run product quality checks: `npm run lint:product`
- [ ] Fix all TypeScript errors
- [ ] Fix all ESLint errors
- [ ] Fix all product quality warnings

### 1.2 Build Test
- [ ] Run production build: `npm run build`
- [ ] Verify build completes without errors
- [ ] Check build output size is reasonable
- [ ] Test production build locally: `npm start`

### 1.3 Functionality Testing
- [ ] Test user registration flow
- [ ] Test login flow (email/password and OAuth)
- [ ] Test pet photo upload
- [ ] Test portrait generation (all 7 styles)
- [ ] Test portrait download (SD, HD, 8K)
- [ ] Test mockup generation (canvas, mug, tshirt, framed)
- [ ] Test credit purchase flow
- [ ] Test subscription management
- [ ] Test all navigation links
- [ ] Test mobile responsiveness

## Phase 2: Environment & Deployment

### 2.1 Environment Variables
- [ ] Verify all required env vars are set in Vercel:
  - `DATABASE_URL`
  - `BLOB_READ_WRITE_TOKEN`
  - `REPLICATE_API_TOKEN`
  - `NEXT_PUBLIC_APP_URL`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `NEXTAUTH_URL`
  - `NEXTAUTH_SECRET`

### 2.2 Database
- [ ] Run database migrations: `npx prisma migrate deploy`
- [ ] Verify database schema is up to date
- [ ] Check database connection works
- [ ] Verify indexes are created for performance

### 2.3 External Services
- [ ] Verify Replicate API token is valid
- [ ] Test AI generation works
- [ ] Verify Stripe integration works
- [ ] Test Stripe webhooks are configured
- [ ] Verify Vercel Blob storage is working
- [ ] Test email service (if configured)

## Phase 3: Content & Legal

### 3.1 Legal Pages
- [ ] Privacy Policy (`/privacy`) - exists and has correct content
- [ ] Terms of Service (`/terms`) - exists and has correct content
- [ ] Cookie Policy (`/cookie-policy`) - exists and has correct content
- [ ] GDPR Policy (`/gdpr`) - exists and has correct content
- [ ] Refund Policy (`/refund-policy`) - exists and has correct content
- [ ] Payment Policy (`/payment-policy`) - exists and has correct content
- [ ] Cancellation Policy (`/cancellation-policy`) - exists and has correct content
- [ ] Delivery Policy (`/delivery-policy`) - exists and has correct content

### 3.2 Footer & Contact
- [ ] Payment logos (Stripe, Visa, Mastercard, Amex) in footer
- [ ] Correct contact email: support@petportrait.ai
- [ ] All footer links work
- [ ] Social media links work (if present)

### 3.3 Honesty Check
- [ ] NO fake statistics (no "10,000+ portraits created" unless true)
- [ ] NO fake reviews (remove or use only real testimonials)
- [ ] NO fake ratings (no "4.9/5 stars" without real reviews)
- [ ] All example portraits are real AI-generated images
- [ ] Pricing reflects actual costs

## Phase 4: Performance & SEO

### 4.1 Performance
- [ ] Run Lighthouse audit: score > 90
- [ ] Page load time < 3 seconds
- [ ] Images are optimized (using Next.js Image)
- [ ] No console errors in browser
- [ ] Check for memory leaks

### 4.2 SEO
- [ ] All pages have meta title (40-60 chars)
- [ ] All pages have meta description (120-160 chars)
- [ ] OpenGraph images set
- [ ] Favicon is set
- [ ] Sitemap generated (optional)
- [ ] robots.txt configured (optional)

## Phase 5: Security

### 5.1 Security Checks
- [ ] No secrets in code or git history
- [ ] Environment variables are encrypted in Vercel
- [ ] API routes have proper validation (Zod schemas)
- [ ] Authentication is working correctly
- [ ] CORS settings are correct
- [ ] Rate limiting is configured (if applicable)
- [ ] File upload validation is strict

## Phase 6: Monitoring

### 6.1 Setup Monitoring
- [ ] Enable Vercel Analytics
- [ ] Configure error tracking (Sentry recommended)
- [ ] Set up uptime monitoring
- [ ] Configure log aggregation

## Phase 7: Documentation

### 7.1 Documentation Check
- [ ] README.md is up to date
- [ ] API documentation is current
- [ ] Environment variable docs are complete
- [ ] Deployment guide is accurate

## Final Steps

1. **Review this entire checklist** and mark each item as complete
2. **Fix any issues** found during the checks
3. **Test again** after fixes
4. **Create a backup** of current production database (if applicable)
5. **Deploy to production**: `vercel --prod`
6. **Verify deployment** works correctly
7. **Monitor logs** for the first few hours after deployment

## Post-Deployment

- [ ] Test production URL works
- [ ] Test all critical paths in production
- [ ] Monitor error logs
- [ ] Monitor performance metrics
- [ ] Check analytics are working

---

**IMPORTANT**: Do not skip any items. Each item is critical for a successful production launch.

Now, let's start working through this checklist together. I'll help you with each step.
