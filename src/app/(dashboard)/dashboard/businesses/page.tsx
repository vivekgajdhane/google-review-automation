"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  createBusinessAction, 
  getBusinessesForUser
} from "@/app/(dashboard)/dashboard/business/actions";
import { BusinessItem, DEMO_SALON_BUSINESS } from "@/types/business";
import { isValidGoogleReviewUrl, slugify } from "@/lib/utils";
import { 
  Store, 
  Plus, 
  QrCode, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ShieldCheck,
  Eye
} from "lucide-react";

export default function MyBusinessesPage() {
  const [businesses, setBusinesses] = React.useState<BusinessItem[]>([DEMO_SALON_BUSINESS]);
  const [loading, setLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // Form states for Create Business
  const [newName, setNewName] = React.useState("");
  const [newSlug, setNewSlug] = React.useState("");
  const [newGoogleUrl, setNewGoogleUrl] = React.useState("");
  const [newWelcome, setNewWelcome] = React.useState("Thank you for visiting us! We appreciate your honest feedback.");
  const [newColor, setNewColor] = React.useState("#2563eb");
  const [urlConfirmed, setUrlConfirmed] = React.useState(false);

  React.useEffect(() => {
    getBusinessesForUser().then((data) => {
      setBusinesses(data);
      setLoading(false);
    });
  }, []);

  // Auto-generate slug when typing business name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setNewName(val);
    setNewSlug(slugify(val));
  };

  const isGoogleUrlValid = Boolean(newGoogleUrl) && isValidGoogleReviewUrl(newGoogleUrl);

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoogleUrl && !urlConfirmed) {
      setError("Please test your Google Review link and check the confirmation box before saving.");
      return;
    }

    setCreating(true);
    setError(null);

    const formData = new FormData();
    formData.append("name", newName);
    formData.append("slug", newSlug);
    formData.append("google_review_url", newGoogleUrl);
    formData.append("welcome_message", newWelcome);
    formData.append("primary_color", newColor);

    const result = await createBusinessAction(formData);

    if (result.error) {
      setError(result.error);
      setCreating(false);
    } else {
      setSuccess(`Business "${newName}" created successfully!`);
      const newBizItem: BusinessItem = {
        id: result.id || Math.random().toString(),
        name: newName,
        slug: result.slug || newSlug,
        description: null,
        welcome_message: newWelcome,
        logo_path: null,
        primary_color: newColor,
        google_review_url: newGoogleUrl || null,
        role: "owner",
        isOwner: true,
      };
      setBusinesses((prev) => [newBizItem, ...prev]);
      setCreating(false);
      setIsModalOpen(false);
      // Reset form
      setNewName("");
      setNewSlug("");
      setNewGoogleUrl("");
      setUrlConfirmed(false);
      setTimeout(() => setSuccess(null), 4000);
    }
  };

  return (
    <div className="max-w-5xl space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Businesses
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage your locations, review links, and dedicated QR counter stands.
          </p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 font-semibold">
          <Plus className="h-4 w-4" /> Add New Business
        </Button>
      </div>

      {success && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Business Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {businesses.map((biz) => (
          <Card key={biz.id} className="flex flex-col justify-between hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between pb-1">
                <Badge variant={biz.isOwner ? "default" : "outline"} className="text-xs">
                  {biz.isOwner ? "Owner" : "Manager"}
                </Badge>
                <span className="font-mono text-xs text-slate-400">/r/{biz.slug}</span>
              </div>
              <CardTitle className="text-lg font-bold text-slate-900 mt-2">
                {biz.name}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-xs">
                {biz.welcome_message || "Thank you for visiting us! We appreciate your honest feedback."}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4 pt-2 border-t border-slate-100">
              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center justify-between">
                  <span>Google URL:</span>
                  <span className="font-mono text-slate-500 truncate max-w-[160px]">
                    {biz.google_review_url ? "Configured ✓" : "Not set"}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Link href={`/dashboard/business?id=${biz.id}`}>
                  <Button variant="outline" size="sm" className="w-full justify-center text-xs">
                    Edit Profile & Settings
                  </Button>
                </Link>
                <div className="flex gap-2">
                  <Link href={`/r/${biz.slug}`} target="_blank" className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full gap-1 text-xs">
                      <Eye className="h-3.5 w-3.5" /> View Public
                    </Button>
                  </Link>
                  <Link href={`/dashboard/qr-code?slug=${biz.slug}`} className="flex-1">
                    <Button variant="ghost" size="sm" className="w-full gap-1 text-xs text-blue-600">
                      <QrCode className="h-3.5 w-3.5" /> QR Kit
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Business Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Store className="h-5 w-5 text-blue-600" /> Create New Business Profile
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4 pt-4">
              {error && (
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700 border border-red-200">
                  <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700" htmlFor="bizName">
                  Business Name *
                </label>
                <Input
                  id="bizName"
                  value={newName}
                  onChange={handleNameChange}
                  placeholder="e.g. Aundh Auto Detailing Studio"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700" htmlFor="bizSlug">
                  Unique URL Slug *
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-300 bg-slate-50 px-3 text-xs text-slate-500 font-mono">
                    truereview.in/r/
                  </span>
                  <input
                    id="bizSlug"
                    type="text"
                    value={newSlug}
                    onChange={(e) => setNewSlug(slugify(e.target.value))}
                    className="block w-full min-w-0 flex-1 rounded-none rounded-r-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 font-mono focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700" htmlFor="welcomeMsg">
                  Welcome Greeting Message
                </label>
                <textarea
                  id="welcomeMsg"
                  rows={2}
                  value={newWelcome}
                  onChange={(e) => setNewWelcome(e.target.value)}
                  placeholder="Greeting shown to customers when they scan your QR code"
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700" htmlFor="googleUrl">
                  Official Google Review URL
                </label>
                <Input
                  id="googleUrl"
                  type="url"
                  value={newGoogleUrl}
                  onChange={(e) => {
                    setNewGoogleUrl(e.target.value);
                    setUrlConfirmed(false);
                  }}
                  placeholder="https://g.page/r/.../review or https://maps.app.goo.gl/..."
                />
                {newGoogleUrl && !isGoogleUrlValid && (
                  <p className="text-xs text-red-500 mt-1">
                    Must be a valid HTTPS Google review link (e.g. g.page, maps.app.goo.gl, or google.com).
                  </p>
                )}
              </div>

              {/* URL Preview and Confirmation */}
              {isGoogleUrlValid && (
                <div className="rounded-lg border border-blue-200 bg-blue-50/70 p-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-900">Preview Google Link</span>
                    <a
                      href={newGoogleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
                    >
                      Test Link <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <label className="flex items-start gap-2 pt-1 text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={urlConfirmed}
                      onChange={(e) => setUrlConfirmed(e.target.checked)}
                      className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span>I tested this link and confirm it opens my verified Google Business Profile review dialog.</span>
                  </label>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={creating || (Boolean(newGoogleUrl) && (!isGoogleUrlValid || !urlConfirmed))}
                  className="font-semibold"
                >
                  {creating ? "Creating Business..." : "Create Business Profile"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
