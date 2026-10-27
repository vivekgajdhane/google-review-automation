"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicBusinessData, PHOENIX_TECH_BUSINESS } from "@/types/public-business";
import { getRegisteredBusiness } from "@/data/businesses";
import { generateReviewDraft, ReviewLanguage } from "@/lib/ai-review-generator";
import {
  Star,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  Globe,
  Instagram,
  MapPin,
  Phone,
  MessageCircle,
  UserPlus,
  RefreshCw,
  Share2
} from "lucide-react";

import { BhikshuReviewInterface } from "@/components/bhikshu/BhikshuReviewInterface";
import { NaadReviewInterface } from "@/components/naad/NaadReviewInterface";

function GenericBusinessReviewPage({ slug }: { slug: string }) {
  // Instant synchronous profile loading - 0ms delay, no layout shift or lag
  const [business, setBusiness] = React.useState<PublicBusinessData>(() =>
    getRegisteredBusiness(slug)
  );
  const [loading, setLoading] = React.useState(false);

  // AI Review Assistant States
  const [selectedCourse, setSelectedCourse] = React.useState<string>(() =>
    getRegisteredBusiness(slug).courseOptions?.[0] || "MS-CIT Certification"
  );
  const [selectedHighlights, setSelectedHighlights] = React.useState<string[]>([
    "Expert Faculty & Mentorship",
    "Modern Hands-on Lab"
  ]);
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  
  // Pre-generate draft on first render so user never sees an empty box or delay
  const [generatedDraft, setGeneratedDraft] = React.useState<string>(() => {
    const biz = getRegisteredBusiness(slug);
    return generateReviewDraft({
      businessName: biz.name,
      course: biz.courseOptions?.[0] || "MS-CIT Certification",
      highlights: ["Expert Faculty & Mentorship", "Modern Hands-on Lab"],
      language: "en"
    });
  });
  const [copied, setCopied] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Automatically expand textarea so user never has to scroll vertically
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(88, textareaRef.current.scrollHeight)}px`;
    }
  }, [generatedDraft]);

  // Fetch business or use pre-configured profile
  React.useEffect(() => {
    let isMounted = true;
    async function loadBusiness() {
      try {
        const res = await fetch(`/api/public/business/${encodeURIComponent(slug)}`);
        if (res.ok) {
          const data = await res.json();
          if (isMounted && data) {
            setBusiness(data);
            if (data.courseOptions?.[0]) setSelectedCourse(data.courseOptions[0]);
          }
        }
      } catch {
        // Fallback to Phoenix Tech
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBusiness();

    // Session-based pageview event
    const sessionKey = `truereview_view_${slug}`;
    if (!sessionStorage.getItem(sessionKey)) {
      sessionStorage.setItem(sessionKey, "1");
      fetch("/api/public/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, eventName: "public_page_view" }),
      }).catch(() => {});
    }

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Regenerate draft on option change
  React.useEffect(() => {
    if (!business?.name) return;
    const draft = generateReviewDraft({
      businessName: business.name,
      course: selectedCourse,
      highlights: selectedHighlights,
      language: language
    });
    setGeneratedDraft(draft);
  }, [business?.name, selectedCourse, selectedHighlights, language]);

  const toggleHighlight = (highlight: string) => {
    setSelectedHighlights(prev => {
      if (prev.includes(highlight)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter(h => h !== highlight);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), highlight];
        }
        return [...prev, highlight];
      }
    });
  };

  const handleRegenerate = () => {
    if (!business?.name) return;
    const draft = generateReviewDraft({
      businessName: business.name,
      course: selectedCourse,
      highlights: selectedHighlights,
      language: language
    });
    setGeneratedDraft(draft);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // 1-Tap Copy & Redirect directly to Google review composer box
  const handleCopyAndOpenGoogle = async () => {
    const textToCopy = generatedDraft;
    let copySuccessful = false;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        copySuccessful = true;
      }
    } catch {
      // Fallback below
    }

    if (!copySuccessful) {
      try {
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = textToCopy;
        tempTextArea.style.position = "fixed";
        tempTextArea.style.left = "-999999px";
        tempTextArea.style.top = "-999999px";
        document.body.appendChild(tempTextArea);
        tempTextArea.focus();
        tempTextArea.select();
        document.execCommand("copy");
        document.body.removeChild(tempTextArea);
        copySuccessful = true;
      } catch {
        // Safe silent fail
      }
    }

    setCopied(true);
    showToast("📋 Review draft copied! Opening Google review box...");

    fetch("/api/public/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, eventName: "google_review_click" }),
    }).catch(() => {});

    const targetUrl =
      business.googleReviewUrl ||
      "https://search.google.com/local/writereview?placeid=ChIJrW2Ak0WhsYgR_IE53lu0Jqg";

    setTimeout(() => {
      setCopied(false);
      window.location.href = targetUrl;
    }, 250);
  };

  // Download vCard
  const handleDownloadVcard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${business.name}
ORG:${business.name}
TEL;TYPE=WORK,VOICE:${business.phone || "+91 96899 76453"}
EMAIL:${business.email || (business.slug === "bhikshu-tattoo" ? "bhikshutattoo.gmb@gmail.com" : "info@phoenix-tech.in")}
URL:${business.websiteUrl || "https://phoenix-tech.in"}
ADR;TYPE=WORK:;;${business.address || "Pune, Maharashtra"};Pune;Maharashtra;411014;India
NOTE:${business.tagline || "Smart Customer Review & Connect Hub"}
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📇 Contact card saved to phone!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: business.name,
          text: `Check out ${business.name} on Google Reviews!`,
          url: window.location.href,
        });
      } catch {
        // Dismissed
      }
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast("Link copied to clipboard!");
    }
  };

  const primaryColor = business.primaryColor || "#045d17";
  const accentColor = business.accentColor || "#fff3d7";

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 antialiased font-sans transition-colors"
      style={{ backgroundColor: accentColor, color: business.slug === "phoenix-tech" ? "#08210d" : "#1c221e" }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed top-5 z-50 max-w-sm px-5 py-3.5 text-white font-semibold rounded-2xl shadow-2xl flex items-center gap-3 border-2 animate-in fade-in slide-in-from-top-4 duration-300"
          style={{ backgroundColor: primaryColor, borderColor: accentColor }}
        >
          <Sparkles className="w-5 h-5 shrink-0 text-white" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-md mx-auto space-y-5 pb-12 pt-2">
        {/* Top Header Card */}
        <div 
          className="relative overflow-hidden rounded-[28px] bg-white border-2 p-6 text-center shadow-xl"
          style={{ borderColor: `${primaryColor}25` }}
        >
          {/* Subtle Accent Glow */}
          <div 
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none"
            style={{ backgroundColor: `${primaryColor}15` }}
          />

          {/* Logo / Brand Header */}
          <div className="relative flex flex-col items-center">
            {business.logoPath ? (
              <div 
                className="relative h-20 w-full max-w-[240px] mb-3 rounded-2xl overflow-hidden bg-white border shadow-md p-2 flex items-center justify-center"
                style={{ borderColor: `${primaryColor}30` }}
              >
                <Image
                  src={business.logoPath}
                  alt={business.name}
                  width={220}
                  height={76}
                  className="object-contain max-h-16 w-auto"
                  priority
                  unoptimized
                />
              </div>
            ) : (
              <div 
                className="w-20 h-20 mb-3 rounded-2xl text-white flex items-center justify-center font-extrabold text-2xl shadow-md"
                style={{ backgroundColor: primaryColor }}
              >
                {business.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <h1 
              className="text-2xl sm:text-[26px] font-black tracking-tight uppercase"
              style={{ color: primaryColor }}
            >
              {business.name}
            </h1>

            <p className="mt-1 text-xs text-slate-700 font-semibold tracking-wide">
              {business.tagline || `${business.category || "Business"} • Pune`}
            </p>

            {/* Google Rating Pill */}
            <div 
              className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs shadow-sm"
              style={{ backgroundColor: accentColor, borderColor: `${primaryColor}30` }}
            >
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <span className="font-extrabold" style={{ color: primaryColor }}>{business.rating || 5.0}</span>
              <span className="text-slate-600 font-medium">({business.reviewCount || "400+"} Google Reviews)</span>
            </div>

            <p className="mt-3 text-xs text-slate-700 leading-relaxed max-w-xs font-medium">
              {business.welcomeMessage}
            </p>
          </div>
        </div>

        {/* AI Review Generator Section (Invyrah-Style 5-Second Review Builder) */}
        <div 
          className="rounded-[28px] bg-white border p-5 shadow-xl space-y-4"
          style={{ borderColor: `${primaryColor}20` }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div 
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 
                  className="text-sm font-extrabold uppercase tracking-wide"
                  style={{ color: primaryColor }}
                >
                  AI Review Assistant
                </h2>
                <p className="text-[11px] text-slate-600 font-medium">
                  Not sure what to write? Build in 5 seconds
                </p>
              </div>
            </div>
            <Badge 
              className="border text-[10px] font-bold px-2 py-0.5"
              style={{ backgroundColor: accentColor, color: primaryColor, borderColor: `${primaryColor}30` }}
            >
              5 SEC
            </Badge>
          </div>

          {/* Step 1: Select Course / Service */}
          {business.courseOptions && business.courseOptions.length > 0 && (
            <div className="space-y-1.5">
              <label 
                className="text-[11px] font-bold uppercase tracking-wider block"
                style={{ color: primaryColor }}
              >
                {business.category?.toLowerCase().includes("tattoo") 
                  ? "1. Select Tattoo Style / Service"
                  : business.category?.toLowerCase().includes("dental") || business.category?.toLowerCase().includes("clinic")
                  ? "1. Select Treatment / Service"
                  : "1. Select Course / Program"}
              </label>
              <div className="flex flex-wrap gap-1.5">
                {business.courseOptions.map((course) => {
                  const isSelected = selectedCourse === course;
                  return (
                    <button
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                        isSelected
                          ? "text-white shadow-md scale-[1.02]"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                      }`}
                      style={isSelected ? { backgroundColor: primaryColor } : {}}
                    >
                      {course}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Select Highlights */}
          {business.highlightOptions && business.highlightOptions.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label 
                  className="text-[11px] font-bold uppercase tracking-wider block"
                  style={{ color: primaryColor }}
                >
                  2. What stood out the most?
                </label>
                <span className="text-[10px] text-[#08210d]/60 font-semibold">Pick up to 3</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {business.highlightOptions.map((hl) => {
                  const isSelected = selectedHighlights.includes(hl);
                  return (
                    <button
                      key={hl}
                      onClick={() => toggleHighlight(hl)}
                      className={`text-xs px-2.5 py-1.5 rounded-xl font-semibold transition-all ${
                        isSelected
                          ? "border-2 font-bold"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                      }`}
                      style={isSelected ? { 
                        borderColor: primaryColor, 
                        color: primaryColor, 
                        backgroundColor: `${primaryColor}15` 
                      } : {}}
                    >
                      {isSelected ? "✓ " : "+ "}
                      {hl}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3: Choose Language */}
          <div className="space-y-1.5">
            <label 
              className="text-[11px] font-bold uppercase tracking-wider block"
              style={{ color: primaryColor }}
            >
              3. Review Language
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { id: "en", label: "English" },
                { id: "hinglish", label: "Hinglish" },
                { id: "hi", label: "हिंदी" },
                { id: "mr", label: "मराठी" },
              ].map((lang) => {
                const isSelected = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id as ReviewLanguage)}
                    className={`text-xs py-1.5 rounded-xl text-center font-bold transition-all ${
                      isSelected
                        ? "text-white shadow-md"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
                    }`}
                    style={isSelected ? { backgroundColor: primaryColor } : {}}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generated Draft Box (Minimal, Full-view, Zero-scroll) */}
          <div 
            className="mt-3 relative rounded-2xl bg-white border p-4 shadow-sm space-y-3"
            style={{ borderColor: `${primaryColor}30` }}
          >
            <div className="flex items-center justify-between text-xs pb-2 border-b border-slate-100">
              <span 
                className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-[11px]"
                style={{ color: primaryColor }}
              >
                <Sparkles className="w-3.5 h-3.5" style={{ color: primaryColor }} />
                Generated Review Draft
              </span>
              <button
                type="button"
                onClick={handleRegenerate}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md hover:opacity-80 transition-colors"
                style={{ color: primaryColor, backgroundColor: `${primaryColor}10` }}
              >
                <RefreshCw className="w-3 h-3" />
                <span>Shuffle</span>
              </button>
            </div>

            <textarea
              ref={textareaRef}
              value={generatedDraft}
              onChange={(e) => {
                setGeneratedDraft(e.target.value);
                if (textareaRef.current) {
                  textareaRef.current.style.height = "auto";
                  textareaRef.current.style.height = `${Math.max(88, textareaRef.current.scrollHeight)}px`;
                }
              }}
              className="w-full text-sm font-normal text-slate-800 bg-transparent resize-none overflow-hidden border-none p-0 focus:outline-none focus:ring-0 leading-relaxed font-sans not-italic"
              placeholder="Your review draft will appear here..."
            />

            {/* Copy & Redirect Button */}
            <Button
              onClick={handleCopyAndOpenGoogle}
              className="w-full h-11 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 uppercase tracking-wide hover:opacity-90"
              style={{ backgroundColor: primaryColor }}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Copied! Opening Google...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>Copy Draft & Open Google Reviews</span>
                  <ExternalLink className="w-3.5 h-3.5 text-white" />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Minimal Social & Touchpoint Connect Bar (Exact 5 Icons Matching Business Theme) */}
        <div className="py-2 flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center justify-center gap-3.5 sm:gap-4.5">
            {/* 1. Instagram */}
            <a
              href={business.instagram1 || "https://www.instagram.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Follow on Instagram"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              style={{ color: primaryColor }}
            >
              <Instagram className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
            </a>

            {/* 2. Facebook */}
            <a
              href={business.facebookUrl || business.instagram2 || "https://www.facebook.com/"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Follow on Facebook"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              style={{ color: primaryColor }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* 3. Add Contact (vCard Direct Download) */}
            <button
              onClick={handleDownloadVcard}
              type="button"
              aria-label="Save Contact"
              title="Save Contact to Phone"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group cursor-pointer"
              style={{ color: primaryColor }}
            >
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
            </button>

            {/* 4. WhatsApp */}
            <a
              href={
                business.whatsapp
                  ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                      `Hi ${business.name}, I would like to enquire about your services.`
                    )}`
                  : "https://web.whatsapp.com/"
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              style={{ color: primaryColor }}
            >
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 sm:w-6 sm:h-6 fill-current group-hover:scale-110 transition-transform"
              >
                <path d="M12.04 2C6.51 2 2.02 6.49 2.02 12.02c0 1.98.58 3.84 1.58 5.41L2 22l4.74-1.54a9.98 9.98 0 0 0 5.3 1.51h.005c5.52 0 10.01-4.49 10.01-10.02C22.05 6.48 17.56 2 12.04 2zm0 18.34a8.31 8.31 0 0 1-4.24-1.16l-.3-.18-3.15 1.02 1.05-3.07-.2-.32a8.32 8.32 0 0 1-1.27-4.63c0-4.6 3.74-8.34 8.34-8.34 4.6 0 8.34 3.74 8.34 8.34 0 4.6-3.74 8.34-8.34 8.34zm4.56-6.19c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.12-.56.13-.17.25-.65.81-.79.98-.15.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.36-.77-1.86-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.09s.9 2.42 1.02 2.59c.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.48-.61 1.69-1.19.21-.59.21-1.09.15-1.19-.06-.11-.23-.17-.48-.29z"/>
              </svg>
            </a>

            {/* 5. Official Website */}
            <a
              href={business.websiteUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              title="Visit Official Website"
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.06)] hover:shadow-md flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group"
              style={{ color: primaryColor }}
            >
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8] group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 pb-6 space-y-1">
          <p className="text-[12px] font-bold tracking-wide" style={{ color: primaryColor }}>
            {business.name} • Smart Review & Connect Hub
          </p>
          <p className="text-[11px] text-slate-500 font-medium">
            Powered by TrueReview Connect
          </p>
        </div>
      </main>
    </div>
  );
}

export default function PublicBusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = React.use(params);
  const slug = resolvedParams?.slug || "bhikshu-tattoo";

  // Dedicated custom interface for Naad Jamroom & Studio
  if (slug === "naadjamroom" || slug === "naad-jamroom" || slug === "naad") {
    return <NaadReviewInterface business={getRegisteredBusiness("naadjamroom")} />;
  }

  // Dedicated custom interface for Bhikshu Tattoo Studio
  if (slug === "bhikshu-tattoo") {
    return <BhikshuReviewInterface business={getRegisteredBusiness("bhikshu-tattoo")} />;
  }

  return <GenericBusinessReviewPage slug={slug} />;
}
