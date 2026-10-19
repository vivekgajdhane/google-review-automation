"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { generateRoundedQrSvg } from "@/lib/rounded-qr";
import { getBusinessesForUser } from "@/app/(dashboard)/dashboard/business/actions";
import { BusinessItem, PHOENIX_TECH_BUSINESS_ITEM } from "@/types/business";
import { Download, Printer, QrCode, ShieldCheck, Sparkles, Store, ExternalLink } from "lucide-react";

function QrStandContent() {
  const searchParams = useSearchParams();
  const slugFromQuery = searchParams.get("slug");

  const [businesses, setBusinesses] = React.useState<BusinessItem[]>([PHOENIX_TECH_BUSINESS_ITEM]);
  const [selectedSlug, setSelectedSlug] = React.useState<string>(slugFromQuery || "phoenix-tech");
  const [qrSvgString, setQrSvgString] = React.useState<string>("");
  const [downloading, setDownloading] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    getBusinessesForUser().then((list) => {
      setBusinesses(list);
      if (slugFromQuery) {
        setSelectedSlug(slugFromQuery);
      } else if (list.length > 0) {
        setSelectedSlug(list[0].slug);
      }
      setLoading(false);
    });
  }, [slugFromQuery]);

  const activeBusiness = businesses.find((b) => b.slug === selectedSlug) || businesses[0] || PHOENIX_TECH_BUSINESS_ITEM;
  const [scanUrl, setScanUrl] = React.useState<string>(`https://truereview.in/r/${selectedSlug}`);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      const target = `${origin}/r/${selectedSlug}`;
      setScanUrl(target);

      const svg = generateRoundedQrSvg({
        text: target,
        size: 512,
        dotColor: "#045d17",
        eyeColor: "#045d17",
        bgColor: "#fff3d7",
        logoUrl: activeBusiness.logo_path || undefined,
        logoSizeRatio: 0.22,
      });
      setQrSvgString(svg);
    }
  }, [selectedSlug, activeBusiness.logo_path]);

  const handleDownloadPng = () => {
    if (!qrSvgString) return;
    setDownloading(true);

    const img = new window.Image();
    const svgBlob = new Blob([qrSvgString], { type: "image/svg+xml;charset=utf-8" });
    const URLObj = window.URL || window.webkitURL || window;
    const blobURL = URLObj.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#fff3d7";
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.drawImage(img, 0, 0, 1024, 1024);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${selectedSlug}-rounded-qr.png`;
        link.click();
      }
      URLObj.revokeObjectURL(blobURL);
      setDownloading(false);
    };
    img.src = blobURL;
  };

  const handleDownloadSvg = () => {
    if (!qrSvgString) return;
    const blob = new Blob([qrSvgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedSlug}-rounded-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl space-y-8 font-sans">
      {/* Page Title & Business Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-[#045d17] uppercase sm:text-3xl">
            Custom Rounded QR Stand Kit
          </h1>
          <p className="mt-1 text-sm text-[#08210d]/70 font-semibold">
            Generate and export tabletop counter cards in the locked Emerald Green & Cream theme.
          </p>
        </div>

        {businesses.length > 1 && (
          <div className="flex items-center gap-2">
            <Store className="h-4 w-4 text-[#045d17]" />
            <select
              value={selectedSlug}
              onChange={(e) => setSelectedSlug(e.target.value)}
              className="rounded-xl border-2 border-[#045d17]/30 bg-white px-3 py-1.5 text-sm font-bold text-[#08210d] shadow-sm focus:border-[#045d17] focus:outline-none"
            >
              {businesses.map((biz) => (
                <option key={biz.id} value={biz.slug}>
                  {biz.name} (/r/{biz.slug})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Left Column: QR Generator & Downloads */}
        <div className="space-y-6">
          <Card className="rounded-[28px] border-2 border-[#045d17]/20 bg-white shadow-xl shadow-[#045d17]/5">
            <CardHeader>
              <CardTitle className="text-lg font-black text-[#045d17] flex items-center justify-between uppercase">
                <span className="flex items-center gap-2">
                  <QrCode className="h-5 w-5 text-[#045d17]" /> Rounded QR Code
                </span>
                <Badge className="bg-[#fff3d7] text-[#045d17] border border-[#045d17]/30 text-[11px] font-bold">
                  {activeBusiness.name}
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs text-[#08210d]/70 font-medium">
                Encoded Scan URL:{' '}
                <a
                  href={scanUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#045d17] font-bold hover:underline inline-flex items-center gap-1"
                >
                  {scanUrl} <ExternalLink className="h-3 w-3" />
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="mx-auto flex h-64 w-64 items-center justify-center rounded-3xl border-2 border-[#045d17]/30 bg-[#fff3d7] p-4 shadow-inner">
                {qrSvgString ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: qrSvgString }}
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                  />
                ) : (
                  <div className="text-sm text-[#08210d]/60 font-semibold">Generating QR...</div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  onClick={handleDownloadPng}
                  disabled={downloading}
                  className="gap-2 font-bold bg-[#045d17] hover:bg-[#034d13] text-[#fff3d7] rounded-xl text-xs"
                >
                  <Download className="h-4 w-4" /> Download PNG (1024px)
                </Button>
                <Button
                  variant="outline"
                  onClick={handleDownloadSvg}
                  className="gap-2 font-bold border-2 border-[#045d17]/30 bg-white hover:bg-[#fff9ea] text-[#045d17] rounded-xl text-xs"
                >
                  <Download className="h-4 w-4" /> Vector SVG
                </Button>
              </div>

              <div className="pt-2">
                <Link
                  href={`/qr/${selectedSlug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#045d17] hover:underline uppercase tracking-wide"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Open Full Stand Print Page &rarr;</span>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Placement Best Practices */}
          <Card className="rounded-3xl border-2 border-[#045d17]/15 bg-[#fff3d7]/50">
            <CardHeader>
              <CardTitle className="text-base font-black text-[#045d17] uppercase flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#045d17]" /> Acrylic Stand Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs text-[#08210d]/80 font-medium">
              <p>• <strong>Counter Placement:</strong> Position stand right next to your UPI payment scanner at checkout.</p>
              <p>• <strong>Never Breaks:</strong> If the business changes their Google Maps link or phone, update it in code or dashboard. The physical printed QR code never goes to waste.</p>
              <p>• <strong>Instant AI Draft:</strong> Removes client hesitation by giving them quick tap options in English, Hinglish, Hindi, or Marathi.</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Stand Card Preview */}
        <div>
          <Card className="rounded-[28px] border-2 border-[#045d17]/20 bg-white shadow-xl shadow-[#045d17]/5 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-[#045d17] uppercase tracking-wide">
                Tabletop Stand Preview (A5/A6)
              </h2>
              <Button
                size="sm"
                onClick={handlePrint}
                className="gap-1.5 text-xs font-bold bg-[#045d17] hover:bg-[#034d13] text-[#fff3d7] rounded-xl"
              >
                <Printer className="h-3.5 w-3.5" /> Print Stand
              </Button>
            </div>

            {/* Stand Graphic */}
            <div className="mx-auto w-full max-w-[320px] rounded-[28px] border-4 border-[#045d17] bg-[#fff3d7] p-6 text-center shadow-md relative">
              <div className="mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#045d17]">
                  {activeBusiness.name}
                </span>
                <p className="text-[9px] font-bold text-[#08210d]/70">
                  {activeBusiness.description || "Hadapsar, Pune"}
                </p>
              </div>

              <div className="my-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#045d17] text-[#fff3d7] text-[10px] font-bold uppercase">
                Review Us on Google
              </div>

              <div className="mx-auto my-2 w-40 h-40 bg-white p-2 rounded-2xl border-2 border-[#045d17]/30 flex items-center justify-center">
                {qrSvgString ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: qrSvgString }}
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full"
                  />
                ) : null}
              </div>

              <p className="text-[10px] font-black text-[#045d17] uppercase tracking-wide">
                Scan with Phone Camera
              </p>
              <p className="text-[9px] font-semibold text-[#08210d]/70">
                5-Second AI Review • Instagram • WhatsApp
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function QrStandPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-[#045d17] font-bold">Loading QR Studio...</div>}>
      <QrStandContent />
    </React.Suspense>
  );
}
