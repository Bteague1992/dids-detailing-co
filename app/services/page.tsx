import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { serviceCategories, getServiceCategoryHref } from "@/config/service-categories";
import { getCategoryTierGroups, getStartingPrice } from "@/lib/service-tiers";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `All Services | ${siteConfig.title}`,
  description:
    "Mobile detailing services for cars, motorcycles, campers/RVs, and recurring maintenance plans — we come to you.",
  canonical: "/services",
});

export default function ServicesIndexPage() {
  return (
    <Section variant="default" title="Our Services" className="pt-8">
      <Container maxWidth="5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceCategories.map((category, idx) => {
            const startingPrice = getStartingPrice(getCategoryTierGroups(category));
            return (
              <Link
                key={category.slug}
                href={getServiceCategoryHref(category)}
                className="reveal border border-border/60 rounded-xl p-6 bg-card hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h2 className="text-xl font-heading font-bold mb-2">
                  {category.name}
                </h2>
                <p className="text-muted-foreground text-sm mb-3">
                  {category.shortDescription}
                </p>
                <p className="text-primary font-semibold text-sm">
                  Starting at ${startingPrice} →
                </p>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
