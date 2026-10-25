import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhikshu Tattoo Studio — Google Reviews & Connect Sanctuary",
  description:
    "Official Google review & customer connect portal for Bhikshu Tattoo Studio, Viman Nagar, Pune. 5.0 Stars (403 Reviews) • 100% Sterile Studio.",
  openGraph: {
    title: "Bhikshu Tattoo Studio — Google Review Hub",
    description: "Connecting your stories to your tattoo. Share your ink experience on Google.",
    images: ["/assets/bhikshu-logo.png"],
  },
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
      <body className="flex min-h-full flex-col bg-[#28302B] font-dm text-[#FFFFFF] selection:bg-[#9C7A3C] selection:text-white">
        {children}
      </body>
    </html>
  );
}
