import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";

export function LocalBusinessSchema() {
  const sameAs = Object.values(siteConfig.social).filter((url) =>
    url.startsWith("http"),
  );

  const schema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "AutoWash", "AutoDetailingShop"],
    "@id": `${siteConfig.domain}#business`,
    name: siteConfig.title,
    url: siteConfig.domain,
    description: siteConfig.description,
    image: `${siteConfig.domain}/images/dmd-logo.png`,
    logo: `${siteConfig.domain}/images/dmd-logo.png`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: businessConfig.address.city,
      addressRegion: businessConfig.address.state,
      addressCountry: "US",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phone,
        contactType: "customer service",
        areaServed: "US-NC",
        availableLanguage: "English",
      },
    ],
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
    geo: {
      "@type": "GeoCoordinates",
      latitude: 35.7343,
      longitude: -81.3412,
    },
    priceRange: "$$",
    serviceType: "Mobile Car Detailing",
    hasMap: `https://maps.google.com/?q=${encodeURIComponent(siteConfig.title + " " + businessConfig.address.city + " " + businessConfig.address.state)}`,
    currenciesAccepted: "USD",
    paymentAccepted: "Cash, Venmo",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
