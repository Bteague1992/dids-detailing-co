import type { ServiceCity } from "@/src/config/business";

/**
 * Generates SEO-optimized intro text for city landing pages
 */
export function generateCitySeoIntro(city: ServiceCity): string {
  return `Looking for professional mobile car detailing in ${city.name}, NC? ${city.description} We provide convenient mobile auto detailing services for cars, trucks, and SUVs throughout ${city.name}. Our mobile service means we come to your home or workplace - no need to leave your location. Simply text us to book your detail today.`;
}

/**
 * Generates SEO-optimized meta description for city landing pages
 * Target: 140-160 characters
 */
export function generateCityMetaDescription(city: ServiceCity): string {
  return `Mobile auto detailing in ${city.name}, NC. Professional mobile car detailing services for cars, trucks, and SUVs. Convenient mobile service - text to book.`;
}
