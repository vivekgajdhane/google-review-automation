import { createServerSupabaseClient } from "@/lib/supabase/server";
import { PublicBusinessData, PHOENIX_TECH_BUSINESS } from "@/types/public-business";
import { getRegisteredBusiness } from "@/data/businesses";

export type { PublicBusinessData };
export { PHOENIX_TECH_BUSINESS };

/**
 * Fetches public fields for a business profile by slug.
 * Checks Supabase database first; falls back to the instantaneous central registry.
 */
export async function getPublicBusinessBySlug(slug: string): Promise<PublicBusinessData | null> {
  const normalizedSlug = (slug || "").toLowerCase().trim();

  try {
    const supabase = await createServerSupabaseClient();
    const { data } = await (supabase.from("businesses") as any)
      .select("id, name, slug, welcome_message, logo_path, primary_color, google_review_url")
      .eq("slug", normalizedSlug)
      .single();

    if (data) {
      const fallback = getRegisteredBusiness(normalizedSlug);
      return {
        ...fallback,
        id: data.id,
        name: data.name,
        slug: data.slug,
        welcomeMessage: data.welcome_message || fallback.welcomeMessage,
        logoPath: data.logo_path || fallback.logoPath,
        primaryColor: "#045d17", // Fixed palette
        googleReviewUrl: data.google_review_url || fallback.googleReviewUrl,
      };
    }
  } catch {
    // Supabase query error fallback
  }

  // Instant fallback to centralized registry
  return getRegisteredBusiness(normalizedSlug);
}
