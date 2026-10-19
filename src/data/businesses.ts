import { PublicBusinessData } from "@/types/public-business";

/**
 * =========================================================================
 * CENTRALIZED BUSINESS REGISTRY (AUTO-SYNCED FROM EXCEL)
 * =========================================================================
 * Synced from: TrueReview_Business_Registry.xlsx
 * Last updated: 2026-10-18T07:51:03.980Z
 * =========================================================================
 */

export const BUSINESSES_REGISTRY: Record<string, PublicBusinessData> = {
  "phoenix-tech": {
    "id": "phoenix-tech-id",
    "name": "Phoenix-Tech Academy",
    "slug": "phoenix-tech",
    "tagline": "Hadapsar, Pune • Computer Training & Skill Development",
    "category": "Computer Training Institute",
    "welcomeMessage": "Empowering careers through practical tech education! Share your learning experience on Google.",
    "logoPath": "/assets/phoenix-logo.png",
    "primaryColor": "#045d17",
    "accentColor": "#fff3d7",
    "googleReviewUrl": "https://search.google.com/local/writereview?placeid=ChIJrW2Ak0WhsYgR_IE53lu0Jqg",
    "googleMapsUrl": "https://maps.app.goo.gl/LxWdpPeaiGrhzMQPA",
    "websiteUrl": "https://phoenix-tech.in/",
    "facebookUrl": "https://www.facebook.com/phoenixtechacademy/",
    "instagram1": "https://www.instagram.com/phoenixtechacademy/",
    "instagram1Label": "@phoenixtechacademy",
    "instagram2": "https://www.instagram.com/phoenixtech.co/",
    "instagram2Label": "@phoenixtech.co",
    "phone": "+91 86056 01030",
    "whatsapp": "918605601030",
    "address": "Sayyad Nagar, Hadapsar, Pune, Maharashtra 411028",
    "rating": 4.9,
    "reviewCount": 140,
    "courseOptions": [
      "MS-CIT Certification",
      "Python & Coding",
      "Basic Computer Course",
      "Web Development",
      "English Speaking",
      "Advanced Excel & Office"
    ],
    "highlightOptions": [
      "Expert Faculty & Mentorship",
      "Modern Hands-on Lab",
      "Practical Real Projects",
      "Personal Attention",
      "Flexible Batch Timings",
      "Affordable Fees",
      "Career Guidance"
    ]
  },
  "example-dental": {
    "id": "example-dental-id",
    "name": "Example Dental Clinic",
    "slug": "example-dental",
    "tagline": "Kothrud, Pune • Gentle & Advanced Dental Care",
    "category": "Dental Clinic & Implant Center",
    "welcomeMessage": "Your smile is our priority! Share your treatment experience with Dr. Sharma.",
    "logoPath": "/assets/default-logo.png",
    "primaryColor": "#045d17",
    "accentColor": "#fff3d7",
    "googleReviewUrl": "https://maps.app.goo.gl/example",
    "googleMapsUrl": "https://maps.app.goo.gl/example",
    "websiteUrl": "https://exampledental.com",
    "instagram1": "https://www.instagram.com/exampledental/",
    "instagram1Label": "@exampledental",
    "phone": "+91 98765 43210",
    "whatsapp": "919876543210",
    "address": "Shop 4, Kothrud Main Road, Pune, Maharashtra 411038",
    "rating": 4.8,
    "reviewCount": 85,
    "courseOptions": [
      "Teeth Whitening",
      "Root Canal Treatment",
      "Dental Implants",
      "Invisible Aligners",
      "General Cleaning",
      "Pediatric Dentistry"
    ],
    "highlightOptions": [
      "Painless Treatment",
      "Friendly Doctors",
      "Ultra-Clean Clinic",
      "Affordable Pricing",
      "Quick Appointment",
      "Advanced Equipment"
    ]
  }
};

export function getRegisteredBusiness(slug: string): PublicBusinessData {
  const normalized = (slug || "").toLowerCase().trim();
  if (BUSINESSES_REGISTRY[normalized]) {
    return BUSINESSES_REGISTRY[normalized];
  }
  // Default fallback is phoenix-tech or first available
  return BUSINESSES_REGISTRY["phoenix-tech"] || Object.values(BUSINESSES_REGISTRY)[0];
}
