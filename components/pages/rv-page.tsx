import { Leaf, Ruler, Snowflake } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { getQuoteCta, PackageCard, packageCardRows } from "@/components/site/package-card";
import { DadsClubRvPlans } from "@/components/site/dads-club";
import { IconCards } from "@/components/site/icon-cards";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { TownsWeServe } from "@/components/site/brand-blocks";
import { Section } from "@/components/ui/section";
import { formatPrice, servicesConfig } from "@/config/services";
import { rvFaqs } from "@/lib/city-content";

const CATEGORY = "Camper & RV Detailing";

// Worked example for "How we price RVs", built from the first package so it
// always matches the pricing file.
const example = servicesConfig.camperRvServices[0];
const EXAMPLE_FEET = 24;
const SHORT_FEET = 16;

/** Body of /rv-detailing. */
export function RvPage() {
  const seasonal = [
    {
      icon: Leaf,
      title: "Spring prep",
      text: "Wash off the winter before the first trip of the year.",
    },
    {
      icon: Snowflake,
      title: "Fall storage wash",
      text: "Put it away clean so it's ready to go when the weather turns back.",
    },
  ];

  return (
    <>
      <PageHero
        location="packages-hero"
        title="Your rig, road-trip ready."
        sub="Campers, travel trailers, and motorhomes, cleaned top to bottom right where they're parked. Priced by the foot."
      />

      <Section
        id="pricing"
        tone="warm"
        title="RV & camper packages"
        subtitle="Per-foot pricing, with a minimum for each package."
      >
        <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
          {servicesConfig.camperRvServices.map((rv) => (
            <li key={rv.id} className={packageCardRows}>
              <PackageCard
                name={rv.name}
                description={rv.description}
                price={`${formatPrice(rv.pricePerFoot)}/ft`}
                priceNote={`${formatPrice(rv.minimumPrice)} minimum`}
                features={rv.features}
                cta={getQuoteCta({
                  packageName: rv.name,
                  categoryLabel: CATEGORY,
                })}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="white"
        title="How we price RVs"
        width="4xl"
      >
        <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
          <div className="flex items-start gap-4">
            <Ruler
              aria-hidden="true"
              strokeWidth={1.75}
              className="mt-1 h-9 w-9 shrink-0 text-orange"
            />
            <div className="space-y-3">
              <p className="text-lg font-semibold">
                Length of your rig × the per-foot rate. That&apos;s it.
              </p>
              <p>
                Say you&apos;ve got a {EXAMPLE_FEET}-foot camper and want the{" "}
                {example.name} package at {formatPrice(example.pricePerFoot)}
                /ft. That&apos;s {EXAMPLE_FEET} ×{" "}
                {formatPrice(example.pricePerFoot)} ={" "}
                <strong>
                  {formatPrice(EXAMPLE_FEET * example.pricePerFoot)}
                </strong>
                .
              </p>
              <p>
                Each package has a minimum. A {SHORT_FEET}-foot camper works out
                to {formatPrice(SHORT_FEET * example.pricePerFoot)} by the foot,
                so the {formatPrice(example.minimumPrice)} minimum applies
                instead.
              </p>
              <p className="text-muted-text">
                Text us your rig&apos;s length and we&apos;ll send you the exact
                number before we book.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="warm"
        title="Keep the rig clean between trips"
        subtitle="RV plans under Dad's Club. Monthly or quarterly, no contracts."
      >
        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          <DadsClubRvPlans />
        </div>
      </Section>

      <Section
        tone="white"
        title="Good times to call Dad"
        width="4xl"
      >
        <IconCards items={seasonal} columns={2} />
      </Section>

      <Section
        id="faq"
        tone="warm"
        title="RV questions"
        width="3xl"
      >
        <FaqAccordion faqs={rvFaqs} />
      </Section>

      <Section tone="white">
        <TownsWeServe />
      </Section>
    </>
  );
}
