# Nimbus - Complete Product Specification

## 🎯 Brand Concept & Vision

### What is Nimbus?

**Nimbus** is an AI-powered MVP development platform that bridges the gap between instant AI generation and professional human design expertise.

**The Core Innovation:**
We combine the speed of AI with the quality of human designers through a seamless hybrid workflow and unified credit system.

### Value Proposition

**For Startups & Solopreneurs:**
- Get professional logos in 5 minutes, not 5 days
- Start free, pay only when you need more
- Professional quality without agency prices

**For Agencies & Design Studios:**
- Use AI for rapid concept generation
- Human designers refine the best concepts
- Complete brand kits automatically generated
- White-label option for client work

### Unique Selling Points

1. **AI + Human Hybrid** - Start with AI speed, finish with human quality
2. **Unified Credits** - One credit system for both AI generation and designer services
3. **Complete Brand Kits** - Not just a logo, full brand guidelines included
4. **All Formats** - SVG, PNG, PDF, EPS ready for any use case
5. **7 Design Styles** - Modern, Vintage, Minimalist, Geometric, Hand-drawn, Tech, Abstract
6. **Commercial Rights** - Full ownership, use anywhere forever

---

## 🎨 Visual Brand Identity

### Brand Colors (CRITICAL - DO NOT DEVIATE!)

**Primary Palette:**
```
Emerald/Teal Family:
- #10B981 (emerald-500) - Primary action color
- #14B8A6 (teal-500) - Secondary emphasis
- #059669 (emerald-600) - Hover states

Blue/Indigo Family:
- #3B82F6 (blue-500) - Trust, professional
- #2563EB (blue-600) - Depth
- #6366F1 (indigo-500) - Creative accent
```

**Usage Rules:**
- Primary CTAs: Emerald/Blue gradients
- Secondary elements: Teal/Indigo
- Backgrounds: White/Slate-50
- Text: Slate-900 (headings), Slate-600 (body)

**NEVER Use (VoiceCraft template colors):**
- ❌ Yellow (`yellow-*`)
- ❌ Orange (`orange-*`)
- ❌ Harsh black borders
- ❌ Brutalist shadows

### Visual Style

**Typography:**
- Headings: Bold, modern (text-5xl, font-bold)
- Body: Readable, relaxed (text-lg, leading-relaxed)
- Accents: Semibold for emphasis

**Shadows (Soft & Professional):**
```css
shadow-soft-sm    - Subtle elevation
shadow-soft-md    - Card elevation
shadow-soft-lg    - Modal/popup elevation
shadow-soft-xl    - Hero element elevation
shadow-glow-emerald - Interactive glow effect
shadow-glow-teal    - Accent glow effect
```

**Corners (Smooth & Modern):**
```css
rounded-xl    - Buttons, cards
rounded-2xl   - Large cards, sections
rounded-3xl   - Hero elements
rounded-full  - Badges, avatars
```

**Spacing (Generous & Breathable):**
- Section padding: py-24 (desktop), py-16 (mobile)
- Card padding: p-8, p-10, p-12
- Element gaps: gap-6, gap-8
- Vertical rhythm: space-y-6, space-y-8

---

## 🔄 Core User Flows

### Flow 1: New User → First Logo (AI Only)

```
1. User lands on homepage
   ↓
2. Clicks "Create Logo" CTA
   ↓
3. [If not logged in] → Sign up/login (Clerk Auth)
   ↓
4. Arrives at /dashboard/brief
   ↓
5. Fills out brief form:
   - Business name (required)
   - Industry (dropdown: Tech, Food, Fashion, Finance, etc.)
   - Description (textarea)
   - Keywords (tags: modern, playful, professional, etc.)
   - Color preferences (color picker, optional)
   - Design style (Modern/Vintage/Minimalist/etc.)
   ↓
6. Clicks "Generate Logos" button
   ↓
7. Brief saved to database (Prisma)
   ↓
8. API call to /api/logos/generate
   ↓
9. Replicate API generates 5-8 logo concepts
   - Model: recraft-ai/recraft-v3-svg (vector)
   - Fallback: black-forest-labs/flux-pro (raster)
   ↓
10. Loading state shows progress
    ↓
11. Generated logos appear in gallery
    ↓
12. User clicks on favorite logo
    ↓
13. Opens customization panel:
    - Color adjustments
    - Font selection
    - Layout options (horizontal/vertical/icon-only)
    ↓
14. User clicks "Download" or "Get Brand Kit"
    ↓
15. [FREE TIER] → Download PNG with watermark
    [PAID TIER] → Download all formats (SVG, PNG, PDF, EPS)
    ↓
16. Success! Logo downloaded
```

