import { BhikshuReviewInterface } from "@/components/bhikshu/BhikshuReviewInterface";
import { BHIKSHU_TATTOO_BUSINESS } from "@/types/public-business";
import { Metadata } from "next";

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

export default function HomePage() {
  return <BhikshuReviewInterface business={BHIKSHU_TATTOO_BUSINESS} />;
}
