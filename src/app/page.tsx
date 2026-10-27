import { BhikshuReviewInterface } from "@/components/bhikshu/BhikshuReviewInterface";
import { NaadReviewInterface } from "@/components/naad/NaadReviewInterface";
import { BHIKSHU_TATTOO_BUSINESS, NAAD_JAMROOM_BUSINESS } from "@/types/public-business";
import { getRegisteredBusiness } from "@/data/businesses";
import { Metadata } from "next";
import { headers } from "next/headers";

export async function generateMetadata(): Promise<Metadata> {
  const headerList = await headers();
  const host = headerList.get("host") || "";

  if (host.includes("naad")) {
    return {
      title: "Naad Jamroom & Studio — Google Reviews & Musician Connect",
      description:
        "Official Google review & musician connect portal for Naad Jamroom and Recording Studio, Kharadi, Pune. 4.9 Stars (125 Reviews) • Pune's Premier Jamming Space.",
      openGraph: {
        title: "Naad Jamroom & Studio — Google Review Hub",
        description: "Where music finds its rhythm. Share your jamming and recording experience on Google.",
        images: ["/assets/naad-logo.png"],
      },
    };
  }

  return {
    title: "Bhikshu Tattoo Studio — Google Reviews & Connect Sanctuary",
    description:
      "Official Google review & customer connect portal for Bhikshu Tattoo Studio, Viman Nagar, Pune. 5.0 Stars (403 Reviews) • 100% Sterile Studio.",
    openGraph: {
      title: "Bhikshu Tattoo Studio — Google Review Hub",
      description: "Connecting your stories to your tattoo. Share your ink experience on Google.",
      images: ["/assets/bhikshu-logo.png"],
    },
  };
}

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ biz?: string; slug?: string }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const headerList = await headers();
  const host = headerList.get("host") || "";
  const param = resolvedSearchParams?.biz || resolvedSearchParams?.slug || "";

  if (host.includes("naad") || param.includes("naad")) {
    return <NaadReviewInterface business={getRegisteredBusiness("naadjamroom")} />;
  }

  return <BhikshuReviewInterface business={BHIKSHU_TATTOO_BUSINESS} />;
}
