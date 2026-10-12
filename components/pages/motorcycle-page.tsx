import { Hand, Sparkles, Truck } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { PackageCard, packageCardRows } from "@/components/site/package-card";
import { DadsClubBikePlans } from "@/components/site/dads-club";
import { IconCards } from "@/components/site/icon-cards";
import { Reviews } from "@/components/site/reviews";
import { FaqAccordion, type FaqItem } from "@/components/site/faq-accordion";
import { TownsWeServe } from "@/components/site/brand-blocks";
import { Section } from "@/components/ui/section";
import { formatPrice, servicesConfig } from "@/config/services";
import { getSmsHref } from "@/lib/cta";

const whyRiders = [
  {
    icon: Hand,
    title: "Washed by hand",
    text: "Every bike gets a careful hand wash and dry. We take our time around the parts that matter.",
  },
  {
    icon: Sparkles,
    title: "Chrome gets its due",
    text: "Chrome and metal are wiped down on every wash, and polished on the Full Detail.",
  },
  {
    icon: Truck,
    title: "We come to you",
    text: "Garage, driveway, or carport. No trailer, no drop-off, no riding it home dirty again.",
  },
];

/** Body of /motorcycle-detailing. */
export function MotorcyclePage({ faqs }: { faqs: FaqItem[] }) {
  return (
    <>
      <PageHero
        location="packages-hero"
        title="Bike looking rough after the Parkway?"
        sub="Cruisers, sport bikes, tourers. We come to you, wash it by hand, and get that road-ready shine back."
      />

      <Section
        id="services"
        tone="warm"
        title="Two bike packages. Pick your level of clean."
      >
        <ul className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2">
          {servicesConfig.motorcycleServices.map((bike, i) => (
            <li key={bike.id} className={packageCardRows}>
              <PackageCard
                name={bike.name}
                description={bike.description}
                price={formatPrice(bike.price)}
                priceNote="Flat price"
                features={bike.features}
                popular={i === 1}
                smsHref={getSmsHref({ packageName: bike.name })}
              />
            </li>
          ))}
        </ul>
      </Section>

      <Section
        tone="white"
        title="Keep it clean all season"
        subtitle="The bike version of Dad's Club. One wash a month, no contracts, cancel anytime."
      >
        <div className="mx-auto max-w-md">
          <DadsClubBikePlans />
        </div>
      </Section>

      <Section tone="warm" title="Why riders pick Dad's">
        <IconCards items={whyRiders} />
      </Section>

      <Reviews tone="white" />

      <Section
        id="faq"
        tone="warm"
        title="Bike questions"
        width="3xl"
      >
        <FaqAccordion faqs={faqs} />
      </Section>

      <Section tone="white">
        <TownsWeServe />
      </Section>
    </>
  );
}
