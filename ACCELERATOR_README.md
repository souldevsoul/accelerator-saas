# Accelerator SaaS

An AI-powered SaaS platform built on top of [Open Lovable](https://github.com/firecrawl/open-lovable) that turns ideas into MVPs with human-assisted task execution.

## Features

✨ **AI MVP Generation** - Submit an idea, get a working MVP preview via GitHub PR
💳 **Credit-Based Billing** - Prepaid credit system powered by Stripe
👥 **Human Task Assignment** - Assign tasks to expert executors
🔄 **GitHub Integration** - Automated branch/PR workflow for all work
💰 **Wallet System** - Credit reservation, usage tracking, and refunds
📊 **Project Management** - Manage projects, tasks, and team members

## Architecture

This project extends Open Lovable with:

### Database Layer (`packages/db`)
- **Prisma ORM** for PostgreSQL
- **Schema**: Users, Projects, Tasks, AI Runs, Wallets, Credits, Notifications
- **Pricing Logic**: Dynamic cost calculation based on task type and complexity

### Library Package (`packages/lib`)
- **Wallet Helpers**: Reserve, refund, and add credits atomically
- **GitHub Integration**: Branch creation, PR management, webhook verification
- **Stripe Integration**: Checkout sessions, webhook handling

### API Routes (`app/api`)
- **Projects**: Create, list, generate MVP
- **Tasks**: Create, assign to executors, cancel
- **Stripe**: Checkout, webhooks for credit top-ups
- **GitHub**: Webhooks for PR status updates

### Authentication
- **Supabase** for user authentication
- Server and client-side helpers
- Protected routes via middleware

## Setup

### 1. Prerequisites

```bash
# Install dependencies
pnpm install

# Set up Supabase project
# 1. Go to https://supabase.com
# 2. Create a new project
# 3. Get your project URL and anon key
```

### 2. Database Setup

```bash
# Create a PostgreSQL database (or use Supabase's built-in Postgres)
# Get your DATABASE_URL

# Generate Prisma client
cd packages/db
pnpm install
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with test data
pnpm seed
```

### 3. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Original Open Lovable config
FIRECRAWL_API_KEY=
ANTHROPIC_API_KEY= # or other AI providers
SANDBOX_PROVIDER=vercel
VERCEL_OIDC_TOKEN=

# Database
DATABASE_URL=postgresql://...

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_PRICE_100=price_xxx
STRIPE_PRICE_1000=price_xxx
STRIPE_PRICE_10000=price_xxx

# GitHub App
GITHUB_APP_ID=
GITHUB_PRIVATE_KEY=
GITHUB_INSTALLATION_ID=
GITHUB_WEBHOOK_SECRET=
```

### 4. GitHub App Setup

1. Create a GitHub App at https://github.com/settings/apps/new
2. Set permissions:
   - **Contents**: Read & write
   - **Pull requests**: Read & write
   - **Metadata**: Read-only
3. Subscribe to webhooks:
   - `pull_request`
   - `pull_request_review`
4. Set webhook URL: `https://your-domain.com/api/github/webhook`
5. Generate and download private key
6. Install the app on your organization/repo
7. Copy App ID, Installation ID, and Private Key to `.env.local`

### 5. Stripe Setup

1. Create a Stripe account at https://stripe.com
2. Create three products for credit packages:
   - 100 credits ($9.99)
   - 1,000 credits ($79.99)
   - 10,000 credits ($599.99)
3. Get the price IDs and add to `.env.local`
4. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
5. Add webhook secret to `.env.local`

### 6. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## How It Works

### 1. Create a Project
```bash
POST /api/projects
{
  "name": "My SaaS",
  "repoFullName": "username/my-saas"
}
```

### 2. Generate MVP
```bash
POST /api/projects/:id/mvp
```

This will:
- Debit 100 credits from your wallet
- Use Open Lovable AI to generate code
- Create a branch `mvp/:projectId`
- Open a PR with the generated MVP
- Update project status to `mvp_preview`

### 3. Create Tasks
```bash
POST /api/tasks
{
  "projectId": "...",
  "title": "Add user authentication",
  "description": "Implement OAuth with Google",
  "type": "feature",
  "complexity": "L"
}
```

### 4. Assign to Executor
```bash
POST /api/tasks/:id/assign
{
  "assigneeId": "executor-user-id"
}
```

This will:
- Calculate cost: `BASE_BY_TYPE[type] * MULT_BY_COMPLEXITY[complexity]`
- Reserve credits from wallet
- Create GitHub branch `task/:id-:slug`
- Open PR with task details
- Update task status to `assigned`

### 5. GitHub Workflow
- **PR opened** → Task status: `in_progress`
- **Review requested** → Task status: `awaiting_review`
- **PR merged** → Task status: `done`
- **PR closed (not merged)** → Task status: `canceled` + credits refunded

### 6. Buy Credits
```bash
POST /api/stripe/checkout
{
  "packageKey": "1000"
}
```

Returns Stripe checkout URL. After payment, credits are added to wallet automatically via webhook.

## Pricing

### MVP Generation
- **Cost**: 100 credits

### Task Pricing
```
Cost = BASE_BY_TYPE[type] × MULT_BY_COMPLEXITY[complexity]

BASE_BY_TYPE:
- feature: 30
- bug: 15
- content: 10
- other: 20

MULT_BY_COMPLEXITY:
- S (Small): 1x
- M (Medium): 2x
- L (Large): 3x

Examples:
- Small bug: 15 × 1 = 15 credits
- Medium feature: 30 × 2 = 60 credits
- Large feature: 30 × 3 = 90 credits
```

## Database Schema

```prisma
User
  ├─ id, email, name, role
  ├─ projects[]
  ├─ assignedTasks[]
  ├─ wallet
  └─ creditLedger[]

Project
  ├─ id, name, repoFullName, status
  ├─ owner (User)
  ├─ aiRuns[]
  └─ tasks[]

Task
  ├─ id, title, type, complexity, status
  ├─ project
  ├─ assignee (User)
  ├─ githubBranch, githubPrUrl
  └─ reservedCredits

Wallet
  ├─ userId, balance
  └─ user

CreditLedger (transaction history)
  ├─ id, userId, delta, reason, refId
  └─ user
```

## API Routes

### Projects
- `GET /api/projects` - List user's projects
- `POST /api/projects` - Create project
- `GET /api/projects/:id` - Get project details
- `POST /api/projects/:id/mvp` - Generate MVP

### Tasks
- `POST /api/tasks` - Create task
- `POST /api/tasks/:id/assign` - Assign task
- `POST /api/tasks/:id/cancel` - Cancel task

### Stripe
- `POST /api/stripe/checkout` - Create checkout session
- `POST /api/stripe/webhook` - Handle Stripe events

### GitHub
- `POST /api/github/webhook` - Handle GitHub events

## Development

```bash
# Run dev server
pnpm dev

# Database operations
cd packages/db
npx prisma studio      # Open database GUI
npx prisma db push     # Push schema changes
pnpm seed              # Seed test data

# Stripe CLI (for local webhook testing)
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Next Steps

The foundation is now complete! Here's what to build next:

### Phase 1: UI (High Priority)
- [ ] Dashboard pages (projects list, project detail)
- [ ] Wallet page (balance, buy credits, transaction history)
- [ ] Task management UI (create, assign, cancel)
- [ ] User profile and settings

### Phase 2: Marketing (High Priority)
- [ ] Landing page with hero and features
- [ ] Pricing page
- [ ] "How It Works" page
- [ ] Experts/Executors showcase page

### Phase 3: Admin (Medium Priority)
- [ ] Admin dashboard (users, projects, tasks)
- [ ] Transaction monitoring
- [ ] Pricing configuration UI
- [ ] User role management

### Phase 4: Enhancements (Low Priority)
- [ ] Email notifications (SendGrid/Resend)
- [ ] Real-time notifications (Pusher/Supabase Realtime)
- [ ] File uploads for task attachments
- [ ] Task comments and collaboration
- [ ] Advanced analytics
- [ ] Team workspaces

## License

MIT (inherits from Open Lovable)

## Credits

Built on top of [Open Lovable](https://github.com/firecrawl/open-lovable) by the [Firecrawl](https://firecrawl.dev) team.
