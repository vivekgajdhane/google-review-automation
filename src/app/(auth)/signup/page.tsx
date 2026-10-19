"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Logo } from "@/components/ui/logo";
import { signupAction } from "@/app/(auth)/actions";
import { ShieldCheck } from "lucide-react";

export default function SignupPage() {
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await signupAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-50">
      <Card className="w-full max-w-md shadow-lg border-slate-200">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex justify-center">
            <Logo size="lg" />
          </div>
          <CardTitle className="text-2xl font-bold mt-2">Create your TrueReview Account</CardTitle>
          <CardDescription>Setup your business and start collecting authentic feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700 border border-red-200">
                {error}
              </div>
            )}
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="displayName">
                Your Full Name / Business Title
              </label>
              <Input
                id="displayName"
                name="displayName"
                type="text"
                placeholder="Vikram Patil (Owner)"
                required
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email Address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="owner@yourbusiness.com"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="password">
                Password (min 8 characters)
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                minLength={8}
                autoComplete="new-password"
              />
            </div>
            <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-xs text-blue-800 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <span>
                100% Google UGC policy compliant: Zero review-gating, zero incentives, and truthful click analytics.
              </span>
            </div>
            <Button type="submit" className="w-full font-semibold" disabled={loading}>
              {loading ? "Creating account..." : "Create Free Account"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="ml-1 font-semibold text-blue-600 hover:underline">
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
