import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrueReview — Ethical QR Customer Feedback & Google Review Link Assistant",
  description: "Help customers easily open your official Google review page or share direct private feedback without review gating or gimmicks.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-slate-50 font-sans text-slate-900 selection:bg-slate-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
