import type { ServiceCity } from "@/src/config/business";

/**
 * Generates SEO-optimized intro text for city landing pages
 */
export function generateCitySeoIntro(city: ServiceCity): string {
  return `Dad's Mobile Detailing Co. brings professional car detailing directly to ${city.name}, NC — no drop-off required. We come to you with everything needed to detail your car, truck, or SUV. Exterior washes start at $70. Text us to book your detail today.`;
}

/**
 * Generates SEO-optimized meta description for city landing pages
 * Target: 140-160 characters
 */
export function generateCityMetaDescription(city: ServiceCity): string {
  return `Mobile car detailing in ${city.name}, NC starting at $70. We come to you — no drop-off needed. Exterior, interior & full detail packages available. Text to book.`;
}
