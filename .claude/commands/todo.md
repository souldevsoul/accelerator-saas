You are an AI assistant helping developers work on **Nimbus** - an AI-powered MVP development platform.

When the developer runs `/todo`, show them the current tasks and priorities for the Nimbus project.

## Instructions

1. **Read the current TODO list** from `.claude/TODO.md` if it exists
2. **If `.claude/TODO.md` doesn't exist**, show these default priorities:

---

# Nimbus - Current Tasks & Priorities

**Platform:** Build production-ready web applications faster with AI-powered code generation

## 🚀 High Priority

### Core Platform Features
- [ ] Implement AI MVP generation workflow
  - Set up Anthropic Claude API integration
  - Create code generation prompts for common MVP patterns
  - Build streaming response UI for real-time feedback

- [ ] Build Expert Task Assignment System
  - Create task creation and assignment UI
  - Implement credit reservation for tasks
  - Add GitHub PR integration for task completion

- [ ] Complete Credit System
  - Stripe integration for credit purchases
  - Credit ledger and transaction history
  - Refund workflow for failed generations

### Authentication & User Management
- [ ] Set up NextAuth/Clerk authentication
- [ ] Implement user roles (USER, EXPERT, ADMIN)
- [ ] Create user profile pages
- [ ] Build admin dashboard

## 🎨 Design & Branding

### UI Theme Alignment
- [ ] Apply Nimbus brand colors consistently across all pages
- [ ] Remove any template placeholder content
- [ ] Update all marketing copy to reflect Nimbus brand
- [ ] Run `npm run lint:product` to catch brand violations

### UI Components
- [ ] Build project creation flow
- [ ] Create MVP generation button with progress UI
- [ ] Design task assignment dialog
- [ ] Implement credit purchase flow

## 🗄️ Database & Backend

- [ ] Set up Neon PostgreSQL database (currently: `nimbus`)
- [ ] Run Prisma migrations for:
  - User, Project, Task models
  - CreditLedger, Transaction models
  - AIRun model for tracking generations
- [ ] Create API routes for:
  - `/api/projects` - Project CRUD
  - `/api/projects/[id]/mvp` - MVP generation
  - `/api/tasks` - Task management
  - `/api/stripe/*` - Payment webhooks

## 📝 Documentation

- [ ] Update README.md with setup instructions
- [ ] Document environment variables
- [ ] Create API documentation
- [ ] Write developer onboarding guide

## 🧪 Testing & Quality

- [ ] Run type checking: `npm run type-check`
- [ ] Run linting: `npm run lint`
- [ ] Run product quality checks: `npm run lint:product`
- [ ] Test credit purchase flow end-to-end
- [ ] Test MVP generation with AI
- [ ] Verify GitHub integration works

## 🚢 Deployment

- [ ] Deploy to Vercel
- [ ] Set up production environment variables
- [ ] Configure Stripe webhooks for production
- [ ] Test production build

---

## Next Steps

1. **Choose a task** from the High Priority section
2. **Run the appropriate command**:
   - `/feature` - For implementing new features
   - `/bug` - For fixing issues
   - `/style-align` - For applying Nimbus brand
   - `/review` - Before committing changes
3. **Mark tasks complete** as you finish them

## Useful Commands

- `/onboard` - Developer onboarding
- `/setup` - Environment setup
- `/feature` - Implement a new feature
- `/bug` - Fix a bug
- `/style-align` - Align page to Nimbus brand
- `/review` - Review code before commit
- `/test` - Run tests

---

**Current working on:** [Ask developer what they're working on]
**Blockers:** [Ask if there are any blockers]
