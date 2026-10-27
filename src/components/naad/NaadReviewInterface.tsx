"use client";

import * as React from "react";
import Image from "next/image";
import { PublicBusinessData, NAAD_JAMROOM_BUSINESS } from "@/types/public-business";
import { generateReviewDraft, ReviewLanguage } from "@/lib/ai-review-generator";
import {
  Star,
  Check,
  RefreshCw,
  Instagram,
  UserPlus,
  MessageCircle,
  MapPin,
  Phone,
  Sparkles,
  Volume2
} from "lucide-react";

export interface NaadReviewInterfaceProps {
  business?: PublicBusinessData;
}

const SESSION_PILLS = [
  { id: "ALL", label: "ALL SESSIONS" },
  { id: "BAND JAM", label: "BAND JAM", full: "Band Jam Session" },
  { id: "RECORDING", label: "RECORDING", full: "Audio Recording & Tracking" },
  { id: "VOCAL BOOTH", label: "VOCAL BOOTH", full: "Vocal Booth & Dubbing" },
  { id: "MIXING", label: "MIXING & MASTERING", full: "Mixing & Mastering" },
  { id: "SOLO", label: "SOLO PRACTICE", full: "Solo Instrument Practice" },
];

const HIGHLIGHT_TAGS = [
  { id: "ACOUSTICS", label: "SUPERB ACOUSTICS", full: "Superb Acoustics & Soundproofing" },
  { id: "DRUMS & AMPS", label: "DRUMS & TUBE AMPS", full: "Top-Tier Drum Kit & Tube Amps" },
  { id: "COZY VIBE", label: "COZY MOOD LIGHTING", full: "Cozy Mood Lighting & Vibe" },
  { id: "VOCAL MONITORS", label: "CRYSTAL CLEAR VOCALS", full: "Crystal Clear Vocal Monitors" },
  { id: "FRIENDLY HOST", label: "SUPPORTIVE HOST", full: "Helpful & Musician-Friendly Host" },
  { id: "RATES", label: "POCKET-FRIENDLY RATES", full: "Affordable Hourly Jamming Rates" },
  { id: "CHILLED AC", label: "CHILLED AC & CLEAN", full: "Clean & Fully Air-Conditioned" },
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

/**
 * Animated Sound Wave Equalizer (DAW console frequency visualizer)
 */
function SoundEqualizer() {
  return (
    <div className="flex items-end gap-1 h-4 select-none px-2 py-0.5" aria-hidden="true">
      {[12, 18, 8, 22, 14, 26, 10, 20, 16, 24, 9, 19, 13].map((height, idx) => (
        <span
          key={idx}
          className="w-1 bg-[#E89C3B] rounded-full transition-all duration-300"
          style={{
            height: `${height}px`,
            opacity: 0.65 + (idx % 3) * 0.15,
            animation: `audioWave 1.4s ease-in-out infinite alternate`,
            animationDelay: `${idx * 0.11}s`,
          }}
        />
      ))}
    </div>
  );
}

export function NaadReviewInterface({
  business = NAAD_JAMROOM_BUSINESS,
}: NaadReviewInterfaceProps) {
  const [selectedSession, setSelectedSession] = React.useState<string>("BAND JAM");
  const [selectedHighlights, setSelectedHighlights] = React.useState<string[]>([
    "Superb Acoustics & Soundproofing",
    "Top-Tier Drum Kit & Tube Amps",
    "Cozy Mood Lighting & Vibe"
  ]);
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  const [generatedDraft, setGeneratedDraft] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Generate review on mount or selection change
  React.useEffect(() => {
    const sessionItem = SESSION_PILLS.find((p) => p.id === selectedSession);
    const sessionParam =
      selectedSession === "ALL"
        ? "jam session"
        : sessionItem?.full || selectedSession;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: sessionParam,
      highlights: selectedHighlights,
      language: language,
    });
    setGeneratedDraft(draft);
  }, [business.name, selectedSession, selectedHighlights, language]);

  // Adjust textarea height
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.max(105, textareaRef.current.scrollHeight)}px`;
    }
  }, [generatedDraft]);

  const toggleHighlight = (fullText: string) => {
    setSelectedHighlights((prev) => {
      if (prev.includes(fullText)) {
        if (prev.length <= 1) return prev; // keep at least 1
        return prev.filter((h) => h !== fullText);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), fullText];
        }
        return [...prev, fullText];
      }
    });
  };

  // Handle shuffle button
  const handleShuffle = () => {
    const sessionItem = SESSION_PILLS.find((p) => p.id === selectedSession);
    const sessionParam =
      selectedSession === "ALL"
        ? "jam session"
        : sessionItem?.full || selectedSession;

    const draft = generateReviewDraft({
      businessName: business.name,
      course: sessionParam,
      highlights: selectedHighlights,
      language: language,
    });
    setGeneratedDraft(draft);
    showToast("🎵 New rehearsal review draft generated!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  // 1-Tap Copy & Redirect directly to Google Review Composer
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
        // Fallback
      }
    }

    setCopied(true);
    showToast("📋 Review draft copied! Opening Google Reviews...");

    // Event tracking
    fetch("/api/public/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: business.slug, eventName: "google_review_click" }),
    }).catch(() => {});

    const targetUrl =
      business.googleReviewUrl ||
      "https://www.google.com/maps/place/Naad+Jamroom+and+studio/@18.5607059,73.9393504,892m/data=!3m1!1e3!4m18!1m9!3m8!1s0x3bc2c366206c8fab:0x65510dbddf17da00!2sNaad+Jamroom+and+studio!8m2!3d18.5607008!4d73.9419307!9m1!1b1!16s%2Fg%2F11qgyk6z4x!3m7!1s0x3bc2c366206c8fab:0x65510dbddf17da00!8m2!3d18.5607008!4d73.9419307!9m1!1b1!16s%2Fg%2F11qgyk6z4x?entry=ttu";

    setTimeout(() => {
      setCopied(false);
      window.location.href = targetUrl;
    }, 350);
  };

  // Download vCard Contact
  const handleDownloadVcard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Naad Jamroom & Studio
ORG:Naad Jamroom and Recording Studio
TITLE:Music Rehearsal & Recording Studio Kharadi
TEL;TYPE=WORK,VOICE:+917385260556
TEL;TYPE=CELL,VOICE:+917385260556
URL:https://naadjamroom.vercel.app/
ADR;TYPE=WORK:;;Lane no 6, Parashar Housing Society, Pathare Thube Nagar Kharadi;Pune;Maharashtra;411014;India
NOTE:Where music finds its rhythm. Pune's premier jam room and music recording studio in Kharadi.
END:VCARD`;

    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `naad-jamroom-kharadi-contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("📇 Naad Jamroom contact saved to your phone!");
  };

  return (
    <div
      className="min-h-screen text-[#FFFFFF] font-sans flex flex-col items-center justify-center p-4 sm:p-6 antialiased selection:bg-[#E89C3B] selection:text-[#0C1F1E] relative overflow-x-hidden bg-[#0A1A19]"
      style={{
        backgroundImage: `
          radial-gradient(circle at 50% 5%, rgba(20, 55, 54, 0.75) 0%, rgba(10, 26, 25, 0.98) 100%),
          linear-gradient(rgba(20, 55, 54, 0.08) 1px, transparent 1px),
          linear-gradient(90deg, rgba(20, 55, 54, 0.08) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 28px 28px, 28px 28px",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 px-5 py-3.5 bg-[#143736]/95 text-[#FFFFFF] font-sora font-semibold text-xs rounded-2xl shadow-2xl flex items-center justify-center gap-2.5 border border-[#E89C3B]/50 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-4 h-4 text-[#E89C3B] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="w-full max-w-[420px] mx-auto flex flex-col items-center space-y-4 py-5 relative z-10">
        {/* 1. Header & Logo Area with Floating Musical Aura */}
        <div className="relative flex flex-col items-center justify-center pt-1 pb-1 select-none w-full">
          {/* Subtle Warm Amber Studio Aura */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 rounded-full bg-[#E89C3B]/15 blur-2xl pointer-events-none animate-float-aura"
            aria-hidden="true"
          />

          {/* Naad Studio Official Branded Logo with floating effect */}
          <div className="relative animate-float-byforth flex flex-col items-center justify-center">
            <div className="relative px-6 py-2 rounded-2xl bg-[#143736]/90 border border-[#214E4C] shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm">
              <Image
                src="/assets/naad-logo.png"
                alt="Naad Jamroom & Recording Studio"
                width={240}
                height={120}
                className="object-contain h-16 sm:h-[70px] w-auto drop-shadow-[0_4px_16px_rgba(232,156,59,0.25)] select-none pointer-events-none"
                priority
                unoptimized
              />
            </div>
          </div>

          {/* Dynamic Ground Shadow */}
          <div
            className="w-20 h-1.5 rounded-full bg-black/60 blur-[2px] mt-2.5 animate-float-shadow pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* 2. Rating & Music Tagline */}
        <div className="flex flex-col items-center space-y-1 pt-0.5 text-center">
          {/* 5 Stars with Rating Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#143736]/80 border border-[#E89C3B]/30 shadow-sm backdrop-blur-sm">
            <div className="flex text-[#E89C3B]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-[#E89C3B] text-[#E89C3B]" />
              ))}
            </div>
            <span className="font-sora font-extrabold text-xs text-[#FFFFFF]">4.9</span>
            <span className="text-[11px] text-[#A6C4C2] font-medium">(125 Google Reviews)</span>
          </div>

          <p className="font-sora text-[11px] sm:text-xs uppercase tracking-[0.22em] text-[#E89C3B] font-bold text-center pt-1.5">
            SHARE YOUR MUSIC EXPERIENCE
          </p>
          <p className="text-[11px] text-[#8EABA9] font-medium">
            Kharadi, Pune • Jam Room & Recording Studio
          </p>
        </div>

        {/* 3. Session Category Pills ("WHAT DID YOU EXPERIENCE?") */}
        <div className="w-full space-y-1.5 pt-1">
          <div className="flex items-center justify-between px-1">
            <span className="font-sora text-[10px] uppercase tracking-wider text-[#8EABA9] font-bold">
              1. Select Session Type
            </span>
            <SoundEqualizer />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
            {SESSION_PILLS.map((pill) => {
              const isSelected = selectedSession === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setSelectedSession(pill.id)}
                  className={`font-sora text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#E89C3B] text-[#0C1F1E] shadow-[0_2px_12px_rgba(232,156,59,0.35)] scale-[1.03]"
                      : "bg-[#143736]/70 text-[#C1D7D5] hover:text-[#FFFFFF] border border-[#214E4C] hover:border-[#E89C3B]/50"
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Standout Highlights ("WHAT STOOD OUT?") */}
        <div className="w-full space-y-1.5 pt-0.5">
          <div className="flex items-center justify-between px-1">
            <span className="font-sora text-[10px] uppercase tracking-wider text-[#8EABA9] font-bold">
              2. What Stood Out Most?
            </span>
            <span className="text-[10px] text-[#E89C3B] font-semibold">Pick up to 3</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 w-full">
            {HIGHLIGHT_TAGS.map((tag) => {
              const isSelected = selectedHighlights.includes(tag.full);
              return (
                <button
                  key={tag.id}
                  onClick={() => toggleHighlight(tag.full)}
                  className={`font-sora text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#E89C3B]/20 text-[#E89C3B] border-2 border-[#E89C3B] font-bold shadow-sm"
                      : "bg-[#143736]/50 text-[#9EBCBA] hover:text-white border border-[#214E4C]"
                  }`}
                >
                  {isSelected ? "✓ " : "+ "}
                  {tag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. Music Review Console Card */}
        <div className="w-full bg-[#102B2A]/90 backdrop-blur-md border border-[#214E4C] rounded-[24px] p-5 sm:p-6 shadow-2xl relative space-y-3.5">
          {/* Header inside Card with Audio Meter */}
          <div className="flex items-center justify-between pb-1 border-b border-[#1A4543]">
            <span className="font-sora text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#8EABA9] font-bold flex items-center gap-1.5">
              <Volume2 className="w-3.5 h-3.5 text-[#E89C3B]" />
              — YOUR REVIEW DRAFT —
            </span>
            <button
              type="button"
              onClick={handleShuffle}
              className="inline-flex items-center gap-1 text-[10px] font-sora font-semibold text-[#E89C3B] hover:text-white bg-[#E89C3B]/10 hover:bg-[#E89C3B]/20 px-2 py-0.5 rounded-md transition-colors"
            >
              <RefreshCw className="w-2.5 h-2.5" />
              <span>Shuffle</span>
            </button>
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
                  105,
                  textareaRef.current.scrollHeight
                )}px`;
              }
            }}
            className="w-full text-sm sm:text-[14.5px] font-sans text-[#FFFFFF] bg-transparent resize-none overflow-hidden border-none p-0 focus:outline-none focus:ring-0 leading-relaxed tracking-normal font-normal text-left placeholder:text-[#5B7E7C]"
            placeholder="Your review will appear here..."
            rows={4}
          />

          {/* Primary Action Button: Solid Amber Copy Button with Google G Icon */}
          <button
            onClick={handleCopyAndOpenGoogle}
            className="w-full h-12 bg-[#E89C3B] hover:bg-[#F5A623] active:scale-[0.99] text-[#0C1F1E] font-sora font-black text-[12px] sm:text-xs tracking-wider uppercase rounded-xl shadow-[0_4px_20px_rgba(232,156,59,0.35)] transition-all flex items-center justify-center gap-2.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#0C1F1E] stroke-[3]" />
                <span>COPIED! OPENING GOOGLE REVIEWS...</span>
              </>
            ) : (
              <>
                <GoogleGIcon className="w-4 h-4 shrink-0 drop-shadow-sm" />
                <span>COPY &amp; PASTE ON GOOGLE</span>
              </>
            )}
          </button>
        </div>

        {/* 6. Language Selection Row (English, Hinglish, मराठी, हिंदी) */}
        <div className="flex items-center justify-center gap-2.5 text-xs font-sora text-[#8EABA9] pt-0.5">
          {[
            { code: "en" as ReviewLanguage, label: "English" },
            { code: "hinglish" as ReviewLanguage, label: "Hinglish" },
            { code: "mr" as ReviewLanguage, label: "मराठी" },
            { code: "hi" as ReviewLanguage, label: "हिंदी" },
          ].map((l, idx, arr) => (
            <React.Fragment key={l.code}>
              <button
                onClick={() => setLanguage(l.code)}
                className={`font-semibold tracking-wider transition-colors cursor-pointer text-[11px] sm:text-xs ${
                  language === l.code
                    ? "text-[#FFFFFF] underline underline-offset-4 decoration-[#E89C3B] decoration-2 font-bold"
                    : "text-[#8EABA9] hover:text-[#FFFFFF]"
                }`}
              >
                {l.label}
              </button>
              {idx < arr.length - 1 && <span className="text-[#214E4C] select-none">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* 7. Musician Touchpoint Bar (Exact 5 Circular Buttons) */}
        <div className="pt-2 flex flex-col items-center justify-center space-y-2">
          <span className="font-sora text-[10px] uppercase tracking-widest text-[#8EABA9]/80 font-bold">
            CONNECT WITH NAAD STUDIO
          </span>
          <div className="flex items-center justify-center gap-3">
            {/* 1. Instagram */}
            <a
              href="https://www.instagram.com/naad_jamroom/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @naad_jamroom"
              title="Follow @naad_jamroom on Instagram"
              className="w-11 h-11 rounded-full bg-[#143736]/90 border border-[#214E4C] text-[#C1D7D5] hover:text-[#E89C3B] hover:border-[#E89C3B] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
            >
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* 2. WhatsApp (Direct Jam Room Booking) */}
            <a
              href="https://wa.me/917385260556?text=Hi%20Naad%20Jamroom%2C%20I%20would%20like%20to%20enquire%20about%20booking%20a%20jamming%20or%20recording%20slot."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Naad Jamroom"
              title="Book Slot via WhatsApp"
              className="w-11 h-11 rounded-full bg-[#143736]/90 border border-[#214E4C] text-[#C1D7D5] hover:text-[#25D366] hover:border-[#25D366] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
            >
              <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* 3. Direct Phone Call */}
            <a
              href="tel:+917385260556"
              aria-label="Call Naad Studio"
              title="Call +91 73852 60556"
              className="w-11 h-11 rounded-full bg-[#143736]/90 border border-[#214E4C] text-[#C1D7D5] hover:text-[#E89C3B] hover:border-[#E89C3B] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
            >
              <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* 4. Google Maps Location */}
            <a
              href="https://maps.app.goo.gl/ckY5Jtm92VDcsosd6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Maps Studio Directions"
              title="Locate Studio on Google Maps"
              className="w-11 h-11 rounded-full bg-[#143736]/90 border border-[#214E4C] text-[#C1D7D5] hover:text-[#E89C3B] hover:border-[#E89C3B] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm"
            >
              <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>

            {/* 5. Save Studio Contact (vCard) */}
            <button
              onClick={handleDownloadVcard}
              type="button"
              aria-label="Save Studio Contact"
              title="Save Contact to Phone"
              className="w-11 h-11 rounded-full bg-[#143736]/90 border border-[#214E4C] text-[#C1D7D5] hover:text-[#E89C3B] hover:border-[#E89C3B] flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 active:scale-95 group shadow-sm cursor-pointer"
            >
              <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-3 pb-4 space-y-0.5">
          <p className="text-[11px] font-sora font-bold tracking-wider text-[#E89C3B]">
            NAAD JAM ROOM &amp; RECORDING STUDIO
          </p>
          <p className="text-[10px] text-[#8EABA9]/80 font-medium">
            Lane no 6, Parashar Housing Society, Kharadi, Pune 411014
          </p>
        </div>
      </main>
    </div>
  );
}
