# TrueReview — Ethical QR Customer Feedback & Google Review Link Assistant

[![Policy](https://img.shields.io/badge/Google%20Policy-100%25%20Compliant-brightgreen)](docs/GOOGLE_POLICY_CHECKLIST.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-black)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald)](docs/DB_SCHEMA.md)

**TrueReview** is a modern, ethical, mobile-first SaaS platform designed for local businesses. It provides:
1. **Multi-Business Profile Management** — Authorized owners can create, manage, and switch between multiple business profiles with isolated authorization and Row Level Security (RLS).
2. **Dynamic QR Code Generation** for physical tabletop/counter stands that encode permanent TrueReview URLs (`/r/[slug]`) and never break if Google Place IDs or links change.
3. **Fast Mobile Customer Experience (`/r/[slug]`)** offering two equal, unconditioned choices:
   - **Open Google Review Page** (direct link to the business's official Google Maps dialog).
   - **Send Private Feedback** (direct private communication channel to business management).
4. **100% Google UGC Policy Compliance** — Zero review gating, zero sentiment routing, zero incentives, zero automated fake reviews.
5. **Honest Funnel Analytics** — Tracks scans, private feedback submissions, and Google link clicks without claiming reviews were published.
6. **Configurable Brand Logo Component** — Drop your official logo asset into `public/brand/logo.svg` or `public/brand/logo.png`. TrueReview automatically detects and renders it with a sleek typographic fallback.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `v20+` or `v26+` (tested on `v26.10.0`)
- npm `10+` or `11+` (tested on `11.19.1`)
- A Supabase project (or local development fallback)

### 1. Clone & Install
```bash
git clone <repo-url>
cd "Google Review Automation"
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your configuration:
```env
# App URL (Must be configured with your production domain before generating print QR codes)
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Feature Flags
ENABLE_AI_REVIEW_ASSIST=false

# Optional AI Provider (only required if ENABLE_AI_REVIEW_ASSIST=true)
AI_PROVIDER="gemini" # or "openai"
AI_PROVIDER_API_KEY="your-ai-api-key"
```

> **Note on Local Development Without Supabase Credentials:**  
> TrueReview includes a built-in safe local fallback. If Supabase keys are not yet configured in `.env.local`, the application automatically provides a sample **Demo Salon** profile so you can explore the dashboard, QR stands, and public flow immediately.

---

## 🗄️ Supabase Setup & Migrations

Follow these steps in your Supabase dashboard to link your production or staging database:

1. **Create Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2. **Execute Migration**:
   - In your Supabase dashboard, open the **SQL Editor**.
   - Copy the contents of [`supabase/migrations/20261015000000_init_schema.sql`](file:///Users/vivekgajdhane/Documents/antigravity/Nexcan%20AI/Google%20Review%20Automation/supabase/migrations/20261015000000_init_schema.sql).
   - Paste and click **Run**. This creates:
     - `businesses` table with unique slugs and custom welcome messages.
     - `business_memberships` table for multi-tenant role-based access (`owner`, `manager`).
     - `feedback_submissions` and `analytics_events` tables.
     - PostgreSQL Row Level Security (RLS) policies ensuring business isolation.
3. **Copy API Keys**:
   - Navigate to **Project Settings** → **API**.
   - Copy the **Project URL** into `NEXT_PUBLIC_SUPABASE_URL`.
   - Copy the **anon public** key into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Copy the **service_role secret** key into `SUPABASE_SERVICE_ROLE_KEY` (kept server-only; never exposed to browser).

---

## 🎨 Official Brand Logo Asset

To display your official logo across the application:
1. Place your vector logo at:
   ```
   public/brand/logo.svg
   ```
   *(or PNG format at `public/brand/logo.png`)*
2. The `<Logo />` component (`src/components/ui/logo.tsx`) automatically detects the file and displays it in the header, navigation, and customer landing pages.
3. If no file is present, a clean, professional SVG icon and typographic mark is used as a fallback.

---

## 🧪 Testing & Quality Gates

Run the test suite and quality checks:
```bash
# Run unit & policy compliance tests
npm test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint
npm run lint

# Run Next.js production build
npm run build
```

---

## 🛡️ Ethical Guardrails & Google Review Policy

Google Maps strictly prohibits **review gating** (filtering reviews by sentiment) and **incentivized reviews** ([Policy Reference](https://support.google.com/contributionpolicy/answer/7400114)).

TrueReview is architected to protect partner businesses:
- **No Sentiment Routing:** Dissatisfied and satisfied customers see the exact same options.
- **No Incentives:** No discounts, coupons, or freebies in exchange for reviews.
- **Truthful Analytics:** We record link clicks (`google_review_link_clicked`), never falsely claiming that a review was published.
- **Customer Control:** If AI wording assistance is enabled, it acts only as a clarity tool on customer text without adding fake claims or altering sentiment.
