import type { Metadata } from "next";
import { getRegisteredBusiness } from "@/data/businesses";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolved = await params;
  const slug = resolved?.slug || "phoenix-tech";
  const business = getRegisteredBusiness(slug);

  return {
    title: `${business.name} — Google Reviews`,
    description: `Official Google review & student feedback portal for ${business.name}, ${business.address || "Hadapsar, Pune"}. Rate your experience.`,
    openGraph: {
      title: `${business.name} — Google Reviews`,
      description: business.welcomeMessage,
      images: [business.logoPath || "/assets/phoenix-emblem-clean.png"],
    },
  };
}

export default function PublicBusinessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

