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
  title: `Mobile Car Detailing in NC | Hickory & Surrounding Areas | ${siteConfig.title}`,
  description:
    "Mobile car detailing in Hickory, NC and surrounding areas starting at $70. We come to you — no drop-off needed. Cars, trucks & SUVs. Text to book today.",
  canonical: "/car-detailing",
});

const faqs = [
  {
    question: "Do you offer mobile car detailing near me?",
    answer:
      "Yes! We serve Hickory, Conover, Newton, Long View, Granite Falls, Morganton, Valdese, and Lenoir, NC. We come to you — no drop-off needed. Text us to book.",
  },
  {
    question: "What vehicles do you detail?",
    answer:
      "We detail cars, trucks, and SUVs of all makes and models. We also offer motorcycle detailing. Text us if you have a question about your specific vehicle.",
  },
  {
    question: "How much does car detailing cost?",
    answer:
      "Basic Exterior starts at $70 (sedan) / $90 (SUV/Truck). Basic Interior starts at $80 / $100. Full Detail starts at $130 / $160. We come to your location — no drop-off required.",
  },
  {
    question: "Do I need to provide water or power?",
    answer:
      "Yes, we need access to a water hookup and power outlet at your location. Most driveways work perfectly.",
  },
  {
    question: "How long does a car detail take?",
    answer:
      "Basic Exterior takes about 45-60 minutes, Basic Interior takes about 60-75 minutes, and a Full Detail typically takes 2-3 hours depending on the size and condition of your vehicle.",
  },
];

export default function CarDetailingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} pagePath="/car-detailing" />

      {/* Hero */}
      <Section variant="default" className="pt-8">
        <Container maxWidth="5xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Mobile Car Detailing in NC
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
              Dad&apos;s Mobile Detailing Co. brings professional car detailing
              directly to you in Hickory, NC and surrounding areas — no drop-off
              required. We come to your home or workplace to detail your car,
              truck, or SUV. Exterior washes start at $70. Text us to book your
              detail today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <a
                  href={getSmsHref()}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a car detail`}
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
        title="Car Detailing Packages"
        withBorder
      >
        <Container maxWidth="5xl">
          <div className="mb-6 text-center">
            <p className="text-muted-foreground">
              All packages available for sedans and SUV/trucks.{" "}
              <Link href="/packages" className="text-primary hover:underline">
                View full pricing details →
              </Link>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesConfig.packages.map((pkg) => (
              <div
                key={pkg.id}
                className="border-2 border-border/60 rounded-xl p-6 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">
                    {pkg.name}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {pkg.description}
                  </p>
                  <div className="mb-6 space-y-2">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="border-t-2 border-muted pt-6 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        Sedan:
                      </span>
                      <span className="text-2xl font-heading font-bold">
                        ${pkg.sedanPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        SUV/Truck:
                      </span>
                      <span className="text-2xl font-heading font-bold">
                        ${pkg.suvTruckPrice}
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full">
                    <a
                      href={getSmsHref({ packageName: pkg.name })}
                      aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a ${pkg.name}`}
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
      <Section variant="muted" title="Cities We Serve" withBorder>
        <Container maxWidth="5xl">
          <p className="text-center text-muted-foreground mb-8">
            We bring mobile car detailing to 8 cities in the Hickory, NC area.
            Click your city for local pricing and booking.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {businessConfig.serviceAreaCities.map((city) => (
              <Link
                key={city.slug}
                href={`/mobile-car-detailing-${city.slug}-nc`}
                className="border-2 border-border/60 rounded-xl p-4 bg-card hover:shadow-lg hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                <p className="font-heading font-semibold">{city.name}, NC</p>
                <p className="text-xs text-primary mt-1 hover:underline">
                  Car Detailing →
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
            Ready to Book Your Car Detail?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to schedule your mobile car detail anywhere in the Hickory,
            NC area. We come to you — no drop-off needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a car detail`}
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
              <Link href="/packages">View Full Pricing</Link>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
