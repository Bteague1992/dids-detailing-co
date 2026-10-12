import { businessConfig } from "@/config/business";

// ---------------------------------------------------------------------------
// The site's indexable pages (the 20 from the restructure, plus /book), and when each last really changed.
//
// This is the only source for the sitemap. `lastModified` is a real date that
// you update by hand when a page's content changes — NOT the build time.
// (Stamping every URL with the deploy time tells Google everything changed on
// every deploy, and it learns to ignore the dates.)
//
// When you edit a page's content, bump its date here. A price change in
// config/services.ts touches the pages that show prices; a change to a town's
// copy touches that town's page.
// ---------------------------------------------------------------------------

export interface SitePage {
  path: string;
  /** YYYY-MM-DD */
  lastModified: string;
}

/** Date of the 20-page restructure, when every page's content changed. */
const RESTRUCTURE = "2026-10-12";

const corePages: SitePage[] = [
  { path: "/", lastModified: RESTRUCTURE },
  { path: "/packages", lastModified: RESTRUCTURE },
  { path: "/car-detailing", lastModified: RESTRUCTURE },
  { path: "/motorcycle-detailing", lastModified: RESTRUCTURE },
  { path: "/rv-detailing", lastModified: RESTRUCTURE },
  { path: "/dads-club", lastModified: RESTRUCTURE },
  { path: "/services", lastModified: RESTRUCTURE },
  { path: "/service-areas", lastModified: RESTRUCTURE },
  { path: "/portfolio", lastModified: RESTRUCTURE },
  { path: "/about", lastModified: RESTRUCTURE },
  { path: "/faq", lastModified: RESTRUCTURE },
  { path: "/contact", lastModified: RESTRUCTURE },
  { path: "/book", lastModified: "2026-10-12" },
];

/** Per-town dates. Bump one when that town's copy in lib/city-content.ts changes. */
const cityLastModified: Record<string, string> = {
  hickory: RESTRUCTURE,
  morganton: RESTRUCTURE,
  lenoir: RESTRUCTURE,
  valdese: RESTRUCTURE,
  conover: RESTRUCTURE,
  newton: RESTRUCTURE,
  "granite-falls": RESTRUCTURE,
  "long-view": RESTRUCTURE,
};

export const sitePages: SitePage[] = [
  ...corePages,
  ...businessConfig.serviceAreaCities.map((city) => ({
    path: `/mobile-car-detailing/${city.slug}/nc`,
    lastModified: cityLastModified[city.slug] ?? RESTRUCTURE,
  })),
];
