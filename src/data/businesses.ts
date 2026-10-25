import { PublicBusinessData } from "@/types/public-business";

/**
 * =========================================================================
 * CENTRALIZED BUSINESS REGISTRY (AUTO-SYNCED FROM EXCEL)
 * =========================================================================
 * Synced from: TrueReview_Business_Registry.xlsx
 * Last updated: 2026-10-25T12:14:37.561Z
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
  },
  "bhikshu-tattoo": {
    "id": "bhikshu-tattoo-id",
    "name": "Bhikshu Tattoo Studio",
    "slug": "bhikshu-tattoo",
    "tagline": "Viman Nagar, Pune • Connecting Stories to Tattoo",
    "category": "Tattoo & Body Art Studio",
    "welcomeMessage": "Connecting your stories to your tattoo with peace & precision. Share your ink journey on Google.",
    "logoPath": "/assets/bhikshu-logo.png",
    "primaryColor": "#4A554D",
    "accentColor": "#FAF9F5",
    "googleReviewUrl": "https://www.google.com/maps/place/Bhikshu+Tattoo+Studio+%7C+Best+tattoo+studio+in+pune/@18.5654478,73.9105924,112m/data=!3m1!1e3!4m8!3m7!1s0x3bc2c15ecc1b8797:0x315b9b1fa5949c21!8m2!3d18.5654477!4d73.9109004!9m1!1b1!16s%2Fg%2F11qnttbv42?entry=ttu&g_ep=EgoyMDI2MTAyMC4wIKXMDSoASAFQAw%3D%3D",
    "googleMapsUrl": "https://maps.app.goo.gl/ZWi4gTXhM4aZ4pS79",
    "websiteUrl": "https://www.bhikshutattoostudio.com/",
    "instagram1": "https://www.instagram.com/bhikshu_tattoo/",
    "instagram1Label": "@bhikshu_tattoo",
    "instagram2": "https://www.instagram.com/bhikshutattoo/",
    "instagram2Label": "@bhikshutattoo",
    "phone": "+91 96899 76453",
    "whatsapp": "919689976453",
    "address": "Lane No.12, Row House 3, Konark Nagar, CCD Chowk, opp. Udaan Bio-Diversity Park, Viman Nagar, Pune, Maharashtra 411014",
    "rating": 5,
    "reviewCount": 403,
    "courseOptions": [
      "Custom Tattoo Design",
      "Realism & Portraits",
      "Mandala & Fine Line",
      "Tribal & Maori",
      "Black & Grey",
      "Script & Lettering",
      "Sculpture Tattoo",
      "Body Piercing"
    ],
    "highlightOptions": [
      "100% Sterile & Hygiene First",
      "Incredibly Fine Lines",
      "Peaceful Studio Ambience",
      "Patient & Gentle Artists",
      "Meaningful Custom Design",
      "Clear Aftercare Guidance",
      "Transparent Pricing"
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
