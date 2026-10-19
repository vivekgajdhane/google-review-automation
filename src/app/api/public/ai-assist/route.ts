import { NextResponse } from "next/server";
import { AIAssistInputSchema } from "@/lib/ai/types";
import { ConstrainedAIProvider } from "@/lib/ai/provider";

export async function POST(request: Request) {
  // Feature flag gate (Google Review Policy Safeguard)
  const isEnabled = process.env.ENABLE_AI_REVIEW_ASSIST === "true";

  if (!isEnabled) {
    return NextResponse.json(
      {
        error: "AI Review Assistance is currently disabled by policy.",
        policyNotice: "Google Maps User Contributed Content policies require reviews to reflect genuine first-hand experiences.",
      },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const parsed = AIAssistInputSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const provider = new ConstrainedAIProvider(
      (process.env.AI_PROVIDER as any) || "gemini",
      process.env.AI_PROVIDER_API_KEY
    );

    const result = await provider.refineWording(parsed.data);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to process text" }, { status: 500 });
  }
}
