import { PageHero } from "@/components/site/page-hero";
import { primaryTowns } from "@/config/business";
import { RatingLine } from "@/components/site/rating-line";
import { TrustBar } from "@/components/site/trust-bar";
import { BeforeAfter } from "@/components/site/before-after";
import { PackageOverview } from "@/components/site/package-overview";
import { HowItWorks } from "@/components/site/how-it-works";
import { Reviews } from "@/components/site/reviews";
import { MeetDad } from "@/components/site/brand-blocks";
import { DadsClubBanner } from "@/components/site/dads-club";
import { Section } from "@/components/ui/section";
import { LocalBusinessSchema } from "@/components/seo/local-business-schema";
import { siteConfig } from "@/config/site";
import { startingCarPrice } from "@/config/services";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

// SEO note: the homepage owns broad/branded queries ("Dad's Mobile Detailing
// Co.", "mobile detailing Hickory NC") — the title leads with the brand name
// and stays self-canonical at "/". The per-city pages under
// /mobile-car-detailing/[city]/nc target booking-intent local queries with
// their own titles and self-canonicals, so the two don't compete.
export const metadata: Metadata = createPageMetadata({
  title: `${siteConfig.title} | Mobile Detailing in ${primaryTowns}, NC`,
  description: `Life gets messy. Dad's got it. Mobile detailing for real families and everyday vehicles around ${primaryTowns}. Honest prices from $${startingCarPrice}. We come to you.`,
  canonical: "/",
});

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <PageHero
        size="home"
        location="home-hero"
        title={
          <>
            Life gets messy.{" "}
            <span className="block text-orange-strong">Dad&apos;s got it.</span>
          </>
        }
        sub={`Mobile detailing for real families and everyday vehicles in ${primaryTowns}. We come to you.`}
      >
        <RatingLine />
      </PageHero>

      <TrustBar />

      <BeforeAfter tone="white" />

      <Section
        id="packages"
        tone="warm"
        title="Simple packages. Honest prices."
        subtitle="Starting prices shown. No surprises. If your car needs extra love, we'll tell you before we start."
      >
        <PackageOverview />
      </Section>

      <HowItWorks tone="white" />

      <Reviews tone="warm" />

      <MeetDad />

      <DadsClubBanner />
    </>
  );
}
