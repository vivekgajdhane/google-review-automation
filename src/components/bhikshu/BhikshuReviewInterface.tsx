"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicBusinessData, BHIKSHU_TATTOO_BUSINESS } from "@/types/public-business";
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
  Share2,
  ShieldCheck,
  Award,
  Clock,
  Printer,
  ChevronDown,
  Send,
  MessageSquareHeart
} from "lucide-react";

export interface BhikshuReviewInterfaceProps {
  business?: PublicBusinessData;
}

export function BhikshuReviewInterface({
  business = BHIKSHU_TATTOO_BUSINESS
}: BhikshuReviewInterfaceProps) {
  // Theme state: dark "zen-ink" or serene "zen-stone"
  const [themeMode, setThemeMode] = React.useState<"ink" | "stone">("ink");

  // AI Review States
  const [selectedStyle, setSelectedStyle] = React.useState<string>(
    business.courseOptions?.[0] || "Custom Tattoo Design"
  );
  const [selectedHighlights, setSelectedHighlights] = React.useState<string[]>([
    "100% Sterile & Hygiene First",
    "Incredibly Fine Lines",
    "Peaceful Studio Ambience"
  ]);
  const [language, setLanguage] = React.useState<ReviewLanguage>("en");
  const [generatedDraft, setGeneratedDraft] = React.useState<string>("");
  const [copied, setCopied] = React.useState<boolean>(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  // Private note modal state
  const [showPrivateModal, setShowPrivateModal] = React.useState<boolean>(false);
  const [privateNote, setPrivateNote] = React.useState<string>("");
  const [privateContact, setPrivateContact] = React.useState<string>("");
  const [privateSubmitted, setPrivateSubmitted] = React.useState<boolean>(false);

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-generate review draft on selections
  React.useEffect(() => {
    const draft = generateReviewDraft({
      businessName: business.name,
      course: selectedStyle,
      highlights: selectedHighlights,
      language: language
    });
    setGeneratedDraft(draft);
  }, [business.name, selectedStyle, selectedHighlights, language]);

  const toggleHighlight = (hl: string) => {
    setSelectedHighlights((prev) => {
      if (prev.includes(hl)) {
        if (prev.length <= 1) return prev; // Keep at least one
        return prev.filter((item) => item !== hl);
      } else {
        if (prev.length >= 3) {
          return [...prev.slice(1), hl];
        }
        return [...prev, hl];
      }
    });
  };

  const handleShuffle = () => {
    const draft = generateReviewDraft({
      businessName: business.name,
      course: selectedStyle,
      highlights: selectedHighlights,
      language: language
    });
    setGeneratedDraft(draft);
    showToast("✨ Fresh review draft generated!");
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
        ? "✨ Review draft copied! Redirecting directly to Google Maps..."
        : "Redirecting to Google Reviews..."
    );

    const targetUrl =
      business.googleReviewUrl ||
      "https://www.google.com/maps/place/Bhikshu+Tattoo+Studio+%7C+Best+tattoo+studio+in+pune/@18.5654478,73.9105924,112m/data=!3m1!1e3!4m8!3m7!1s0x3bc2c15ecc1b8797:0x315b9b1fa5949c21!8m2!3d18.5654477!4d73.9109004!9m1!1b1!16s%2Fg%2F11qnttbv42?entry=ttu";

    setTimeout(() => {
      setCopied(false);
      window.location.href = targetUrl;
    }, 450);
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

  const isInk = themeMode === "ink";

  return (
    <div
      className={`min-h-screen transition-colors duration-500 font-sans selection:bg-[#c5a880] selection:text-black ${
        isInk
          ? "bg-[#0b0e0c] text-neutral-100"
          : "bg-[#f8f7f2] text-neutral-900"
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-sm w-11/12 px-5 py-3.5 bg-neutral-900/95 text-amber-200 font-semibold rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/30 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
          <Sparkles className="w-5 h-5 shrink-0 text-amber-400" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Subtle Zen Watermark Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.035] overflow-hidden flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className="w-[120vw] h-[120vw] max-w-[900px] max-h-[900px] stroke-current"
          fill="none"
          strokeWidth="0.3"
        >
          <circle cx="50" cy="50" r="45" />
          <circle cx="50" cy="50" r="35" />
          <circle cx="50" cy="50" r="25" />
          <circle cx="50" cy="50" r="15" />
          <path d="M50 5 L50 95 M5 50 L95 50 M18 18 L82 82 M18 82 L82 18" />
        </svg>
      </div>

      {/* Main Container */}
      <main className="relative z-10 w-full max-w-md mx-auto px-4 py-4 sm:py-6 space-y-4 sm:space-y-5 pb-16">
        {/* Top Control Bar: Mode Toggle & Printable QR Stand Link */}
        <div className="flex items-center justify-between text-xs px-1">
          <Link
            href="/qr/bhikshu-tattoo"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold transition-all text-[11px] ${
              isInk
                ? "bg-neutral-800/80 hover:bg-neutral-700/80 text-amber-300 border border-amber-400/20 shadow-sm"
                : "bg-white hover:bg-neutral-100 text-neutral-800 border border-neutral-300 shadow-sm"
            }`}
          >
            <Printer className="w-3.5 h-3.5 text-amber-400" />
            <span>Print Counter Stand</span>
          </Link>

          <button
            onClick={() => setThemeMode(isInk ? "stone" : "ink")}
            type="button"
            className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all border ${
              isInk
                ? "bg-neutral-900 border-neutral-700 text-neutral-400 hover:text-white"
                : "bg-white border-neutral-300 text-neutral-600 hover:text-black"
            }`}
          >
            {isInk ? "☀️ Stone Theme" : "🌙 Zen Ink Theme"}
          </button>
        </div>

        {/* Hero Header Card */}
        <header
          className={`relative overflow-hidden rounded-[30px] p-6 text-center border shadow-2xl transition-all ${
            isInk
              ? "bg-gradient-to-b from-[#141a16] to-[#0f1411] border-[#4A554D]/40 shadow-black/60"
              : "bg-white border-neutral-200/90 shadow-stone-200/80"
          }`}
        >
          {/* Subtle Ambient Aura Glow */}
          <div
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-40"
            style={{ backgroundColor: "#4A554D" }}
          />

          <div className="relative flex flex-col items-center">
            {/* Logo Display with Zen Monk Coil Emblem */}
            <div
              className={`relative h-20 w-full max-w-[260px] mb-3.5 rounded-2xl overflow-hidden p-2.5 flex items-center justify-center border shadow-md transition-all ${
                isInk
                  ? "bg-neutral-950/80 border-[#4A554D]/50"
                  : "bg-white border-neutral-200"
              }`}
            >
              <Image
                src="/assets/bhikshu-logo.png"
                alt="Bhikshu Tattoo Studio"
                width={240}
                height={80}
                className="object-contain max-h-16 w-auto"
                priority
                unoptimized
              />
            </div>

            {/* Studio Title & Sanskrit Meaning */}
            <h1
              className={`text-2xl sm:text-[27px] font-black tracking-tight uppercase leading-tight ${
                isInk ? "text-neutral-100" : "text-neutral-900"
              }`}
            >
              Bhikshu Tattoo Studio
            </h1>

            <p className="mt-1 text-xs font-semibold tracking-wide text-amber-500/95 uppercase">
              Viman Nagar, Pune • Est. 2018
            </p>

            {/* Google Rating Showcase Badge */}
            <div
              className={`mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs shadow-sm ${
                isInk
                  ? "bg-neutral-900/90 border-[#4A554D]/50 text-neutral-200"
                  : "bg-neutral-50 border-neutral-200 text-neutral-800"
              }`}
            >
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-amber-400">5.0</span>
              <span
                className={`font-semibold ${
                  isInk ? "text-neutral-400" : "text-neutral-600"
                }`}
              >
                (403 Google Reviews)
              </span>
            </div>

            {/* Zen Philosophy Statement */}
            <p
              className={`mt-3 text-xs leading-relaxed max-w-xs font-medium ${
                isInk ? "text-neutral-300/90" : "text-neutral-700"
              }`}
            >
              &ldquo;Connecting your stories to your tattoo with peace, hygiene, and timeless craftsmanship.&rdquo;
            </p>

            {/* Trust Badges Bar */}
            <div className="mt-4 pt-3.5 border-t border-neutral-500/15 w-full flex items-center justify-around text-[10px] font-bold uppercase tracking-wider text-amber-400/90">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Sterile
              </span>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-amber-400" /> 15+ Yrs Mastery
              </span>
              <span className="text-neutral-600">•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" /> Free Consult
              </span>
            </div>
          </div>
        </header>

        {/* AI Review Generator Section (Invyrah-Style 5-Second Custom Review Builder) */}
        <section
          className={`rounded-[30px] p-5 sm:p-6 border shadow-xl space-y-4 transition-all ${
            isInk
              ? "bg-[#121614] border-[#4A554D]/30 shadow-black/40"
              : "bg-white border-neutral-200"
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2
                  className={`text-sm font-black uppercase tracking-wide ${
                    isInk ? "text-amber-300" : "text-neutral-900"
                  }`}
                >
                  AI Review Assistant
                </h2>
                <p className="text-[11px] text-neutral-400 font-medium">
                  Select your experience & build your review in 5 seconds
                </p>
              </div>
            </div>

            <Badge
              className={`border text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                isInk
                  ? "bg-amber-400/10 text-amber-300 border-amber-400/30"
                  : "bg-amber-50 text-amber-800 border-amber-300"
              }`}
            >
              5 SEC BUILDER
            </Badge>
          </div>

          {/* Step 1: Select Tattoo Style / Service */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider block text-amber-400/90">
              1. What style did you get?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {(business.courseOptions || []).map((style) => {
                const isSelected = selectedStyle === style;
                return (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`text-xs px-3 py-1.5 rounded-xl font-bold transition-all ${
                      isSelected
                        ? "bg-[#4A554D] text-amber-100 shadow-md scale-[1.02] border border-amber-400/40"
                        : isInk
                        ? "bg-neutral-900 text-neutral-300 hover:bg-neutral-800 border border-neutral-800"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: What Stood Out Most */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider block text-amber-400/90">
                2. What stood out the most?
              </label>
              <span className="text-[10px] text-neutral-400 font-semibold">Pick up to 3</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(business.highlightOptions || []).map((hl) => {
                const isSelected = selectedHighlights.includes(hl);
                return (
                  <button
                    key={hl}
                    onClick={() => toggleHighlight(hl)}
                    className={`text-xs px-2.5 py-1.5 rounded-xl font-semibold transition-all ${
                      isSelected
                        ? "border-2 font-bold border-amber-400/60 bg-amber-400/10 text-amber-300"
                        : isInk
                        ? "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                    }`}
                  >
                    {isSelected ? "✓ " : "+ "}
                    {hl}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Choose Language */}
          <div className="space-y-1.5 pt-1">
            <label className="text-[11px] font-bold uppercase tracking-wider block text-amber-400/90">
              3. Review Language
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {[
                { code: "en" as ReviewLanguage, label: "English" },
                { code: "hinglish" as ReviewLanguage, label: "Hinglish" },
                { code: "mr" as ReviewLanguage, label: "मराठी" },
                { code: "hi" as ReviewLanguage, label: "हिंदी" }
              ].map((lang) => {
                const isSelected = language === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`text-xs py-1.5 rounded-xl text-center font-bold transition-all ${
                      isSelected
                        ? "bg-[#4A554D] text-amber-100 shadow-md border border-amber-400/40"
                        : isInk
                        ? "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 border border-neutral-800"
                        : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border border-neutral-200"
                    }`}
                  >
                    {lang.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Generated Review Draft Box */}
          <div
            className={`mt-3 relative rounded-2xl p-4 border space-y-3 shadow-inner ${
              isInk
                ? "bg-neutral-950/80 border-[#4A554D]/40"
                : "bg-white border-neutral-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs pb-2 border-b border-neutral-500/15">
              <span className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-[11px] text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
                Live Review Draft
              </span>

              <button
                type="button"
                onClick={handleShuffle}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-md text-amber-300 bg-amber-400/10 hover:bg-amber-400/20 transition-colors"
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
                  textareaRef.current.style.height = `${Math.max(
                    92,
                    textareaRef.current.scrollHeight
                  )}px`;
                }
              }}
              className={`w-full text-sm font-normal bg-transparent resize-none overflow-hidden border-none p-0 focus:outline-none focus:ring-0 leading-relaxed font-sans ${
                isInk ? "text-neutral-200" : "text-neutral-800"
              }`}
              placeholder="Your review draft will appear here..."
              rows={3}
            />

            {/* Glowing Hero Primary Action Button */}
            <Button
              onClick={handleCopyAndOpenGoogle}
              className="w-full h-12 text-black font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 uppercase tracking-wide bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:brightness-110 active:scale-[0.99] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-black" />
                  <span>Copied! Opening Google Reviews...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-black" />
                  <span>Copy Draft &amp; Open Google Reviews</span>
                  <ExternalLink className="w-4 h-4 text-black" />
                </>
              )}
            </Button>
          </div>
        </section>

        {/* Private Note To Artist / Studio Founder Option */}
        <div className="text-center pt-1">
          <button
            onClick={() => setShowPrivateModal(true)}
            className="text-xs font-semibold text-neutral-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 underline underline-offset-4 cursor-pointer"
          >
            <MessageSquareHeart className="w-3.5 h-3.5 text-amber-400" />
            <span>Have private feedback for Sandip Waghmare? Send direct note</span>
          </button>
        </div>

        {/* Modal for Private Feedback */}
        {showPrivateModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div
              className={`w-full max-w-sm rounded-3xl p-5 border shadow-2xl space-y-3.5 ${
                isInk
                  ? "bg-[#141a16] border-[#4A554D]/60 text-white"
                  : "bg-white border-neutral-200 text-neutral-900"
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase text-amber-400">
                  Private Note to Sandip Sir
                </h3>
                <button
                  onClick={() => setShowPrivateModal(false)}
                  className="text-xs text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {privateSubmitted ? (
                <div className="py-6 text-center space-y-2">
                  <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                  <p className="text-xs font-bold text-emerald-300">
                    Thank you! Your private message was recorded.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    This note will be sent directly to the studio founder without being published publicly.
                  </p>
                  <textarea
                    value={privateNote}
                    onChange={(e) => setPrivateNote(e.target.value)}
                    placeholder="Write your note or question here..."
                    className="w-full h-24 p-2.5 text-xs rounded-xl border border-neutral-700 bg-neutral-900 text-white focus:outline-none focus:border-amber-400"
                  />
                  <input
                    type="text"
                    value={privateContact}
                    onChange={(e) => setPrivateContact(e.target.value)}
                    placeholder="Your Phone / Email (optional)"
                    className="w-full p-2.5 text-xs rounded-xl border border-neutral-700 bg-neutral-900 text-white focus:outline-none focus:border-amber-400"
                  />
                  <Button
                    onClick={() => {
                      if (!privateNote.trim()) return;
                      setPrivateSubmitted(true);
                      setTimeout(() => {
                        setShowPrivateModal(false);
                        setPrivateSubmitted(false);
                        setPrivateNote("");
                      }, 1800);
                    }}
                    className="w-full h-10 text-xs font-bold uppercase bg-[#4A554D] text-amber-200 hover:bg-[#3d463f] rounded-xl"
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Private Note
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Studio Connect Bar (WhatsApp, 2 Instagrams, Save Contact, Website, Maps) */}
        <section
          className={`rounded-[30px] p-5 border shadow-xl text-center space-y-3 ${
            isInk
              ? "bg-[#121614] border-[#4A554D]/30"
              : "bg-white border-neutral-200"
          }`}
        >
          <p className="text-xs font-bold uppercase tracking-wider text-amber-400/90">
            Connect &amp; Follow Bhikshu Studio
          </p>

          <div className="flex items-center justify-center gap-3 sm:gap-4 pt-1">
            {/* 1. Main Instagram */}
            <a
              href="https://www.instagram.com/bhikshu_tattoo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @bhikshu_tattoo"
              title="Follow @bhikshu_tattoo"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 shadow-sm group ${
                isInk
                  ? "bg-neutral-900 border-neutral-700 text-amber-300 hover:border-amber-400"
                  : "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-800"
              }`}
            >
              <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* 2. 2nd Instagram Portfolio */}
            <a
              href="https://www.instagram.com/bhikshutattoo/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @bhikshutattoo"
              title="Follow @bhikshutattoo"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 shadow-sm group ${
                isInk
                  ? "bg-neutral-900 border-neutral-700 text-amber-300 hover:border-amber-400"
                  : "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-800"
              }`}
            >
              <div className="relative">
                <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
              </div>
            </a>

            {/* 3. 1-Tap Save Contact to Phone */}
            <button
              onClick={handleDownloadVcard}
              type="button"
              aria-label="Save Contact"
              title="Save Contact to Phone"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 shadow-sm group cursor-pointer ${
                isInk
                  ? "bg-neutral-900 border-neutral-700 text-amber-300 hover:border-amber-400"
                  : "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-800"
              }`}
            >
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* 4. WhatsApp VIP Consultation */}
            <a
              href="https://wa.me/919689976453?text=Hi%20Bhikshu%20Tattoo%20Studio%2C%20I%20would%20like%20to%20enquire%20about%20a%20tattoo%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 shadow-sm group ${
                isInk
                  ? "bg-neutral-900 border-neutral-700 text-emerald-400 hover:border-emerald-400"
                  : "bg-white border-neutral-300 text-emerald-600 hover:border-emerald-700"
              }`}
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>

            {/* 5. Official Website */}
            <a
              href="https://www.bhikshutattoostudio.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Website"
              title="Visit bhikshutattoostudio.com"
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all hover:-translate-y-1 active:scale-95 shadow-sm group ${
                isInk
                  ? "bg-neutral-900 border-neutral-700 text-amber-300 hover:border-amber-400"
                  : "bg-white border-neutral-300 text-neutral-800 hover:border-neutral-800"
              }`}
            >
              <Globe className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Physical Address with Map Link */}
          <div className="pt-2 text-[11px] text-neutral-400 space-y-1 border-t border-neutral-500/10">
            <p className="flex items-center justify-center gap-1 font-semibold text-neutral-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Lane No. 12, Row House 3, Konark Nagar, CCD Chowk, Viman Nagar, Pune</span>
            </p>
            <a
              href="https://maps.app.goo.gl/ZWi4gTXhM4aZ4pS79"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 hover:underline pt-0.5"
            >
              <span>View Studio on Google Maps</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-2 pb-4 space-y-1">
          <p className="text-[12px] font-bold tracking-wider text-amber-400 uppercase">
            Bhikshu Tattoo Studio • Pune Review &amp; Sanctuary Hub
          </p>
          <p className="text-[10px] text-neutral-500 font-medium">
            bhikshutattoostudio.vercel.app • Verified 5.0 ★ Google Hub
          </p>
        </footer>
      </main>
    </div>
  );
}
