import { AIAssistInput, AIAssistOutput, AIAssistOutputSchema, IAIAssistProvider } from "./types";

export const SYSTEM_GUARDRAIL_PROMPT = `
You are a strict grammar, spelling, and clarity editor for consumer reviews.
Rules you MUST follow at all costs:
1. Use ONLY facts and sentiment expressly written by the customer.
2. Perform grammar and readability edits ONLY. Do NOT write promotional marketing copy.
3. NEVER add positive or negative claims not present in the input.
4. NEVER invent staff names, duration, prices, products, or specific services.
5. NEVER add SEO keywords, rating numbers (e.g. "5 stars"), or calls to action.
6. NEVER change negative or neutral sentiment to positive sentiment. If the customer complains about wait times or dirtiness, keep that complaint clear and intact.
7. Output valid JSON only with keys: "suggestedText", "changedMeaning" (false), "addedFacts" (false), "safetyNote".
`;

export class ConstrainedAIProvider implements IAIAssistProvider {
  private apiKey?: string;
  private provider: "gemini" | "openai";

  constructor(provider: "gemini" | "openai" = "gemini", apiKey?: string) {
    this.provider = provider;
    this.apiKey = apiKey;
  }

  async refineWording(input: AIAssistInput): Promise<AIAssistOutput> {
    const trimmed = input.userText.trim();

    // If no API key configured, use deterministic punctuation & grammar cleanup
    if (!this.apiKey) {
      const cleaned = trimmed
        .replace(/\s+/g, " ")
        .replace(/^([a-z])/, (m) => m.toUpperCase())
        .replace(/([^.!?])$/, "$1.");

      return {
        suggestedText: cleaned,
        changedMeaning: false,
        addedFacts: false,
        safetyNote: "Basic clarity edit applied (no external LLM called).",
      };
    }

    try {
      // If API key is provided, execute external LLM call with structured output
      // For MVP safety, validate output structure strictly with Zod
      const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + this.apiKey, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: `${SYSTEM_GUARDRAIL_PROMPT}\n\nCustomer Feedback: "${trimmed}"` }],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            responseMimeType: "application/json",
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM provider returned status ${response.status}`);
      }

      const json = await response.json();
      const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(rawText);

      return AIAssistOutputSchema.parse(parsed);
    } catch {
      // Safe fallback: never block the user on external AI failure
      return {
        suggestedText: trimmed,
        changedMeaning: false,
        addedFacts: false,
        safetyNote: "AI suggestion unavailable. Original text preserved.",
      };
    }
  }
}
