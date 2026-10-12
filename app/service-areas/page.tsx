import Link from "next/link";
import { MapPin } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/ui/section";
import { business, businessConfig, townList } from "@/config/business";
import { siteConfig } from "@/config/site";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Service Areas | Mobile Detailing Across the Catawba Valley | ${siteConfig.title}`,
  description: `We come to you, all over the Catawba Valley: ${townList("&")}. Cars, trucks, bikes, and campers.`,
  canonical: "/service-areas",
});

const linkClass =
  "font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-dark";

export default function ServiceAreasIndexPage() {
  return (
    <>
      <PageHero
        location="service-areas-hero"
        title="We come to you, all over the Catawba Valley."
        sub={`Home base is ${business.HOME_BASE}. From there we head out to driveways and parking lots in eight towns. Find yours below.`}
      />

      <Section tone="warm" title="Pick your town">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {businessConfig.serviceAreaCities.map((city) => (
            <li
              key={city.slug}
              className="flex flex-col rounded-card bg-white p-6 shadow-card ring-1 ring-line"
            >
              <MapPin
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-8 w-8 text-orange"
              />
              <h3 className="mt-2 text-xl">
                <Link
                  href={`/mobile-car-detailing/${city.slug}/nc`}
                  className="underline-offset-4 hover:underline"
                >
                  {city.name}, NC
                </Link>
              </h3>
              <p className="text-sm font-semibold text-muted-text">
                {city.county}
              </p>
              <p className="mt-2 grow text-[0.95rem] text-muted-text">
                {city.description}
              </p>
              <p className="mt-4 text-[0.95rem]">
                <Link
                  href={`/mobile-car-detailing/${city.slug}/nc`}
                  className={linkClass}
                >
                  Mobile detailing in {city.name}
                </Link>
              </p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" title="What about travel?" width="3xl">
        <p className="text-center text-lg">{business.TRAVEL_NOTE}</p>
        <p className="mt-3 text-center text-muted-text">
          Not sure if you&apos;re in our area? Text Dad your address and
          we&apos;ll tell you straight.
        </p>
      </Section>
    </>
  );
}
