"use client";

import * as React from "react";
import Image from "next/image";
import { PublicBusinessData, PHOENIX_TECH_BUSINESS } from "@/types/public-business";
import { generateReviewDraft, ReviewLanguage } from "@/lib/ai-review-generator";
import {
  Star,
  Check,
  RefreshCw,
  Instagram,
  Phone,
  Globe
} from "lucide-react";

export interface PhoenixReviewInterfaceProps {
  business?: PublicBusinessData;
}

// Exactly the 3 key feedback points for Phoenix-Tech Academy
const KEY_FEEDBACK_POINTS = [
  "Expert Faculty & Mentorship",
  "Modern Hands-on Lab",
  "Practical Real Projects"
];

function GoogleGIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4 shrink-0" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.031 2C6.495 2 2 6.494 2 12.029c0 1.97.57 3.824 1.564 5.405L2 22l4.73-1.524a10.007 10.007 0 0 0 5.301 1.553h.004c5.534 0 10.03-4.495 10.03-10.03C22.065 6.494 17.568 2 12.031 2zm0 18.337h-.003a8.318 8.318 0 0 1-4.24-1.16l-.304-.18-3.153 1.015 1.042-3.07-.198-.315a8.27 8.27 0 0 1-1.272-4.598c0-4.59 3.737-8.326 8.33-8.326a8.283 8.283 0 0 1 5.888 2.441 8.28 8.28 0 0 1 2.438 5.889c0 4.59-3.738 8.325-8.328 8.325zm4.568-6.236c-.25-.125-1.482-.731-1.712-.814-.23-.083-.397-.125-.564.125-.167.25-.646.814-.792.98-.146.166-.292.187-.542.062-.25-.125-1.056-.39-2.012-1.242-.744-.664-1.246-1.484-1.392-1.734-.146-.25-.016-.385.11-.51.112-.112.25-.291.375-.437.125-.146.167-.25.25-.417.083-.166.042-.312-.021-.437-.063-.125-.563-1.355-.771-1.855-.203-.487-.41-.421-.564-.429l-.48-.008c-.167 0-.438.063-.667.312-.23.25-.876.856-.876 2.086 0 1.23.896 2.418 1.021 2.585.125.166 1.764 2.693 4.274 3.777.597.258 1.064.412 1.428.528.6.19 1.145.163 1.576.099.48-.072 1.482-.605 1.69-1.189.209-.584.209-1.084.146-1.189-.062-.104-.229-.166-.479-.291z" />
    </svg>
  );
}

