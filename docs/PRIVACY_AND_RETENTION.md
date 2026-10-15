# Privacy, Data Protection & Retention Policy: RCAFT

**Regulatory Alignment:** Digital Personal Data Protection (DPDP) Act, 2023 (India)  
**Date:** October 15, 2026  
**Audience:** Platform Developers, Business Owners, and End Customers  

---

## 1. Roles & Responsibilities

- **Platform Operator (RCAFT):** Data Processor for business-level feedback storage; Data Fiduciary for business owner account details.
- **Business Owner (Merchant):** Data Fiduciary for customer feedback collected via their branded public landing page.
- **End Customer (Visitor):** Data Principal who interacts with the public QR page.

---

## 2. Data Minimization Principles

1. **Zero Mandatory Customer Identification:**
   - A customer is **never** required to create an account, log in with Google, or supply personal information to open the Google Review page or view business information.
2. **Voluntary Contact Information Only:**
   - In the private feedback form, providing a name or phone number is strictly optional. Customers may submit anonymous feedback if they prefer.
3. **No IP Logging or Device Fingerprinting:**
   - RCAFT does not store client IP addresses, browser fingerprint hashes, or canvas fingerprints in database logs.
   - Analytics events utilize an ephemeral, random first-party session identifier (`session_id`) stored solely in browser sessionStorage and reset when the tab closes.
4. **No Third-Party Advertising Pixels:**
   - No Meta Pixel, Google Ads remarketing tag, or third-party tracking scripts are embedded in the public `/r/[slug]` experience.

---

## 3. Customer Consent & Plain Language Disclosure

When a customer opens the "Send Private Feedback" form, a clear, plain-language disclosure is presented:

> *"Your feedback will be sent directly to the management of [Business Name] to help them improve their service. If you provide your phone number, the business owner may contact you regarding your feedback. We do not sell or share your information with advertisers."*

A consent toggle/checkbox is enforced before submission:
`[x] I consent to sharing this feedback directly with [Business Name] management.`

---

## 4. Retention & Deletion Schedule

| Data Category | Storage Location | Default Retention Period | Deletion Mechanism |
| :--- | :--- | :--- | :--- |
| **Owner Profile & Credentials** | Supabase Auth + `profiles` table | Active subscription lifetime | Permanent purge upon owner account closure request. |
| **Private Customer Feedback** | `feedback_submissions` table | **90 days** (configurable from 7 to 365 days by owner in Settings) | 1. Automated database cron/trigger deletes rows older than retention setting.<br/>2. Owner can delete individual feedback entries anytime via Dashboard.<br/>3. Cascade delete on business deletion. |
| **Anonymous Analytics Events** | `analytics_events` table | **180 days** | Aggregated into daily counts; raw event rows purged after 180 days to minimize database footprint. |
| **AI Assist Transient Requests** | In-memory / Server runtime | **0 seconds (Transient)** | Prompts and responses are processed in memory and never persisted in database tables by default. |

---

## 5. Right to Erasure & Account Termination

- **Individual Feedback Deletion:** The business owner has a visible, 1-click "Delete Feedback" action in `/dashboard/feedback`. Deletion is hard and permanent (`DELETE FROM feedback_submissions WHERE id = ...`).
- **Complete Business Purge:** In `/dashboard/settings`, the owner can initiate "Delete Business Profile". This executes a cascade delete across `businesses`, `business_memberships`, `feedback_submissions`, and `analytics_events`.
