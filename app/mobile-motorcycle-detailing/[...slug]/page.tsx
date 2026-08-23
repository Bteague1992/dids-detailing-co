import { notFound } from "next/navigation";
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
import {
  generateMotorcycleCitySeoIntro,
  generateMotorcycleCityMetaDescription,
} from "@/lib/seo-content";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

const motoCategory = serviceCategories.find(
  (c) => c.slug === "motorcycle-detailing",
)!;

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

  const description = generateMotorcycleCityMetaDescription(city);

  return createPageMetadata({
    title: `Mobile Motorcycle Detailing in ${city.name}, NC | ${siteConfig.title}`,
    description,
    canonical: `/mobile-motorcycle-detailing/${citySlug}/nc`,
  });
}

export default async function MotorcycleCitySeoPage({
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

  const seoIntro = generateMotorcycleCitySeoIntro(city);

  const cityFAQs = [
    {
      question: `Do you detail motorcycles in ${city.name}?`,
      answer: `Yes! We come directly to you in ${city.name}, NC. Basic wash starts at $${motorcycleBasicWashPrice}, and our Premium detail is $${motorcycleFullDetailPrice}. Text us to book.`,
    },
    {
      question: "What types of motorcycles do you detail?",
      answer:
        "We detail all types — cruisers, sport bikes, touring bikes, and more. Text us if you have a specific question about your bike.",
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

  return (
    <>
      <FAQSchema
        faqs={cityFAQs}
        pagePath={`/mobile-motorcycle-detailing/${citySlug}/nc`}
      />
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Motorcycle Detailing in {city.name}, NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {seoIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ city: city.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail in ${city.name}`}
                  data-cta-location="moto-area-seo-hero"
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

      <Section
        id="services"
        variant="muted"
        title="Motorcycle Services"
        withBorder
      >
        <Container maxWidth="5xl">
          <TierGrid groups={getCategoryTierGroups(motoCategory)} city={city.name} />
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
            We also serve motorcycle detailing in:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {businessConfig.serviceAreaCities
              .filter((c) => c.slug !== citySlug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/mobile-motorcycle-detailing/${c.slug}/nc`}
                  className="text-sm text-primary hover:underline"
                >
                  {c.name}, NC
                </Link>
              ))}
          </div>
          <p className="text-center mt-4 text-sm text-muted-foreground">
            <Link
              href="/motorcycle-detailing"
              className="text-primary hover:underline"
            >
              View all motorcycle detailing service areas →
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
            Text us to schedule your mobile motorcycle detail in {city.name},
            NC. We come to you — no drop-off needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref({ city: city.name })}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail in ${city.name}`}
                data-cta-location="moto-area-seo-final"
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
              <Link href="/motorcycle-detailing">All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
