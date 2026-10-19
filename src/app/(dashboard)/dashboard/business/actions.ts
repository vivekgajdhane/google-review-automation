"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { isValidGoogleReviewUrl, slugify } from "@/lib/utils";

const businessSchema = z.object({
  name: z.string().min(2, "Business name must be at least 2 characters").max(100),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .max(50)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().max(500).optional(),
  welcome_message: z.string().max(500).optional(),
  logo_path: z.string().url().or(z.string().startsWith("/")).optional().nullable(),
  primary_color: z.string().regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color code (e.g. #2563eb)").default("#2563eb"),
  google_review_url: z.string().optional().refine((val) => !val || isValidGoogleReviewUrl(val), {
    message: "Must be a valid, secure Google Review URL (e.g., https://g.page/r/... or https://maps.app.goo.gl/...)",
  }),
});

const RESERVED_SLUGS = new Set([
  "api", "login", "signup", "dashboard", "admin", "settings", "privacy", "terms", "r", "auth", "brand"
]);

import { BusinessItem, DEMO_SALON_BUSINESS } from "@/types/business";
export type { BusinessItem };

/**
 * Lists all businesses accessible to the logged-in user.
 * Combines direct ownership and business_memberships.
 */
export async function getBusinessesForUser(): Promise<BusinessItem[]> {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      // In offline / local development mode when user has not logged in, return demo salon
      return [DEMO_SALON_BUSINESS];
    }

    // 1. Fetch businesses owned by user
    const { data: ownedBusinesses, error: ownedError } = await (supabase.from("businesses") as any)
      .select("*")
      .eq("owner_user_id", user.id);

    // 2. Fetch businesses where user has membership
    const { data: memberships } = await (supabase.from("business_memberships") as any)
      .select("business_id, role")
      .eq("user_id", user.id);

    const membershipBusinessIds = memberships?.map((m: any) => m.business_id) || [];
    let memberBusinesses: any[] = [];

    if (membershipBusinessIds.length > 0) {
      const { data: mb } = await (supabase.from("businesses") as any)
        .select("*")
        .in("id", membershipBusinessIds);
      memberBusinesses = mb || [];
    }

    const combined: BusinessItem[] = [];
    const seenIds = new Set<string>();

    ownedBusinesses?.forEach((b: any) => {
      seenIds.add(b.id);
      combined.push({
        id: b.id,
        name: b.name,
        slug: b.slug,
        description: b.description,
        welcome_message: b.welcome_message || "Thank you for visiting us! We value your feedback.",
        logo_path: b.logo_path,
        primary_color: b.primary_color,
        google_review_url: b.google_review_url,
        role: "owner",
        isOwner: true,
      });
    });

    memberBusinesses?.forEach((b: any) => {
      if (!seenIds.has(b.id)) {
        seenIds.add(b.id);
        const m = memberships?.find((item: any) => item.business_id === b.id);
        combined.push({
          id: b.id,
          name: b.name,
          slug: b.slug,
          description: b.description,
          welcome_message: b.welcome_message,
          logo_path: b.logo_path,
          primary_color: b.primary_color,
          google_review_url: b.google_review_url,
          role: m?.role || "manager",
          isOwner: false,
        });
      }
    });

    // If user has no businesses yet, include the demo business for immediate testing
    if (combined.length === 0) {
      return [DEMO_SALON_BUSINESS];
    }

    return combined;
  } catch {
    return [DEMO_SALON_BUSINESS];
  }
}

/**
 * Creates a new business profile.
 */
export async function createBusinessAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to create a business. Please log in or sign up first." };
  }

  const userId = user.id;

  const rawSlug = formData.get("slug") as string;
  const normalizedSlug = slugify(rawSlug);

  if (RESERVED_SLUGS.has(normalizedSlug)) {
    return { error: `The slug '${normalizedSlug}' is reserved. Please choose another.` };
  }

  const parsed = businessSchema.safeParse({
    name: formData.get("name"),
    slug: normalizedSlug,
    description: formData.get("description") || undefined,
    welcome_message: formData.get("welcome_message") || undefined,
    logo_path: formData.get("logo_path") || null,
    primary_color: formData.get("primary_color") || "#2563eb",
    google_review_url: formData.get("google_review_url") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // Slug collision check
  const { data: existing } = await (supabase.from("businesses") as any)
    .select("id")
    .eq("slug", parsed.data.slug)
    .single();

  if (existing) {
    return { error: `The slug '${parsed.data.slug}' is already taken. Please choose another.` };
  }

  // Insert new business
  const { data: newBiz, error } = await (supabase.from("businesses") as any)
    .insert({
      owner_user_id: userId,
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      welcome_message: parsed.data.welcome_message || "Thank you for visiting us! We value your authentic feedback.",
      logo_path: parsed.data.logo_path || null,
      primary_color: parsed.data.primary_color,
      google_review_url: parsed.data.google_review_url || null,
    })
    .select("id, slug")
    .single();

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/businesses");
  return { success: true, slug: parsed.data.slug, id: newBiz?.id };
}

/**
 * Updates an existing business profile with strict authorization checks.
 */
export async function updateBusinessAction(formData: FormData) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  const userId = user?.id || "00000000-0000-0000-0000-000000000001";
  const businessId = formData.get("businessId") as string;

  if (!businessId) {
    return { error: "Missing business ID" };
  }

  const rawSlug = formData.get("slug") as string;
  const normalizedSlug = slugify(rawSlug);

  if (RESERVED_SLUGS.has(normalizedSlug)) {
    return { error: `The slug '${normalizedSlug}' is reserved. Please choose another.` };
  }

  const parsed = businessSchema.safeParse({
    name: formData.get("name"),
    slug: normalizedSlug,
    description: formData.get("description") || undefined,
    welcome_message: formData.get("welcome_message") || undefined,
    logo_path: formData.get("logo_path") || null,
    primary_color: formData.get("primary_color") || "#2563eb",
    google_review_url: formData.get("google_review_url") || undefined,
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  // Server-side authorization check: verify user owns or is manager
  const { data: targetBiz } = await (supabase.from("businesses") as any)
    .select("id, owner_user_id")
    .eq("id", businessId)
    .single();

  if (targetBiz && targetBiz.owner_user_id !== userId) {
    // Check membership role
    const { data: membership } = await (supabase.from("business_memberships") as any)
      .select("role")
      .eq("business_id", businessId)
      .eq("user_id", userId)
      .single();

    if (!membership || (membership.role !== "owner" && membership.role !== "manager")) {
      return { error: "You are not authorized to edit this business profile." };
    }
  }

  // Check slug uniqueness across other businesses
  const { data: existingSlug } = await (supabase.from("businesses") as any)
    .select("id")
    .eq("slug", parsed.data.slug)
    .neq("id", businessId)
    .single();

  if (existingSlug) {
    return { error: `The slug '${parsed.data.slug}' is already taken by another business.` };
  }

  const { error: updateError } = await (supabase.from("businesses") as any)
    .update({
      name: parsed.data.name,
      slug: parsed.data.slug,
      description: parsed.data.description || null,
      welcome_message: parsed.data.welcome_message || null,
      logo_path: parsed.data.logo_path || null,
      primary_color: parsed.data.primary_color,
      google_review_url: parsed.data.google_review_url || null,
    })
    .eq("id", businessId);

  if (updateError) {
    return { error: updateError.message };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/businesses");
  revalidatePath("/dashboard/business");
  revalidatePath(`/r/${parsed.data.slug}`);
  return { success: true, slug: parsed.data.slug };
}
