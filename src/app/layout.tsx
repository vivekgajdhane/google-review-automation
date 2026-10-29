import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phoenix-Tech Academy — Google Reviews",
  description:
    "Official Google review & student connect portal for Phoenix-Tech Academy, Sayyad Nagar, Hadapsar, Pune. 4.9 Stars • Practical Tech Education.",
  openGraph: {
    title: "Phoenix-Tech Academy — Google Review Hub",
    description: "Empowering careers through practical tech education. Share your learning experience on Google.",
    images: ["/assets/phoenix-emblem-clean.png"],
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
      <body className="flex min-h-full flex-col bg-[#fff3d7] font-sora text-[#08210d] selection:bg-[#045d17] selection:text-white">
        {children}
      </body>
    </html>
  );
}
