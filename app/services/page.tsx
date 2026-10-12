import { Car, Caravan, Motorbike, Plus, Repeat } from "lucide-react";
import { LinkCard } from "@/components/site/icon-cards";
import { PageHero } from "@/components/site/page-hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { Section } from "@/components/ui/section";
import {
  addOnFromPrice,
  bikeWash,
  dadsClubFromPrice,
  formatPrice,
  rvFromRate,
  startingCarPrice,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `All Services | Cars, Bikes, RVs & Dad's Club | ${siteConfig.title}`,
  description: `Everything we do, in one place: car, truck & SUV detailing from $${startingCarPrice}, motorcycles, RVs and campers, add-ons, and Dad's Club recurring visits. We come to you.`,
  canonical: "/services",
});

const categories = [
  {
    icon: Car,
    title: "Cars, trucks & SUVs",
    text: "Four simple packages for everyday vehicles. Minivans and work trucks very much included.",
    price: `From ${formatPrice(startingCarPrice)}`,
    href: "/car-detailing",
  },
  {
    icon: Motorbike,
    title: "Motorcycles",
    text: "A careful hand wash or the full treatment, chrome polish and all.",
    price: `From ${formatPrice(bikeWash.price)}`,
    href: "/motorcycle-detailing",
  },
  {
    icon: Caravan,
    title: "RVs & campers",
    text: "Top-to-bottom cleaning right where the rig is parked, priced by the foot.",
    price: `From ${formatPrice(rvFromRate)}/ft`,
    href: "/rv-detailing",
  },
  {
    icon: Repeat,
    title: "Dad's Club",
    text: "We keep your car clean every two weeks or every month. No contracts.",
    price: `From ${formatPrice(dadsClubFromPrice)} a visit`,
    href: "/dads-club",
  },
  {
    icon: Plus,
    title: "Packages, pricing & add-ons",
    text: "Every package and price on one page, plus add-ons for pet hair, car seats, stains, and odors.",
    price: `Add-ons from ${formatPrice(addOnFromPrice)}`,
    href: "/packages",
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        location="services-hero"
        title="Everything we do, in one place."
        sub="If it has wheels and it's messy, there's a good chance we clean it. Pick a category to see what's included and what it costs."
      />

      <Section tone="warm" title="Pick what needs cleaning">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item) => (
            <li key={item.href}>
              <LinkCard item={item} />
            </li>
          ))}
        </ul>
      </Section>

      <HowItWorks tone="white" />
    </>
  );
}
