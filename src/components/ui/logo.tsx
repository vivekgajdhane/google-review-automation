"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
  /**
   * Optional custom logo URL. If omitted, checks for /brand/logo.svg or /brand/logo.png.
   * Drop your official logo file into: public/brand/logo.svg or public/brand/logo.png
   */
  logoSrc?: string | null;
}

export function Logo({
  className,
  iconOnly = false,
  size = "md",
  logoSrc = "/brand/logo.png",
  ...props
}: LogoProps) {
  const [imageError, setImageError] = React.useState(false);

  // If a custom logo asset exists and hasn't errored, display the official asset
  const hasCustomAsset = Boolean(logoSrc) && !imageError;

  const sizeClasses = {
    sm: "h-7 w-7 text-xs",
    md: "h-9 w-9 text-sm",
    lg: "h-12 w-12 text-base",
  };

  const textClasses = {
    sm: "text-lg font-bold tracking-tight text-slate-900",
    md: "text-xl font-bold tracking-tight text-slate-900",
    lg: "text-2xl font-extrabold tracking-tight text-slate-900",
  };

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)} {...props}>
      {hasCustomAsset && logoSrc ? (
        <div className={cn("relative overflow-hidden rounded-xl", sizeClasses[size])}>
          <Image
            src={logoSrc}
            alt="TrueReview Logo"
            fill
            sizes="48px"
            className="object-contain"
            onError={() => setImageError(true)}
            priority
          />
        </div>
      ) : (
        /* Official Typographic & Vector Fallback */
        <div
          className={cn(
            "flex items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white shadow-sm ring-1 ring-black/5",
            sizeClasses[size]
          )}
          aria-label="TrueReview Logo"
        >
          <div className="relative flex items-center justify-center">
            <span className="font-extrabold tracking-tighter text-white font-sans">TR</span>
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-blue-700" />
          </div>
        </div>
      )}

      {!iconOnly && (
        <div className="flex flex-col leading-none">
          <span className={textClasses[size]}>
            True<span className="text-blue-600">Review</span>
          </span>
        </div>
      )}
    </div>
  );
}
