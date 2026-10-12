import Link from "next/link";
import { townList } from "@/config/business";
import { PageHero } from "@/components/site/page-hero";
import { BeforeAfter } from "@/components/site/before-after";
import { CarPackages } from "@/components/site/package-card";
import { AddOnGrid } from "@/components/site/add-on-grid";
import { HowItWorks } from "@/components/site/how-it-works";
import { Reviews } from "@/components/site/reviews";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { NearbyAreas } from "@/components/site/brand-blocks";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/ui/section";
import {
  carDurationSummary,
  carPriceSummary,
  startingCarPrice,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import { WATER_POWER_ANSWER } from "@/lib/city-content";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Car Detailing in NC | Hickory & the Catawba Valley | ${siteConfig.title}`,
  description: `Car, truck & SUV detailing that fits real life. We come to your driveway around Hickory, NC. Honest prices from $${startingCarPrice}, and no judgment about the back seat.`,
  canonical: "/car-detailing",
});

const faqs = [
  {
    question: "Do you offer mobile car detailing near me?",
    answer: `If you're in ${townList("or")}, yes. We come to your home or work. No drop-off.`,
  },
  {
    question: "What vehicles do you detail?",
    answer:
      "Cars, trucks, SUVs, and minivans of every make and model. We also do motorcycles, campers, and RVs. Not sure about yours? Text us.",
  },
  {
    question: "How much does car detailing cost?",
    answer: `${carPriceSummary} Those are car prices. SUVs, trucks, minivans, and 3-row vehicles cost a bit more, and every size is listed on each package. If your vehicle needs add-ons, we'll quote the exact price before we start.`,
  },
  {
    question: "Do you bring your own water and power?",
    answer: WATER_POWER_ANSWER,
  },
  {
    question: "How long does a car detail take?",
    answer: `${carDurationSummary} Bigger vehicles can take a little longer.`,
  },
];

// The add-ons families ask about most.
const highlightedAddOns = [
  "pet-hair",
  "child-car-seat",
  "spot-stain",
  "odor-treatment",
];

export default function CarDetailingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} pagePath="/car-detailing" />
      <PageHero
        location="car-detailing-hero"
        title="Car, truck & SUV detailing that fits real life."
        sub="Kids turned the backseat into a snack bar? We've seen worse. We come to your driveway, clean it up, and you never have to leave the house."
      />

      <BeforeAfter tone="warm" />

      <Section
        id="services"
        tone="white"
        title="Simple packages. Honest prices."
        subtitle="Pick your vehicle size to see your price."
      >
        <CarPackages />
      </Section>

      <Section
        tone="warm"
        title="Car need a little extra love?"
        subtitle="Pet hair, car seats, stains, and smells are the big four. We'll always tell you the price before we start."
      >
        <AddOnGrid ids={highlightedAddOns} />
        <p className="mt-6 text-center">
          <Link
            href="/packages#add-ons"
            className="font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-dark"
          >
            See every add-on and price →
          </Link>
        </p>
      </Section>

      <HowItWorks tone="white" />

      <Reviews tone="warm" />

      <Section id="faq" tone="white" title="Car detailing questions" width="3xl">
        <FaqAccordion faqs={faqs} />
      </Section>

      <Section tone="warm">
        <NearbyAreas
          currentSlug=""
          hrefFor={(slug) => `/mobile-car-detailing/${slug}/nc`}
          label="Car detailing by town"
        />
      </Section>
    </>
  );
}
