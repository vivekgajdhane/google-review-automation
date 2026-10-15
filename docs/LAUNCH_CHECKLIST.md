# Production Launch Checklist: RCAFT MVP

**Product:** RCAFT MVP  
**Version:** 1.0  
**Verification Target:** Local Pilot Launch (Pune / PCMC)  
**Date:** October 15, 2026  

---

## 1. Google Policy & Legal Compliance Gate
- [ ] **No Review Gating:** Verified that both Google Review and Private Feedback buttons are rendered simultaneously with equal visual prominence on all screen widths.
- [ ] **No Sentiment Routing:** Verified that no customer rating or sentiment classification hides or disables the Google link.
- [ ] **No Incentives:** Verified that no discounts, coupons, cash, or prize draws are offered anywhere in the application.
- [ ] **No Public Staff Prompts:** Verified that public review flow never asks for staff/employee identification.
- [ ] **AI Guardrails (if enabled):** Verified that `ENABLE_AI_REVIEW_ASSIST=false` by default; when enabled, verified that system prompt strictly performs grammar/clarity edits without hallucinating facts or names.
- [ ] **Truthful Metrics:** Verified that dashboard labels external clicks as `Google Review Link Clicks`, never claiming reviews were published.
- [ ] **Privacy Disclosures:** Verified that plain-language DPDP consent disclosure is present on the private feedback form.

---

## 2. Security & Tenant Isolation Gate
- [ ] **PostgreSQL RLS Active:** Verified that Row Level Security is enabled on `profiles`, `businesses`, `business_memberships`, `feedback_submissions`, and `analytics_events`.
- [ ] **Cross-Tenant Test:** Verified with 2 distinct user accounts that User A cannot read or delete User B's business, feedback, or analytics.
- [ ] **Secret Isolation:** Verified that Supabase service-role keys, database passwords, and AI provider API keys are strictly server-side and never present in client bundles.
- [ ] **Environment Validation:** Verified that `src/env.ts` validates all required environment variables at runtime with clear errors.
- [ ] **Input Sanitization:** Verified that slugs are strictly validated against regex `^[a-z0-9]+(-[a-z0-9]+)*$` and Google URLs are restricted to verified HTTPS Google domains.
- [ ] **Rate Limiting:** Verified that public feedback and AI endpoints enforce IP/session rate limits.

---

## 3. UI/UX, Mobile & Accessibility Gate
- [ ] **Mobile Responsive:** Verified that `/r/[slug]` renders cleanly on mobile screen widths (360px, 390px, 412px, 428px).
- [ ] **Performance:** First Contentful Paint (FCP) on mobile 4G is under 1.0s.
- [ ] **Touch Targets:** All interactive buttons and cards have minimum 44px x 44px tap targets.
- [ ] **High Contrast:** All text meets WCAG AA contrast ratio of at least 4.5:1 against backgrounds.
- [ ] **Empty States:** Dashboard has clean, informative empty states when no feedback or events exist yet.
- [ ] **Loading & Error States:** Clear visual feedback for async form submissions and network dropouts.

---

## 4. Operational & Pilot Delivery Gate
- [ ] **Dynamic QR Code:** Verified that generated SVG and PNG download files encode the valid URL `https://[domain]/r/[slug]`.
- [ ] **Camera Test:** Tested scanning the downloaded QR code using iOS and Android native camera apps.
- [ ] **Printable Counter Card:** Verified that printable A6/counter-stand template outputs clean, high-resolution graphics with compliant copy.
- [ ] **Seed / Demo Fixture:** Verified that demo business (e.g. *"The Pune Hair Lounge"*) is clearly labeled as demo data and easily purgeable.
- [ ] **Documentation:** `README.md` enables a developer to clone, install, configure `.env`, and run the project from scratch.
