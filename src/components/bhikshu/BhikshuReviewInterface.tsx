"use client";

import * as React from "react";
import Image from "next/image";
import { PublicBusinessData, BHIKSHU_TATTOO_BUSINESS } from "@/types/public-business";
import { generateReviewDraft, ReviewLanguage } from "@/lib/ai-review-generator";
import {
  Star,
  Copy,
  Check,
  RefreshCw,
  Instagram,
  UserPlus,
  MessageCircle,
  Globe
} from "lucide-react";

export interface BhikshuReviewInterfaceProps {
  business?: PublicBusinessData;
}

const STYLE_PILLS = [
  { id: "ALL", label: "ALL" },
  { id: "CUSTOM", label: "CUSTOM", full: "Custom Tattoo Design" },
  { id: "REALISM", label: "REALISM", full: "Realism & Portraits" },
  { id: "MANDALA", label: "MANDALA", full: "Mandala & Sacred Geometry" },
  { id: "FINE LINE", label: "FINE LINE", full: "Minimalist & Fine Line" }
];

export function BhikshuReviewInterface({
  business = BHIKSHU_TATTOO_BUSINESS
}: BhikshuReviewInterfaceProps) {
  const [selectedPill, setSelectedPill] = React.useState<string>("ALL");
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  const [generatedDraft, setGeneratedDraft] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Generate review on mount or selection change
  React.useEffect(() => {
    const selectedItem = STYLE_PILLS.find((p) => p.id === selectedPill);
    const styleParam =
      selectedPill === "ALL"
        ? "tattoo"
        : selectedItem?.full || selectedPill;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: styleParam,
      highlights: [
        "100% Sterile & Hygiene First",
        "Incredibly Fine Lines",
        "Peaceful Studio Ambience"
      ],
      language: language
    });
    setGeneratedDraft(draft);
  }, [business.name, selectedPill, language]);

  // Handle shuffle button
  const handleShuffle = () => {
    const selectedItem = STYLE_PILLS.find((p) => p.id === selectedPill);
    const styleParam =
      selectedPill === "ALL"
        ? "tattoo"
        : selectedItem?.full || selectedPill;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: styleParam,
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

  // Download vCard Contact
  const handleDownloadVcard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Bhikshu Tattoo Studio
ORG:Bhikshu Tattoo Studio
TITLE:Founder & Lead Artist: Sandip Waghmare
TEL;TYPE=WORK,VOICE:+919689976453
EMAIL:bhikshutattoo.gmb@gmail.com
URL:https://www.bhikshutattoostudio.com/
ADR;TYPE=WORK:;;Lane No. 12, Row House 3, Konark Nagar, CCD Chowk, opp. Udaan Bio-Diversity Park, Viman Nagar;Pune;Maharashtra;411014;India
NOTE:Connecting your stories to your tattoo. 100% Sterile Studio in Viman Nagar, Pune.
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bhikshu-tattoo-studio-contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📇 Bhikshu Studio contact card saved to phone!");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-[#CCCCCC] font-dm flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-[#9C7A3C] selection:text-white">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 px-5 py-3 bg-[#222222] text-[#FFFFFF] font-sora font-semibold text-xs rounded-2xl shadow-2xl flex items-center justify-center gap-2 border border-[#9C7A3C]/40 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container matching Sample Interface */}
      <main className="w-full max-w-[410px] mx-auto flex flex-col items-center space-y-5 py-6">
        {/* 1. Official Logo Centered (Clean, unboxed) */}
        <div className="relative h-16 w-full max-w-[240px] flex items-center justify-center">
          <Image
            src="/assets/bhikshu-logo-white.png"
            alt="Bhikshu Tattoo Studio"
            width={240}
            height={70}
            className="object-contain max-h-16 w-auto"
            priority
            unoptimized
          />
        </div>

        {/* 2. 5 Stars + Subtitle (NO business name in bold, NO tagline, NO bullet points) */}
        <div className="flex flex-col items-center space-y-1.5 pt-1">
          <div className="flex items-center gap-1.5 text-[#E0A93B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#E0A93B] text-[#E0A93B]" />
            ))}
          </div>

          <p className="font-sora text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-bold text-center pt-1">
            SHARE YOUR EXPERIENCE
          </p>
        </div>

        {/* 3. Category Style Pills (like GOLD, SILVER, DIAMOND, ALL in sample) */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full pt-1">
          {STYLE_PILLS.map((pill) => {
            const isSelected = selectedPill === pill.id;
            return (
              <button
                key={pill.id}
                onClick={() => setSelectedPill(pill.id)}
                className={`font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#9C7A3C] text-white shadow-md scale-[1.02]"
                    : "bg-[#222222] text-[#A0A0A0] hover:text-[#FFFFFF] border border-[#333333] hover:border-[#444444]"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* 4. Elegant Review Card (Exact structure of provided sample UI) */}
        <div className="w-full bg-[#222222] border border-[#333333] rounded-[24px] p-5 sm:p-6 shadow-2xl relative space-y-4">
          {/* Subtle Corner Accents (Matching sample UI aesthetics) */}
          <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-[#A0A0A0]/40 pointer-events-none" />
          <div className="absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-[#A0A0A0]/40 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-[#A0A0A0]/40 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-[#A0A0A0]/40 pointer-events-none" />

          {/* Header inside Card: "— YOUR REVIEW —" */}
          <div className="text-center">
            <span className="font-sora text-[11px] uppercase tracking-[0.22em] text-[#A0A0A0] font-semibold">
              — YOUR REVIEW —
            </span>
          </div>

          {/* Editable Review Draft Body Text */}
          <textarea
            ref={textareaRef}
            value={generatedDraft}
            onChange={(e) => {
              setGeneratedDraft(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${Math.max(
                  110,
                  textareaRef.current.scrollHeight
                )}px`;
              }
            }}
            className="w-full text-sm sm:text-[15px] font-dm text-[#CCCCCC] bg-transparent resize-none overflow-hidden border-none p-0 focus:outline-none focus:ring-0 leading-relaxed tracking-normal font-normal text-left"
            placeholder="Your review will appear here..."
            rows={4}
          />

          {/* Action Row: Left (Solid Gold Copy Button) + Right (Square Refresh Button) */}
          <div className="pt-2 flex items-center gap-2.5">
            {/* Primary Action Button */}
            <button
              onClick={handleCopyAndOpenGoogle}
              className="flex-1 h-12 bg-[#9C7A3C] hover:bg-[#B08B46] active:scale-[0.99] text-white font-sora font-extrabold text-[12px] sm:text-xs tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>COPIED! OPENING GOOGLE...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>COPY &amp; POST ON GOOGLE</span>
                </>
              )}
            </button>

            {/* Refresh / Shuffle Button beside it (matching sample UI) */}
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Generate another review"
              title="Shuffle another review draft"
              className="w-12 h-12 bg-[#2A2A2A] hover:bg-[#333333] active:scale-95 border border-[#444444] rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className="w-4 h-4 text-[#CCCCCC] hover:text-white transition-colors" />
            </button>
          </div>
        </div>

        {/* 5. Minimal Language Selection Row */}
        <div className="flex items-center justify-center gap-3 text-xs font-sora text-[#A0A0A0]">
          {[
            { code: "en" as ReviewLanguage, label: "EN" },
            { code: "hinglish" as ReviewLanguage, label: "HINGLISH" },
            { code: "mr" as ReviewLanguage, label: "मराठी" },
            { code: "hi" as ReviewLanguage, label: "हिंदी" }
          ].map((l) => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`font-semibold tracking-wider transition-colors cursor-pointer ${
                language === l.code
                  ? "text-[#FFFFFF] underline underline-offset-4 decoration-[#9C7A3C] decoration-2"
                  : "text-[#A0A0A0] hover:text-[#FFFFFF]"
              }`}
            >
              {l.label}
            </button>
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
            className="w-11 h-11 rounded-full bg-[#222222] border border-[#333333] text-[#A0A0A0] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/Sandy.Bhikshu"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Sandy.Bhikshu"
            title="Follow on Facebook"
            className="w-11 h-11 rounded-full bg-[#222222] border border-[#333333] text-[#A0A0A0] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              className="w-4 h-4 fill-current group-hover:scale-110 transition-transform"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Save Contact vCard */}
          <button
            onClick={handleDownloadVcard}
            type="button"
            aria-label="Save Studio Contact"
            title="Save Contact to Phone"
            className="w-11 h-11 rounded-full bg-[#222222] border border-[#333333] text-[#A0A0A0] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm cursor-pointer"
          >
            <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </button>

          {/* WhatsApp */}
          <a
            href="https://wa.me/919689976453?text=Hi%20Bhikshu%20Tattoo%20Studio%2C%20I%20would%20like%20to%20enquire%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            title="WhatsApp Enquiry"
            className="w-11 h-11 rounded-full bg-[#222222] border border-[#333333] text-[#A0A0A0] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>

          {/* Official Website */}
          <a
            href="https://www.bhikshutattoostudio.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Website"
            title="Visit bhikshutattoostudio.com"
            className="w-11 h-11 rounded-full bg-[#222222] border border-[#333333] text-[#A0A0A0] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
