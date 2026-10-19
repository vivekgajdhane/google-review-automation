import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Logo } from "@/components/ui/logo";
import {
  QrCode,
  ShieldCheck,
  Sparkles,
  BarChart3,
  ArrowRight,
  ExternalLink,
  Instagram,
  Star,
  Zap
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fff3d7] text-[#08210d] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b-2 border-[#045d17]/15 bg-[#fff3d7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 font-black text-xl text-[#045d17] tracking-tight uppercase">
              <span className="w-8 h-8 rounded-xl bg-[#045d17] text-[#fff3d7] flex items-center justify-center font-black text-sm shadow-sm">
                TR
              </span>
              <span>TrueReview</span>
            </div>
            <span className="ml-2 hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#045d17] text-[#fff3d7] text-[11px] font-bold">
              AI Smart QR Hub
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/qr/phoenix-tech">
              <Button
                variant="outline"
                size="sm"
                className="border-2 border-[#045d17]/30 bg-white hover:bg-[#fff9ea] text-[#045d17] font-bold text-xs rounded-xl"
              >
                QR Stand Kit
              </Button>
            </Link>
            <Link href="/r/phoenix-tech">
              <Button
                size="sm"
                className="bg-[#045d17] hover:bg-[#034d13] text-[#fff3d7] font-bold text-xs rounded-xl shadow-sm"
              >
                Live Mobile Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#045d17]/30 bg-white px-3.5 py-1 text-xs font-bold text-[#045d17] shadow-sm uppercase tracking-wide">
              <Sparkles className="h-3.5 w-3.5" /> Built for Modern Businesses in Pune
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#045d17] uppercase leading-[1.08]">
              2x Your Google Reviews with <br className="hidden sm:inline" />
              <span className="text-[#08210d]">Smart AI QR Profiles</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-[#08210d]/80 font-medium leading-relaxed">
              Turn foot traffic into authentic 5-star Google Reviews in 5 seconds. Customers tap quick tags, AI drafts their review in English, Hinglish, or Marathi, and connects directly to your Instagram and WhatsApp—with zero owner effort.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/r/phoenix-tech" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full gap-2 text-base font-extrabold bg-[#045d17] hover:bg-[#034d13] text-[#fff3d7] rounded-2xl shadow-xl shadow-[#045d17]/20 uppercase tracking-wide h-13 px-8"
                >
                  Try Phoenix Tech Mobile Flow <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/qr/phoenix-tech" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full gap-2 text-base font-extrabold border-2 border-[#045d17]/30 bg-white hover:bg-[#fff9ea] text-[#045d17] rounded-2xl h-13 px-8"
                >
                  Custom Rounded QR Stand <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            </div>

            <p className="mt-4 text-xs font-bold text-[#045d17]/80 uppercase tracking-wider">
              Zero staff friction • Instant 1-tap Google Maps redirection • Direct Instagram & WhatsApp growth
            </p>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="border-t-2 border-[#045d17]/15 bg-white py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-black text-[#045d17] uppercase tracking-wide">
                Why Local Businesses Love TrueReview
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm sm:text-base text-[#08210d]/70 font-medium">
                One counter scan empowers customers to write detailed reviews in seconds and follow your brand across all digital touchpoints.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="rounded-3xl border-2 border-[#045d17]/20 bg-[#fff3d7]/40 shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#045d17] text-[#fff3d7] shadow-sm">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-black text-[#045d17] uppercase">
                    5-Second AI Review Assistant
                  </CardTitle>
                  <CardDescription className="text-xs text-[#08210d]/70 font-medium leading-relaxed">
                    Solves customer blank-page syndrome. Customers pick course or service chips, and AI crafts natural, keyword-rich reviews in English, Hinglish, Hindi, or Marathi.
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-3xl border-2 border-[#045d17]/20 bg-[#fff3d7]/40 shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#045d17] text-[#fff3d7] shadow-sm">
                    <QrCode className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-black text-[#045d17] uppercase">
                    Custom Rounded QR Stands
                  </CardTitle>
                  <CardDescription className="text-xs text-[#08210d]/70 font-medium leading-relaxed">
                    Beautiful modern rounded QR cards featuring the business logo in the center. Formatted specifically for acrylic tabletop counter display (A5/A6).
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="rounded-3xl border-2 border-[#045d17]/20 bg-[#fff3d7]/40 shadow-sm">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#045d17] text-[#fff3d7] shadow-sm">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-lg font-black text-[#045d17] uppercase">
                    Omnichannel Growth Hub
                  </CardTitle>
                  <CardDescription className="text-xs text-[#08210d]/70 font-medium leading-relaxed">
                    Direct touchpoints for Instagram profiles, website visits, WhatsApp enquiries, phone calls, and 1-tap phone contact saves (vCard).
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-[#045d17]/15 bg-[#fff3d7] py-8 text-center text-xs text-[#08210d]/70 font-semibold">
        <div className="mx-auto max-w-6xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 TrueReview • Smart AI Review & Omnichannel Growth</p>
          <div className="flex items-center gap-4 text-[#045d17] font-bold">
            <Link href="/r/phoenix-tech" className="hover:underline">
              Phoenix Tech Flow
            </Link>
            <span>•</span>
            <Link href="/qr/phoenix-tech" className="hover:underline">
              Custom Stand Kit
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
