import { PageHero } from "@/components/site/page-hero";
import {
  DadsClubBikePlans,
  DadsClubCarPlans,
  DadsClubRvPlans,
} from "@/components/site/dads-club";
import { HowItWorks } from "@/components/site/how-it-works";
import { FaqAccordion } from "@/components/site/faq-accordion";
import { TownsWeServe } from "@/components/site/brand-blocks";
import { Section } from "@/components/ui/section";
import { dadsClubConfig } from "@/config/services";
import { dadsClubFaqs } from "@/lib/city-content";
import { getDadsClubSmsHref } from "@/lib/cta";

/** Body of /dads-club. */
export function DadsClubPage() {
  return (
    <>
      <PageHero
        location="packages-hero"
        title="Never deal with a dirty car again."
        textHref={getDadsClubSmsHref()}
        textLabel="Text to Join"
        sub="Join Dad's Club and we'll keep your car clean every two weeks or every month. Set it and forget it. No contracts, cancel anytime."
      />

      <Section
        id="pricing"
        tone="warm"
        title="Pick your schedule"
        subtitle={dadsClubConfig.intro}
      >
        <DadsClubCarPlans />
      </Section>

      <Section
        tone="white"
        title="Bikes and rigs can join too"
        subtitle="Same idea, different vehicle. No contracts on any of them."
      >
        <div className="grid gap-5 md:grid-cols-3">
          <DadsClubBikePlans />
          <DadsClubRvPlans />
        </div>
      </Section>

      <HowItWorks tone="warm" />

      <Section id="faq" tone="white" title="Dad's Club questions" width="3xl">
        <FaqAccordion faqs={dadsClubFaqs} />
      </Section>

      <Section tone="warm">
        <TownsWeServe />
      </Section>
    </>
  );
}
