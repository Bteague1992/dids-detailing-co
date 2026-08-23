export type ServiceConfigSource =
  | "packages"
  | "motorcycleServices"
  | "camperRvServices"
  | "maintenancePlans";

export interface ServiceCategory {
  slug: string;
  name: string;
  shortDescription: string;
  /** Which array in servicesConfig / maintenancePlans this category pulls its pricing tiers from. */
  configSource: ServiceConfigSource;
  /** Restrict to only these package ids. */
  onlyIds?: string[];
  /** Exclude these package ids from the `packages` array for this category. */
  excludeIds?: string[];
  /**
   * True when this category already has an established, indexed page outside
   * the /services and /service-areas structure (the legacy /car-detailing,
   * /motorcycle-detailing, /mobile-car-detailing/[city]/nc, and
   * /mobile-motorcycle-detailing/[city]/nc pages). For these categories the
   * new /services/[slug] and /service-areas/[city]/[slug] pages are neither
   * statically generated nor listed in the sitemap — they 308-redirect to the
   * legacy equivalent instead (see next.config.ts redirects() and
   * SEO-URL-MAP.md) to avoid splitting ranking signal across near-duplicate
   * pages.
   */
  legacyPage?: boolean;
}

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "car-detailing",
    name: "Car Detailing",
    shortDescription:
      "Mobile exterior, interior, and full detail packages for sedans, trucks, and SUVs.",
    configSource: "packages",
    legacyPage: true,
  },
  {
    slug: "motorcycle-detailing",
    name: "Motorcycle Detailing",
    shortDescription:
      "Hand wash and full detail services for cruisers, sport bikes, and touring bikes.",
    configSource: "motorcycleServices",
    legacyPage: true,
  },
  {
    slug: "camper-rv-detailing",
    name: "Camper & RV Detailing",
    shortDescription:
      "Top-to-bottom exterior and interior detailing for campers, RVs, and trailers, priced by length.",
    configSource: "camperRvServices",
  },
  {
    slug: "maintenance-plans",
    name: "Maintenance Plans",
    shortDescription:
      "Recurring wash plans for cars, motorcycles, and campers/RVs — no contract, cancel anytime.",
    configSource: "maintenancePlans",
  },
];

/** Non-legacy categories: the only ones the /services/[slug] route generates. */
export function getGeneratedServiceCategories(): ServiceCategory[] {
  return serviceCategories.filter((c) => !c.legacyPage);
}

/** Standalone legacy page for a category with legacyPage: true, e.g. /car-detailing. */
export function getLegacyServicePath(categorySlug: string): string | null {
  switch (categorySlug) {
    case "car-detailing":
      return "/car-detailing";
    case "motorcycle-detailing":
      return "/motorcycle-detailing";
    default:
      return null;
  }
}

/** Per-city legacy page for a category with legacyPage: true, e.g. /mobile-car-detailing/hickory/nc. */
export function getLegacyServiceAreaPath(
  citySlug: string,
  categorySlug: string,
): string | null {
  switch (categorySlug) {
    case "car-detailing":
      return `/mobile-car-detailing/${citySlug}/nc`;
    case "motorcycle-detailing":
      return `/mobile-motorcycle-detailing/${citySlug}/nc`;
    default:
      return null;
  }
}

/** Resolves to the right URL for a category link from a city context — the
 * legacy per-city page for car/motorcycle detailing, or the new combined
 * page for everything else. */
export function getServiceAreaCategoryHref(
  citySlug: string,
  category: ServiceCategory,
): string {
  return (
    getLegacyServiceAreaPath(citySlug, category.slug) ??
    `/service-areas/${citySlug}/${category.slug}`
  );
}

/** Resolves to the right URL for a category link with no city context — the
 * legacy standalone page for car/motorcycle detailing, or the new service
 * category page for everything else. */
export function getServiceCategoryHref(category: ServiceCategory): string {
  return getLegacyServicePath(category.slug) ?? `/services/${category.slug}`;
}
