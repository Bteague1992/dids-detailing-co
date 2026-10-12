import { siteConfig } from "@/config/site";
import { business, businessConfig } from "@/config/business";

// Deliberately minimal: name, phone, area served, and hours. No address, and
// no aggregateRating or review markup.
export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutomotiveBusiness"],
    "@id": `${siteConfig.domain}#business`,
    name: business.NAME,
    url: siteConfig.domain,
    telephone: business.PHONE,
    areaServed: businessConfig.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: `${city.name}, NC`,
    })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: business.HOURS.opens,
        closes: business.HOURS.closes,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
