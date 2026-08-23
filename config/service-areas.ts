export interface ServiceArea {
  slug: string;
  name: string;
  state: string;
}

// Mirrors businessConfig.serviceAreaCities (config/business.ts) in name/slug,
// reshaped to drive the /service-areas/[citySlug] page tier. Kept as a separate
// config per the site's SEO page structure rather than merged with businessConfig,
// which also carries per-city marketing copy used by the legacy SEO pages.
export const serviceAreas: ServiceArea[] = [
  { slug: "hickory", name: "Hickory", state: "NC" },
  { slug: "morganton", name: "Morganton", state: "NC" },
  { slug: "lenoir", name: "Lenoir", state: "NC" },
  { slug: "newton", name: "Newton", state: "NC" },
  { slug: "valdese", name: "Valdese", state: "NC" },
  { slug: "conover", name: "Conover", state: "NC" },
  { slug: "granite-falls", name: "Granite Falls", state: "NC" },
  { slug: "long-view", name: "Long View", state: "NC" },
];
