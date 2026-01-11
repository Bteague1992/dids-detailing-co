import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";

export function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.domain}#business`,
    name: siteConfig.title,
    url: siteConfig.domain,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: businessConfig.address.city,
      addressRegion: businessConfig.address.state,
      addressCountry: "US",
    },
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
        opens: "09:00",
        closes: "17:00",
      },
    ],
    areaServed: businessConfig.serviceAreaCities.map((city) => ({
      "@type": "City",
      name: city.name,
      addressRegion: businessConfig.address.state,
    })),
    priceRange: "$$",
    serviceType: "Mobile Car Detailing",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