export function PhoenixReviewInterface({
  business = PHOENIX_TECH_BUSINESS
}: PhoenixReviewInterfaceProps) {
  // 3 Key feedback points state
  const [selectedHighlights, setSelectedHighlights] = React.useState<string[]>([
    "Expert Faculty & Mentorship",
    "Modern Hands-on Lab"
  ]);

  // Review language state
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  const [generatedDraft, setGeneratedDraft] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [refreshRotation, setRefreshRotation] = React.useState<number>(0);

  // Micro-interaction trigger for 5-star rating shimmer
  const [starBurstTrigger, setStarBurstTrigger] = React.useState<number>(0);

  // Custom scrollbar tracking for review box
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);
  const [scrollThumb, setScrollThumb] = React.useState<{ top: number; height: number }>({
    top: 0,
    height: 35
  });
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Recalculate custom scrollbar thumb size and position
  const updateScrollIndicator = React.useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    const clientH = el.clientHeight;
    const scrollH = el.scrollHeight;
    const scrollT = el.scrollTop;

    if (scrollH > clientH) {
      const heightPct = Math.max(20, Math.min(75, (clientH / scrollH) * 100));
      const maxScroll = scrollH - clientH;
      const topPct = maxScroll > 0 ? (scrollT / maxScroll) * (100 - heightPct) : 0;
      setScrollThumb({ top: topPct, height: heightPct });
    } else {
      setScrollThumb({ top: 0, height: 100 });
    }
  }, []);

  const handleTextareaScroll = () => {
    setIsScrolling(true);
    updateScrollIndicator();
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 700);
  };

  // Toast banner helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  // Regenerate draft on highlight or language change
  const triggerReviewGeneration = React.useCallback(
    (nextHighlights?: string[], nextLang?: ReviewLanguage) => {
      const activeHighlights = nextHighlights || selectedHighlights;
      const activeLang = nextLang || language;

      const draft = generateReviewDraft({
        businessName: business.name,
        course: "Computer Training & Skill Development",
        highlights: activeHighlights.length > 0 ? activeHighlights : ["Expert Faculty & Mentorship"],
        language: activeLang
      });

      setGeneratedDraft(draft);

      // Trigger dynamic star micro-interaction
      setStarBurstTrigger((prev) => prev + 1);

      setTimeout(() => {
        updateScrollIndicator();
      }, 50);
    },
    [business.name, selectedHighlights, language, updateScrollIndicator]
  );

  // Initial draft generation on first render
  React.useEffect(() => {
    triggerReviewGeneration();
  }, [triggerReviewGeneration]);

  // Toggle feedback highlight
  const toggleHighlight = (hl: string) => {
    let next: string[];
    if (selectedHighlights.includes(hl)) {
      next = selectedHighlights.filter((h) => h !== hl);
      if (next.length === 0) next = [hl]; // keep at least 1 active
    } else {
      next = [...selectedHighlights, hl];
    }
    setSelectedHighlights(next);
    triggerReviewGeneration(next, language);
  };

  // Shuffle button handler
  const handleShuffle = () => {
    setRefreshRotation((prev) => prev + 360);
    triggerReviewGeneration();
    showToast("✨ Fresh review draft generated!");
  };

  // 1-Tap Copy & Redirect to Google Review Composer Modal
  const handleCopyAndOpenGoogle = async () => {
    const textToCopy = generatedDraft;
    let copySuccessful = false;

    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        copySuccessful = true;
      }
    } catch {
      copySuccessful = false;
    }

    if (!copySuccessful) {
      try {
        const temp = document.createElement("textarea");
        temp.value = textToCopy;
        temp.style.position = "fixed";
        temp.style.left = "-9999px";
        temp.style.top = "-9999px";
        document.body.appendChild(temp);
        temp.focus();
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        copySuccessful = true;
      } catch {
        copySuccessful = false;
      }
    }

    setCopied(true);
    showToast(
      copySuccessful
        ? "📋 Review draft copied! Opening Google review box..."
        : "Opening Google review box..."
    );

    fetch("/api/public/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: business.slug, eventName: "google_review_click" }),
    }).catch(() => {});

    const targetUrl =
      business.googleReviewUrl ||
      "https://search.google.com/local/writereview?placeid=ChIJrW2Ak0WhsYgR_IE53lu0Jqg";

    setTimeout(() => {
      setCopied(false);
      window.location.href = targetUrl;
    }, 400);
  };

  return (
    <div
      className="min-h-screen text-[#08210d] font-sora flex flex-col items-center justify-start p-4 sm:p-6 antialiased relative overflow-x-hidden bg-[#fff3d7]"
      style={{
        backgroundColor: "#fff3d7",
        fontFamily: "'Sora', sans-serif"
      }}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 px-5 py-3.5 bg-[#045d17] text-[#FFFFFF] font-sora font-semibold text-xs rounded-2xl shadow-2xl flex items-center justify-center gap-2 border border-[#fff3d7]/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top-Right "POWERED BY @phoenixtech.co" Badge */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-6 z-30 select-none">
        <a
          href="https://www.instagram.com/phoenixtech.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 hover:bg-white border border-[#045d17]/20 hover:border-[#045d17]/50 backdrop-blur-md shadow-[0_2px_8px_rgba(4,93,23,0.12)] transition-all duration-200 group active:scale-95 font-sora cursor-pointer"
          title="Powered by @phoenixtech.co"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#045d17] group-hover:scale-125 transition-transform duration-200" />
          <span className="text-[9px] uppercase tracking-[0.14em] text-slate-500 font-semibold group-hover:text-slate-800 transition-colors">
            POWERED BY
          </span>
          <span className="text-[10px] text-[#045d17] font-extrabold tracking-normal group-hover:underline transition-colors">
            @phoenixtech.co
          </span>
        </a>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[420px] mx-auto flex flex-col items-center space-y-4 py-6 relative z-10 font-sora">
        {/* =========================================================================
            TOP LOGO (CLEAN ORIGINAL EMBLEM - COMPACT & PRISTINE)
            ========================================================================= */}
        <div className="relative flex flex-col items-center justify-center pt-2 pb-0.5 select-none">
          <div className="relative w-[96px] h-[77px] flex items-center justify-center drop-shadow-[0_4px_12px_rgba(4,93,23,0.18)]">
            <Image
              src="/assets/phoenix-emblem-clean.png"
              alt="Phoenix-Tech Academy Emblem"
              width={192}
              height={154}
              className="w-full h-full object-contain pointer-events-none select-none"
              priority
              unoptimized
            />
          </div>
        </div>

        {/* =========================================================================
            COMPONENT 2: COMPANY HEADER & CENTER-STAGE STARS
            ========================================================================= */}
        <div className="flex flex-col items-center text-center space-y-1.5 w-full pt-1">
          {/* Brand Name rendered strictly in Sora font */}
          <h1 className="font-sora text-[22px] sm:text-2xl font-black tracking-tight text-[#045d17] uppercase">
            {business.name}
          </h1>

          {/* Address Line directly below company name: SOLID BLACK (#000000) */}
          <p className="font-sora text-xs font-semibold text-[#000000] tracking-wide">
            Sayyad Nagar, Hadapsar, Pune, Maharashtra 411028
          </p>

          {/* Star Ratings: Center stage of header layout (No "140 reviews" text) */}
          <div className="flex items-center justify-center pt-2 pb-1">
            <div
              key={starBurstTrigger}
              className="flex items-center gap-1.5 text-[#E0A93B] animate-star-shimmer"
            >
              {[1, 2, 3, 4, 5].map((starVal) => (
                <Star
                  key={starVal}
                  className="w-6 h-6 fill-[#E0A93B] text-[#E0A93B] drop-shadow-[0_2px_4px_rgba(224,169,59,0.35)]"
                />
              ))}
            </div>
          </div>
          {/* Tagline row completely removed; space balanced with intentional padding */}
        </div>

        {/* =========================================================================
            COMPONENT 3 & 4: 3 KEY FEEDBACK POINTS (NO "AI ASSISTANT", NO "COURSE")
            ========================================================================= */}
        <div className="w-full flex flex-wrap items-center justify-center gap-2 pt-1 pb-1">
          {KEY_FEEDBACK_POINTS.map((hl) => {
            const isSelected = selectedHighlights.includes(hl);
            return (
              <button
                key={hl}
                type="button"
                onClick={() => toggleHighlight(hl)}
                className={`font-sora text-[11px] sm:text-xs font-bold tracking-wide px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#045d17] text-white shadow-md scale-[1.02] border border-[#045d17]"
                    : "bg-white/90 text-slate-700 hover:text-[#045d17] border border-slate-300 hover:border-[#045d17]/50 shadow-sm"
                }`}
              >
                {isSelected ? "✓ " : "+ "}
                {hl}
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            COMPONENT 4: REPLICATED BHIKSHU REVIEW BOX FRAMEWORK
            ========================================================================= */}
        <div className="w-full bg-white border border-[#045d17]/25 rounded-[24px] p-5 sm:p-6 shadow-xl relative space-y-4">
          {/* Header inside Card: "— YOUR REVIEW —" */}
          <div className="text-center">
            <span className="font-sora text-[11px] uppercase tracking-[0.22em] text-[#045d17] font-bold">
              — YOUR REVIEW —
            </span>
          </div>

          {/* Editable Review Draft Body Text with Custom Slide Line & Auto-Fading Bar */}
          <div className="relative w-full">
            <textarea
              ref={textareaRef}
              value={generatedDraft}
              onChange={(e) => {
                setGeneratedDraft(e.target.value);
                updateScrollIndicator();
              }}
              onScroll={handleTextareaScroll}
              onTouchMove={handleTextareaScroll}
              className="w-full h-[120px] sm:h-[130px] text-sm sm:text-[15px] font-sora text-slate-800 bg-transparent resize-none overflow-y-auto border-none p-0 pr-4 focus:outline-none focus:ring-0 leading-relaxed tracking-normal font-normal text-left placeholder:text-slate-400 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              placeholder="Your review draft will appear here..."
              rows={4}
            />

            {/* Slide Line (Always Visible) & Scroll Bar Thumb (Visible when Customer Scrolls) */}
            <div
              className="absolute right-0 top-1 bottom-1 w-[3px] bg-slate-200 rounded-full pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Dynamic Sliding Bar Thumb */}
              <div
                className={`w-full rounded-full bg-[#045d17] shadow-[0_0_8px_rgba(4,93,23,0.4)] transition-opacity duration-300 ${
                  isScrolling ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  top: `${scrollThumb.top}%`,
                  height: `${scrollThumb.height}%`,
                  position: "absolute"
                }}
              />
            </div>
          </div>

          {/* Action Row: Left (Solid Forest Green Button with Google G Icon) + Right (Square Refresh Button) */}
          <div className="pt-2 flex items-center gap-2.5">
            {/* Primary Action Button */}
            <button
              onClick={handleCopyAndOpenGoogle}
              className="flex-1 h-12 bg-[#045d17] hover:bg-[#034d13] active:scale-[0.99] text-white font-sora font-extrabold text-[12px] sm:text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 px-4 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white shrink-0" />
                  <span>COPIED! OPENING GOOGLE...</span>
                </>
              ) : (
                <>
                  <GoogleGIcon className="w-4 h-4 shrink-0 drop-shadow-sm" />
                  <span>POST TO GOOGLE</span>
                </>
              )}
            </button>

            {/* Refresh / Shuffle Button with Circular Spin Animation */}
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Generate another review"
              title="Shuffle another review draft"
              className="w-12 h-12 bg-slate-100 hover:bg-slate-200 active:scale-95 border border-slate-200 rounded-xl flex items-center justify-center text-slate-700 transition-all cursor-pointer shrink-0"
            >
              <RefreshCw
                className="w-4 h-4 text-[#045d17] hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `rotate(${refreshRotation}deg)` }}
              />
            </button>
          </div>
        </div>

        {/* =========================================================================
            COMPONENT 4: LANGUAGE SELECTION REALIGNED DIRECTLY UNDERNEATH REVIEW BOX
            ========================================================================= */}
        <div className="flex items-center justify-center gap-3 text-xs font-sora text-slate-600 pt-0.5">
          {[
            { code: "en" as ReviewLanguage, label: "English" },
            { code: "hinglish" as ReviewLanguage, label: "Hinglish" },
            { code: "hi" as ReviewLanguage, label: "हिंदी" },
            { code: "mr" as ReviewLanguage, label: "मराठी" }
          ].map((l, idx, arr) => (
            <React.Fragment key={l.code}>
              <button
                onClick={() => {
                  setLanguage(l.code);
                  triggerReviewGeneration(selectedHighlights, l.code);
                }}
                className={`font-bold tracking-wider transition-colors cursor-pointer ${
                  language === l.code
                    ? "text-[#045d17] underline underline-offset-4 decoration-[#045d17] decoration-2"
                    : "text-slate-600 hover:text-[#045d17]"
                }`}
              >
                {l.label}
              </button>
              {idx < arr.length - 1 && <span className="text-slate-400 select-none">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* =========================================================================
            BOTTOM TOUCHPOINT ICONS (MATCHING PHOENIX THEME)
            ========================================================================= */}
        <div className="flex items-center justify-center gap-3.5 pt-3">
          {/* Instagram 1 */}
          <a
            href={business.instagram1 || "https://www.instagram.com/phoenixtechacademy/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @phoenixtechacademy"
            title="Follow @phoenixtechacademy on Instagram"
            className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#045d17] hover:text-[#034d13] hover:border-[#045d17] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Facebook */}
          <a
            href={business.facebookUrl || "https://www.facebook.com/phoenixtechacademy/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook @phoenixtechacademy"
            title="Follow on Facebook"
            className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#045d17] hover:text-[#034d13] hover:border-[#045d17] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Direct Phone Link */}
          <a
            href={`tel:${business.phone || "+918605601030"}`}
            aria-label="Call Phoenix-Tech Academy"
            title="Call Academy Directly"
            className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#045d17] hover:text-[#034d13] hover:border-[#045d17] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* WhatsApp */}
          <a
            href={
              business.whatsapp
                ? `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(
                    `Hi ${business.name}, I would like to enquire about your courses.`
                  )}`
                : "https://web.whatsapp.com/"
            }
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="WhatsApp Enquiry"
            className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#045d17] hover:text-[#034d13] hover:border-[#045d17] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Official Website */}
          <a
            href={business.websiteUrl || "https://phoenix-tech.in/"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Website"
            title="Visit phoenix-tech.in"
            className="w-11 h-11 rounded-full bg-white border border-slate-300 text-[#045d17] hover:text-[#034d13] hover:border-[#045d17] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}

