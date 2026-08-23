import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { TierGrid } from "@/components/marketing/tier-grid";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/config/service-areas";
import {
  serviceCategories,
  getGeneratedServiceCategories,
} from "@/config/service-categories";
import { getCategoryTierGroups, getStartingPrice } from "@/lib/service-tiers";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// car-detailing and motorcycle-detailing are excluded per city — those
// already have established, ranked pages at /mobile-car-detailing/[city]/nc
// and /mobile-motorcycle-detailing/[city]/nc and 308-redirect there instead
// (see next.config.ts + SEO-URL-MAP.md).
export async function generateStaticParams() {
  return serviceAreas.flatMap((area) =>
    getGeneratedServiceCategories().map((category) => ({
      citySlug: area.slug,
      serviceSlug: category.slug,
    })),
  );
}

function resolveParams(citySlug: string, serviceSlug: string) {
  const area = serviceAreas.find((a) => a.slug === citySlug);
  const category = serviceCategories.find(
    (c) => c.slug === serviceSlug && !c.legacyPage,
  );
  return { area, category };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}): Promise<Metadata> {
  const { citySlug, serviceSlug } = await params;
  const { area, category } = resolveParams(citySlug, serviceSlug);

  if (!area || !category) {
    return { title: "Page Not Found", robots: { index: false, follow: false } };
  }

  const startingPrice = getStartingPrice(getCategoryTierGroups(category));

  return createPageMetadata({
    title: `${category.name} in ${area.name}, ${area.state} | ${siteConfig.title}`,
    description: `${category.name} in ${area.name}, ${area.state} — starting at $${startingPrice}. We come to you, no drop-off required. Text to book today.`,
    canonical: `/service-areas/${area.slug}/${category.slug}`,
  });
}

export default async function ServiceAreaServicePage({
  params,
}: {
  params: Promise<{ citySlug: string; serviceSlug: string }>;
}) {
  const { citySlug, serviceSlug } = await params;
  const { area, category } = resolveParams(citySlug, serviceSlug);

  if (!area || !category) {
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
              {category.name} in {area.name}, {area.state}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {category.shortDescription} We come directly to you in{" "}
              {area.name}, {area.state} — no drop-off required. Starting at $
              {startingPrice}.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ packageName: category.name, city: area.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${category.name} in ${area.name}`}
                  data-cta-location="area-service-page-hero"
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
          <TierGrid groups={groups} city={area.name} />
        </Container>
      </Section>

      <Section variant="default" withBorder>
        <Container maxWidth="4xl" className="text-center">
          <p className="text-muted-foreground">
            <Link href={`/services/${category.slug}`} className="text-primary hover:underline">
              View {category.name} everywhere we serve →
            </Link>
          </p>
          <p className="text-muted-foreground mt-2">
            <Link href={`/service-areas/${area.slug}`} className="text-primary hover:underline">
              View all services in {area.name}, {area.state} →
            </Link>
          </p>
        </Container>
      </Section>

      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book in {area.name}?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule {category.name.toLowerCase()} in {area.name},{" "}
            {area.state}.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a
              href={getSmsHref({ packageName: category.name, city: area.name })}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book ${category.name} in ${area.name}`}
              data-cta-location="area-service-page-final"
            >
              Text to Book
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
