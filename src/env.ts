import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().default("https://placeholder.supabase.co"),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder-anon-key"),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).default("placeholder-service-role-key"),
  ENABLE_AI_REVIEW_ASSIST: z
    .string()
    .optional()
    .default("false")
    .transform((val) => val === "true"),
  AI_PROVIDER: z.enum(["gemini", "openai"]).default("gemini"),
  AI_PROVIDER_API_KEY: z.string().optional(),
});

export const env = envSchema.parse({
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  ENABLE_AI_REVIEW_ASSIST: process.env.ENABLE_AI_REVIEW_ASSIST,
  AI_PROVIDER: process.env.AI_PROVIDER,
  AI_PROVIDER_API_KEY: process.env.AI_PROVIDER_API_KEY,
});
