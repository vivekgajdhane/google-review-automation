"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function deleteFeedbackAction(feedbackId: string) {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  // In production, RLS verifies ownership via businesses.owner_user_id = auth.uid()
  const { error } = await (supabase.from("feedback_submissions") as any)
    .delete()
    .eq("id", feedbackId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/feedback");
  return { success: true };
}
