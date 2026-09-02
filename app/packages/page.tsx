import { TierGrid } from "@/components/marketing/tier-grid";
import { Section } from "@/components/ui/section";
import { FAQList } from "@/components/marketing/faq-list";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { serviceCategories } from "@/config/service-categories";
import { getCategoryTierGroups } from "@/lib/service-tiers";
import {
  Car,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

const carCategory = serviceCategories.find((c) => c.slug === "car-detailing")!;
const motoCategory = serviceCategories.find(
  (c) => c.slug === "motorcycle-detailing",
)!;
const rvCategory = serviceCategories.find(
  (c) => c.slug === "camper-rv-detailing",
)!;
const maintenanceCategory = serviceCategories.find(
  (c) => c.slug === "maintenance-plans",
)!;

export const metadata: Metadata = createPageMetadata({
  title:
    "Packages & Pricing | Mobile Car Detailing Services | Dad's Mobile Detailing Co.",
  description:
    "View our mobile car detailing packages and pricing. Basic Exterior, Basic Interior & Basic Full Detail options available for sedans, SUVs, and trucks.",
  canonical: "/packages",
});

const pricingFAQs = [
  {
    question: "What's included in each package?",
    answer:
      "Each package includes specific services listed on the package card. Basic Exterior covers exterior washing and cleaning, Basic Interior covers interior vacuuming and cleaning, and Basic Full Detail combines both with extra attention to detail.",
  },
  {
    question: "Why is there a price difference between sedan and SUV/Truck?",
    answer:
      "Larger vehicles require more time, water, and supplies. The SUV/Truck pricing reflects the additional work needed to properly detail these larger vehicles.",
  },
  {
    question: "Can I customize a package?",
    answer:
      "Absolutely! When you text us, let us know what specific services you're looking for and we can create a custom package that fits your needs and budget.",
  },
];

const packageHighlights = [
  {
    icon: Car,
    title: "All Packages Include",
    items: [
      "Mobile service - we come to you",
      "Professional equipment & supplies",
      "Flexible scheduling",
    ],
  },
  {
    icon: DollarSign,
    title: "Fair Pricing",
    items: [
      "Transparent pricing - no hidden fees",
      "Sedan and SUV/Truck pricing available",
      "Payment due upon completion",
      "Cash and digital payments accepted",
    ],
  },
  {
    icon: Clock,
    title: "Quick Service",
    items: [
      "Basic Exterior: 45-60 minutes",
      "Basic Interior: 60-75 minutes",
      "Basic Full Detail: 2-3 hours",
      "Flexible timing to fit your schedule",
    ],
  },
];

export default function PackagesPage() {
  return (
    <>
      {/* Hero Section */}
      <Section
        variant="default"
        className="pt-8 pb-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none" />
        <Container maxWidth="4xl" className="relative">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
              <DollarSign className="h-5 w-5" />
              <span>Our Packages</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Packages & Pricing
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Choose the package that's right for your vehicle. All packages
              include our mobile service - we come to you!
            </p>
          </div>
        </Container>
      </Section>

      {/* Car Detailing */}
      <Section
        id="cars"
        variant="muted"
        title="Cars, Trucks & SUVs"
        description="All packages include our mobile service. We bring everything we need - you just provide access to your vehicle."
      >
        <Container maxWidth="6xl">
          <TierGrid groups={getCategoryTierGroups(carCategory)} />
        </Container>
      </Section>

      {/* Motorcycles */}
      <Section
        id="motorcycles"
        variant="default"
        title="Motorcycles"
        description={motoCategory.shortDescription}
        withBorder
      >
        <Container maxWidth="6xl">
          <TierGrid groups={getCategoryTierGroups(motoCategory)} />
        </Container>
      </Section>

      {/* Campers & RVs */}
      <Section
        id="campers-rvs"
        variant="muted"
        title="Campers & RVs"
        description={rvCategory.shortDescription}
        withBorder
      >
        <Container maxWidth="6xl">
          <TierGrid groups={getCategoryTierGroups(rvCategory)} />
        </Container>
      </Section>

      {/* Maintenance Plans */}
      <Section
        id="maintenance-plans"
        variant="default"
        title="Maintenance Plans"
        description={maintenanceCategory.shortDescription}
        withBorder
      >
        <Container maxWidth="6xl">
          <TierGrid groups={getCategoryTierGroups(maintenanceCategory)} />
        </Container>
      </Section>

      {/* Package Highlights */}
      <Section
        variant="default"
        title="What's Included"
        description="Every package comes with these benefits"
        withBorder
      >
        <Container maxWidth="5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packageHighlights.map((highlight, idx) => {
              const Icon = highlight.icon;
              return (
                <div
                  key={idx}
                  className="reveal bg-card rounded-xl p-6 border border-border/60 shadow-sm hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-linear-to-br from-primary/20 to-secondary/10 text-primary mb-4 ring-2 ring-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-4">
                    {highlight.title}
                  </h3>
                  <ul className="space-y-2">
                    {highlight.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Pricing FAQ */}
      <Section
        variant="default"
        title="Pricing Questions?"
        description="Common questions about our packages and pricing"
        withBorder
      >
        <Container maxWidth="4xl">
          <FAQList faqs={pricingFAQs} />
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6 ring-4 ring-primary/10">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book Your Detail?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Text us to book your preferred package. We'll coordinate a time that
            works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
                data-cta-location="packages-page"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Text to Book
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20 hover:bg-secondary-foreground/20"
            >
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
