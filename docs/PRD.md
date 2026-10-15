# Product Requirements Document (PRD): RCAFT

**Version:** 1.0 (MVP)  
**Date:** October 15, 2026  
**Status:** Approved for Stage A Validation  
**Product Category:** QR Customer Feedback & Google Review Link Assistant  

---

## 1. Problem & Objectives

### Problem Statement
Local businesses in Pune/PCMC struggle with two distinct feedback dilemmas:
1. High friction for satisfied customers to find and open the official Google Review page.
2. Zero discreet, on-the-spot private communication channel for customers experiencing operational glitches, leading to public 1-star reviews.
Existing software options either violate Google's fake engagement policies via illegal review gating, or are expensive enterprise US platforms (Birdeye, Podium) costing ₹30,000+/month.

### Primary Objectives (MVP)
- Enable a business owner to set up a branded, dynamic QR page in under 3 minutes.
- Provide customers with an immediate, mobile-first choice: open official Google review page OR submit direct private feedback.
- Guarantee 100% adherence to Google Maps UGC policies.
- Provide clean, transparent funnel analytics with zero misleading metrics.

---

## 2. User Personas

### Persona 1: Vikram — Salon Owner (Baner, Pune)
- **Profile:** Owns an independent hair and beauty salon with 6 styling chairs and 4 staff.
- **Pain Point:** Has 120 reviews (4.4 stars), but knows they serve 30+ clients a day who leave without reviewing. Occasionally gets a public 1-star review for air conditioning or wait times that could have been resolved privately.
- **Goal:** Place an elegant QR card at the reception counter, see daily scan stats, and receive private complaints before clients leave angry.

### Persona 2: Ananya — Salon Client (Pune Resident)
- **Profile:** Working professional getting a haircut.
- **Pain Point:** Wants to support the salon or report that the water was lukewarm, but doesn't want to download an app, create an account, or search Google Maps manually.
- **Goal:** Scan QR with phone camera, tap once to open Google Maps or write a quick 1-sentence note to the owner, and be done in 20 seconds.

### Persona 3: Platform Admin (RCAFT Founder)
- **Profile:** Student founder managing platform stability, tenant health, and system security.
- **Goal:** Monitor platform-level performance without violating tenant isolation or inspecting sensitive private feedback.

---

## 3. User Stories & Acceptance Criteria

### Epics Overview:
- **Epic 1: Authentication & Tenant Setup**
- **Epic 2: Business Profile & Google URL Management**
- **Epic 3: Public Mobile Experience (`/r/[slug]`)**
- **Epic 4: Private Feedback Flow**
- **Epic 5: Dynamic QR Code Generator & Print Tool**
- **Epic 6: Honest Funnel Analytics Dashboard**
- **Epic 7: Optional AI Wording Clarity Aid (Feature-Flagged)**

---

### Epic 1: Authentication & Tenant Setup
- **US1.1:** As an owner, I want to sign up with my email and password so I can access my business workspace.
  - *Acceptance Criteria:* Secure password hashing, email validation, session cookies, password reset link support, authenticated route protection.
- **US1.2:** As an owner, I want to manage my account details and log out securely.
  - *Acceptance Criteria:* Immediate session invalidation on logout; unauthorized access to `/dashboard` redirects to `/login`.

---

### Epic 2: Business Profile & Google Review URL Configuration
- **US2.1:** As an owner, I want to create a business profile with name, unique slug, and primary brand color.
  - *Acceptance Criteria:* Slug normalized to lowercase alphanumeric and hyphens; reserved slugs (`api`, `login`, `dashboard`, `admin`, `settings`) rejected with clear validation message; unique constraint enforced.
- **US2.2:** As an owner, I want to input and validate my official Google Review link.
  - *Acceptance Criteria:* Input validated against legitimate Google domains (`https://g.page/...`, `https://search.google.com/...`, `https://maps.app.goo.gl/...`, `https://goo.gl/...`); clear test preview button to verify the link opens the owner's Google place page in a new window.

---

### Epic 3: Public Mobile Experience (`/r/[slug]`)
- **US3.1:** As a customer, I want to scan a QR code and land on a fast, mobile-optimized page with the business name and logo.
  - *Acceptance Criteria:* Page renders under 800ms on 4G mobile connections; no customer login or personal details requested upfront.
