import { MetadataRoute } from "next";
import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";

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
  ];

  // SEO city pages
  const seoCityPages: MetadataRoute.Sitemap =
    businessConfig.serviceAreaCities.map((city) => ({
      url: `${baseUrl}/mobile-car-detailing-${city.slug}-nc`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    }));

  return [...staticPages, ...seoCityPages];
}
