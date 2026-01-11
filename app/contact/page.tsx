import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import {
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MapPin,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Dad's Mobile Detailing Co. Text us to book your detail, or reach out via phone or email. We're here to help!",
  alternates: {
    canonical: "/contact",
  },
};

const contactMethods = [
  {
    icon: MessageSquare,
    title: "Text to Book",
    description:
      "This is the fastest way to book your detail. Just send us a text with your vehicle info and preferred time.",
    action: "Text to Book",
    href: getSmsHref(),
    primary: true,
    color: "primary",
  },
  {
    icon: Phone,
    title: "Phone",
    description:
      "Prefer to call? Give us a ring during business hours. Text preferred for booking.",
    action: siteConfig.phone,
    href: `tel:${siteConfig.phone}`,
    primary: false,
    color: "secondary",
  },
  {
    icon: Mail,
    title: "Email",
    description:
      "Send us an email and we'll get back to you as soon as possible.",
    action: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    primary: false,
    color: "primary",
  },
  {
    icon: Clock,
    title: "Business Hours",
    description: "We're available to serve you during these hours.",
    action: siteConfig.hours.full,
    href: null,
    primary: false,
    color: "secondary",
  },
];

const textChecklist = [
  "Your city/location",
  "Vehicle type (sedan, SUV, or truck)",
  "Package you're interested in",
  "Preferred day/time (if you have one)",
];

export default function ContactPage() {
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
              <MessageSquare className="h-5 w-5" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Ready to book? Text us! Have a question? We're here to help.
            </p>
          </div>
        </Container>
      </Section>

      {/* Primary CTA - Text to Book */}
      <Section variant="muted" withBorder>
        <Container maxWidth="4xl">
          <div className="bg-card rounded-2xl p-8 md:p-12 border-2 border-primary/20 shadow-lg mb-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6 ring-4 ring-primary/10">
                <MessageSquare className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Text to Book - Fastest Way to Get Started
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                No forms, no hassle. Just send us a text with your vehicle info
                and we'll coordinate a time that works for you.
              </p>
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                <a
                  href={getSmsHref()}
                  aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
                >
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Text to Book Now
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact Methods Grid */}
      <Section
        variant="default"
        title="Other Ways to Reach Us"
        description="Choose the method that works best for you. We're here to help!"
        withBorder
      >
        <Container maxWidth="5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contactMethods
              .filter((method) => !method.primary)
              .map((method, idx) => {
                const Icon = method.icon;
                return (
                  <div
                    key={idx}
                    className="bg-card rounded-xl p-6 border-2 border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                          method.color === "primary"
                            ? "bg-primary/10 text-primary"
                            : "bg-secondary/10 text-secondary"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold">
                        {method.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {method.description}
                    </p>
                    {method.href ? (
                      <a
                        href={method.href}
                        className={`text-lg font-semibold hover:underline inline-flex items-center gap-2 ${
                          method.color === "primary"
                            ? "text-primary"
                            : "text-secondary"
                        }`}
                      >
                        {method.title === "Phone" ? "Call" : method.title} Us
                        <Zap className="h-4 w-4" />
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-foreground">
                        {method.action}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </Container>
      </Section>

      {/* What to Include Section */}
      <Section variant="muted">
        <Container maxWidth="4xl">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-semibold mb-6">
                <CheckCircle2 className="h-5 w-5" />
                <span>Booking Tips</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                What to Include in Your Text
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                To help us serve you better and get you booked faster, please
                include these details in your text:
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border-2 border-border/60 shadow-sm">
              <ul className="space-y-4">
                {textChecklist.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-lg text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Info Section */}
      <Section variant="default" withBorder>
        <Container maxWidth="4xl">
          <div className="bg-card rounded-2xl p-8 border-2 border-border/60 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Service Area
                  </h3>
                  <p className="text-muted-foreground">
                    We serve Hickory, NC and surrounding communities including
                    Conover, Newton, Long View, Granite Falls, Morganton,
                    Valdese, and Lenoir.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Zap className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Quick Response
                  </h3>
                  <p className="text-muted-foreground">
                    We typically respond to texts within a few hours during
                    business hours. For urgent requests, feel free to call!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Book Your Detail?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            Text us now to schedule your mobile car detail. We'll coordinate a
            time that works for you.
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
              <a href="/packages">View Packages</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