- **US3.2:** As a customer, I want to see two equal, clear options: "Open Google Review Page" and "Send Private Feedback".
  - *Acceptance Criteria:* Both buttons rendered with identical visual weight; no rating stars or sentiment screening shown prior to this choice; accessible keyboard and screen-reader labels.
- **US3.3:** As a customer, when I click "Open Google Review Page", I want to navigate to the official Google page.
  - *Acceptance Criteria:* Target opens safely (`rel="noopener noreferrer"`); server/API registers a `google_review_link_clicked` analytics event without blocking customer navigation.

---

### Epic 4: Private Feedback Flow
- **US4.1:** As a customer, when I click "Send Private Feedback", I want a simple, respectful form to voice my thoughts.
  - *Acceptance Criteria:* Optional neutral fields (Message textarea, optional rating or category, optional customer contact name/phone if they wish to be contacted); clear consent checkbox: *"I consent to sharing this feedback directly with business management"*; clear "Cancel / Back" button.
- **US4.2:** As an owner, I want to view submitted private feedback in my dashboard.
  - *Acceptance Criteria:* Chronological feedback list with timestamps; ability to delete individual feedback items; tenant-isolated so only the verified business owner can read their feedback.

---

### Epic 5: Dynamic QR Code Generator & Print Kit
- **US5.1:** As an owner, I want to preview and download my QR code in SVG and PNG formats.
  - *Acceptance Criteria:* High-resolution SVG for professional printing; high-res 1024x1024 PNG for digital use; encodes the exact URL `https://[domain]/r/[slug]`.
- **US5.2:** As an owner, I want a printable counter stand template with clear, policy-compliant instructions.
  - *Acceptance Criteria:* Print-friendly layout (A6 / 4x6 inch counter card) containing the QR code and neutral copy: *"Scan to open our Google review page or share private feedback"*; no mention of incentives or staff quotas.

---

### Epic 6: Honest Funnel Analytics Dashboard
- **US6.1:** As an owner, I want to see truthful analytics about how customers interact with my QR page.
  - *Acceptance Criteria:* Metrics tracked:
    1. Public Page Visits (`public_page_view`)
    2. Private Feedback Started (`private_feedback_started`)
    3. Private Feedback Submitted (`private_feedback_submitted`)
    4. Google Review Link Clicks (`google_review_link_clicked`)
    5. QR Code Downloads (`qr_downloaded`)
- **US6.2:** As an owner, I want clear metric definitions so I don't confuse clicks with published reviews.
  - *Acceptance Criteria:* Prominent info tooltip: *"Google Review Link Clicks counts customers who opened the link. Google does not share whether a review was published."*

---

### Epic 7: Optional AI Wording Clarity Aid (Feature-Flagged)
- **US7.1:** As a customer, if AI assist is enabled, I want optional help refining my own words for clarity before copying to Google.
  - *Acceptance Criteria:*
    - Gated behind `ENABLE_AI_REVIEW_ASSIST=false`.
    - Customer must voluntarily click *"Help me refine my wording"*.
    - Prompt asks only for customer's own thoughts: *"Write anything you would like to say about your experience."*
    - Server calls LLM with strict guardrail prompt: grammar/clarity only, no hallucinated facts, no staff names, preserve negative sentiment.
    - Output presented in editable textarea with "Copy Text", "Try Again", and "Discard" buttons.
    - Never auto-submits, never auto-copies, never auto-opens Google.

---

## 4. Non-Functional Requirements

1. **Performance:** Mobile landing page First Contentful Paint (FCP) < 1.0s; Lighthouse mobile performance score ≥ 90.
2. **Security & Privacy:**
   - PostgreSQL Row Level Security (RLS) on all tenant tables.
   - Zero customer tracking cookies or cross-site fingerprinting.
   - Server-side environment variables for all secrets (no browser leaks).
3. **Accessibility:** WCAG 2.1 AA compliance (contrast ratios ≥ 4.5:1, keyboard focusable, descriptive ARIA attributes).
4. **Data Retention:** Configurable feedback retention (default 90 days); one-click feedback purge for business owners.
