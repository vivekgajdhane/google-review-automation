"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { generateRoundedQrSvg } from "@/lib/rounded-qr";
import { PublicBusinessData } from "@/types/public-business";
import { getRegisteredBusiness } from "@/data/businesses";
import {
  Download,
  Printer,
  Star,
  ExternalLink,
  Camera,
  Check,
  Copy,
  SlidersHorizontal,
  Palette,
  Globe,
  Smartphone
} from "lucide-react";

/**
 * Exact Vector Path of the Official Multicolored Google Logo
 */
function GoogleLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 272 92" className={className} xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#FBBC05" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path fill="#4285F4" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
      <path fill="#34A853" d="M225 3v65h-9.5V3h9.5z"/>
      <path fill="#EA4335" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-13.27-8.15l19.91-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.68 12.93z"/>
      <path fill="#4285F4" d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.42 0 17.9 4.09 23.51 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.88-6.72-13.69 0-24.44 11.09-24.44 24.78 0 13.69 10.75 24.78 24.44 24.78 8.82 0 13.86-3.53 17.05-6.72 2.77-2.77 4.54-6.72 5.21-12.01H35.29z"/>
    </svg>
  );
}

export default function DynamicQrStandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams?.slug || "bhikshu-tattoo";

  const [business, setBusiness] = React.useState<PublicBusinessData>(() =>
    getRegisteredBusiness(slug)
  );

  // Business theme colors
  const primaryColor = business.primaryColor || "#4A554D";

  // Destination modes: "software" (/r/slug - our app) | "google" (direct Google Maps review composer box)
  const [destinationMode, setDestinationMode] = React.useState<"software" | "google">("software");
  
  const isBhikshu = slug === "bhikshu-tattoo";
  const isNaad = slug === "naadjamroom" || slug === "naad-jamroom" || slug === "naad";

  const [publicHost, setPublicHost] = React.useState<string>(() => {
    if (slug.includes("naad")) return "https://naadjamroom.vercel.app";
    if (slug === "phoenix-tech") return "https://phoenixtechacademy.vercel.app";
    return "https://bhikshutattoostudio.vercel.app";
  });

  // Automatically adapt to current domain if visited over HTTPS
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.location.origin) {
      if (window.location.protocol === "https:" || (!window.location.origin.includes("localhost") && !window.location.origin.includes("127.0.0.1"))) {
        setPublicHost(window.location.origin);
      }
    }
  }, []);

  const [standTheme, setStandTheme] = React.useState<"white" | "stone">("stone");
  const [qrColorChoice, setQrColorChoice] = React.useState<"black" | "brand">("black");
  const [qrStyle, setQrStyle] = React.useState<"classic" | "rounded">("rounded");

  const [qrSvg, setQrSvg] = React.useState<string>("");
  const [downloading, setDownloading] = React.useState(false);
  const [copiedLink, setCopiedLink] = React.useState(false);
  const [activeUrl, setActiveUrl] = React.useState<string>("");

  const logoToDisplay = isBhikshu
    ? (standTheme === "white" ? "/assets/bhikshu-emblem.png" : "/assets/bhikshu-emblem-white.png")
    : isNaad
    ? "/assets/naad-logo.png"
    : business.logoPath;

  // Determine active scan URL & generate QR
  React.useEffect(() => {
    const biz = getRegisteredBusiness(slug);
    setBusiness(biz);

    let target = `${publicHost.trim().replace(/\/+$/, "")}/r/${slug}`;

    if (destinationMode === "software") {
      target = `${publicHost.trim().replace(/\/+$/, "")}/r/${slug}`;
    } else if (destinationMode === "google") {
      target = biz.googleReviewUrl || "https://maps.google.com";
    }

    setActiveUrl(target);

    const activeDotColor = qrColorChoice === "brand" ? (biz.primaryColor || "#000000") : "#000000";

    const svg = generateRoundedQrSvg({
      text: target,
      size: 512,
      margin: 3,
      dotColor: activeDotColor,
      eyeColor: activeDotColor,
      bgColor: "#ffffff",
      logoUrl: undefined, // Clean QR with logo at top of stand
      logoSizeRatio: 0,
      style: qrStyle,
    });
    setQrSvg(svg);
  }, [slug, destinationMode, publicHost, qrColorChoice, qrStyle]);

  const handleDownloadSvg = () => {
    if (!qrSvg) return;
    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${slug}-acrylic-stand-qr.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPng = () => {
    if (!qrSvg) return;
    setDownloading(true);

    const img = new window.Image();
    const svgBlob = new Blob([qrSvg], { type: "image/svg+xml;charset=utf-8" });
    const URLObj = window.URL || window.webkitURL || window;
    const blobURL = URLObj.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, 1024, 1024);
        ctx.drawImage(img, 0, 0, 1024, 1024);
        const pngUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = pngUrl;
        link.download = `${slug}-acrylic-stand-qr-1024.png`;
        link.click();
      }
      URLObj.revokeObjectURL(blobURL);
      setDownloading(false);
    };
    img.src = blobURL;
  };

  const handlePrint = () => {
    window.print();
  };

  const copyScanUrl = () => {
    navigator.clipboard.writeText(activeUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Top Header Bar */}
      <div className="max-w-5xl mx-auto mb-8 print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-xs font-semibold px-2.5 py-0.5 rounded-md text-white shadow-sm"
              style={{ backgroundColor: primaryColor }}
            >
              {business.category || "Business Counter"}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-500 font-medium">Physical Acrylic Stand Kit</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {business.name}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/r/${slug}`}
            target="_blank"
            className="text-xs font-semibold px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm flex items-center gap-1.5 transition-all"
          >
            <span>Open Mobile Review Maker</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </div>

      {/* Main Grid: Exact Physical Stand Replica on Left, Controls on Right */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
        {/* Left Column: Exact Physical Stand Replica */}
        <div className="lg:col-span-6 flex flex-col items-center">
          {/* Acrylic Stand Card (Supports White & Zen Stone Finish) */}
          <div
            id="print-stand"
            className={`w-[310px] sm:w-[340px] rounded-[32px] px-6 py-8 text-center shadow-2xl relative flex flex-col items-center justify-between transition-all duration-300 print:shadow-none print:m-0 print:border-none print:w-full print:max-w-[360px] overflow-hidden ${
              standTheme === "stone"
                ? "border border-[#3A463E] text-white"
                : "bg-white border border-slate-200/90 text-slate-900"
            }`}
            style={
              standTheme === "stone"
                ? isNaad
                  ? {
                      backgroundColor: "#143736",
                      backgroundImage: `radial-gradient(circle at 50% 12%, rgba(232, 156, 59, 0.22) 0%, rgba(10, 26, 25, 0.98) 100%)`,
                    }
                  : {
                      backgroundImage: `radial-gradient(circle at 50% 12%, rgba(60, 71, 63, 0.42) 0%, rgba(28, 34, 30, 0.95) 100%), url('/assets/bhikshu-stone-bg.jpg')`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }
                : undefined
            }
          >
            {/* 1. Top: Business Logo Centered */}
            <div className="h-16 w-full flex items-center justify-center mb-1">
              {logoToDisplay ? (
                <div className="relative h-14 w-full max-w-[200px] flex items-center justify-center">
                  <Image
                    src={logoToDisplay}
                    alt={business.name}
                    width={180}
                    height={56}
                    className="object-contain max-h-14 w-auto select-none"
                    priority
                    unoptimized
                  />
                </div>
              ) : (
                <div 
                  className="h-12 px-4 rounded-xl text-white flex items-center justify-center font-bold text-sm shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {business.name}
                </div>
              )}
            </div>

            {/* 2. Center: Large, High-Contrast Scannable QR Code */}
            <div className="w-[230px] h-[230px] sm:w-[250px] sm:h-[250px] flex items-center justify-center my-1.5">
              {qrSvg ? (
                <div
                  className={`flex items-center justify-center w-full h-full ${
                    standTheme === "stone"
                      ? "bg-white p-3 sm:p-3.5 rounded-[26px] shadow-xl ring-1 ring-black/5"
                      : "bg-white p-1 rounded-2xl"
                  }`}
                >
                  <div
                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                    className="w-full h-full flex items-center justify-center [&>svg]:w-full [&>svg]:h-full [&>svg]:rounded-[18px]"
                  />
                </div>
              ) : (
                <div className="text-xs text-slate-400 font-medium">Generating QR...</div>
              )}
            </div>

            {/* 3. Bottom: Official Google Logo + 5 Stars + Exact Caption */}
            <div className="flex flex-col items-center mt-2 space-y-1.5">
              <GoogleLogo className="h-6 w-auto" />

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#FBBC04] text-[#FBBC04]"
                  />
                ))}
              </div>

              <p
                className={`text-[12px] sm:text-[13px] font-normal leading-snug text-center tracking-tight pt-0.5 ${
                  standTheme === "stone" ? "text-white font-dm" : "text-slate-800 font-sans"
                }`}
              >
                Scan the QR code above, to leave<br />us a review.
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full print:hidden">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Point phone camera at code to open mobile software</span>
          </div>
        </div>

        {/* Right Column: Clean Controls & Live Mobile URL */}
        <div className="lg:col-span-6 space-y-5 print:hidden">
          {/* Stand Finish Selector */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-slate-400" />
              <span>Stand Finish / Paper Theme</span>
            </h3>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setStandTheme("white")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  standTheme === "white"
                    ? "border-slate-800 bg-slate-50 text-slate-900 ring-2 ring-slate-800/20 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white border border-slate-300 shadow-xs mb-1.5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-slate-800" />
                </div>
                <div className="text-xs font-bold">Classic White Acrylic</div>
                <div className="text-[10px] text-slate-500 mt-0.5">High-contrast for office & color printing</div>
              </button>

              <button
                type="button"
                onClick={() => setStandTheme("stone")}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  standTheme === "stone"
                    ? "border-slate-800 bg-slate-50 text-slate-900 ring-2 ring-slate-800/20 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-[#1F2723] border border-[#3A463E] shadow-xs mb-1.5 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[#9C7A3C]" />
                </div>
                <div className="text-xs font-bold">Zen Stone Slate</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Dark charcoal matching studio decor</div>
              </button>
            </div>
          </div>

          {/* Print & Download Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Print & Export Stand
            </h3>

            <Button
              onClick={handlePrint}
              className="w-full h-11 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm text-xs uppercase tracking-wide transition-opacity hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              <Printer className="w-4 h-4" />
              <span>Print Tabletop Stand (Acrylic Size)</span>
            </Button>

            <div className="grid grid-cols-2 gap-2.5">
              <Button
                onClick={handleDownloadPng}
                disabled={downloading}
                variant="outline"
                className="h-10 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download PNG (1024px)</span>
              </Button>

              <Button
                onClick={handleDownloadSvg}
                variant="outline"
                className="h-10 border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download SVG (Vector)</span>
              </Button>
            </div>
          </div>

          {/* QR Destination Target */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Scan Destination Target
              </h3>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                {destinationMode === "software" ? "Mobile Software Live" : "Direct Google"}
              </span>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => setDestinationMode("software")}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  destinationMode === "software"
                    ? "border-slate-800 bg-slate-50 text-slate-900 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                  destinationMode === "software" ? "border-slate-800 bg-slate-800" : "border-slate-300"
                }`}>
                  {destinationMode === "software" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                  <div className="text-xs font-bold flex items-center gap-2">
                    <span>TrueReview Mobile Software (/r/{slug})</span>
                    <span className="text-[9px] font-bold uppercase bg-emerald-600 text-white px-1.5 py-0.2 rounded">Recommended</span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                    Scanning opens your branded mobile review assistant with course tags, AI drafting, and 1-tap copy & Google redirect.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setDestinationMode("google")}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  destinationMode === "google"
                    ? "border-slate-800 bg-slate-50 text-slate-900 shadow-sm"
                    : "border-slate-200 hover:border-slate-300 bg-white text-slate-700"
                }`}
              >
                <div className={`w-4 h-4 rounded-full mt-0.5 border flex items-center justify-center shrink-0 ${
                  destinationMode === "google" ? "border-slate-800 bg-slate-800" : "border-slate-300"
                }`}>
                  {destinationMode === "google" && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <div>
                  <div className="text-xs font-bold">Direct Google Review Composer Box</div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed font-normal">
                    Bypasses software and immediately opens the Google review input box.
                  </p>
                </div>
              </button>
            </div>

            {/* Public Phone Host Input */}
            {destinationMode === "software" && (
              <div className="pt-2 border-t border-slate-100 space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Public HTTPS Host (for mobile scanning):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={publicHost}
                    onChange={(e) => setPublicHost(e.target.value)}
                    className="w-full text-xs font-mono bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-slate-400"
                    placeholder="https://..."
                  />
                </div>
                <p className="text-[10px] text-slate-400">
                  Powered by Cloudflare Quick Tunnel. Any smartphone camera can scan this URL.
                </p>
              </div>
            )}
          </div>

          {/* Business Palette & QR Styling */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-slate-400" />
                <span>QR Color Styling</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500 font-semibold">
                {primaryColor}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-600">
              <span>QR Color:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQrColorChoice("black")}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    qrColorChoice === "black"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Classic Black (Photo Match)
                </button>
                <button
                  type="button"
                  onClick={() => setQrColorChoice("brand")}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all ${
                    qrColorChoice === "brand"
                      ? "text-white border-transparent"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                  style={qrColorChoice === "brand" ? { backgroundColor: primaryColor } : {}}
                >
                  Brand Primary Color
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
              <span>QR Module Shape:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQrStyle("rounded")}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    qrStyle === "rounded"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Rounded (Perfect Modern)
                </button>
                <button
                  type="button"
                  onClick={() => setQrStyle("classic")}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                    qrStyle === "classic"
                      ? "bg-slate-900 text-white border-slate-900 shadow-sm"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  Classic Square
                </button>
              </div>
            </div>
          </div>

          {/* Encoded URL Box */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Target Link Encoded in Stand
              </span>
              <span className="text-xs font-mono text-slate-800 truncate block font-medium">
                {activeUrl}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={copyScanUrl}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
              >
                {copiedLink ? "Copied!" : "Copy"}
              </button>

              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
