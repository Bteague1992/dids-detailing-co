import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { PortfolioGrid, type PortfolioItem } from "@/components/marketing/portfolio-grid";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// Revalidate this Sanity-backed page every 60 seconds via ISR, rather than
// serving a statically-cached copy indefinitely.
export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: `Portfolio | ${siteConfig.title}`,
  description:
    "Before and after photos of recent mobile detailing work — cars, motorcycles, campers, and RVs.",
  canonical: "/portfolio",
});

const PORTFOLIO_QUERY = `*[_type == "portfolioItem"] | order(date desc) {
  _id,
  title,
  serviceCategory,
  location,
  description,
  date,
  beforeImage,
  afterImage
}`;

async function getPortfolioItems(): Promise<PortfolioItem[]> {
  if (!isSanityConfigured) return [];

  try {
    return await sanityClient.fetch<PortfolioItem[]>(PORTFOLIO_QUERY);
  } catch (error) {
    console.error("Failed to fetch portfolio items from Sanity:", error);
    return [];
  }
}

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <>
      <Section
        variant="default"
        title="Our Work"
        description="Real before/after results from recent details."
        className="pt-8"
      >
        <Container maxWidth="5xl">
          <PortfolioGrid items={items} />
        </Container>
      </Section>
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to See This on Your Vehicle?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to book your detail and see the difference for yourself.
          </p>
          <Button asChild size="lg" className="text-lg px-8 py-6">
            <a
              href={getSmsHref()}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
              data-cta-location="portfolio-page"
            >
              Text to Book
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
