import { describe, it } from "node:test";
import assert from "node:assert";

// Simulation of multi-tenant RLS policy check
function simulateRlsPolicy({ authenticatedUserId, rowOwnerId, table, operation, userRole = "manager" }) {
  if (table === "businesses") {
    if (operation === "SELECT_PUBLIC") return true; // Anyone can read active business profile to render QR page
    if (operation === "SELECT_DASHBOARD") return authenticatedUserId === rowOwnerId; // Owner or member can see
    if (operation === "UPDATE") return authenticatedUserId === rowOwnerId || userRole === "manager";
    if (operation === "DELETE") return authenticatedUserId === rowOwnerId; // Only owner can delete
    return false;
  }
  if (table === "feedback_submissions") {
    if (operation === "INSERT") return true; // Any customer can submit feedback
    return authenticatedUserId === rowOwnerId; // Only business owner/authorized member can SELECT or DELETE
  }
  return false;
}

const RESERVED_SLUGS = new Set([
  "api", "login", "signup", "dashboard", "admin", "settings", "privacy", "terms", "r", "auth", "brand"
]);

function isSlugAllowed(slug, existingSlugs = new Set()) {
  if (!slug || slug.length < 3 || slug.length > 50) return false;
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return false;
  if (RESERVED_SLUGS.has(slug)) return false;
  if (existingSlugs.has(slug)) return false;
  return true;
}

function resolveCanonicalUrl(slug, configuredOrigin) {
  let origin = "https://truereview.in";
  let isLocalhost = false;

  if (configuredOrigin) {
    if (configuredOrigin.includes("localhost") || configuredOrigin.includes("127.0.0.1")) {
      isLocalhost = true;
      origin = configuredOrigin;
    } else {
      origin = configuredOrigin;
    }
  }

  origin = origin.replace(/\/+$/, "");
  return { url: `${origin}/r/${slug}`, isLocalhost };
}

describe("TrueReview Multi-Business & Tenant Security Tests", () => {
  it("should permit owner to update their own business profile", () => {
    const isAllowed = simulateRlsPolicy({
      authenticatedUserId: "user-owner-123",
      rowOwnerId: "user-owner-123",
      table: "businesses",
      operation: "UPDATE"
    });
    assert.strictEqual(isAllowed, true);
  });

  it("should DENY competitor from modifying another owner's business profile", () => {
    const isAllowed = simulateRlsPolicy({
      authenticatedUserId: "user-competitor-456",
      rowOwnerId: "user-owner-123",
      table: "businesses",
      operation: "UPDATE",
      userRole: "none"
    });
    assert.strictEqual(isAllowed, false);
  });

  it("should DENY competitor from reading private feedback belonging to another business", () => {
    const isAllowed = simulateRlsPolicy({
      authenticatedUserId: "user-competitor-456",
      rowOwnerId: "user-owner-123",
      table: "feedback_submissions",
      operation: "SELECT"
    });
    assert.strictEqual(isAllowed, false);
  });

  it("should permit the verified business owner to view their private feedback", () => {
    const isAllowed = simulateRlsPolicy({
      authenticatedUserId: "user-owner-123",
      rowOwnerId: "user-owner-123",
      table: "feedback_submissions",
      operation: "SELECT"
    });
    assert.strictEqual(isAllowed, true);
  });

  it("should reject reserved system slugs to protect application routes", () => {
    assert.strictEqual(isSlugAllowed("api"), false);
    assert.strictEqual(isSlugAllowed("dashboard"), false);
    assert.strictEqual(isSlugAllowed("login"), false);
    assert.strictEqual(isSlugAllowed("admin"), false);
    assert.strictEqual(isSlugAllowed("brand"), false);
    assert.strictEqual(isSlugAllowed("r"), false);
  });

  it("should reject duplicate slugs to prevent URL collisions across businesses", () => {
    const existingSlugs = new Set(["the-pune-hair-lounge", "aundh-car-spa"]);
    assert.strictEqual(isSlugAllowed("the-pune-hair-lounge", existingSlugs), false);
    assert.strictEqual(isSlugAllowed("new-kothrud-cafe", existingSlugs), true);
  });

  it("should construct canonical production URL from configured origin", () => {
    const prod = resolveCanonicalUrl("demo-salon", "https://truereview.in");
    assert.strictEqual(prod.url, "https://truereview.in/r/demo-salon");
    assert.strictEqual(prod.isLocalhost, false);

    const local = resolveCanonicalUrl("demo-salon", "http://localhost:3000");
    assert.strictEqual(local.url, "http://localhost:3000/r/demo-salon");
    assert.strictEqual(local.isLocalhost, true);
  });
});
