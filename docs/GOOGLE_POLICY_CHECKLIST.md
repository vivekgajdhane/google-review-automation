# Google Review Policy & Ethical Guardrails Checklist: RCAFT

**Governing Policy:** Google Maps User Generated Content Policy — Prohibited & Restricted Content  
**Official Source:** `https://support.google.com/contributionpolicy/answer/7400114`  
**Last Verified:** October 15, 2026  
**Auditor:** Antigravity IDE Autonomous Product & QA Lead  

---

## 1. Compliance Principles & Requirements

| Policy Rule | Google Official Policy Text | RCAFT Product Implementation | Verification / Test Type | Status |
| :--- | :--- | :--- | :--- | :--- |
| **1. No Review Gating** | *"We do not allow merchants to: Discourage or prohibit negative reviews, or selectively solicit positive reviews from customers."* | Both **"Open Google Review Page"** and **"Send Private Feedback"** buttons are displayed side-by-side with equal prominence on the public page (`/r/[slug]`). No star rating prompt precedes this choice. | Automated E2E Test & UI Snapshot | **MANDATORY PASS** |
| **2. No Sentiment-Based Routing** | Prohibits routing happy customers to public reviews and unhappy customers exclusively to private forms. | No customer rating or sentiment classification is used to hide, alter, delay, or disable the Google review button. | Unit Test & E2E Route Test | **MANDATORY PASS** |
| **3. No Incentives or Compensation** | *"Offer incentives – such as payment, discounts, free goods and/or services - in exchange for posting any review or revision or removal of a negative review."* | Zero coupon codes, discounts, raffle tickets, cashback, or rewards in any part of the customer or business flow. | Code Review & AST Search for coupon/reward logic | **MANDATORY PASS** |
| **4. No Coercion or On-Premises Pressure** | *"merchants should not require or pressure users to leave ratings or write reviews while on the premises"* | Public interface has no countdown timers, no modal locks, no forced completion steps, and a clear "Skip / Close" action at all stages. | UI Usability & Accessibility Audit | **MANDATORY PASS** |
| **5. No Content Steering or Leading Questions** | *"nor should they request that specific content be included."* | No leading prompts like *"Mention our hair spa service"* or *"Tell Google how amazing our salon is"*. Only neutral prompt: *"Write anything you would like to say about your experience."* | Copy & Prompt Audit | **MANDATORY PASS** |
| **6. No Staff Solicitation in Public Reviews** | *"Merchants requesting that staff solicit reviews that include specific content, including content that identifies a staff member."* | The public review journey does not prompt or suggest staff names. Optional staff tagging is restricted solely to private internal operational feedback if configured. | AI Prompt & Form Schema Tests | **MANDATORY PASS** |
| **7. Customer-Controlled AI Clarity Aid** | Prohibits automated, misleading, or deceptive engagement; reviews must reflect genuine first-hand user experience. | AI feature is **OFF by default** (`ENABLE_AI_REVIEW_ASSIST=false`). When enabled, it strictly acts as a grammar/clarity editor on customer-typed input. Never invents facts, names, ratings, or changes sentiment. Customer must review and copy manually. | Server-side Guardrail Tests & JSON Schema Validation | **MANDATORY PASS** |
| **8. No Fake Posting or Impersonation** | Prohibits posting content from automated scripts, emulators, or without direct user action. | RCAFT never automates Google authentication, does not simulate clicks on Google, and does not post reviews via API. Customer opens official Google link and posts personally. | Architecture Review | **MANDATORY PASS** |
| **9. Truthful Analytics Attribution** | Prohibits misleading metrics or reporting unverified claims. | Analytics events explicitly record `google_review_link_clicked`. UI documentation clarifies: *"Counts clicks to the external link. Does not confirm a review was published."* | Database Schema & UI Text Audit | **MANDATORY PASS** |
| **10. Official URL Integrity** | Prohibits deceptive redirection or unauthorized URL rewriting. | Business owner manually inputs and verifies their official Google URL (`https://g.page/...`, `https://search.google.com/local/writereview...`, `https://maps.app.goo.gl/...`). RCAFT validates HTTPS and legitimate domains. | URL Validator Unit Tests | **MANDATORY PASS** |

---

## 2. Automated Testable Acceptance Criteria

These criteria are enforced as automated test suites in `docs/TEST_PLAN.md` and test scripts:

1. **`test_google_button_always_visible`**:
   - Given any customer visitor on `/r/[slug]`, the element `id="google-review-btn"` must be visible, enabled, and clickable immediately on page render.
2. **`test_sentiment_independence`**:
   - In any form or feedback input, selecting negative ratings or entering phrases like *"Horrible service"* must not hide or disable the Google Review button.
3. **`test_ai_assist_no_fact_injection`**:
   - When AI wording assist is tested with a prompt like *"Coffee cold, waited 30 mins"*, the output `suggestedText` must not add positive praise (e.g. *"Great atmosphere!"*), must not add staff names (e.g. *"Rahul was great"*), and must retain the negative sentiment.
4. **`test_ai_assist_feature_flag_disabled`**:
   - When `ENABLE_AI_REVIEW_ASSIST=false`, the API route `/api/public/ai-assist` returns HTTP 404/403, and the public UI renders without any AI prompt.
5. **`test_analytics_event_naming`**:
   - Verify that no analytics event is named `review_submitted` or `review_published`. All click events are strictly recorded as `google_review_link_clicked`.

---

## 3. Items Requiring Founder / Human Review Before Onboarding Customers

1. **Physical Counter Signage Copy:** Ensure printed QR stands say: *"Scan to open our Google review page or share private feedback with us"* and do NOT say *"Scan to win a discount"* or *"Review your stylist for a reward"*.
2. **Business Owner Education:** Inform business owners during onboarding that Google actively suspends profiles found using review-gating tools or offering incentives.
3. **AI Provider Terms of Service Check:** Ensure the chosen LLM provider (Google Gemini API / OpenAI API) allows text transformation without user profiling.
