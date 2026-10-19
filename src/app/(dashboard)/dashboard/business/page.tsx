"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { updateBusinessAction, getBusinessesForUser } from "./actions";
import { BusinessItem } from "@/types/business";
import { isValidGoogleReviewUrl, slugify } from "@/lib/utils";
import { Store, Link as LinkIcon, ShieldCheck, CheckCircle2, AlertCircle, ExternalLink, MessageSquare } from "lucide-react";

function BusinessProfileContent() {
  const searchParams = useSearchParams();
  const businessIdFromQuery = searchParams.get("id");

  const [loading, setLoading] = React.useState(false);
  const [fetching, setFetching] = React.useState(true);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  // Business state
  const [currentBusiness, setCurrentBusiness] = React.useState<BusinessItem | null>(null);
  const [businessName, setBusinessName] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [welcomeMessage, setWelcomeMessage] = React.useState("");
  const [color, setColor] = React.useState("#2563eb");
  const [googleUrl, setGoogleUrl] = React.useState("");
  const [urlConfirmed, setUrlConfirmed] = React.useState(false);

  React.useEffect(() => {
    getBusinessesForUser().then((list) => {
      let matched = list[0];
      if (businessIdFromQuery) {
        const found = list.find((b) => b.id === businessIdFromQuery);
        if (found) matched = found;
      }
      if (matched) {
        setCurrentBusiness(matched);
        setBusinessName(matched.name);
        setSlug(matched.slug);
        setWelcomeMessage(matched.welcome_message || "Thank you for visiting us! We value your authentic feedback.");
        setColor(matched.primary_color || "#2563eb");
        setGoogleUrl(matched.google_review_url || "");
        setUrlConfirmed(Boolean(matched.google_review_url));
      }
      setFetching(false);
    });
  }, [businessIdFromQuery]);

  const isGoogleUrlValid = Boolean(googleUrl) && isValidGoogleReviewUrl(googleUrl);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (googleUrl && !urlConfirmed) {
      setError("Please click 'Test Link' and confirm your official Google Review URL opens your verified page.");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData(event.currentTarget);
    formData.append("businessId", currentBusiness?.id || "demo-salon-id");

    const result = await updateBusinessAction(formData);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess("Business profile and Google Review URL saved successfully!");
    }
    setLoading(false);
  }

  if (fetching) {
    return (
      <div className="max-w-3xl space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-slate-200 rounded" />
        <div className="h-4 w-96 bg-slate-200 rounded" />
        <div className="h-64 bg-slate-200 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Edit Business Profile
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Configure how your business appears to customers who scan your counter QR code.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {success && (
          <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-800 border border-red-200">
            <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Business Identity Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Store className="h-5 w-5 text-blue-600" /> Business Identity
            </CardTitle>
            <CardDescription>
              Your public business name, unique QR address, and branding.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="name">
                Business Display Name *
              </label>
              <Input
                id="name"
                name="name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="e.g. The Pune Hair Lounge"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="slug">
                Public URL Slug *
              </label>
              <div className="flex rounded-lg shadow-sm">
                <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-sm text-slate-500 font-mono">
                  truereview.in/r/
                </span>
                <input
                  id="slug"
                  name="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(slugify(e.target.value))}
                  className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
              <p className="text-xs text-slate-500">
                This is the permanent address encoded in your physical QR counter stand.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="welcome_message">
                Welcome Greeting to Customers
              </label>
              <textarea
                id="welcome_message"
                name="welcome_message"
                rows={2}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Message shown at top of the customer's screen when they scan"
                className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="primary_color">
                Brand Primary Accent Color
              </label>
              <div className="flex items-center gap-3">
                <input
                  id="primary_color"
                  name="primary_color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="h-10 w-16 cursor-pointer rounded border border-slate-300 p-1"
                />
                <span className="font-mono text-sm text-slate-600">{color}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Google Review URL Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <LinkIcon className="h-5 w-5 text-blue-600" /> Official Google Review URL
            </CardTitle>
            <CardDescription>
              The verified link that opens your Google Business Profile review box directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="google_review_url">
                Official Google Review Link *
              </label>
              <Input
                id="google_review_url"
                name="google_review_url"
                value={googleUrl}
                onChange={(e) => {
                  setGoogleUrl(e.target.value);
                  setUrlConfirmed(false);
                }}
                placeholder="https://g.page/r/.../review or https://maps.app.goo.gl/..."
                required
              />
              {googleUrl && !isGoogleUrlValid && (
                <p className="text-xs text-red-500 mt-1">
                  Must be a secure HTTPS link from Google (g.page, maps.app.goo.gl, or google.com).
                </p>
              )}
            </div>

            {/* URL Verification & Test Preview */}
            {isGoogleUrlValid && (
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-blue-900">Step 1: Test Your Review URL</span>
                  <a
                    href={googleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-800 bg-white border border-blue-200 px-3 py-1.5 rounded-lg shadow-sm"
                  >
                    Open Google Review Dialog <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
                <div className="pt-2 border-t border-blue-200">
                  <label className="flex items-start gap-2.5 text-slate-800 cursor-pointer font-medium">
                    <input
                      type="checkbox"
                      checked={urlConfirmed}
                      onChange={(e) => setUrlConfirmed(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>
                      Step 2: I have tested this link and confirm that it opens the official review dialog for <strong>{businessName || "my business"}</strong> on Google Maps.
                    </span>
                  </label>
                </div>
              </div>
            )}

            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3 text-xs text-slate-600 flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 mt-0.5 flex-shrink-0" />
              <span>
                <strong>Dynamic Protection:</strong> If you ever relocate or Google updates your Place ID, update it here. Your printed TrueReview counter stands will automatically redirect to the new URL.
              </span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={loading || (Boolean(googleUrl) && (!isGoogleUrlValid || !urlConfirmed))}
            className="font-semibold"
          >
            {loading ? "Saving changes..." : "Save Business Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function BusinessProfilePage() {
  return (
    <React.Suspense
      fallback={
        <div className="p-8 max-w-4xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-slate-200 rounded animate-pulse" />
          <div className="h-64 bg-slate-100 rounded-lg animate-pulse" />
        </div>
      }
    >
      <BusinessProfileContent />
    </React.Suspense>
  );
}
