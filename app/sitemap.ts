import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { serviceAreas } from "@/config/service-areas";
import { getGeneratedServiceCategories } from "@/config/service-categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.domain;
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/motorcycle-detailing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/car-detailing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/service-areas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // New tiered SEO structure: services, service areas, and their cross-product.
  // car-detailing and motorcycle-detailing are excluded from both — they
  // 308-redirect to the legacy /car-detailing, /motorcycle-detailing, and
  // /mobile-*-detailing/[city]/nc pages instead (see next.config.ts +
  // SEO-URL-MAP.md), so only the legacy URLs (below) belong in the sitemap.
  const generatedCategories = getGeneratedServiceCategories();

  const servicePages: MetadataRoute.Sitemap = generatedCategories.map((category) => ({
    url: `${baseUrl}/services/${category.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const serviceAreaPages: MetadataRoute.Sitemap = serviceAreas.map((area) => ({
    url: `${baseUrl}/service-areas/${area.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const combinedServiceAreaPages: MetadataRoute.Sitemap = serviceAreas.flatMap(
    (area) =>
      generatedCategories.map((category) => ({
        url: `${baseUrl}/service-areas/${area.slug}/${category.slug}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.75,
      })),
  );

  const primaryCities = new Set(["hickory", "newton", "morganton", "lenoir"]);

  // SEO city pages
  const seoCityPages: MetadataRoute.Sitemap =
    businessConfig.serviceAreaCities.map((city) => ({
      url: `${baseUrl}/mobile-car-detailing/${city.slug}/nc`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: primaryCities.has(city.slug) ? 1.0 : 0.85,
    }));

  const motorcycleCityPages: MetadataRoute.Sitemap =
    businessConfig.serviceAreaCities.map((city) => ({
      url: `${baseUrl}/mobile-motorcycle-detailing/${city.slug}/nc`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: primaryCities.has(city.slug) ? 1.0 : 0.85,
    }));

  return [
    ...staticPages,
    ...servicePages,
    ...serviceAreaPages,
    ...combinedServiceAreaPages,
    ...seoCityPages,
    ...motorcycleCityPages,
  ];
}
