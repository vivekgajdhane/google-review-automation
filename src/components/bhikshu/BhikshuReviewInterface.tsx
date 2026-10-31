"use client";

import * as React from "react";
import Image from "next/image";
import { PublicBusinessData, BHIKSHU_TATTOO_BUSINESS } from "@/types/public-business";
import { generateReviewDraft, ReviewLanguage } from "@/lib/ai-review-generator";
import {
  Star,
  Check,
  RefreshCw,
  Instagram,
  Phone,
  Globe
} from "lucide-react";

export interface BhikshuReviewInterfaceProps {
  business?: PublicBusinessData;
}

const STYLE_PILLS = [
  { id: "CUSTOM", label: "CUSTOM", full: "custom tattoo design" },
  { id: "REALISM", label: "REALISM", full: "realism tattoo" },
  { id: "MANDALA", label: "MANDALA", full: "mandala tattoo" },
  { id: "FINE LINE", label: "FINE LINE", full: "fine line tattoo" },
  { id: "COVERUP", label: "COVERUP", full: "cover-up tattoo" },
  { id: "PIERCING", label: "PIERCING", full: "body piercing" }
];

const ARTIST_PILLS = [
  { id: "Sandip", label: "SANDIP" },
  { id: "Rohan", label: "ROHAN" },
  { id: "Anthony", label: "ANTHONY" },
  { id: "Ashitosh", label: "ASHITOSH" }
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

export function BhikshuReviewInterface({
  business = BHIKSHU_TATTOO_BUSINESS
}: BhikshuReviewInterfaceProps) {
  const [selectedPill, setSelectedPill] = React.useState<string>("CUSTOM");
  const [selectedArtist, setSelectedArtist] = React.useState<string>("ALL");
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  const [generatedDraft, setGeneratedDraft] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [refreshRotation, setRefreshRotation] = React.useState<number>(0);

  // Review Box Scrollbar Tracking
  const [isScrolling, setIsScrolling] = React.useState<boolean>(false);
  const [scrollThumb, setScrollThumb] = React.useState<{ top: number; height: number }>({
    top: 0,
    height: 35
  });
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Recalculate scrollbar thumb size and position
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
    updateScrollIndicator();
    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.scrollTop = 0;
    }
    const raf = requestAnimationFrame(updateScrollIndicator);
    return () => cancelAnimationFrame(raf);
  }, [generatedDraft, updateScrollIndicator]);

  React.useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Generate review on mount or selection change
  React.useEffect(() => {
    const selectedItem = STYLE_PILLS.find((p) => p.id === selectedPill);
    const styleParam = selectedItem?.full || selectedPill;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: styleParam,
      artist: selectedArtist,
      highlights: [
        "100% Sterile & Hygiene First",
        "Incredibly Fine Lines",
        "Peaceful Studio Ambience"
      ],
      language: language
    });
    setGeneratedDraft(draft);
  }, [business.name, selectedPill, selectedArtist, language]);

  // Handle shuffle button with smooth circular spin
  const handleShuffle = () => {
    setRefreshRotation((prev) => prev + 360);
    const selectedItem = STYLE_PILLS.find((p) => p.id === selectedPill);
    const styleParam = selectedItem?.full || selectedPill;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: styleParam,
      artist: selectedArtist,
      highlights: [
        "100% Sterile & Hygiene First",
        "Incredibly Fine Lines",
        "Peaceful Studio Ambience"
      ],
      language: language
    });
    setGeneratedDraft(draft);
    showToast("✨ Generated a new review draft!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // 1-Tap Copy & Redirect to Google Review Composer
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

    setCopied(true);
    showToast(
      copySuccessful
        ? "✨ Review copied! Opening Google Reviews..."
        : "Opening Google Reviews..."
    );

    const targetUrl =
      business.googleReviewUrl ||
      "https://www.google.com/maps/place/Bhikshu+Tattoo+Studio+%7C+Best+tattoo+studio+in+pune/@18.5654478,73.9105924,112m/data=!3m1!1e3!4m8!3m7!1s0x3bc2c15ecc1b8797:0x315b9b1fa5949c21!8m2!3d18.5654477!4d73.9109004!9m1!1b1!16s%2Fg%2F11qnttbv42?entry=ttu";

    setTimeout(() => {
      setCopied(false);
      window.location.href = targetUrl;
    }, 400);
  };

  return (
    <div
      className="min-h-screen text-[#FFFFFF] font-dm flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-[#9C7A3C] selection:text-white relative overflow-x-hidden bg-[#28302B]"
      style={{
        backgroundImage: `radial-gradient(circle at 50% 10%, rgba(60, 71, 63, 0.45) 0%, rgba(28, 34, 30, 0.96) 100%), url('/assets/bhikshu-stone-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 px-5 py-3 bg-[#1F2723] text-[#FFFFFF] font-sora font-semibold text-xs rounded-2xl shadow-2xl flex items-center justify-center gap-2 border border-[#9C7A3C]/40 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top-Right "POWERED BY @phoenixtech.co" Badge */}
      <div className="absolute top-3.5 right-3.5 sm:top-4 sm:right-6 z-30 select-none">
        <a
          href="https://www.instagram.com/phoenixtech.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1F2723]/90 hover:bg-[#1F2723] border border-[#3A463E] hover:border-[#9C7A3C] backdrop-blur-md shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-200 group active:scale-95 font-sora"
          title="Powered by @phoenixtech.co"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E0A93B] group-hover:scale-125 transition-transform duration-200" />
          <span className="text-[9px] uppercase tracking-[0.14em] text-[#B5BEB7] font-semibold group-hover:text-[#FFFFFF] transition-colors">
            POWERED BY
          </span>
          <span className="text-[10px] text-[#FFFFFF] font-bold tracking-normal group-hover:text-[#E0A93B] transition-colors">
            @phoenixtech.co
          </span>
        </a>
      </div>

      {/* Main Container */}
      <main className="w-full max-w-[410px] mx-auto flex flex-col items-center space-y-4 py-6 relative z-10">
        {/* 1. Standalone Bhikshu Emblem (NO text), Animated Floating By-Forth */}
        <div className="relative flex flex-col items-center justify-center pt-2 pb-1 select-none">
          {/* Subtle Warm Gold Aura behind the floating emblem */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-[#9C7A3C]/25 blur-xl pointer-events-none animate-float-aura"
            aria-hidden="true"
          />

          {/* Floating Emblem */}
          <div className="relative animate-float-byforth flex items-center justify-center">
            <Image
              src="/assets/bhikshu-emblem-white.png"
              alt="Bhikshu Emblem"
              width={76}
              height={90}
              className="object-contain h-20 w-auto drop-shadow-[0_4px_16px_rgba(156,122,60,0.35)] select-none pointer-events-none"
              priority
              unoptimized
            />
          </div>

          {/* Dynamic Ground Shadow */}
          <div
            className="w-12 h-1.5 rounded-full bg-black/60 blur-[2px] mt-2 animate-float-shadow pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* 2. Rating Stars + Subtitle (Clean & Minimal) */}
        <div className="flex flex-col items-center space-y-1.5 pt-0.5 select-none">
          <div className="flex items-center gap-1.5 text-[#E0A93B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#E0A93B] text-[#E0A93B]" />
            ))}
          </div>

          <p className="font-sora text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-bold text-center pt-0.5">
            SHARE YOUR EXPERIENCE
          </p>
        </div>

        {/* 3. Category Style Pills (Tattoo Types Keywords) - Perfect 3x2 Grid */}
        <div className="grid grid-cols-3 gap-2 w-full max-w-[360px] pt-1">
          {STYLE_PILLS.map((pill) => {
            const isSelected = selectedPill === pill.id;
            return (
              <button
                key={pill.id}
                type="button"
                onClick={() => setSelectedPill(pill.id)}
                className={`w-full h-9 flex items-center justify-center font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider px-1 rounded-full transition-all cursor-pointer whitespace-nowrap select-none ${
                  isSelected
                    ? "bg-[#9C7A3C] text-white shadow-md scale-[1.02]"
                    : "bg-[#1F2723]/90 text-[#B5BEB7] hover:text-[#FFFFFF] border border-[#3A463E] hover:border-[#4E5C53]"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Horizontal Divider Bar with Merged "ARTISTS" Label */}
        <div className="w-full max-w-[360px] flex items-center justify-center gap-3 my-1 select-none">
          <div className="flex-1 h-px bg-white/15" />
          <span className="font-sora text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#B5BEB7] font-semibold shrink-0">
            ARTISTS
          </span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* Artists Row: Sandip, Rohan, Anthony, Ashitosh - Perfect 4-Column Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-[360px]">
          {ARTIST_PILLS.map((artist) => {
            const isSelected = selectedArtist === artist.id;
            return (
              <button
                key={artist.id}
                type="button"
                onClick={() =>
                  setSelectedArtist((prev) => (prev === artist.id ? "ALL" : artist.id))
                }
                className={`w-full h-9 flex items-center justify-center font-sora text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-1 rounded-full transition-all cursor-pointer whitespace-nowrap select-none ${
                  isSelected
                    ? "bg-[#9C7A3C] text-white shadow-md scale-[1.02]"
                    : "bg-[#1F2723]/90 text-[#B5BEB7] hover:text-[#FFFFFF] border border-[#3A463E] hover:border-[#4E5C53]"
                }`}
              >
                {artist.label}
              </button>
            );
          })}
        </div>

        {/* 4. Elegant Review Card (Without Corner Symbols) */}
        <div className="w-full bg-[#1F2723]/95 backdrop-blur-md border border-[#3A463E] rounded-[24px] p-5 sm:p-6 shadow-2xl relative space-y-4">
          {/* Header inside Card: "— YOUR REVIEW —" */}
          <div className="text-center">
            <span className="font-sora text-[11px] uppercase tracking-[0.22em] text-[#B5BEB7] font-semibold">
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
              className="w-full h-[120px] sm:h-[130px] text-sm sm:text-[15px] font-dm text-[#FFFFFF] bg-transparent resize-none overflow-y-auto border-none p-0 pr-4 focus:outline-none focus:ring-0 leading-relaxed tracking-normal font-normal text-left placeholder:text-[#8E9B92] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
              placeholder="Your review will appear here..."
              rows={4}
            />

            {/* Slide Line (Always Visible) & Scroll Bar Thumb (Visible when Customer Scrolls) */}
            <div
              className="absolute right-0 top-1 bottom-1 w-[3px] bg-white/15 rounded-full pointer-events-none select-none"
              aria-hidden="true"
            >
              {/* Dynamic Sliding Bar Thumb */}
              <div
                className={`w-full rounded-full bg-[#9C7A3C] shadow-[0_0_8px_rgba(156,122,60,0.6)] transition-opacity duration-300 ${
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

          {/* Action Row: Left (Solid Gold Copy Button with Google G Icon) + Right (Square Refresh Button) */}
          <div className="pt-2 flex items-center gap-2.5">
            {/* Primary Action Button */}
            <button
              onClick={handleCopyAndOpenGoogle}
              className="flex-1 h-12 bg-[#9C7A3C] hover:bg-[#B08B46] active:scale-[0.99] text-white font-sora font-extrabold text-[12px] sm:text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
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
              className="w-12 h-12 bg-[#252E28] hover:bg-[#2F3A33] active:scale-95 border border-[#3A463E] rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
            >
              <RefreshCw
                className="w-4 h-4 text-[#B5BEB7] hover:text-white transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{ transform: `rotate(${refreshRotation}deg)` }}
              />
            </button>
          </div>
        </div>

        {/* 5. Minimal Language Selection Row (English, Hinglish, हिंदी) */}
        <div className="flex items-center justify-center gap-3 text-xs font-sora text-[#B5BEB7]">
          {[
            { code: "en" as ReviewLanguage, label: "English" },
            { code: "hinglish" as ReviewLanguage, label: "Hinglish" },
            { code: "hi" as ReviewLanguage, label: "हिंदी" }
          ].map((l, idx, arr) => (
            <React.Fragment key={l.code}>
              <button
                onClick={() => setLanguage(l.code)}
                className={`font-semibold tracking-wider transition-colors cursor-pointer ${
                  language === l.code
                    ? "text-[#FFFFFF] underline underline-offset-4 decoration-[#9C7A3C] decoration-2"
                    : "text-[#B5BEB7] hover:text-[#FFFFFF]"
                }`}
              >
                {l.label}
              </button>
              {idx < arr.length - 1 && <span className="text-[#4E5C53] select-none">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* 6. Clean Bottom Touchpoint Icon Bar (Circular buttons) */}
        <div className="flex items-center justify-center gap-3.5 pt-2">
          {/* Instagram 1 */}
          <a
            href="https://www.instagram.com/bhikshu_tattoo/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram @bhikshu_tattoo"
            title="Follow @bhikshu_tattoo on Instagram"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Facebook */}
          <a
            href={business.facebookUrl || "https://www.facebook.com/bhikshutattoo"}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook @bhikshutattoo"
            title="Follow Bhikshu Tattoo on Facebook"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Direct Phone Dialer Link */}
          <a
            href="tel:+919689976453"
            aria-label="Call Bhikshu Tattoo Studio"
            title="Call Studio Directly"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm cursor-pointer"
          >
            <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Official WhatsApp Logo */}
          <a
            href="https://wa.me/919689976453?text=Hi%20Bhikshu%20Tattoo%20Studio%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="WhatsApp Enquiry"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <WhatsAppIcon className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Official Website */}
          <a
            href="https://www.bhikshutattoostudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Website"
            title="Visit bhikshutattoostudio.com"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
