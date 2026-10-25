import fs from "fs";
import path from "path";
import XLSX from "xlsx";

const EXCEL_PATH = path.join(process.cwd(), "TrueReview_Business_Registry.xlsx");
const OUTPUT_TS_PATH = path.join(process.cwd(), "src", "data", "businesses.ts");

if (!fs.existsSync(EXCEL_PATH)) {
  console.error("❌ Excel file not found at:", EXCEL_PATH);
  process.exit(1);
}

const workbook = XLSX.readFile(EXCEL_PATH);
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const rows = XLSX.utils.sheet_to_json(sheet);

console.log(`📊 Read ${rows.length} rows from Excel sheet: "${sheetName}"`);

const registry = {};

for (const row of rows) {
  const name = String(row["Business Name"] || "").trim();
  const slug = String(row["Slug (URL key)"] || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-");

  if (!name || !slug) continue;

  const status = String(row["Onboarding Status"] || "Active").trim();
  if (status.toLowerCase() === "archived") continue;

  const parseList = (val) => {
    if (!val) return [];
    return String(val)
      .split(/[,;\n]/)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const instagram1 = String(row["Instagram 1 (Handle or URL)"] || "").trim();
  const instagram2 = String(row["Instagram 2 (Handle or URL)"] || "").trim();

  const formatInstaUrl = (handleOrUrl) => {
    if (!handleOrUrl) return undefined;
    if (handleOrUrl.startsWith("http")) return handleOrUrl;
    const clean = handleOrUrl.replace(/^@/, "");
    return `https://www.instagram.com/${clean}/`;
  };

  const formatInstaLabel = (handleOrUrl) => {
    if (!handleOrUrl) return undefined;
    if (handleOrUrl.startsWith("http")) {
      const match = handleOrUrl.match(/instagram\.com\/([^/?#]+)/);
      return match ? `@${match[1]}` : "@instagram";
    }
    return handleOrUrl.startsWith("@") ? handleOrUrl : `@${handleOrUrl}`;
  };

  registry[slug] = {
    id: `${slug}-id`,
    name: name,
    slug: slug,
    tagline: String(row["Tagline"] || "").trim(),
    category: String(row["Category / Niche"] || "Local Business").trim(),
    welcomeMessage: String(row["Welcome Message"] || "Thank you for visiting! Please share your feedback on Google.").trim(),
    logoPath: row["Logo Path or URL"] ? String(row["Logo Path or URL"]).trim() : null,
    primaryColor: String(row["Primary Color"] || "#045d17").trim(),
    accentColor: String(row["Accent Color"] || "#fff3d7").trim(),
    googleReviewUrl: String(row["Google Review Link"] || "").trim(),
    googleMapsUrl: String(row["Google Maps Profile Link"] || row["Google Review Link"] || "").trim(),
    websiteUrl: row["Website URL"] ? String(row["Website URL"]).trim() : undefined,
    instagram1: formatInstaUrl(instagram1),
    instagram1Label: formatInstaLabel(instagram1),
    instagram2: formatInstaUrl(instagram2),
    instagram2Label: formatInstaLabel(instagram2),
    phone: row["Phone Number"] ? String(row["Phone Number"]).trim() : undefined,
    whatsapp: row["WhatsApp (No spaces/symbols)"] ? String(row["WhatsApp (No spaces/symbols)"]).trim() : undefined,
    address: String(row["Physical Address"] || "").trim(),
    rating: parseFloat(row["Google Rating"]) || 5.0,
    reviewCount: parseInt(row["Review Count"], 10) || 10,
    courseOptions: parseList(row["Services / Course Options (Semicolon separated)"]),
    highlightOptions: parseList(row["Review Highlights (Semicolon separated)"]),
  };
}

const fileContent = `import { PublicBusinessData } from "@/types/public-business";

/**
 * =========================================================================
 * CENTRALIZED BUSINESS REGISTRY (AUTO-SYNCED FROM EXCEL)
 * =========================================================================
 * Synced from: TrueReview_Business_Registry.xlsx
 * Last updated: ${new Date().toISOString()}
 * =========================================================================
 */

export const BUSINESSES_REGISTRY: Record<string, PublicBusinessData> = ${JSON.stringify(registry, null, 2)};

export function getRegisteredBusiness(slug: string): PublicBusinessData {
  const normalized = (slug || "").toLowerCase().trim();
  if (BUSINESSES_REGISTRY[normalized]) {
    return BUSINESSES_REGISTRY[normalized];
  }
  // Default fallback is bhikshu-tattoo
  return BUSINESSES_REGISTRY["bhikshu-tattoo"] || Object.values(BUSINESSES_REGISTRY)[0];
}
`;

fs.writeFileSync(OUTPUT_TS_PATH, fileContent, "utf-8");
console.log(`✅ Successfully synced ${Object.keys(registry).length} businesses to: src/data/businesses.ts`);
