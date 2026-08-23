import Link from "next/link";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { FAQList } from "@/components/marketing/faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { serviceAreas } from "@/config/service-areas";
import { serviceCategories, getServiceAreaCategoryHref } from "@/config/service-categories";
import { cityHubIntros, getCityHubFaqs } from "@/lib/local-area-content";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return serviceAreas.map((area) => ({ citySlug: area.slug }));
}

function getArea(citySlug: string) {
  return serviceAreas.find((a) => a.slug === citySlug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}): Promise<Metadata> {
  const { citySlug } = await params;
  const area = getArea(citySlug);

  if (!area) {
    return { title: "City Not Found", robots: { index: false, follow: false } };
  }

  return createPageMetadata({
    title: `Mobile Detailing in ${area.name}, ${area.state} | ${siteConfig.title}`,
    description: cityHubIntros[area.slug] ?? `Mobile car, motorcycle, camper, and RV detailing in ${area.name}, ${area.state}. We come to you — no drop-off needed. Text to book today.`,
    canonical: `/service-areas/${area.slug}`,
  });
}

export default async function ServiceAreaPage({
  params,
}: {
  params: Promise<{ citySlug: string }>;
}) {
  const { citySlug } = await params;
  const area = getArea(citySlug);

  if (!area) {
    notFound();
  }

  const intro =
    cityHubIntros[area.slug] ??
    `${siteConfig.title} brings professional mobile detailing directly to you in ${area.name}, ${area.state} — no drop-off required. We come to your home or workplace to detail your car, truck, SUV, motorcycle, camper, or RV.`;
  const cityFaqs = getCityHubFaqs(area.name);

  return (
    <>
      <FAQSchema faqs={cityFaqs} pagePath={`/service-areas/${area.slug}`} />
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Detailing in {area.name}, {area.state}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              {intro}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref({ city: area.name })}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail in ${area.name}`}
                  data-cta-location="area-page-hero"
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

      <Section id="services" variant="muted" title="Services Available" withBorder>
        <Container maxWidth="5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceCategories.map((category, idx) => (
              <Link
                key={category.slug}
                href={getServiceAreaCategoryHref(area.slug, category)}
                className="reveal border border-border/60 rounded-xl p-6 bg-card hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1"
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <h3 className="text-xl font-heading font-bold mb-2">
                  {category.name} in {area.name}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {category.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section id="faq" variant="muted" title="Frequently Asked Questions" withBorder>
        <Container maxWidth="3xl">
          <FAQList faqs={cityFaqs} />
        </Container>
      </Section>

      <Section variant="default" withBorder>
        <Container maxWidth="5xl">
          <p className="text-center font-heading font-semibold mb-4">
            We also serve:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <Link
                  key={a.slug}
                  href={`/service-areas/${a.slug}`}
                  className="text-sm text-primary hover:underline"
                >
                  {a.name}, {a.state}
                </Link>
              ))}
          </div>
        </Container>
      </Section>

      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book in {area.name}?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule your mobile detail in {area.name}, {area.state}.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref({ city: area.name })}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail in ${area.name}`}
                data-cta-location="area-page-final"
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
              <Link href="/service-areas">All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
