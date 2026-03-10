import type { ServiceCity } from "@/src/config/business";

/**
 * Generates SEO-optimized intro text for city landing pages
 */
export function generateCitySeoIntro(city: ServiceCity): string {
  return `Dad's Mobile Detailing Co. brings professional car detailing directly to ${city.name}, NC — no drop-off required. We come to you to detail your car, truck, SUV, or motorcycle. Exterior washes start at $70. Text us to book your detail today.`;
}

/**
 * Generates SEO-optimized meta description for city landing pages
 * Target: 140-160 characters
 */
export function generateCityMetaDescription(city: ServiceCity): string {
  return `Mobile car detailing in ${city.name}, NC starting at $70. Cars, trucks, SUVs & motorcycles. We come to you — no drop-off needed. Text to book today.`;
}

/**
 * Generates SEO-optimized intro text for motorcycle city landing pages
 */
export function generateMotorcycleCitySeoIntro(city: ServiceCity): string {
  return `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to ${city.name}, NC — no drop-off required. Whether you ride a cruiser, sport bike, or touring bike, we come to wherever your bike is parked with everything needed to make it shine. Basic wash starts at $65, full detail at $120. Text us to book your motorcycle detail today.`;
}

/**
 * Generates SEO-optimized meta description for motorcycle city landing pages
 * Target: 140-160 characters
 */
export function generateMotorcycleCityMetaDescription(
  city: ServiceCity,
): string {
  return `Mobile motorcycle detailing in ${city.name}, NC starting at $65. We come to you — no drop-off needed. Basic wash & full detail available. Text to book today.`;
}
