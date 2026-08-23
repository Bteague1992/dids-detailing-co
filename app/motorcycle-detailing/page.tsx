import Link from "next/link";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FAQList } from "@/components/marketing/faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { TierGrid } from "@/components/marketing/tier-grid";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import {
  motorcycleBasicWashPrice,
  motorcycleFullDetailPrice,
} from "@/config/services";
import { serviceCategories } from "@/config/service-categories";
import { getCategoryTierGroups } from "@/lib/service-tiers";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

const motoCategory = serviceCategories.find(
  (c) => c.slug === "motorcycle-detailing",
)!;

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Motorcycle Detailing in NC | Hickory & Surrounding Areas | ${siteConfig.title}`,
  description: `Mobile motorcycle detailing in Hickory, NC and surrounding areas starting at $${motorcycleBasicWashPrice}. We come to you — no drop-off needed. Basic wash & Premium detail available. Text to book.`,
  canonical: "/motorcycle-detailing",
});

const faqs = [
  {
    question: "Do you offer mobile motorcycle detailing near me?",
    answer:
      "Yes! We serve Hickory, Conover, Newton, Long View, Granite Falls, Morganton, Valdese, and Lenoir, NC. We come to you — no drop-off needed. Text us to book.",
  },
  {
    question: "What types of motorcycles do you detail?",
    answer:
      "We detail all types — cruisers, sport bikes, touring bikes, and more. Text us if you have a specific question about your bike.",
  },
  {
    question: "How much does motorcycle detailing cost?",
    answer: `Basic wash starts at $${motorcycleBasicWashPrice}, and our Premium detail is $${motorcycleFullDetailPrice}. We come to your location — no drop-off required.`,
  },
  {
    question: "Do I need to provide water or power?",
    answer:
      "Yes, we need access to a water hookup and power outlet at your location. Most driveways work perfectly.",
  },
  {
    question: "How long does a motorcycle detail take?",
    answer:
      "Basic wash takes about 45-60 minutes. Premium detail typically takes 1.5-2 hours depending on the condition of the bike.",
  },
];

export default function MotorcycleDetailingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} pagePath="/motorcycle-detailing" />

      {/* Hero */}
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Motorcycle Detailing in NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Dad&apos;s Mobile Detailing Co. brings professional motorcycle
              detailing directly to you in Hickory, NC and surrounding areas —
              no drop-off required. Whether you ride a cruiser, sport bike, or
              touring bike, we come to wherever your bike is parked with
              everything needed to make it shine. Basic wash starts at $
              {motorcycleBasicWashPrice}, Premium detail at $
              {motorcycleFullDetailPrice}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref()}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail`}
                  data-cta-location="motorcycle-detailing-hero"
                >
                  Text to Book
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6"
              >
                <Link href="#services">View Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section
        id="services"
        variant="muted"
        title="Motorcycle Services"
        withBorder
      >
        <Container maxWidth="5xl">
          <TierGrid groups={getCategoryTierGroups(motoCategory)} />
        </Container>
      </Section>

      <HowItWorks />

      {/* City pages */}
      <Section variant="muted" title="Cities We Serve" withBorder>
        <Container maxWidth="5xl">
          <p className="text-center text-muted-foreground mb-8">
            We bring mobile motorcycle detailing to 8 cities in the Hickory, NC
            area. Click your city for local pricing and booking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessConfig.serviceAreaCities.map((city, idx) => (
              <Link
                key={city.slug}
                href={`/mobile-motorcycle-detailing/${city.slug}/nc`}
                className="reveal border border-border/60 rounded-xl p-4 bg-card hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 text-center"
                style={{ transitionDelay: `${(idx % 4) * 75}ms` }}
              >
                <p className="font-heading font-semibold">{city.name}, NC</p>
                <p className="text-xs text-primary mt-1 hover:underline">
                  Motorcycle Detailing →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        variant="default"
        title="Frequently Asked Questions"
        withBorder
      >
        <Container maxWidth="3xl">
          <FAQList faqs={faqs} />
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book Your Motorcycle Detail?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule your mobile motorcycle detail anywhere in the
            Hickory, NC area. We come to you — no drop-off needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail`}
                data-cta-location="motorcycle-detailing-final"
              >
                Text to Book
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20 hover:bg-secondary-foreground/20"
            >
              <Link href="/#service-area">View All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
