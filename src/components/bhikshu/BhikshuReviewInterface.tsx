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

const ARTIST_PILLS = [
  { id: "ALL", label: "ALL" },
  { id: "Sandip", label: "SANDIP" },
  { id: "Rohan", label: "ROHAN" },
  { id: "Anthony", label: "ANTHONY" }
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

export function BhikshuReviewInterface({
  business = BHIKSHU_TATTOO_BUSINESS
}: BhikshuReviewInterfaceProps) {
  const [selectedPill, setSelectedPill] = React.useState<string>("ALL");
  const [selectedArtist, setSelectedArtist] = React.useState<string>("ALL");
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

        {/* 2. 5 Stars + Subtitle (Clean & Minimal) */}
        <div className="flex flex-col items-center space-y-1.5 pt-0.5">
          <div className="flex items-center gap-1.5 text-[#E0A93B]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#E0A93B] text-[#E0A93B]" />
            ))}
          </div>

          <p className="font-sora text-xs uppercase tracking-[0.25em] text-[#FFFFFF] font-bold text-center pt-1">
            SHARE YOUR EXPERIENCE
          </p>
        </div>

        {/* 3. Category Style Pills */}
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
                    : "bg-[#1F2723]/90 text-[#B5BEB7] hover:text-[#FFFFFF] border border-[#3A463E] hover:border-[#4E5C53]"
                }`}
              >
                {pill.label}
              </button>
            );
          })}
        </div>

        {/* Minimal Horizontal Divider Bar above Artists */}
        <div className="w-full max-w-[280px] flex items-center justify-center my-0.5">
          <div className="w-full h-px bg-white/15" />
        </div>

        {/* Artists Row: "Sandip", "Rohan", "Anthony" */}
        <div className="flex flex-wrap items-center justify-center gap-2 w-full">
          {ARTIST_PILLS.map((artist) => {
            const isSelected = selectedArtist === artist.id;
            return (
              <button
                key={artist.id}
                onClick={() =>
                  setSelectedArtist((prev) => (prev === artist.id ? "ALL" : artist.id))
                }
                className={`font-sora text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
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
            className="w-full text-sm sm:text-[15px] font-dm text-[#FFFFFF] bg-transparent resize-none overflow-hidden border-none p-0 focus:outline-none focus:ring-0 leading-relaxed tracking-normal font-normal text-left placeholder:text-[#8E9B92]"
            placeholder="Your review will appear here..."
            rows={4}
          />

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
                  <span>COPY &amp; PASTE ON GOOGLE</span>
                </>
              )}
            </button>

            {/* Refresh / Shuffle Button */}
            <button
              type="button"
              onClick={handleShuffle}
              aria-label="Generate another review"
              title="Shuffle another review draft"
              className="w-12 h-12 bg-[#252E28] hover:bg-[#2F3A33] active:scale-95 border border-[#3A463E] rounded-xl flex items-center justify-center text-white transition-all cursor-pointer shrink-0"
            >
              <RefreshCw className="w-4 h-4 text-[#B5BEB7] hover:text-white transition-colors" />
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

          {/* Save Contact vCard */}
          <button
            onClick={handleDownloadVcard}
            type="button"
            aria-label="Save Studio Contact"
            title="Save Contact to Phone"
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm cursor-pointer"
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
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
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
            className="w-11 h-11 rounded-full bg-[#1F2723]/90 border border-[#3A463E] text-[#B5BEB7] hover:text-[#FFFFFF] hover:border-[#9C7A3C] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
          >
            <Globe className="w-4 h-4 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </main>
    </div>
  );
}
