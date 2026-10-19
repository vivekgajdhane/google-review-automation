export interface PublicBusinessData {
  id: string;
  name: string;
  slug: string;
  tagline?: string;
  category?: string;
  welcomeMessage: string;
  logoPath: string | null;
  primaryColor: string;
  accentColor?: string;
  googleReviewUrl: string | null;
  googleMapsUrl?: string;
  websiteUrl?: string;
  facebookUrl?: string;
  instagram1?: string;
  instagram1Label?: string;
  instagram2?: string;
  instagram2Label?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  courseOptions?: string[];
  highlightOptions?: string[];
  isDemo?: boolean;
}

export const PHOENIX_TECH_BUSINESS: PublicBusinessData = {
  id: "phoenix-tech-id",
  name: "Phoenix-Tech Academy",
  slug: "phoenix-tech",
  tagline: "Hadapsar, Pune • Computer Training & Skill Development",
  category: "Computer Training Institute",
  welcomeMessage: "Empowering careers through practical tech education! Share your learning experience on Google.",
  logoPath: "/assets/phoenix-logo.png",
  primaryColor: "#C9A24D",
  accentColor: "#0F0F12",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJrW2Ak0WhsYgR_IE53lu0Jqg",
  googleMapsUrl: "https://maps.app.goo.gl/LxWdpPeaiGrhzMQPA",
  websiteUrl: "https://phoenix-tech.in/",
  facebookUrl: "https://www.facebook.com/phoenixtechacademy/",
  instagram1: "https://www.instagram.com/phoenixtechacademy/",
  instagram1Label: "@phoenixtechacademy",
  instagram2: "https://www.instagram.com/phoenixtech.co/",
  instagram2Label: "@phoenixtech.co",
  phone: "+91 86056 01030",
  whatsapp: "918605601030",
  address: "Sayyad Nagar, Hadapsar, Pune, Maharashtra 411028",
  rating: 4.9,
  reviewCount: 140,
  courseOptions: [
    "MS-CIT Certification",
    "Python & Coding",
    "Basic Computer Course",
    "Web Development",
    "English Speaking",
    "Advanced Excel & Office"
  ],
  highlightOptions: [
    "Expert Faculty & Mentorship",
    "Modern Hands-on Lab",
    "Practical Real Projects",
    "Personal Attention",
    "Flexible Batch Timings",
    "Affordable Fees",
    "Career Guidance"
  ],
  isDemo: false,
};

export const DEMO_PUBLIC_BUSINESS: PublicBusinessData = PHOENIX_TECH_BUSINESS;