**Happy Path Checkpoints:**
- ✅ Brief form validates properly
- ✅ Generation shows real-time progress
- ✅ All 5-8 logos render correctly
- ✅ Customization updates preview instantly
- ✅ Download delivers correct file format
- ✅ Free tier shows watermark, paid tier doesn't

---

### Flow 2: User → Hire Designer (Hybrid Path)

```
1. User has generated AI logo
   ↓
2. Sees "Not quite perfect? Hire a designer" CTA
   ↓
3. Clicks "Hire Designer" button
   ↓
4. Modal opens explaining service:
   - "Professional designer will refine your chosen AI concept"
   - "2-3 revision rounds included"
   - "Delivered in 2-5 business days"
   - "Cost: 10 credits ($99) or 20 credits ($199 for rush)"
   ↓
5. User confirms selected logo
   ↓
6. User adds design brief (what to improve)
   ↓
7. [If insufficient credits] → Redirect to /pricing
   ↓
8. Credit purchase flow:
   - Select credit package
   - Stripe checkout
   - Credits added to account
   ↓
9. Designer request created in database
   ↓
10. Email sent to design team
    ↓
11. Dashboard shows "In Progress" status
    ↓
12. Designer uploads refined versions
    ↓
13. User receives notification
    ↓
14. User reviews designs in dashboard
    ↓
15. User approves OR requests revision
    ↓
16. Final approved design delivered
    ↓
17. User downloads all formats
```

**Happy Path Checkpoints:**
- ✅ Designer request form clear and complete
- ✅ Credit deduction happens correctly
- ✅ User receives confirmation email
- ✅ Status updates show in dashboard
- ✅ Designer can upload files successfully
- ✅ User can request revisions (up to limit)
- ✅ Final files downloadable in all formats

---

### Flow 3: Returning User → Browse History

```
1. User logs in
   ↓
2. Lands on /dashboard
   ↓
3. Sees:
   - Recent logos (gallery view)
   - Active designer projects (status cards)
   - Credit balance (top-right)
   - "Create New Logo" button
   ↓
4. Clicks on past logo
   ↓
5. Logo detail page opens:
   - Preview of logo
   - Original brief
   - Download buttons
   - "Create Variation" button
   - "Hire Designer to Refine" button
   ↓
6. User can:
   - Download again (no extra charge)
   - Create new variation (uses credits)
   - Send to designer (uses credits)
```

**Happy Path Checkpoints:**
- ✅ All past logos visible
- ✅ Logos load with correct metadata
- ✅ Download works without re-generation
- ✅ Variations respect original brief

---

## 💳 Credit System (Unified)

### Credit Economics

**What Credits Buy:**
- 1 credit = 1 AI logo generation (up to 8 concepts)
- 1 credit = 1 logo variation (color/style change)
- 10 credits = Professional designer refinement (standard)
- 20 credits = Professional designer refinement (rush, 24-48hr)
- 5 credits = Complete brand kit generation (extended)

### Pricing Tiers

| Tier | Price | Credits/Month | AI Generations | Designer Access | Features |
|------|-------|---------------|----------------|-----------------|----------|
| **Free** | $0 | 3 | 3 logos | ❌ | PNG only, watermark |
| **Designer** | $25/mo | 25 | 25 logos | ✅ | All formats, brand kits, no watermark |
| **Agency** | $79/mo | 100 | 100 logos | ✅ | Everything + team (5 seats) + white-label |

### Credit Purchase (À la carte)

For users who exceed monthly limits:

| Package | Price | Credits | Savings |
|---------|-------|---------|---------|
| Starter | $10 | 10 | - |
| Pro | $25 | 30 | 17% |
| Studio | $75 | 100 | 25% |
| Agency | $200 | 300 | 33% |

**Rules:**
- Credits never expire
- Unused monthly credits carry over (up to 2x monthly limit)
- Team seats share credit pool
- Designer requests deduct credits immediately
- Failed generations refund credits automatically

