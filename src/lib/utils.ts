import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates whether a given URL is a safe, legitimate Google Review URL.
 */
export function isValidGoogleReviewUrl(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== "https:") return false;
    const hostname = parsed.hostname.toLowerCase();
    
    // Allowed legitimate Google review / maps domains
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

/**
 * Normalizes a business name into an SEO-safe slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
