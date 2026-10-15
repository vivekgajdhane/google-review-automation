# RCAFT — Ethical QR Customer Feedback & Google Review Link Assistant

[![Policy](https://img.shields.io/badge/Google%20Policy-100%25%20Compliant-brightgreen)](docs/GOOGLE_POLICY_CHECKLIST.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue)](tsconfig.json)
[![Next.js](https://img.shields.io/badge/Next.js-15%20App%20Router-black)](https://nextjs.org)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-emerald)](docs/DB_SCHEMA.md)

**RCAFT** is a modern, ethical, mobile-first SaaS platform designed for local brick-and-mortar businesses in Pune, Pimpri-Chinchwad, and Western Maharashtra. It provides:
1. **Dynamic QR Code Generation** for physical tabletop/counter stands that never break if links change.
2. **Fast Mobile Customer Flow (`/r/[slug]`)** offering two equal, unconditioned choices:
   - **Open Google Review Page** (direct link to official Google Maps listing).
   - **Send Private Feedback** (direct private communication channel to management).
3. **100% Google UGC Policy Compliance** — Zero review gating, zero sentiment routing, zero incentives, zero automated fake reviews.
4. **Honest Funnel Analytics** — Tracks scans, private feedback submissions, and Google link clicks without claiming reviews were published.
5. **Optional AI Wording Clarity Aid (Feature-Flagged)** — Strictly constrained server-side clarity assistant based only on customer-supplied words.

---

## 🚀 Quickstart & Local Setup

### Prerequisites
- Node.js `v20+` or `v26+` (tested on `v26.10.0`)
- npm `10+` or `11+` (tested on `11.19.1`)
- A Supabase project (or local Supabase CLI instance)

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
# App URL
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

### 3. Apply Database Migrations
Run the SQL migration script located in `supabase/migrations/20261015000000_init_schema.sql` inside your Supabase SQL Editor.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📚 Complete Project Documentation

All design specs, policies, and research are maintained under `/docs`:
- [Product Brief](docs/PRODUCT_BRIEF.md) — Problem statement, target personas, non-goals.
- [Market & Competitor Research](docs/RESEARCH.md) — Links, pricing benchmarks, niche scoring matrix.
- [Google Policy & Guardrails](docs/GOOGLE_POLICY_CHECKLIST.md) — 100% compliance rules and testable criteria.
- [Product Requirements Document (PRD)](docs/PRD.md) — User stories and functional acceptance criteria.
- [MVP Roadmap](docs/MVP_ROADMAP.md) — Milestone breakdown (M1 to M8) and exclusions.
- [Customer Validation Plan](docs/VALIDATION_PLAN.md) — Pune business owner interview script and go/no-go triggers.
- [Architecture & Tech Spec](docs/ARCHITECTURE.md) — App Router layout, component hierarchy, external APIs.
- [Database Schema & RLS](docs/DB_SCHEMA.md) — PostgreSQL DDL and Row Level Security policies.
- [Threat Model](docs/THREAT_MODEL.md) — STRIDE security analysis and prompt injection defenses.
- [Privacy & Retention Policy](docs/PRIVACY_AND_RETENTION.md) — DPDP Act compliance and data minimization.
- [Master Test Plan](docs/TEST_PLAN.md) — Test matrix, guardrail assertions, and quality gates.
- [Sales & Pilot Plan](docs/SALES_AND_PILOT_PLAN.md) — 5-minute demo script, objection handling, pilot offer.
- [Launch Checklist](docs/LAUNCH_CHECKLIST.md) — Pre-launch verification gates.
- [Assumptions & Decision Log](docs/ASSUMPTIONS_AND_DECISIONS.md) — Architectural decision records (ADRs).

---

## 🛡️ Ethical Guardrails & Google Review Policy

Google Maps strictly prohibits **review gating** (filtering reviews by sentiment) and **incentivized reviews** ([Policy Reference](https://support.google.com/contributionpolicy/answer/7400114)).

RCAFT is architected to protect our partner businesses:
- **No Sentiment Routing:** Dissatisfied and satisfied customers see the exact same options.
- **No Incentives:** No discounts, coupons, or freebies in exchange for reviews.
- **Truthful Analytics:** We record link clicks (`google_review_link_clicked`), never falsely claiming that a review was published.
- **Customer Control:** If AI wording assistance is enabled, it acts only as a clarity tool on customer text without adding fake claims or altering sentiment.
