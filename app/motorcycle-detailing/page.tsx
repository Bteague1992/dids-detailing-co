import Link from "next/link";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { FAQList } from "@/components/marketing/faq-list";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";
import { servicesConfig } from "@/src/config/services";
import { Check } from "lucide-react";
import type { Metadata } from "next";
import { createPageMetadata } from "@/src/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Motorcycle Detailing in NC | Hickory & Surrounding Areas | ${siteConfig.title}`,
  description:
    "Mobile motorcycle detailing in Hickory, NC and surrounding areas starting at $65. We come to you — no drop-off needed. Basic wash & full detail available. Text to book.",
  canonical: "/motorcycle-detailing",
});

const faqs = [
  {
    question: "Do you offer mobile motorcycle detailing near me?",
    answer:
      "Yes! We serve Hickory, Conover, Newton, Long View, Granite Falls, Morganton, Valdese, and Lenoir, NC. We come to you — no drop-off needed. Text us to book.",
  },
  {
    question: "What types of motorcycles do you detail?",
    answer:
      "We detail all types — cruisers, sport bikes, touring bikes, and more. Text us if you have a specific question about your bike.",
  },
  {
    question: "How much does motorcycle detailing cost?",
    answer:
      "Basic wash starts at $65 and full detail is $120. We come to your location — no drop-off required.",
  },
  {
    question: "Do I need to provide water or power?",
    answer:
      "Yes, we need access to a water hookup and power outlet at your location. Most driveways work perfectly.",
  },
  {
    question: "How long does a motorcycle detail take?",
    answer:
      "Basic wash takes about 45-60 minutes. Full detail typically takes 1.5-2 hours depending on the condition of the bike.",
  },
];

export default function MotorcycleDetailingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} pagePath="/motorcycle-detailing" />

      {/* Hero */}
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Motorcycle Detailing in NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Dad&apos;s Mobile Detailing Co. brings professional motorcycle
              detailing directly to you in Hickory, NC and surrounding areas —
              no drop-off required. Whether you ride a cruiser, sport bike, or
              touring bike, we come to wherever your bike is parked with
              everything needed to make it shine. Basic wash starts at $65, full
              detail at $120.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref()}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail`}
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
                <Link href="#services">View Services</Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section
        id="services"
        variant="muted"
        title="Motorcycle Services"
        withBorder
      >
        <Container maxWidth="5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicesConfig.motorcycleServices.map((service) => (
              <div
                key={service.id}
                className="border-2 border-border/60 rounded-xl p-6 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {service.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>
                  <div className="mb-6 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="border-t-2 border-muted pt-6 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Price:
                      </span>
                      <span className="text-2xl font-heading font-bold">
                        ${service.price}
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <a
                      href={getSmsHref({ packageName: service.name })}
                      aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a ${service.name}`}
                    >
                      Text to Book
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <HowItWorks />

      {/* City pages */}
      <Section
        variant="muted"
        title="Cities We Serve"
        withBorder
      >
        <Container maxWidth="5xl">
          <p className="text-center text-muted-foreground mb-8">
            We bring mobile motorcycle detailing to 8 cities in the Hickory, NC
            area. Click your city for local pricing and booking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessConfig.serviceAreaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/mobile-motorcycle-detailing/${city.slug}/nc`}
                className="border-2 border-border/60 rounded-xl p-4 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <p className="font-heading font-semibold">{city.name}, NC</p>
                <p className="text-xs text-primary mt-1 hover:underline">
                  Motorcycle Detailing →
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section
        id="faq"
        variant="default"
        title="Frequently Asked Questions"
        withBorder
      >
        <Container maxWidth="3xl">
          <FAQList faqs={faqs} />
        </Container>
      </Section>

      {/* CTA */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book Your Motorcycle Detail?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule your mobile motorcycle detail anywhere in the
            Hickory, NC area. We come to you — no drop-off needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a motorcycle detail`}
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
              <Link href="/#service-area">View All Service Areas</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