### Credit Flow Technical Implementation

**Database Schema:**
```prisma
model User {
  id             String @id @default(cuid())
  credits        Int @default(0)
  plan           String @default("free") // "free", "designer", "agency"
  planRenewsAt   DateTime?
}

model CreditTransaction {
  id          String @id @default(cuid())
  userId      String
  type        String // "purchase", "earn", "spend", "refund"
  amount      Int    // positive for add, negative for spend
  balance     Int    // balance after transaction
  description String
  relatedId   String? // logoId, designRequestId, etc.
  createdAt   DateTime @default(now())
}
```

**API Endpoints:**
```typescript
// Check balance
GET /api/credits/balance
Response: { credits: 25, plan: "designer" }

// Spend credits
POST /api/credits/spend
Body: { amount: 1, reason: "logo_generation", relatedId: "logo_123" }
Response: { success: true, newBalance: 24 }

// Purchase credits
POST /api/credits/purchase
Body: { package: "pro" } // 30 credits for $25
Response: { checkoutUrl: "stripe.com/checkout/..." }

// Stripe webhook handles credit addition after payment
```

---

## 🤖 Replicate Integration

### AI Models Used

**Primary: recraft-ai/recraft-v3-svg**
- **Purpose:** Vector logo generation
- **Output:** SVG files (scalable, editable)
- **Speed:** ~30-60 seconds per generation
- **Best for:** Modern, minimalist, geometric styles

**Secondary: black-forest-labs/flux-pro**
- **Purpose:** High-quality raster logo concepts
- **Output:** PNG files (high resolution)
- **Speed:** ~15-30 seconds per generation
- **Best for:** Vintage, hand-drawn, detailed styles

### Generation Flow

```typescript
// /app/api/logos/generate/route.ts

export async function POST(req: Request) {
  // 1. Parse request
  const { briefId, style, userId } = await req.json()

  // 2. Check user credits
  const user = await db.user.findUnique({ where: { id: userId }})
  if (user.credits < 1) {
    return Response.json({ error: "Insufficient credits" }, { status: 402 })
  }

  // 3. Deduct credit immediately
  await deductCredits(userId, 1, "logo_generation", briefId)

  // 4. Fetch brief details
  const brief = await db.brief.findUnique({ where: { id: briefId }})

  // 5. Build Replicate prompt
  const prompt = buildPrompt(brief, style)
  // Example: "Create a modern vector logo for 'Acme Coffee Shop',
  // coffee-themed, warm colors, minimalist style, SVG format"

  // 6. Call Replicate API
  try {
    const prediction = await replicate.predictions.create({
      model: "recraft-ai/recraft-v3-svg",
      input: {
        prompt: prompt,
        style: style,
        size: "1024x1024",
        num_outputs: 8, // Generate 8 variations
      }
    })

    // 7. Save logo record (status: processing)
    const logo = await db.logo.create({
      data: {
        briefId,
        userId,
        style,
        status: "processing",
        replicateId: prediction.id,
      }
    })

    // 8. Poll Replicate for completion (webhook preferred)
    // Webhook will update logo status when done

    return Response.json({ logoId: logo.id, status: "processing" })

  } catch (error) {
    // 9. Refund credit on failure
    await refundCredits(userId, 1, "generation_failed", briefId)
    return Response.json({ error: "Generation failed" }, { status: 500 })
  }
}
```

### Webhook Handler

```typescript
// /app/api/webhooks/replicate/route.ts

export async function POST(req: Request) {
  const webhook = await req.json()

  // Verify webhook signature
  if (!verifyReplicateWebhook(webhook)) {
    return Response.json({ error: "Invalid signature" }, { status: 401 })
  }

  if (webhook.status === "succeeded") {
    // Extract generated images
    const outputs = webhook.output // Array of image URLs

    // Upload to Vercel Blob for permanent storage
    const uploadedUrls = await Promise.all(
      outputs.map(url => uploadToBlob(url))
    )

    // Update logo record
    await db.logo.update({
      where: { replicateId: webhook.id },
      data: {
        status: "completed",
        primaryUrl: uploadedUrls[0], // Best variation
      }
    })

    // Create variations
    await db.logoVariation.createMany({
      data: uploadedUrls.map((url, idx) => ({
        logoId: webhook.id,
        type: "full-color",
        fileUrl: url,
        format: "svg",
      }))
    })

    // Trigger brand kit generation
    await generateBrandKit(webhook.id)
  }

  if (webhook.status === "failed") {
    // Mark as failed, refund credits
    const logo = await db.logo.findUnique({
      where: { replicateId: webhook.id }
    })

    await refundCredits(logo.userId, 1, "generation_failed", logo.id)

    await db.logo.update({
      where: { replicateId: webhook.id },
      data: { status: "failed" }
    })
  }

  return Response.json({ success: true })
}
```

