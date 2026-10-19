import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const feedbackSchema = z.object({
  slug: z.string().min(1),
  message: z.string().min(2, "Message must be at least 2 characters").max(2000),
  customerName: z.string().max(100).optional(),
  customerPhone: z.string().max(20).optional(),
  consentToStore: z.boolean().refine((val) => val === true, {
    message: "Consent to share feedback is required",
  }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = feedbackSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Resolve business by slug
    const { data: business } = await (supabase.from("businesses") as any)
      .select("id, private_feedback_enabled")
      .eq("slug", parsed.data.slug)
      .single();

    // Support demo mode for demo-salon when no database record exists yet
    if (!business && parsed.data.slug === "demo-salon") {
      return NextResponse.json({ success: true, demo: true });
    }

    if (!business || !business.private_feedback_enabled) {
      return NextResponse.json({ error: "Private feedback is not enabled for this business" }, { status: 403 });
    }

    // Insert private feedback
    const { error: insertError } = await (supabase.from("feedback_submissions") as any).insert({
      business_id: business.id,
      message: parsed.data.message,
      customer_name: parsed.data.customerName || null,
      customer_phone: parsed.data.customerPhone || null,
      consent_to_store: parsed.data.consentToStore,
      source: "qr_public_page",
    });

    if (insertError) {
      return NextResponse.json({ error: "Failed to store feedback" }, { status: 500 });
    }

    // Record submission event
    await (supabase.from("analytics_events") as any).insert({
      business_id: business.id,
      event_name: "private_feedback_submitted",
      metadata: {},
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
