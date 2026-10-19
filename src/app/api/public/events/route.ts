import { NextResponse } from "next/server";
import { z } from "zod";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const eventSchema = z.object({
  slug: z.string().min(1),
  eventName: z.enum([
    "public_page_view",
    "private_feedback_started",
    "private_feedback_submitted",
    "ai_assist_requested",
    "ai_assist_completed",
    "google_review_link_clicked",
    "qr_downloaded",
  ]),
  anonymousSessionId: z.string().max(64).optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = eventSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const supabase = await createServerSupabaseClient();

    // Resolve business by slug
    const { data: business } = await (supabase.from("businesses") as any)
      .select("id")
      .eq("slug", parsed.data.slug)
      .single();

    if (business) {
      await (supabase.from("analytics_events") as any).insert({
        business_id: business.id,
        event_name: parsed.data.eventName,
        anonymous_session_id: parsed.data.anonymousSessionId || null,
        metadata: {},
      });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to record event" }, { status: 500 });
  }
}
