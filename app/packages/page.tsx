import { Caravan, Motorbike } from "lucide-react";
import { LinkCard } from "@/components/site/icon-cards";
import { PageHero } from "@/components/site/page-hero";
import { CarPackages } from "@/components/site/package-card";
import { AddOnGrid } from "@/components/site/add-on-grid";
import {
  DadsClubBikePlans,
  DadsClubCarPlans,
  DadsClubRvPlans,
} from "@/components/site/dads-club";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { FAQSchema } from "@/components/seo/faq-schema";
import { Section } from "@/components/ui/section";
import { business } from "@/config/business";
import {
  bikeWash,
  carPackageNameList,
  dadsClubConfig,
  formatPrice,
  pricingPolicies,
  rvFromRate,
  servicesConfig,
  vehicleSizes,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Packages & Pricing | Simple Packages, Honest Prices | ${siteConfig.title}`,
  description: `Mobile detailing packages with the prices right on the page: ${carPackageNameList}. Pick your vehicle size and see your number. No surprises.`,
  canonical: "/packages",
});

const pricingFaqs = [
  {
    question: "What's included in each package?",
    answer: `Every package card lists exactly what you get. The short version: ${servicesConfig.packages.map((p) => `${p.name}: ${p.description}`).join(" ")}`,
  },
  {
    question: "Why does the price change with vehicle size?",
    answer: `Bigger vehicles take more time, water, and supplies. We price by three sizes: ${vehicleSizes.map((s) => s.label).join("; ")}.`,
  },
  {
    question: "Will the price change once you see my car?",
    answer:
      "The prices here are starting prices. If your car needs an add-on, like pet hair removal or a stain treatment, we'll tell you the exact price before we start. You decide. No surprises.",
  },
  {
    question: "Can I mix and match?",
    answer:
      "Sure can. Pick a package, then add whatever extras you need from the add-ons list. Text us what you're after and we'll give you the number.",
  },
];

const teasers = [
  {
    icon: Motorbike,
    title: "Motorcycles",
    text: "Hand wash and full detail for cruisers, sport bikes, and tourers.",
    price: `From ${formatPrice(bikeWash.price)}`,
    href: "/motorcycle-detailing",
    link: "See bike packages",
  },
  {
    icon: Caravan,
    title: "RVs & campers",
    text: "Top-to-bottom cleaning, priced by the foot. We come to where it's parked.",
    price: `From ${formatPrice(rvFromRate)}/ft`,
    href: "/rv-detailing",
    link: "See RV pricing",
  },
];

// The Dad Promise isn't a pricing rule, so it lives in config/business.ts —
// it's added to the strip here alongside the policies from the pricing file.
const policies = [...pricingPolicies, `The Dad Promise: ${business.DAD_PROMISE}`];

export default function PackagesPage() {
  return (
    <>
      <FAQSchema faqs={pricingFaqs} pagePath="/packages" />
      <PageHero
        location="packages-hero"
        title="Simple packages. Honest prices."
        sub="Starting prices shown. If your car needs extra love, we'll tell you before we start."
      />

      <Section id="cars" tone="warm" title="Cars, trucks & SUVs">
        <CarPackages />
      </Section>

      <Section
        id="add-ons"
        tone="white"
        title="Car need a little extra love?"
        subtitle="We'll always tell you the price before we start."
      >
        <AddOnGrid />
      </Section>

      <Section
        id="dads-club"
        tone="warm"
        title={dadsClubConfig.name}
        subtitle={dadsClubConfig.intro}
      >
        {/* Old anchor, kept so existing #maintenance-plans links still land here. */}
        <span id="maintenance-plans" />
        <DadsClubCarPlans />
        <h3 className="mt-12 mb-5 text-center text-2xl">
          Bikes and rigs can join too
        </h3>
        <div className="grid gap-5 md:grid-cols-3">
          <DadsClubBikePlans />
          <DadsClubRvPlans />
        </div>
      </Section>

      <Section id="motorcycles" tone="white" title="Got something else to clean?">
        <span id="campers-rvs" />
        <ul className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {teasers.map((item) => (
            <li key={item.href}>
              <LinkCard item={item} linkLabel={item.link} linkClassName="mt-3" />
            </li>
          ))}
        </ul>
      </Section>

      <Section id="policies" tone="warm" title="Good to know" width="4xl">
        <ul className="grid gap-3 sm:grid-cols-2">
          {policies.map((policy) => (
            <li
              key={policy}
              className="rounded-card bg-white px-5 py-4 shadow-card ring-1 ring-line"
            >
              {policy}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" title="Pricing questions" width="3xl">
        <FaqAccordion faqs={pricingFaqs} />
      </Section>
    </>
  );
}
