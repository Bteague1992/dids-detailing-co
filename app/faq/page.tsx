import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { FaqAccordion, type FaqItem } from "@/components/site/faq-accordion";
import { FAQSchema } from "@/components/seo/faq-schema";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { business, townList } from "@/config/business";
import {
  addOnsConfig,
  carDurationSummary,
  motorcyclePriceSummary,
  servicesConfig,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import { WATER_POWER_ANSWER } from "@/lib/city-content";
import { getSmsHref } from "@/lib/cta";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `FAQ | Questions? Dad's Got Answers | ${siteConfig.title}`,
  description:
    "Straight answers about mobile detailing around Hickory, NC: booking, pricing, how long it takes, water and power, what happens if your car is really messy, and the Dad Promise.",
  canonical: "/faq",
});

const heavyMess = addOnsConfig.items.find((a) => a.id === "heavy-mess");

const groups: { title: string; faqs: FaqItem[] }[] = [
  {
    title: "Booking & payment",
    faqs: [
      {
        question: "How do I book?",
        answer: `Two ways. Fill out the quick booking form on our Book page, or text us at ${business.PHONE} with what you drive, the package you want, and where you are. Either way, Dad confirms a time with you.`,
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "No problem. Just text us as soon as you know, so we can shuffle the schedule.",
      },
      {
        question: "How do I pay?",
        answer:
          "Cash, Venmo, or other digital payments. You pay when the job's done, not before.",
      },
      {
        question: "Do you offer any discounts?",
        answer:
          "Book a second vehicle the same day and it's 10% off. We also run a seasonal special now and then, so text us to ask what's current.",
      },
      {
        question: "What areas do you serve?",
        answer: `${townList()}. Travel: ${business.TRAVEL_NOTE} Not sure if you're in range? Text us your address.`,
      },
    ],
  },
  {
    title: "Packages & pricing",
    faqs: [
      {
        question: "What's the difference between the packages?",
        answer: servicesConfig.packages
          .map((p) => `${p.name}: ${p.description}`)
          .join(" "),
      },
      {
        question: "What if my car is really messy?",
        answer: `Then you're in the right place. Messy cars are normal, and we don't judge. If it needs something extra${heavyMess ? `, like the ${heavyMess.name.toLowerCase()} at ${heavyMess.price}` : ""}, we'll tell you the exact price before we start. You decide from there.`,
      },
      {
        question: "What vehicles do you work on?",
        answer:
          "Cars, trucks, SUVs, minivans, motorcycles, campers, and RVs. Got something else? Text us and ask.",
      },
      {
        question: "Do you detail motorcycles?",
        answer: `Yes. ${motorcyclePriceSummary} We come to you, same as with cars.`,
      },
    ],
  },
  {
    title: "On the day",
    faqs: [
      {
        question: "Do you come to my home or workplace?",
        answer:
          "Yes. Home, office, wherever the car is parked in our service area. Just tell us where to meet it.",
      },
      {
        question: "Do you bring your own water and power?",
        answer: WATER_POWER_ANSWER,
      },
      {
        question: "How long does it take?",
        answer: `${carDurationSummary} Bigger vehicles can take a little longer.`,
      },
    ],
  },
  {
    title: "The Dad Promise",
    faqs: [
      {
        id: "dad-promise",
        question: "What's the Dad Promise?",
        answer: business.DAD_PROMISE,
      },
    ],
  },
];

const allFaqs = groups.flatMap((group) => group.faqs);

export default function FAQPage() {
  return (
    <>
      <FAQSchema faqs={allFaqs} pagePath="/faq" />
      <PageHero
        location="faq-hero"
        title="Questions? Dad's got answers."
        sub="The stuff people ask most, answered straight. If yours isn't here, text us."
      />

      {groups.map((group, i) => (
        <Section
          key={group.title}
          tone={i % 2 === 0 ? "warm" : "white"}
          title={group.title}
          width="3xl"
        >
          <FaqAccordion faqs={group.faqs} />
        </Section>
      ))}

      <Section tone="warm" title="Still have a question? Text Dad." width="3xl">
        <div className="text-center">
          <ButtonLink
            href={getSmsHref()}
            size="lg"
            data-cta-location="faq-text-dad"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Text Dad
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
