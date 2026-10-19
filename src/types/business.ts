export interface BusinessItem {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  welcome_message: string | null;
  logo_path: string | null;
  primary_color: string;
  google_review_url: string | null;
  role: "owner" | "manager" | "staff";
  isOwner: boolean;
}

export const PHOENIX_TECH_BUSINESS_ITEM: BusinessItem = {
  id: "phoenix-tech-id",
  name: "Phoenix-Tech Academy",
  slug: "phoenix-tech",
  description: "Computer training, coding, and skill development in Hadapsar, Pune.",
  welcome_message: "Empowering careers through practical tech education! Share your learning experience on Google.",
  logo_path: "/assets/phoenix-logo.png",
  primary_color: "#045d17",
  google_review_url: "https://search.google.com/local/writereview?placeid=ChIJrW2Ak0WhsYgR_IE53lu0Jqg",
  role: "owner",
  isOwner: true,
};

export const DEMO_SALON_BUSINESS: BusinessItem = PHOENIX_TECH_BUSINESS_ITEM;

