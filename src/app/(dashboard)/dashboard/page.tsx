"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getBusinessesForUser } from "@/app/(dashboard)/dashboard/business/actions";
import { BusinessItem, DEMO_SALON_BUSINESS } from "@/types/business";
import { 
  Eye, 
  MessageSquare, 
  ExternalLink, 
  QrCode, 
  TrendingUp, 
  Info,
  Calendar,
  Store,
  ArrowUpRight
} from "lucide-react";

export default function DashboardOverviewPage() {
  const [businesses, setBusinesses] = React.useState<BusinessItem[]>([DEMO_SALON_BUSINESS]);
  const [selectedSlug, setSelectedSlug] = React.useState<string>("demo-salon");
  const [dateRange, setDateRange] = React.useState<"7d" | "30d" | "all">("30d");

  React.useEffect(() => {
    getBusinessesForUser().then((list) => {
      setBusinesses(list);
      if (list.length > 0) {
        setSelectedSlug(list[0].slug);
      }
    });
  }, []);

  const activeBusiness = businesses.find((b) => b.slug === selectedSlug) || businesses[0] || DEMO_SALON_BUSINESS;

  // Filtered metrics simulation based on date range
  const metricsByRange = {
    "7d": { views: 38, googleClicks: 14, feedback: 4, ctr: "36.8%" },
    "30d": { views: 142, googleClicks: 49, feedback: 14, ctr: "34.5%" },
    "all": { views: 380, googleClicks: 126, feedback: 32, ctr: "33.1%" },
  };

  const currentStats = metricsByRange[dateRange];

  return (
    <div className="space-y-8">
      {/* Welcome Banner & Business Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {activeBusiness.name}
            </h1>
            <Badge variant="success">Active</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-500 flex items-center gap-1.5">
            Public QR Page:{' '}
            <Link
              href={`/r/${activeBusiness.slug}`}
              target="_blank"
              className="font-mono text-blue-600 hover:underline inline-flex items-center gap-0.5"
            >
              truereview.in/r/{activeBusiness.slug} <ArrowUpRight className="h-3 w-3" />
            </Link>
          </p>
        </div>

        {/* Business Selector & Date Filter */}
        <div className="flex flex-wrap items-center gap-3">
          {businesses.length > 1 && (
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4 text-slate-500" />
              <select
                value={selectedSlug}
                onChange={(e) => setSelectedSlug(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-semibold text-slate-800 shadow-sm focus:border-blue-500 focus:outline-none"
              >
                {businesses.map((biz) => (
                  <option key={biz.id} value={biz.slug}>
                    {biz.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date Range Selector */}
          <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setDateRange("7d")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                dateRange === "7d" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setDateRange("30d")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                dateRange === "30d" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setDateRange("all")}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                dateRange === "all" ? "bg-blue-600 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All Time
            </button>
          </div>
        </div>
      </div>

      {/* Policy Transparency Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 text-sm text-blue-900 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold">Truthful Attribution Notice:</span> TrueReview counts direct customer actions on your page. &ldquo;Google Review Link Clicks&rdquo; records when a visitor clicks to open your official Google page. Under Google API security policies, Google does not notify third-party tools when a review is submitted or published.
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">QR Scans / Page Views</CardTitle>
            <Eye className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-slate-900">{currentStats.views}</div>
            <p className="mt-1 text-xs text-slate-500">Total QR scans and direct page visits</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Google Link Clicks</CardTitle>
            <ExternalLink className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-blue-600">{currentStats.googleClicks}</div>
            <p className="mt-1 text-xs text-slate-500">Customers who opened official review link</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Private Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-emerald-600">{currentStats.feedback}</div>
            <p className="mt-1 text-xs text-slate-500">Confidential messages sent to management</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Click-Through Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-indigo-600">{currentStats.ctr}</div>
            <p className="mt-1 text-xs text-slate-500">Scans converting to Google clicks</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Action Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Counter Display Setup</CardTitle>
            <CardDescription>Get your physical QR counter stand ready for customers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 p-3">
              <QrCode className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-800">Print Tabletop Counter Card</p>
                <p className="text-xs text-slate-500">Export high-resolution vector SVG or 1024x1024 PNG for acrylic stands.</p>
              </div>
            </div>
            <Link href={`/dashboard/qr-code?slug=${activeBusiness.slug}`} className="block">
              <Button variant="outline" className="w-full">
                View & Download Stand Kit
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Private Feedback</CardTitle>
            <CardDescription>Direct messages sent only to your management team</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Today at 10:45 AM • Anonymous Customer</p>
              <p className="mt-1 text-sm text-slate-700 italic">&ldquo;Haircut was great, but the AC in the rear section wasn&apos;t cooling well.&rdquo;</p>
            </div>
            <Link href="/dashboard/feedback" className="block">
              <Button variant="outline" className="w-full">
                View All Feedback Inbox
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