### Prompt Engineering

**Template Structure:**
```
Create a {style} logo for "{businessName}".

Industry: {industry}
Description: {description}
Keywords: {keywords joined by ", "}
Color preference: {colorPreferences or "brand appropriate"}

Requirements:
- Vector format (SVG preferred)
- Scalable and simple
- Works in monochrome
- Professional quality
- Clear and memorable

Style notes:
{styleSpecificInstructions}
```

**Style-Specific Instructions:**

**Modern:**
```
Clean lines, geometric shapes, contemporary feel.
Minimal details, strong contrast, tech-forward aesthetic.
```

**Vintage:**
```
Classic design elements, retro typography, heritage feel.
Ornate details acceptable, timeless aesthetic.
```

**Minimalist:**
```
Absolute simplicity, maximum impact with minimum elements.
Negative space usage, elegant restraint.
```

**Geometric:**
```
Mathematical precision, perfect shapes, structured design.
Grid-based composition, balanced symmetry.
```

**Hand-drawn:**
```
Organic, artisanal feel, human touch visible.
Imperfect lines welcomed, friendly and approachable.
```

**Tech:**
```
Futuristic, innovative, digital-first aesthetic.
Circuit-like elements, forward-thinking design.
```

**Abstract:**
```
Unique, artistic, non-literal representation.
Creative interpretation, memorable and distinctive.
```

---

## 📄 Marketing Pages (Required)

### Homepage (/)

**Sections (in order):**

1. **Hero Section**
   - H1: "Your Brand. Your Logo. 5 Minutes."
   - Subheading: "AI generates instant concepts. Professional designers refine to perfection."
   - Primary CTA: "Start with AI (Free)" → /dashboard
   - Secondary CTA: "Hire a Designer" → /pricing (designer section)
   - Logo showcase: Bento grid of 10 example logos (hover effects)

2. **AI + Human Hybrid Section**
   - Split comparison cards
   - Left: AI Path (fast, affordable, instant)
   - Right: Human Path (custom, expert, refined)
   - Center: Hybrid option (best of both)

3. **How It Works (3 Steps)**
   - Step 1: Fill Brief (icon + description)
   - Step 2: AI Generates (icon + description)
   - Step 3: Customize & Download (icon + description)

4. **Logo Gallery Showcase**
   - Real AI-generated examples
   - Filterable by style (Modern, Vintage, etc.)
   - Hover reveals industry/business name

5. **7 Design Styles**
   - Cards for each style
   - Visual example
   - Description
   - "View Examples" link

6. **Features Grid (6 items)**
   - Multiple Design Styles
   - Instant Customization
   - Logo Variations (full-color, mono, icon-only)
   - All File Formats (SVG, PNG, PDF, EPS)
   - Complete Brand Kit
   - Commercial Rights

7. **Testimonials (3 cards)**
   - Customer photo (if available) or avatar
   - Quote
   - Name, role, company
   - 5-star rating

8. **Pricing Table (3 tiers)**
   - Free, Designer, Agency
   - Feature comparison
   - CTAs for each tier

9. **Final CTA Section**
   - H2: "Ready to Create Your Professional Logo?"
   - Primary CTA: "Create Your Logo Now"
   - Secondary CTA: "See Pricing"
   - Trust badges: "No credit card required", "7-day money-back", "Full commercial rights"

**SEO Requirements:**
- Meta title: "Nimbus - AI Professional Logo Design in Minutes"
- Meta description: "Create stunning, professional logos with AI. Choose from 7 design styles, get complete brand kits, and download in all formats. From $0/month."
- Structured data: Organization, WebSite, Product
- Open Graph images
- Twitter Card meta tags

