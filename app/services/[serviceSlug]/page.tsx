import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TierGrid } from "@/components/marketing/tier-grid";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import {
  serviceCategories,
  getGeneratedServiceCategories,
  getServiceAreaCategoryHref,
} from "@/config/service-categories";
import { serviceAreas } from "@/config/service-areas";
import { getCategoryTierGroups, getStartingPrice } from "@/lib/service-tiers";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// car-detailing and motorcycle-detailing are excluded here — they already
// have established, ranked pages (/car-detailing, /motorcycle-detailing) and
// 308-redirect there instead (see next.config.ts + SEO-URL-MAP.md).
export async function generateStaticParams() {
  return getGeneratedServiceCategories().map((category) => ({
    serviceSlug: category.slug,
  }));
}

function getCategory(serviceSlug: string) {
  const category = serviceCategories.find((c) => c.slug === serviceSlug);
  return category && !category.legacyPage ? category : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}): Promise<Metadata> {
  const { serviceSlug } = await params;
  const category = getCategory(serviceSlug);

  if (!category) {
    return { title: "Service Not Found", robots: { index: false, follow: false } };
  }

  const groups = getCategoryTierGroups(category);
  const startingPrice = getStartingPrice(groups);

  return createPageMetadata({
    title: `${category.name} | Starting at $${startingPrice} | ${siteConfig.title}`,
    description: `${category.shortDescription} Mobile service in Hickory, NC and surrounding areas — we come to you. Starting at $${startingPrice}.`,
    canonical: `/services/${category.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ serviceSlug: string }>;
}) {
  const { serviceSlug } = await params;
  const category = getCategory(serviceSlug);

  if (!category) {
    notFound();
  }

  const groups = getCategoryTierGroups(category);
  const startingPrice = getStartingPrice(groups);

  return (
    <>
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {category.shortDescription} We come to you anywhere in the
              Hickory, NC area — no drop-off required. Starting at $
              {startingPrice}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ packageName: category.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${category.name}`}
                  data-cta-location="service-category-page-hero"
                >
                  Text to Book
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section id="pricing" variant="muted" title="Pricing" withBorder>
        <Container maxWidth="6xl">
          <TierGrid groups={groups} />
        </Container>
      </Section>

      <Section variant="default" title="Service Areas" withBorder>
        <Container maxWidth="5xl">
          <p className="text-center text-muted-foreground mb-8">
            We bring {category.name.toLowerCase()} to these cities in the
            Hickory, NC area. Click your city for local pricing and booking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {serviceAreas.map((area) => (
              <Link
                key={area.slug}
                href={getServiceAreaCategoryHref(area.slug, category)}
                className="border-2 border-border/60 rounded-xl p-4 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <p className="font-heading font-semibold">
                  {area.name}, {area.state}
                </p>
                <p className="text-xs text-primary mt-1 hover:underline">
                  {category.name} →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book {category.name}?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule — we come to you anywhere in the Hickory, NC
            area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref({ packageName: category.name })}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${category.name}`}
                data-cta-location="service-category-page-final"
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
              <Link href="/services">All Services</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
