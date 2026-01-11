import { notFound } from "next/navigation";
import Link from "next/link";
import { PackagesGrid } from "@/components/marketing/packages-grid";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FAQList } from "@/components/marketing/faq-list";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";
import {
  generateCitySeoIntro,
  generateCityMetaDescription,
} from "@/src/lib/seo-content";
import type { Metadata } from "next";

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
    (c) => c.slug === citySlug
  );

  if (!city || slug[1] !== "nc") {
    return {
      title: "City Not Found",
    };
  }

  const description = generateCityMetaDescription(city);

  return {
    title: `Mobile Car Detailing in ${city.name}, NC | ${siteConfig.title}`,
    description,
    alternates: {
      canonical: `/mobile-car-detailing-${citySlug}-nc`,
    },
  };
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
    (c) => c.slug === citySlug
  );

  if (!city || slug[1] !== "nc") {
    notFound();
  }

  const seoIntro = generateCitySeoIntro(city);

  return (
    <>
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Car Detailing in {city.name}, NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {seoIntro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ city: city.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail in ${city.name}`}
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
              <Link href="/service-area">View All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
