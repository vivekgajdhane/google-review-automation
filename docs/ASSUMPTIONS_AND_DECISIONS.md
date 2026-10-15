# Architecture & Product Decision Log: RCAFT

**Log Maintained By:** Antigravity Senior Product & Engineering Architect  
**Initial Baseline Date:** October 15, 2026  

---

## Decision Records (ADR Format)

### ADR-001: Framework & Runtime Environment
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** Use **Next.js 15 (App Router)** with **TypeScript** and **Tailwind CSS**.
- **Context:** Need a high-performance, mobile-first web application that supports fast server-side rendering for `/r/[slug]` public landing pages, edge routing, server actions for secure API operations, and client interactivity for dashboards.
- **Alternatives Considered:**
  - *Vite + React SPA + Express:* Requires maintaining two separate deployments (frontend + backend API); slower initial load for mobile QR visitors without SSR.
  - *Remix / React Router 7:* Viable, but Next.js ecosystem provides superior Supabase SSR helper integration and Vercel edge deployment options in India (Mumbai region).
- **Consequences:** Single full-stack repository, strict server-action boundaries, and zero-leak environment secret management.

---

### ADR-002: Multi-Tenant Database & Authorization Strategy
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** Use **Supabase PostgreSQL** with **Row Level Security (RLS)** as the primary security barrier.
- **Context:** Tenant data isolation must be enforced at the database layer to guarantee that business owners can never inspect another tenant's private feedback or analytics.
- **Alternatives Considered:**
  - *Application-level tenant checks only (e.g. `WHERE business_id = ...` in code):* Vulnerable to coding bugs, IDOR vulnerabilities, or missed query parameters.
  - *Separate database per tenant:* Extremely costly and operationally complex for small businesses paying ₹499/month.
- **Consequences:** Every tenant-owned table (`businesses`, `feedback_submissions`, `analytics_events`) contains `business_id` and has explicit PostgreSQL RLS policies enabled.

---

### ADR-003: Absolute Anti-Gating & Ethical Google Policy Implementation
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** The public page `/r/[slug]` will display **both "Open Google Review Page" and "Send Private Feedback" concurrently with identical visual priority**, without any star-rating pre-screening or sentiment gating.
- **Context:** Competitor tools in India promote "Negative Review Shields" (routing 1–3 stars to email and 4–5 stars to Google), which directly violates Google's Maps UGC Policy (section 7400114). Google actively suspends listings and issues Consumer Warning alerts to businesses caught using such mechanisms.
- **Alternatives Considered:**
  - *Show star rating first, then show Google review button for all ratings anyway:* User research shows customers perceive star ratings as a gate even if not enforced; causes mistrust. Equal button presentation is completely transparent.
- **Consequences:** 100% compliant with Google policies, completely de-risking our partner merchants from listing bans.

---

### ADR-004: AI Wording Assistance Isolation & Feature Flag
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** Isolate the AI writing aid behind a feature flag (`ENABLE_AI_REVIEW_ASSIST=false`, default OFF). Implement an abstract provider interface (`IAIAssistProvider`) with strict server-side schema validation (Gemini 2.5/Flash or OpenAI).
- **Context:** AI review drafting is legally and ethically sensitive under Google policies. The AI must never invent experiences, add staff names, or flip negative sentiment to positive.
- **Alternatives Considered:**
  - *Bundle AI directly into the main public review flow:* High risk of policy non-compliance and expensive API token costs for an unvalidated feature.
- **Consequences:** The core product operates perfectly without AI. If turned on, it functions solely as an optional, customer-controlled grammar/clarity editor on the customer's freely supplied words.

---

### ADR-005: Deferred Subscription Billing (No Razorpay in MVP)
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** Defer automated Razorpay/Stripe billing from the initial MVP codebase. Manage pilot payments via direct UPI / bank transfer with manual invoicing.
- **Context:** Integrating payment webhooks, subscription lifecycle events, and merchant KYC before validating product-market fit introduces unnecessary architectural complexity and delay.
- **Alternatives Considered:**
  - *Build full Razorpay Subscriptions into MVP:* Requires business registration, merchant account approval, webhook infrastructure, and test environments before a single customer interview is completed.
- **Consequences:** Launch speed is maximized; initial 10–15 pilot businesses will be billed manually upon installation of their physical counter stand.

---

### ADR-006: Canonical QR Destination URL
- **Date:** 2026-10-15
- **Status:** **APPROVED**
- **Decision:** Dynamic QR codes encode the permanent canonical public URL `https://[domain]/r/[slug]`.
- **Context:** If a business changes their Google Business Profile URL or relocates, the physical QR printed on an acrylic stand remains valid because the destination slug redirects via server-side logic.
- **Alternatives Considered:**
  - *Encode Google URL directly into the QR code:* If Google changes the place ID or URL format, every physical counter stand in Pune becomes useless plastic garbage.
- **Consequences:** Business owners can update their Google Review URL anytime in `/dashboard/business` without touching their physical counter displays.
