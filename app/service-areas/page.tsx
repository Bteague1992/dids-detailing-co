import Link from "next/link";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { serviceAreas } from "@/config/service-areas";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Service Areas | ${siteConfig.title}`,
  description:
    "Mobile car, motorcycle, and RV detailing across the Hickory, NC area — Hickory, Morganton, Lenoir, Newton, Valdese, Conover, Granite Falls & Long View.",
  canonical: "/service-areas",
});

export default function ServiceAreasIndexPage() {
  return (
    <Section variant="default" title="Where We Serve" className="pt-8">
      <Container maxWidth="5xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {serviceAreas.map((area, idx) => (
            <Link
              key={area.slug}
              href={`/service-areas/${area.slug}`}
              className="reveal border border-border/60 rounded-xl p-4 bg-card hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1 text-center"
              style={{ transitionDelay: `${(idx % 4) * 75}ms` }}
            >
              <p className="font-heading font-semibold">
                {area.name}, {area.state}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
