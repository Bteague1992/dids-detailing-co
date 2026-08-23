import { notFound } from "next/navigation";
import Link from "next/link";
import { PackagesGrid } from "@/components/marketing/packages-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FAQList } from "@/components/marketing/faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import {
  generateCitySeoIntro,
  generateCityMetaDescription,
} from "@/lib/seo-content";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export async function generateStaticParams() {
  return businessConfig.serviceAreaCities.map((city) => ({
    slug: [city.slug, "nc"],
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const citySlug = slug[0];
  const city = businessConfig.serviceAreaCities.find(
    (c) => c.slug === citySlug,
  );

  if (!city || slug[1] !== "nc") {
    return {
      title: "City Not Found",
      robots: { index: false, follow: false },
    };
  }

  const description = generateCityMetaDescription(city);

  // SEO note: self-canonical, deliberately not pointed at "/". This page
  // targets booking-intent local queries ("book mobile detailing in
  // {city}") and leads its title with "Book" rather than the homepage's
  // brand-first "Mobile Car Detailing in Hickory, NC" pattern — see the
  // matching comment in app/page.tsx for the full rationale. Keeping this
  // self-canonical (rather than canonicalizing to "/") preserves this page's
  // FAQ schema, city-specific CTA, and cross-city links as independently
  // rankable content.
  return createPageMetadata({
    title: `Book Mobile Car Detailing in ${city.name}, NC | Same-Day & Next-Day Availability | ${siteConfig.title}`,
    description,
    canonical: `/mobile-car-detailing/${citySlug}/nc`,
  });
}

const cityFAQs = [
  {
    question: "Do you serve my area?",
    answer:
      "We serve Hickory, NC and surrounding communities including Conover, Newton, Long View, Granite Falls, Morganton, Valdese, and Lenoir. If you're unsure if we serve your area, just text us!",
  },
  {
    question: "How do I book a detail?",
    answer:
      "Simply text us with your vehicle type, preferred package, and location. We'll coordinate a time that works for you. No forms, no hassle!",
  },
  {
    question: "What if I'm not sure which package I need?",
    answer:
      "No problem! Text us and describe what you're looking for, and we'll recommend the best package for your needs. We can also create a custom package if needed.",
  },
];

export default async function CitySeoPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const citySlug = slug[0];
  const city = businessConfig.serviceAreaCities.find(
    (c) => c.slug === citySlug,
  );

  if (!city || slug[1] !== "nc") {
    notFound();
  }

  const seoIntro = generateCitySeoIntro(city);

  return (
    <>
      <FAQSchema
        faqs={cityFAQs}
        pagePath={`/mobile-car-detailing/${citySlug}/nc`}
      />
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Book Mobile Car Detailing in {city.name}, NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {seoIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ city: city.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail in ${city.name}`}
                  data-cta-location="area-seo-hero"
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
                <Link href="/packages">View Packages</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>
      <Section id="packages" variant="muted" title="Our Packages" withBorder>
        <Container maxWidth="5xl">
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              Choose from our professional detailing packages.{" "}
              <Link href="/packages" className="text-primary hover:underline">
                View full pricing details →
              </Link>
            </p>
          </div>
          <PackagesGrid />
        </Container>
      </Section>
      <HowItWorks />
      <Section
        id="faq"
        variant="default"
        title="Frequently Asked Questions"
        withBorder
      >
        <Container maxWidth="3xl">
          <FAQList faqs={cityFAQs} />
        </Container>
      </Section>
      {/* Also serving */}
      <Section variant="muted" withBorder>
        <Container maxWidth="5xl">
          <p className="text-center font-heading font-semibold mb-4">
            We also serve car detailing in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {businessConfig.serviceAreaCities
              .filter((c) => c.slug !== citySlug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/mobile-car-detailing/${c.slug}/nc`}
                  className="text-sm text-primary hover:underline"
                >
                  {c.name}, NC
                </Link>
              ))}
          </div>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            <Link
              href="/car-detailing"
              className="text-primary hover:underline"
            >
              View all car detailing service areas →
            </Link>
          </p>
        </Container>
      </Section>

      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book in {city.name}?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule your mobile car detail in {city.name}, NC. We
            serve cars, trucks, and SUVs throughout the area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref({ city: city.name })}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail in ${city.name}`}
                data-cta-location="area-seo-final"
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
              <Link href="/car-detailing">All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
