import { MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { BookingForm } from "@/components/site/booking-form";
import { HowItWorks } from "@/components/site/how-it-works";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { business, businessConfig, primaryTowns } from "@/config/business";
import {
  dadsClubConfig,
  maintenancePlans,
  servicesConfig,
  vehicleSizes,
} from "@/config/services";
import { siteConfig } from "@/config/site";
import { getCallHref, getSmsHref } from "@/lib/cta";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Book a Detail Online | ${siteConfig.title}`,
  description: `Book mobile detailing around ${primaryTowns}, NC. Tell us what you drive and when works, and Dad will confirm a time. Takes about a minute.`,
  canonical: "/book",
});

// Every choice comes from the central pricing file, so new or renamed
// packages show up here automatically.
const services = [
  {
    group: "Cars, trucks & SUVs",
    options: servicesConfig.packages.map((p) => p.name),
  },
  {
    group: "Motorcycles",
    options: servicesConfig.motorcycleServices.map((m) => m.name),
  },
  {
    group: "RVs & campers",
    options: servicesConfig.camperRvServices.map((r) => `RV ${r.name}`),
  },
  {
    group: dadsClubConfig.name,
    options: [
      ...maintenancePlans.car.map((p) => p.name),
      ...maintenancePlans.motorcycle.map((p) => `${dadsClubConfig.name}: ${p.name}`),
      ...maintenancePlans.camperRv.map((p) => `${dadsClubConfig.name}: ${p.name}`),
    ],
  },
];

export default function BookPage() {
  return (
    <>
      <PageHero
        location="book-hero"
        showCta={false}
        title="Book your detail."
        sub="Tell us what you drive and when works. Dad will confirm a time, usually within a few hours. Takes about a minute."
      />

      <Section tone="warm" width="3xl">
        <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
          <BookingForm
            services={services}
            vehicleSizes={vehicleSizes.map((size) => size.label)}
            towns={businessConfig.serviceAreaCities.map((city) => city.name)}
          />
        </div>
      </Section>

      <Section
        tone="white"
        title="Rather just text?"
        subtitle={`That works too. Text or call ${business.PHONE}, ${business.HOURS.full}.`}
        width="3xl"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <ButtonLink
            href={getSmsHref()}
            variant="secondary"
            data-cta-location="book-page-text"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Text Dad
          </ButtonLink>
          <ButtonLink
            href={getCallHref()}
            variant="secondary"
            data-cta-location="book-page-call"
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
            Call
          </ButtonLink>
        </div>
      </Section>

      <HowItWorks tone="warm" />
    </>
  );
}
