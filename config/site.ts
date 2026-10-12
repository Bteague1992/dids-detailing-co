import { business, primaryTowns } from "@/config/business";
import { startingCarPrice } from "@/config/services";

// Site-level settings. Contact details, hours, and the booking link live in
// config/business.ts — the values below are re-exported from there so they
// only ever need changing in one place.
export const siteConfig = {
  domain: "https://www.dadsdetailco.com",
  title: business.NAME,
  tagline: business.TAGLINE,
  description: `Mobile detailing for real families and everyday vehicles around ${primaryTowns}, NC. Honest prices from $${startingCarPrice}. We come to you.`,
  phone: business.PHONE,
  email: business.EMAIL,
  hours: business.HOURS,
} as const;