---

### Pricing Page (/pricing)

**Layout:**

1. **Header**
   - H1: "Simple, Transparent Pricing"
   - Subheading: "Start free, upgrade when you're ready"

2. **Pricing Toggle**
   - Monthly / Annual (save 20%)

3. **Three-Tier Comparison Table**

   **Free Tier:**
   - $0/month
   - 3 logos/month
   - Basic styles only (Modern, Minimalist)
   - PNG export only
   - Watermark included
   - Personal use only
   - CTA: "Start Free"

   **Designer Tier (MOST POPULAR):**
   - $25/month (or $20/month annual)
   - 25 logos/month
   - All 7 design styles
   - All formats (SVG, PNG, PDF, EPS)
   - No watermark
   - Logo variations included
   - Brand kit included
   - Full commercial rights
   - Designer access (10 credits = $99)
   - CTA: "Start 7-Day Trial"

   **Agency Tier:**
   - $79/month (or $63/month annual)
   - Unlimited logos
   - All Designer features
   - Team collaboration (5 seats)
   - White-label branding
   - Priority support
   - API access
   - Bulk exports
   - CTA: "Contact Sales"

4. **À la Carte Credit Packages**
   - For users who exceed monthly limits
   - 10 credits - $10
   - 30 credits - $25 (save 17%)
   - 100 credits - $75 (save 25%)
   - 300 credits - $200 (save 33%)

5. **Designer Services Pricing**
   - AI Logo Refinement: 10 credits ($99)
   - Rush Refinement (24-48hr): 20 credits ($199)
   - Custom Logo from Scratch: 50 credits ($499)

6. **FAQ Section**
   - "Can I cancel anytime?" (Yes)
   - "Do credits expire?" (No)
   - "What's the difference between AI and Designer?" (Explanation)
   - "What formats do I get?" (SVG, PNG, PDF, EPS)
   - "Do I own the logo?" (Yes, full commercial rights)

---

### Dashboard Pages (Authenticated)

#### /dashboard (Main Dashboard)

**Layout:**

1. **Top Bar**
   - Logo (left)
   - Credit balance badge (right)
   - User avatar dropdown (right)

2. **Hero Section**
   - Welcome message: "Welcome back, [Name]!"
   - Primary CTA: "Create New Logo" → /dashboard/brief
   - Credit balance display with "Buy More" link

3. **Recent Logos (Gallery)**
   - Grid of logo thumbnails
   - Hover shows: business name, style, date
   - Click opens detail page
   - Empty state: "No logos yet. Create your first!"

4. **Active Designer Projects**
   - Status cards for ongoing requests
   - Shows: preview, designer name, status, ETA
   - Empty state: "No active projects"

5. **Quick Actions**
   - "Browse Templates"
   - "Hire a Designer"
   - "View Pricing"

---

#### /dashboard/brief (Logo Brief Form)

**Form Fields:**

1. **Business Name** (required)
   - Text input
   - Placeholder: "Acme Coffee Co."
   - Character limit: 50

2. **Industry** (required)
   - Dropdown select
   - Options: Tech, Food & Beverage, Fashion, Finance, Healthcare, Education, Real Estate, Fitness, Beauty, Legal, Construction, Entertainment, Other

3. **Business Description** (required)
   - Textarea
   - Placeholder: "We're a specialty coffee roaster focused on sustainable, ethically-sourced beans..."
   - Character limit: 500

4. **Keywords** (required)
   - Tag input (multi-select)
   - Suggestions: modern, playful, professional, elegant, bold, minimal, classic, friendly, luxurious, edgy, organic, technical, artistic
   - Limit: 5 tags

5. **Color Preferences** (optional)
   - Color picker
   - Allow up to 3 colors
   - Default: "Let AI choose brand-appropriate colors"

6. **Design Style** (required)
   - Radio buttons with visual examples
   - Options: Modern, Vintage, Minimalist, Geometric, Hand-drawn, Tech, Abstract
   - Shows example logo for each style

7. **Submit Button**
   - "Generate Logos (1 credit)"
   - Disabled if insufficient credits
   - Loading state during generation

**Validation:**
- All required fields must be filled
- At least 2 keywords required
- Business name must be unique per user (warning if duplicate)

