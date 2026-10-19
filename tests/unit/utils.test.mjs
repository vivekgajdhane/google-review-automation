import { describe, it } from "node:test";
import assert from "node:assert";

// Test suite for URL validation and slug helpers
function isValidGoogleReviewUrl(urlStr) {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== "https:") return false;
    const hostname = parsed.hostname.toLowerCase();
    
    return (
      hostname === "g.page" ||
      hostname.endsWith(".google.com") ||
      hostname === "google.com" ||
      hostname === "maps.app.goo.gl" ||
      hostname === "goo.gl"
    );
  } catch {
    return false;
  }
}

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

describe("Utility Unit Tests: URL Validation & Slugify", () => {
  it("should validate legitimate Google review URLs", () => {
    assert.strictEqual(isValidGoogleReviewUrl("https://g.page/r/CUx81923/review"), true);
    assert.strictEqual(isValidGoogleReviewUrl("https://search.google.com/local/writereview?placeid=ChIJ9_1"), true);
    assert.strictEqual(isValidGoogleReviewUrl("https://maps.app.goo.gl/AbCd123"), true);
  });

  it("should reject malicious, non-HTTPS, or deceptive review URLs", () => {
    assert.strictEqual(isValidGoogleReviewUrl("http://g.page/r/CUx81923/review"), false);
    assert.strictEqual(isValidGoogleReviewUrl("https://phishing-site.com/google"), false);
    assert.strictEqual(isValidGoogleReviewUrl("https://fakegoogle.com/review"), false);
    assert.strictEqual(isValidGoogleReviewUrl("javascript:alert(1)"), false);
    assert.strictEqual(isValidGoogleReviewUrl("not-a-valid-url"), false);
  });

  it("should normalize business names into URL-safe slugs", () => {
    assert.strictEqual(slugify("The Pune Hair Lounge!"), "the-pune-hair-lounge");
    assert.strictEqual(slugify("  Aundh Detailing & Spa -- "), "aundh-detailing-spa");
    assert.strictEqual(slugify("Wakad_Crossfit_2026"), "wakad-crossfit-2026");
  });
});
