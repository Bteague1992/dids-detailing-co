import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";
import {
  Heart,
  Shield,
  Clock,
  Car,
  CheckCircle2,
  MessageSquare,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Dad's Mobile Detailing Co. - a dad-owned, reliable mobile car detailing service in Hickory, NC. Honest pricing, quality service, and convenience.",
  alternates: {
    canonical: "/about",
  },
};

const values = [
  {
    icon: Shield,
    title: "Honesty",
    description:
      "Fair, transparent pricing with no hidden fees. What you see is what you pay.",
  },
  {
    icon: Clock,
    title: "Convenience",
    description:
      "We come to you - your home, office, or wherever works best. No need to leave your location.",
  },
  {
    icon: Heart,
    title: "Quality",
    description:
      "We take pride in our work and treat every vehicle like it's our own.",
  },
  {
    icon: CheckCircle2,
    title: "Reliability",
    description: "When we say we'll be there, we'll be there. Simple as that.",
  },
];

const whyChooseUs = [
  "We come to you!",
  "No complicated booking process - just text us",
  "Local to Hickory, NC - we know the area",
  "Fair pricing for sedans, SUVs, and trucks",
  "Flexible scheduling that works around your life",
  "Quality products and attention to detail",
];

export default function AboutPage() {
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              About {siteConfig.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              A dad-owned business bringing honest, convenient car detailing
              directly to your door.
            </p>
          </div>
        </Container>
      </Section>

      {/* Story Section */}
      <Section variant="muted" withBorder>
        <Container maxWidth="4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold mb-6">
                <Car className="h-5 w-5" />
                <span>Our Story</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                Why We Started This Business
              </h2>
              <p className="text-lg text-muted-foreground mb-4">
                Dad’s Mobile Detailing Co. is a local, dad-owned detailing
                service in {businessConfig.address.region}. We keep car care
                simple: clear pricing, honest work, and convenience that
                actually saves you time.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Most people don&apos;t have hours to sit at a shop or drop off a
                vehicle. We bring everything to your driveway or workplace and
                get the job done while you keep living your life.
              </p>
              <p className="text-lg text-muted-foreground">
                As a dad, I know how busy life can get. That's why we've made
                booking as simple as sending a text. No complicated forms, no
                online checkout process - just text us what you need, and we'll
                take care of the rest.
              </p>
            </div>
            <div className="bg-card rounded-2xl p-8 border-2 border-border/60 shadow-lg">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Text-Based Booking
                    </h3>
                    <p className="text-muted-foreground">
                      We keep it simple. No apps, no forms - just send us a text
                      and we'll handle the rest.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Car className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Mobile Service
                    </h3>
                    <p className="text-muted-foreground">
                      We come to you! Your home, office, or wherever works best.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-lg mb-2">
                      Local & Family-Owned
                    </h3>
                    <p className="text-muted-foreground">
                      We&apos;re local to {businessConfig.address.region} and
                      proud to serve our community with dad-level care and
                      attention.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section
        variant="default"
        title="Our Values"
        description="These principles guide everything we do and every detail we perform."
        withBorder
      >
        <Container maxWidth="5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => {
              const Icon = value.icon;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-6 border-2 border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 text-center"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 ring-2 ring-primary/20">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-heading font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Why Choose Us Section */}
      <Section variant="muted">
        <Container maxWidth="4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-6">
                <CheckCircle2 className="h-5 w-5" />
                <span>Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
                What Makes Us Different
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We're local to {businessConfig.address.region} and proud to
                serve our community. Whether you drive a sedan, SUV, or truck,
                we've got a package that fits your needs and budget.
              </p>
              <div className="space-y-4">
                {whyChooseUs.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary mt-0.5 shrink-0" />
                    <span className="text-lg text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-card rounded-2xl p-8 border-2 border-border/60 shadow-lg">
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-heading font-bold text-primary mb-2">
                    Local
                  </div>
                  <p className="text-muted-foreground">
                    Proudly serving {businessConfig.address.region} and
                    surrounding areas
                  </p>
                </div>
                <div className="border-t-2 border-border/60 pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-heading font-bold text-secondary mb-2">
                      Family-Owned
                    </div>
                    <p className="text-muted-foreground">
                      Dad-owned business with family values
                    </p>
                  </div>
                </div>
                <div className="border-t-2 border-border/60 pt-6">
                  <div className="text-center">
                    <div className="text-4xl font-heading font-bold text-primary mb-2">
                      Simple
                    </div>
                    <p className="text-muted-foreground">
                      No complicated booking - just text us
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Text us today and let's get your vehicle looking its best. We're
            here to make car care simple, convenient, and affordable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
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
              <a href="/packages">View Packages</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
