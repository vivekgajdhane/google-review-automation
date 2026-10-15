# Master Test Plan & Quality Assurance Strategy: RCAFT

**Testing Philosophy:** Test the real application behavior, security boundaries, and policy guardrails—not just whether code compiles.  
**Frameworks:** Vitest / Jest (Unit & Integration) + Playwright (E2E Smoke) + TypeScript strict check  
**Date:** October 15, 2026  

---

## 1. Test Matrix Overview

| Test Suite | Purpose | Target Coverage | Execution Timing |
| :--- | :--- | :--- | :--- |
| **1. Unit Tests (`/tests/unit/`)** | URL validation, slug sanitization, QR generator, Zod schemas, AI prompt builder. | 95%+ of pure helper functions | Fast feedback on every commit (`npm test`) |
| **2. Policy Guardrail Tests (`/tests/guardrails/`)** | Proves 100% adherence to Google UGC policies: anti-gating, sentiment independence, no staff prompts. | 100% compliance with `GOOGLE_POLICY_CHECKLIST.md` | Mandatory gate before every milestone |
| **3. Integration & RLS Tests (`/tests/integration/`)** | Database queries, multi-tenant isolation, RLS denial with 2 distinct user sessions. | 100% of tenant queries | Milestone 2, Milestone 4, Milestone 6 |
| **4. E2E Browser Smoke Tests (`/tests/e2e/`)** | Full customer mobile journey: QR scan -> `/r/[slug]` -> Google link click & private feedback submission. | Critical user paths | Milestone 3, Milestone 5, Milestone 8 |

---

## 2. Core Functionality Test Cases

### Suite A: Authentication & Business Profile
- `TC-01`: Owner can successfully sign up with valid email and password (minimum 8 characters).
- `TC-02`: Duplicate email signup returns friendly error without exposing user existence.
- `TC-03`: Unauthenticated access to `/dashboard/*` immediately redirects to `/login`.
- `TC-04`: Business slug normalization: `"The Pune Salon!"` converts to `"the-pune-salon"`.
- `TC-05`: Reserved slug rejection: Slugs like `"api"`, `"login"`, `"dashboard"` are rejected.
- `TC-06`: Google URL validation: Accepts legitimate formats (`https://g.page/r/.../review`, `https://search.google.com/local/writereview?placeid=...`, `https://maps.app.goo.gl/...`); rejects invalid domains (`http://evil.com`, `javascript:void(0)`).

### Suite B: Public Experience & Feedback
- `TC-07`: `/r/[slug]` loads for existing business in < 1000ms.
- `TC-08`: `/r/non-existent-slug` renders a clean, friendly 404 page.
- `TC-09`: Clicking "Open Google Review Page" records a `google_review_link_clicked` event and opens target in new tab.
- `TC-10`: Submitting private feedback saves record with correct `business_id` and timestamp.
- `TC-11`: Rate limiting: Submitting > 5 feedback entries in 10 minutes from the same IP returns HTTP 429.

### Suite C: Dynamic QR & Print Generation
- `TC-12`: QR generator returns valid SVG containing exact string `https://[domain]/r/[slug]`.
- `TC-13`: QR PNG download outputs a valid binary image with minimum dimensions of 1024x1024.
- `TC-14`: Scanning the generated QR code string resolves to the correct tenant route.

### Suite D: Multi-Tenant Database & RLS Isolation
- `TC-15`: User A creates Business A. User B creates Business B.
- `TC-16`: User A attempts `SELECT * FROM feedback_submissions WHERE business_id = Business B's ID`. Query returns 0 rows (RLS blocks access).
- `TC-17`: User A attempts `DELETE FROM businesses WHERE id = Business B's ID`. Operation is denied (0 rows affected).

---

## 3. Strict Policy Guardrail Test Cases

- `PG-01 (Anti-Gating)`: Given any visitor state on `/r/[slug]`, the element `id="google-review-btn"` and `id="private-feedback-btn"` are both rendered with identical visibility and CSS hierarchy.
- `PG-02 (Sentiment Independence)`: In the private feedback modal, typing words like *"worst salon ever, ruined my hair"* or selecting a 1-star rating has zero effect on the Google Review button's availability.
- `PG-03 (No Incentives)`: Static code analysis confirms zero references to `coupon`, `discount`, `reward`, `prize`, or `cashback` in customer-facing components.
- `PG-04 (No Staff Solicitation)`: Form schemas for public review flow do not include any field or prompt asking for staff/employee names.
- `PG-05 (AI Clarity Constraint)`:
  - Input: *"Ac not working hair cut good"*
  - Expected Output: *"The haircut was good, but the air conditioning was not working."*
  - Disallowed Output: *"Rahul did an amazing job on my hair! Best salon in Pune, highly recommend 5 stars!"* (Fail if new facts, staff names, or exaggerated praise are introduced).
- `PG-06 (AI Inversion Prevention)`:
  - Input: *"Unsanitary tools and rude behavior."*
  - Expected Output retains negative sentiment; must never flip to *"Great experience with minor issues"*.
- `PG-07 (Analytics Attribution)`:
  - Verify database schema and dashboard UI do not contain `review_published` or `review_submitted`. Outbound clicks must be labelled `google_review_link_clicked`.

---

## 4. Quality Gates for Milestone Acceptance

Before any milestone is declared complete, the following commands must execute cleanly:
1. `npm run lint` — Zero ESLint warnings or errors.
2. `npx tsc --noEmit` — Strict TypeScript validation passes with zero type errors.
3. `npm test` — All unit, integration, and guardrail tests pass.
4. `npm run build` — Production build completes successfully.
5. Manual or automated smoke test verifying the visual rendering and mobile responsive layout.
