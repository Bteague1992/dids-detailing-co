import { FAQList } from "@/components/marketing/faq-list";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import {
  MessageSquare,
  HelpCircle,
  Clock,
  DollarSign,
  Car,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about mobile car detailing services, pricing, booking, and more.",
  alternates: {
    canonical: "/faq",
  },
};

const faqCategories = [
  {
    title: "Booking & Process",
    icon: MessageSquare,
    faqs: [
      {
        question: "How do I book a detail?",
        answer:
          "Simply text us at 828-261-6906 with your vehicle type, preferred package, and location. We'll coordinate a time that works for you. No forms, no hassle!",
      },
      {
        question: "Do you come to my home or workplace?",
        answer:
          "Yes! We come to wherever is convenient for you - your home, office, or any other location within our service area. Just let us know where you'd like us to meet you.",
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "No problem! Just text us as soon as possible if you need to cancel or reschedule. We appreciate advance notice so we can adjust our schedule.",
      },
    ],
  },
  {
    title: "Services & Equipment",
    icon: Car,
    faqs: [
      {
        question: "Do I need to provide water or power?",
        answer:
          "Yes, we currently need access to water and power hookups, but plan to be self-contained and not need hookups in the future.",
      },
      {
        question: "How long does a detail take?",
        answer:
          "Basic Exterior takes about 45-60 minutes, Basic Interior takes about 60-75 minutes, and a Full Detail typically takes 2-3 hours depending on the size and condition of your vehicle.",
      },
      {
        question: "What vehicles do you work on?",
        answer:
          "We work on cars, trucks, and SUVs. Currently, we don't offer services for boats, RVs, or motorcycles, but feel free to text us if you have questions about a specific vehicle type.",
      },
    ],
  },
  {
    title: "Pricing & Packages",
    icon: DollarSign,
    faqs: [
      {
        question: "What's the difference between the packages?",
        answer:
          "Basic Exterior covers exterior washing and cleaning. Basic Interior covers interior vacuuming and cleaning. Full Detail includes everything from both packages plus extra attention to detail in crevices and touchpoints.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, Venmo, and other digital payment methods. Payment is due upon completion of the service.",
      },
      {
        question: "Do you offer any discounts or specials?",
        answer:
          "We're currently running a launch special for the first 20 customers - Full Detail at discounted pricing. Text us to check availability and book at the special price.",
      },
    ],
  },
  {
    title: "Service Area",
    icon: MapPin,
    faqs: [
      {
        question: "What areas do you serve?",
        answer:
          "We serve Hickory, NC and surrounding communities including Conover, Newton, Long View, Granite Falls, Morganton, Valdese, and Lenoir. If you're unsure if we serve your area, just text us!",
      },
    ],
  },
];

const quickFacts = [
  {
    icon: Clock,
    text: "45-60 min for Basic Exterior",
  },
  {
    icon: Car,
    text: "Cars, Trucks & SUVs",
  },
  {
    icon: MapPin,
    text: "8+ Cities Served",
  },
  {
    icon: CheckCircle2,
    text: "We come to you!",
  },
];

export default function FAQPage() {
  // Flatten all FAQs for the main FAQ list
  const allFAQs = faqCategories.flatMap((category) => category.faqs);

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
              <HelpCircle className="h-5 w-5" />
              <span>Common Questions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Got questions? We've got answers. If you don't see what you're
              looking for, just text us!
            </p>
          </div>
        </Container>
      </Section>

      {/* Quick Facts */}
      <Section variant="muted" withBorder>
        <Container maxWidth="5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {quickFacts.map((fact, idx) => {
              const Icon = fact.icon;
              return (
                <div
                  key={idx}
                  className="bg-card rounded-xl p-4 border-2 border-border/60 shadow-sm text-center"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    {fact.text}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Main FAQ Section */}
      <Section variant="default" withBorder>
        <Container maxWidth="4xl">
          <div className="mb-12">
            <FAQList faqs={allFAQs} />
          </div>
        </Container>
      </Section>

      {/* Still Have Questions CTA */}
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 text-primary mb-6 ring-4 ring-primary/10">
            <MessageSquare className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Still Have Questions?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8 max-w-2xl mx-auto">
            We're here to help! Text us and we'll get back to you as soon as
            possible. No question is too small.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Text Us Your Question
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/20 hover:bg-secondary-foreground/20"
            >
              <a href="/contact">View Contact Info</a>
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
