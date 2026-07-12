import { Hero } from "@/components/marketing/hero";
import { PackagesGrid } from "@/components/marketing/packages-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ServiceAreaList } from "@/components/marketing/service-area-list";
import { FAQList } from "@/components/marketing/faq-list";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { startingCarPrice } from "@/src/config/services";
import type { Metadata } from "next";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Car Detailing in Hickory, NC — Starting at $${startingCarPrice}`,
  description: `Mobile car detailing in Hickory, NC starting at $${startingCarPrice}. We come to you — cars, trucks, SUVs & motorcycles. Text to book today.`,
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
            >
              Text to Book
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
