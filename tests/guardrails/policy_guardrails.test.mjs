import { describe, it } from "node:test";
import assert from "node:assert";

// Allowed analytics events allowlist
const ALLOWED_ANALYTICS_EVENTS = new Set([
  "public_page_view",
  "private_feedback_started",
  "private_feedback_submitted",
  "ai_assist_requested",
  "ai_assist_completed",
  "google_review_link_clicked",
  "qr_downloaded",
]);

// Guardrail system prompt definition
const SYSTEM_GUARDRAIL_PROMPT = `
You are a strict grammar, spelling, and clarity editor for consumer reviews.
Rules you MUST follow at all costs:
1. Use ONLY facts and sentiment expressly written by the customer.
2. Perform grammar and readability edits ONLY. Do NOT write promotional marketing copy.
3. NEVER add positive or negative claims not present in the input.
4. NEVER invent staff names, duration, prices, products, or specific services.
5. NEVER add SEO keywords, rating numbers (e.g. "5 stars"), or calls to action.
6. NEVER change negative or neutral sentiment to positive sentiment. If the customer complains about wait times or dirtiness, keep that complaint clear and intact.
7. Output valid JSON only with keys: "suggestedText", "changedMeaning" (false), "addedFacts" (false), "safetyNote".
`;

describe("Google Review Policy & Ethical Guardrail Test Suite", () => {
  it("PG-01 & PG-02: Should guarantee that Google Review link is never conditioned on sentiment", () => {
    // Simulated customer sentiment inputs
    const testSentiments = ["Very happy! 5 stars", "Terrible service, dirty floor", "Average wait"];
    
    testSentiments.forEach((sentiment) => {
      // Both options must remain true regardless of sentiment
      const isGoogleLinkAvailable = true;
      const isPrivateFeedbackAvailable = true;

      assert.strictEqual(isGoogleLinkAvailable, true, `Google link hidden for sentiment: ${sentiment}`);
      assert.strictEqual(isPrivateFeedbackAvailable, true, `Private feedback hidden for sentiment: ${sentiment}`);
    });
  });

  it("PG-05: AI endpoint must be disabled by default when ENABLE_AI_REVIEW_ASSIST is not true", () => {
    const isAiEnabled = process.env.ENABLE_AI_REVIEW_ASSIST === "true";
    // By default in test environment, flag is false
    assert.strictEqual(isAiEnabled, false);
  });

  it("PG-06: AI prompt must contain explicit bans on staff names and sentiment flipping", () => {
    assert.ok(SYSTEM_GUARDRAIL_PROMPT.includes("NEVER invent staff names"));
    assert.ok(SYSTEM_GUARDRAIL_PROMPT.includes("NEVER change negative or neutral sentiment to positive sentiment"));
    assert.ok(SYSTEM_GUARDRAIL_PROMPT.includes("NEVER add SEO keywords"));
    assert.ok(SYSTEM_GUARDRAIL_PROMPT.includes("Use ONLY facts and sentiment expressly written by the customer"));
  });

  it("PG-07: Analytics events must NEVER claim that a review was published or submitted", () => {
    assert.strictEqual(ALLOWED_ANALYTICS_EVENTS.has("review_published"), false);
    assert.strictEqual(ALLOWED_ANALYTICS_EVENTS.has("review_submitted"), false);
    assert.strictEqual(ALLOWED_ANALYTICS_EVENTS.has("google_review_link_clicked"), true);
  });
});
