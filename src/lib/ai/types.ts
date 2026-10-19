import { z } from "zod";

export const AIAssistInputSchema = z.object({
  userText: z.string().min(5, "Input must be at least 5 characters").max(500, "Input must not exceed 500 characters"),
});

export type AIAssistInput = z.infer<typeof AIAssistInputSchema>;

export const AIAssistOutputSchema = z.object({
  suggestedText: z.string(),
  changedMeaning: z.boolean().default(false),
  addedFacts: z.boolean().default(false),
  safetyNote: z.string().default("Grammar & clarity edit only. Verify before copying."),
});

export type AIAssistOutput = z.infer<typeof AIAssistOutputSchema>;

export interface IAIAssistProvider {
  refineWording(input: AIAssistInput): Promise<AIAssistOutput>;
}