**After Submit:**
- Brief saved to database
- Redirect to /dashboard/logos/[id]/generating
- Show generation progress

---

#### /dashboard/logos/[id] (Logo Detail)

**Layout:**

1. **Main Preview**
   - Large logo display
   - White background toggle
   - Colored background toggle
   - Zoom controls

2. **Variations Gallery**
   - Thumbnails of all 8 generated variations
   - Click to switch main preview

3. **Customization Panel (Sidebar)**

   **Color Adjustments:**
   - Primary color picker
   - Secondary color picker
   - "Apply" button (regenerates with new colors - 1 credit)

   **Layout Options:**
   - Horizontal
   - Vertical
   - Icon-only
   - "Generate Variation" button (1 credit)

   **Font Options:**
   - Font family dropdown
   - Font weight slider
   - "Apply" button

4. **Action Buttons**
   - "Download" (opens format selector)
   - "Get Brand Kit" (5 credits)
   - "Hire Designer to Refine" (10 credits)
   - "Create New Variation" (1 credit)
   - "Delete Logo"

5. **Original Brief Display**
   - Shows: business name, industry, keywords, etc.
   - "Edit Brief" link (creates new generation)

6. **Download Modal (when clicking "Download")**
   - Format options:
     - SVG (vector, scalable)
     - PNG (transparent background, 4096x4096)
     - PDF (print-ready)
     - EPS (Adobe-compatible)
   - Free tier: PNG only with watermark
   - Paid tier: All formats, no watermark
   - "Download All" button (ZIP file)

---

#### /dashboard/brand-kit/[logoId] (Brand Kit)

**Sections:**

1. **Logo Variations**
   - Full-color version
   - Monochrome (black)
   - Monochrome (white)
   - Icon-only
   - Horizontal lockup
   - Vertical lockup

2. **Color Palette**
   - Primary color (hex, RGB, CMYK)
   - Secondary color
   - Accent color
   - Color usage guidelines

3. **Typography**
   - Primary font (headings)
   - Secondary font (body text)
   - Font pairing rationale
   - Download links for fonts (if available)

4. **Usage Guidelines**
   - Minimum size (200px width)
   - Clear space (0.5x logo height)
   - Dos: correct usage examples
   - Don'ts: incorrect usage examples

5. **Download Button**
   - "Download Complete Brand Kit (PDF)"
   - Generates comprehensive PDF with all guidelines

---

#### /dashboard/hire-designer (Designer Request Form)

**Layout:**

1. **Selected Logo Preview**
   - Shows the logo user wants refined
   - "Change Logo" button

2. **Design Brief Form**

   **What would you like improved?** (required)
   - Checkboxes:
     - [ ] Make it more modern
     - [ ] Simplify the design
     - [ ] Change the icon
     - [ ] Adjust typography
     - [ ] Different color scheme
     - [ ] More professional look
     - [ ] More playful/fun
     - [ ] Other (specify below)

   **Additional Instructions** (optional)
   - Textarea
   - Placeholder: "Please make the icon more geometric and the font bolder..."
   - Character limit: 1000

   **Inspiration/References** (optional)
   - File upload (up to 3 images)
   - Or URL input

   **Delivery Speed:**
   - Radio buttons:
     - Standard (2-5 business days) - 10 credits
     - Rush (24-48 hours) - 20 credits

3. **Credit Confirmation**
   - "This will use X credits"
   - Current balance display
   - "Buy More Credits" link if insufficient

4. **Submit Button**
   - "Submit to Designer"
   - Confirmation modal before deducting credits

**After Submit:**
- Credits deducted
- Request created in database
- Email sent to design team
- Redirect to /dashboard/requests/[id]
- Shows status: "In Progress"

---

#### /dashboard/requests/[id] (Designer Request Status)

**Layout:**

1. **Status Timeline**
   - ✅ Request Submitted
   - ⏳ Designer Assigned
   - ⏳ First Draft In Progress
   - ⏳ Awaiting Your Feedback
   - ⏳ Final Revisions
   - ⏳ Completed

2. **Designer Info**
   - Avatar
   - Name
   - Specialty
   - "Message Designer" button

3. **Uploaded Drafts**
   - Gallery of designer uploads
   - Version number
   - Upload date
   - "Approve" or "Request Changes" buttons

