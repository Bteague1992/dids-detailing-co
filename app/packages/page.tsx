import { PackagesGrid } from "@/components/marketing/packages-grid";
import { Section } from "@/components/ui/section";
import { FAQList } from "@/components/marketing/faq-list";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { servicesConfig } from "@/src/config/services";
import {
  Sparkles,
  Car,
  Sparkle,
  CheckCircle2,
  DollarSign,
  MessageSquare,
  Clock,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packages & Pricing",
  description:
    "View our mobile car detailing packages and pricing. Basic Exterior, Basic Interior, and Full Detail options available for sedans, SUVs, and trucks.",
  alternates: {
    canonical: "/packages",
  },
};

const pricingFAQs = [
  {
    question: "What's included in each package?",
    answer:
      "Each package includes specific services listed on the package card. Basic Exterior covers exterior washing and cleaning, Basic Interior covers interior vacuuming and cleaning, and Full Detail includes everything from both packages plus extra attention to detail.",
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
  {
    question: "Is the launch special still available?",
    answer:
      "The launch special for Full Detail is available for the first 20 customers. Text us to check availability and book your detail at the special price.",
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
      "Full Detail: 2-3 hours",
      "Flexible timing to fit your schedule",
    ],
  },
];

export default function PackagesPage() {
  const launchOffer = servicesConfig.launchOffer;
  const fullDetailPackage = servicesConfig.packages.find(
    (p) => p.id === launchOffer.packageId
  );

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

      {/* Launch Special Banner */}
      {launchOffer.active && fullDetailPackage && (
        <Section variant="muted" className="border-y-2 border-primary/30">
          <Container maxWidth="5xl">
            <div className="bg-card rounded-2xl p-8 md:p-12 border-2 border-primary/30 shadow-lg">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ring-4 ring-primary/10">
                    <Sparkles className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                    <Badge variant="default" className="text-sm px-3 py-1">
                      Limited Time Offer
                    </Badge>
                    <Sparkle className="h-4 w-4 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold mb-2">
                    {launchOffer.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Get a Full Detail at a special launch price. Limited to the
                    first 20 customers.
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-lg">
                    <div>
                      <span className="text-muted-foreground">Sedan: </span>
                      <span className="font-heading font-bold text-primary text-2xl">
                        ${launchOffer.sedanPrice}
                      </span>
                      <span className="text-muted-foreground line-through ml-2 text-sm">
                        ${fullDetailPackage.sedanPrice}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">SUV/Truck: </span>
                      <span className="font-heading font-bold text-primary text-2xl">
                        ${launchOffer.suvTruckPrice}
                      </span>
                      <span className="text-muted-foreground line-through ml-2 text-sm">
                        ${fullDetailPackage.suvTruckPrice}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <Button asChild size="lg" className="text-lg px-6 py-6">
                    <a
                      href={getSmsHref({
                        packageName: fullDetailPackage.name,
                      })}
                      aria-label={`Text ${siteConfig.title} to book ${fullDetailPackage.name} at launch price`}
                    >
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Book Launch Special
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Packages Grid */}
      <Section
        variant="muted"
        title="Choose Your Package"
        description="All packages include our mobile service. We bring everything we need - you just provide access to your vehicle."
      >
        <PackagesGrid />
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
                  className="bg-card rounded-xl p-6 border-2 border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 ring-2 ring-primary/20">
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
