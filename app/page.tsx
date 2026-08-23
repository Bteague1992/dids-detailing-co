import { Hero } from "@/components/marketing/hero";
import { PackagesGrid } from "@/components/marketing/packages-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ServiceAreaList } from "@/components/marketing/service-area-list";
import { FAQList } from "@/components/marketing/faq-list";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { startingCarPrice } from "@/config/services";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

// SEO note: the homepage owns broad/branded queries ("Dad's Mobile Detailing
// Co.", "mobile detailing Hickory NC") — title leads with the brand name and
// stays self-canonical at "/". The Hickory-specific page at
// /mobile-car-detailing/hickory/nc targets more specific booking-intent
// queries ("book mobile detailing hickory") with a distinct title/description
// pattern (see generateCityMetaDescription in lib/seo-content.ts) and keeps
// its own self-canonical rather than canonicalizing here, since it carries
// real additional content (FAQ schema, city-specific CTA, cross-city links)
// beyond what this page covers. This split avoids the two pages competing for
// the same SERP snippet.
export const metadata: Metadata = createPageMetadata({
  title: `${siteConfig.title} | Mobile Car Detailing in Hickory, NC — Starting at $${startingCarPrice}`,
  description: `${siteConfig.title} brings mobile car detailing to Hickory, NC and the surrounding area — cars, trucks, SUVs & motorcycles, starting at $${startingCarPrice}. We come to you. Text to book.`,
  canonical: "/",
});

const homeFAQs = [
  {
    question: "How long does a detail take?",
    answer:
      "Basic Exterior takes about 45-60 minutes, Basic Interior takes about 60-75 minutes, and a Full Detail typically takes 2-3 hours depending on the size and condition of your vehicle.",
  },
  {
    question: "Do you come to my home or workplace?",
    answer:
      "Yes! We come to wherever is convenient for you - your home, office, or any other location within our service area. Just let us know where you'd like us to meet you.",
  },
];

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <Hero />
      <Section
        id="packages"
        variant="muted"
        title="Our Packages"
        description="Choose the service that fits your needs"
        withBorder
      >
        <PackagesGrid />
      </Section>
      <HowItWorks />
      <Section
        id="service-area"
        variant="muted"
        title="We Serve These Areas"
        description="We proudly serve Hickory, NC and surrounding communities with mobile car detailing services."
      >
        <ServiceAreaList />
      </Section>
      <Section
        id="faq"
        variant="default"
        title="Frequently Asked Questions"
        description="Got questions? We've got answers."
        withBorder
      >
        <Container maxWidth="3xl">
          <FAQList faqs={homeFAQs} />
        </Container>
      </Section>
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready for a Clean Ride?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to book your detail today. No forms, no hassle - just
            convenient, quality service.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a
              href={getSmsHref()}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
              data-cta-location="home-final"
            >
              Text to Book
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