4. **Revision Request Form** (if needed)
   - Textarea: "What would you like changed?"
   - Character limit: 500
   - Revision counter: "2 of 3 revisions remaining"

5. **Final Approval**
   - "Approve Final Design" button
   - Downloads unlock after approval

---

## 🔧 Technical Implementation Checklist

### Database (Prisma + PostgreSQL)

**Models Required:**

```prisma
// User & Auth
model User {
  id            String @id @default(cuid())
  email         String @unique
  name          String?
  credits       Int @default(0)
  plan          String @default("free")
  planRenewsAt  DateTime?
  briefs        Brief[]
  logos         Logo[]
  requests      DesignerRequest[]
  transactions  CreditTransaction[]
}

// Logo Brief
model Brief {
  id              String @id @default(cuid())
  userId          String
  user            User @relation(fields: [userId], references: [id])
  businessName    String
  industry        String
  description     String @db.Text
  keywords        String[]
  colorPreferences String[]
  logos           Logo[]
  createdAt       DateTime @default(now())
}

// Generated Logo
model Logo {
  id            String @id @default(cuid())
  briefId       String
  brief         Brief @relation(fields: [briefId], references: [id])
  userId        String
  user          User @relation(fields: [userId], references: [id])
  style         String
  primaryUrl    String
  status        String @default("processing")
  replicateId   String?
  variations    LogoVariation[]
  brandKit      BrandKit?
  favorites     Int @default(0)
  downloads     Int @default(0)
  createdAt     DateTime @default(now())
}

// Logo Variations
model LogoVariation {
  id       String @id @default(cuid())
  logoId   String
  logo     Logo @relation(fields: [logoId], references: [id], onDelete: Cascade)
  type     String // "full-color", "monochrome", "icon-only", etc.
  fileUrl  String
  format   String // "svg", "png", "pdf", "eps"
}

// Brand Kit
model BrandKit {
  id               String @id @default(cuid())
  logoId           String @unique
  logo             Logo @relation(fields: [logoId], references: [id], onDelete: Cascade)
  colorPalette     Json // {primary: "#...", secondary: "#..."}
  typography       Json // {primary: "Font Name", secondary: "..."}
  usageGuidelines  String @db.Text
  minSize          String // "200px"
  clearSpace       String // "0.5x logo height"
  pdfUrl           String?
}

// Designer Requests
model DesignerRequest {
  id              String @id @default(cuid())
  userId          String
  user            User @relation(fields: [userId], references: [id])
  logoId          String
  brief           String @db.Text
  inspirationUrls String[]
  priority        String // "standard", "rush"
  status          String @default("pending")
  designerId      String?
  drafts          DesignerDraft[]
  revisions       Revision[]
  creditsUsed     Int
  createdAt       DateTime @default(now())
  completedAt     DateTime?
}

// Designer Drafts
model DesignerDraft {
  id        String @id @default(cuid())
  requestId String
  request   DesignerRequest @relation(fields: [requestId], references: [id])
  version   Int
  fileUrls  String[]
  notes     String?
  uploadedAt DateTime @default(now())
}

// Revision Requests
model Revision {
  id        String @id @default(cuid())
  requestId String
  request   DesignerRequest @relation(fields: [requestId], references: [id])
  feedback  String @db.Text
  createdAt DateTime @default(now())
}

// Credit Transactions
model CreditTransaction {
  id          String @id @default(cuid())
  userId      String
  user        User @relation(fields: [userId], references: [id])
  type        String // "purchase", "earn", "spend", "refund"
  amount      Int
  balance     Int
  description String
  relatedId   String?
  createdAt   DateTime @default(now())
}
```

---

### API Routes Required

**Auth (Clerk):**
- Sign up, login handled by Clerk

**Credits:**
- `GET /api/credits/balance` - Get current balance
- `POST /api/credits/spend` - Deduct credits
- `POST /api/credits/refund` - Refund credits
- `POST /api/credits/purchase` - Stripe checkout

**Briefs:**
- `POST /api/briefs/create` - Create logo brief
- `GET /api/briefs` - List user's briefs
- `GET /api/briefs/[id]` - Get brief details

