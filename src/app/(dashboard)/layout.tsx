import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { signOutAction } from "@/app/(auth)/actions";
import { 
  QrCode, 
  BarChart3, 
  Store, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  Link as LinkIcon
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Logo size="md" />
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <Link
                href="/dashboard"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <BarChart3 className="h-4 w-4" /> Overview
              </Link>
              <Link
                href="/dashboard/businesses"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Store className="h-4 w-4" /> My Businesses
              </Link>
              <Link
                href="/dashboard/business"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Store className="h-4 w-4" /> Profile & Brand
              </Link>
              <Link
                href="/dashboard/qr-code"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <QrCode className="h-4 w-4" /> QR Stand
              </Link>
              <Link
                href="/dashboard/feedback"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <MessageSquare className="h-4 w-4" /> Feedback
              </Link>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              >
                <Settings className="h-4 w-4" /> Settings
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/r/demo-salon" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="hidden sm:inline-flex gap-1.5 text-xs font-semibold">
                Preview Public Page <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </Link>
            <form action={signOutAction}>
              <Button variant="ghost" size="sm" type="submit" className="text-slate-500 hover:text-slate-800">
                <LogOut className="h-4 w-4 sm:mr-1.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 z-30 flex h-16 w-full border-t border-slate-200 bg-white md:hidden justify-around items-center px-2">
        <Link href="/dashboard" className="flex flex-col items-center text-xs font-medium text-slate-600 hover:text-blue-600">
          <BarChart3 className="h-5 w-5" />
          <span>Stats</span>
        </Link>
        <Link href="/dashboard/business" className="flex flex-col items-center text-xs font-medium text-slate-600 hover:text-blue-600">
          <Store className="h-5 w-5" />
          <span>Business</span>
        </Link>
        <Link href="/dashboard/qr-code" className="flex flex-col items-center text-xs font-medium text-slate-600 hover:text-blue-600">
          <QrCode className="h-5 w-5" />
          <span>QR Stand</span>
        </Link>
        <Link href="/dashboard/feedback" className="flex flex-col items-center text-xs font-medium text-slate-600 hover:text-blue-600">
          <MessageSquare className="h-5 w-5" />
          <span>Feedback</span>
        </Link>
      </nav>
    </div>
  );
}
