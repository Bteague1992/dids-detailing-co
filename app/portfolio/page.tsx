import { PageHero } from "@/components/site/page-hero";
import {
  PortfolioGrid,
  type PortfolioItem,
} from "@/components/site/portfolio-grid";
import { BeforeAfter } from "@/components/site/before-after";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { sanityClient, isSanityConfigured } from "@/lib/sanity";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

// Revalidate this Sanity-backed page every 60 seconds via ISR, rather than
// serving a statically-cached copy indefinitely.
export const revalidate = 60;

export const metadata: Metadata = createPageMetadata({
  title: `Portfolio | Real Before & Afters | ${siteConfig.title}`,
  description:
    "Before-and-after results from mobile details around Hickory, NC: snack-covered back seats, dog hair, and muddy work trucks. No judgment, just clean cars.",
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
      <PageHero
        location="portfolio-hero"
        title="Proof is in the backseat."
        sub="Real cars, real messes, real before and afters from recent jobs."
      />
      <Section tone="warm" title="Recent work" width="5xl">
        <PortfolioGrid items={items} />
      </Section>
      {/* Carried over from the old /gallery page. Kept under its own heading,
          separate from "Recent work", because these three are illustrations of
          the kinds of mess we handle rather than photos of specific jobs. */}
      <BeforeAfter
        tone="white"
        title="The kind of mess we handle"
        subtitle="Snack crumbs, dog hair, job-site mud. Normal stuff. No judgment."
      />
    </>
  );
}