**Logos:**
- `POST /api/logos/generate` - Generate logos (calls Replicate)
- `GET /api/logos` - List user's logos
- `GET /api/logos/[id]` - Get logo details
- `PATCH /api/logos/[id]/customize` - Update logo customization
- `POST /api/logos/[id]/variations` - Generate variations
- `DELETE /api/logos/[id]` - Delete logo

**Brand Kits:**
- `POST /api/brandkits/generate` - Generate brand kit
- `GET /api/brandkits/[logoId]` - Get brand kit
- `GET /api/brandkits/[logoId]/download` - Download PDF

**Designer Requests:**
- `POST /api/requests/create` - Create designer request
- `GET /api/requests` - List user's requests
- `GET /api/requests/[id]` - Get request details
- `POST /api/requests/[id]/revise` - Request revision
- `POST /api/requests/[id]/approve` - Approve final design

**Downloads:**
- `GET /api/logos/[id]/download` - Download logo files

**Webhooks:**
- `POST /api/webhooks/replicate` - Replicate generation complete
- `POST /api/webhooks/stripe` - Stripe payment events

---

### Environment Variables Needed

```env
# Database
DATABASE_URL="postgresql://..."

# Replicate
REPLICATE_API_TOKEN="r8_..."

# Vercel Blob
BLOB_READ_WRITE_TOKEN="vercel_blob_..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Stripe
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# App Config
NEXT_PUBLIC_APP_URL="https://nimbus.com"

# Email (Optional - for notifications)
RESEND_API_KEY="re_..."

# Designer Team Email
DESIGNER_TEAM_EMAIL="designers@nimbus.com"
```

---

## ✅ End Goal Verification Checklist

### Marketing Pages Complete?
- [ ] Homepage has all 9 sections
- [ ] Pricing page shows all 3 tiers + à la carte
- [ ] All CTAs lead to correct destinations
- [ ] SEO meta tags present
- [ ] Mobile responsive
- [ ] Design system consistent (emerald/blue, soft shadows)

### User Flows Working?
- [ ] New user can sign up
- [ ] User can create brief
- [ ] AI generation works (Replicate integration)
- [ ] Generated logos display correctly
- [ ] User can customize logo
- [ ] User can download (format restrictions by tier)
- [ ] User can hire designer
- [ ] Designer request creates correctly
- [ ] Credit system deducts properly

### Credit System Complete?
- [ ] Free tier: 3 credits/month
- [ ] Designer tier: 25 credits/month
- [ ] Agency tier: 100 credits/month
- [ ] À la carte purchase works (Stripe)
- [ ] Credits deduct on generation
- [ ] Credits deduct on designer request
- [ ] Credits refund on failure
- [ ] Credit balance displays correctly
- [ ] Credit transaction history visible

### Replicate Integration Working?
- [ ] API connection established
- [ ] Prompt engineering implemented
- [ ] Generation request succeeds
- [ ] Webhook receives completion
- [ ] Generated images upload to Vercel Blob
- [ ] Logo variations created
- [ ] Failed generations refund credits

### Database Schema Complete?
- [ ] All models defined in Prisma
- [ ] Migrations run successfully
- [ ] Relationships configured correctly
- [ ] Indexes added for performance

### Authentication Working?
- [ ] Clerk integration complete
- [ ] Sign up flow works
- [ ] Login flow works
- [ ] Protected routes secure
- [ ] User profile accessible

### Designer Workflow Complete?
- [ ] Request form collects all info
- [ ] Email sent to design team
- [ ] Designer dashboard exists (admin)
- [ ] Designers can upload drafts
- [ ] Users can request revisions
- [ ] Final approval workflow works
- [ ] Files downloadable after approval

---

## 🎨 Design System Confirmation

**Colors Used Everywhere:**
- ✅ Emerald (#10B981)
- ✅ Teal (#14B8A6)
- ✅ Blue (#3B82F6)
- ✅ Indigo (#6366F1)
- ❌ NO Yellow
- ❌ NO Orange
- ❌ NO Harsh black borders

**Visual Style:**
- ✅ Soft shadows (shadow-soft-*)
- ✅ Smooth corners (rounded-xl/2xl/3xl)
- ✅ Generous spacing (py-24, gap-8)
- ✅ Professional, creative feel

---

This is the complete, comprehensive specification for Nimbus. Every flow, every page, every technical detail is documented here.

**Is anything missing or unclear?**
