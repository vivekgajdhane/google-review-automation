"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldAlert, Trash2, CheckCircle2, Clock, Lock } from "lucide-react";

export default function SettingsPage() {
  const [retentionDays, setRetentionDays] = React.useState(90);
  const [saved, setSaved] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Privacy & System Settings
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage feedback retention schedules and data protection configurations.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-4 text-sm font-medium text-emerald-800 border border-emerald-200">
          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
          <span>Settings updated successfully.</span>
        </div>
      )}

      {/* Data Retention Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-600" /> Private Feedback Retention
          </CardTitle>
          <CardDescription>
            In compliance with India&apos;s DPDP Act, private customer messages are automatically purged after this period.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700" htmlFor="retention">
                Retention Duration
              </label>
              <select
                id="retention"
                value={retentionDays}
                onChange={(e) => setRetentionDays(Number(e.target.value))}
                className="block w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={30}>30 Days</option>
                <option value={60}>60 Days</option>
                <option value={90}>90 Days (Recommended)</option>
                <option value={180}>180 Days</option>
                <option value={365}>365 Days (1 Year)</option>
              </select>
              <p className="text-xs text-slate-500">
                Messages older than {retentionDays} days will be permanently deleted from the database.
              </p>
            </div>

            <Button type="submit" size="sm" className="font-semibold">
              Save Retention Schedule
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Feature Flags & AI Policy Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-slate-600" /> Feature Flags & Policy Status
          </CardTitle>
          <CardDescription>
            Safety controls ensuring 100% adherence to Google Maps policies.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">Review Gating & Rating Filters</p>
              <p className="text-xs text-slate-500">Permanently disabled to prevent Google Business Profile penalties.</p>
            </div>
            <Badge variant="warning">Disabled by Policy</Badge>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-4">
            <div>
              <p className="text-sm font-semibold text-slate-800">AI Review Wording Assistant</p>
              <p className="text-xs text-slate-500">Kept off by default (ENABLE_AI_REVIEW_ASSIST=false).</p>
            </div>
            <Badge variant="outline">Off by Default</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone: Account Purge */}
      <Card className="border-red-200 bg-red-50/30">
        <CardHeader>
          <CardTitle className="text-lg text-red-900 flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-600" /> Danger Zone
          </CardTitle>
          <CardDescription className="text-red-700">
            Permanently delete this business workspace, QR redirects, and all historical feedback.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xs text-red-600">
            This action cannot be undone. All QR scans to this business will return a 404 page.
          </p>
          {confirmDelete ? (
            <div className="flex gap-2">
              <Button
                variant="danger"
                size="sm"
                onClick={() => alert("Business profile purged.")}
              >
                Yes, Permanently Delete Everything
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setConfirmDelete(false)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmDelete(true)}
              className="text-red-600 border-red-300 hover:bg-red-50 gap-1.5"
            >
              <Trash2 className="h-4 w-4" /> Delete Business Profile
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
