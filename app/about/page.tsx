import { Clock, Handshake, MapPin, PawPrint, Sparkles } from "lucide-react";
import { primaryTownsComma } from "@/config/business";
import { PageHero } from "@/components/site/page-hero";
import { DadPromise } from "@/components/site/brand-blocks";
import { IconCards } from "@/components/site/icon-cards";
import { Logo } from "@/components/site/logo";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `About Dad | Family-Owned Mobile Detailing | ${siteConfig.title}`,
  description:
    "Hi, I'm Dad. A husband, a dad, and a guy who knows what a family car goes through. Family-owned mobile detailing based in Connelly Springs, NC, serving the Catawba Valley.",
  canonical: "/about",
});

const family = [
  {
    icon: PawPrint,
    title: "Cars and dogs, covered",
    text: "My wife runs a mobile dog grooming business, so between the two of us we've got your car and your dog covered. We're a family business through and through.",
  },
  {
    icon: MapPin,
    title: "Based in Connelly Springs",
    text: `Home is Connelly Springs, NC. From there we serve the Catawba Valley: ${primaryTownsComma}, and the towns in between.`,
  },
];

const values = [
  {
    icon: Sparkles,
    title: "Let the work speak",
    text: "No big promises, no fancy words. You'll see the difference when you open the door.",
  },
  {
    icon: Clock,
    title: "Respect your time",
    text: "We show up when we say we will, and you don't have to drive anywhere or wait around.",
  },
  {
    icon: Handshake,
    title: "Earn your trust",
    text: "Clear prices, told to you before we start. If something's not right, we fix it.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        location="about-hero"
        title="Hi, I'm Dad."
        sub="Husband, dad, and the guy who'll get the fries out of your backseat. Here's the story behind the business."
      />

      {/* No photos yet, so the shield logo carries this section. */}
      <section className="bg-warm-gray py-12 md:py-16">
        <Container
          width="5xl"
          className="grid items-center gap-8 md:grid-cols-[auto_1fr] md:gap-14"
        >
          <Logo
            variant="shield"
            decorative
            sizes="(min-width: 768px) 320px, 224px"
            className="mx-auto h-56 md:h-80"
          />
          <div>
            <SectionHeading
              title="Why I started this"
              align="left"
              className="mb-5 md:mb-5"
            />
            <div className="space-y-4">
              <p>
                Not everyone owns a Lamborghini they want polished to a mirror
                shine. Most of us drive the car that hauls the kids, the dog,
                the groceries, and whatever came home from the job site.
              </p>
              <p>
                I know what a family car goes through because I&apos;ve got
                one. Cracker dust in the car seat. A french fry that&apos;s
                been under the seat since spring. Mud that was supposed to stay
                on the boots. That&apos;s not a dirty-car problem. That&apos;s
                just life.
              </p>
              <p>
                So I started Dad&apos;s Mobile Detailing for real families and
                everyday vehicles. I come to your driveway, I clean it up, and
                I don&apos;t judge what I find. Sometimes you just want the
                fries and salt out of the backseat. I get it. And yes, that
                cartoon is me.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Section
        tone="white"
        width="4xl"
        title="Reliable. Fair. Worth it."
        subtitle="That's the whole promise. I'm not the detailer for show cars, and I'm fine with that. I'm the detailer for the minivan, the family SUV, and the work truck."
      >
        <DadPromise id="dad-promise" />
      </Section>

      <Section
        tone="warm"
        width="4xl"
        title="A family business"
        subtitle="When I show up in your driveway, I treat your car like it's my own family's."
      >
        <IconCards items={family} columns={2} />
      </Section>

      <Section tone="white" title="What we stand on">
        <IconCards items={values} />
      </Section>
    </>
  );
}
