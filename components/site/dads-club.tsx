import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CheckList, PackageCard } from "@/components/site/package-card";
import {
  dadsClubConfig,
  dadsClubFromPrice,
  formatPrice,
  maintenancePlans,
  vehicleSizes,
} from "@/config/services";
import { getDadsClubSmsHref } from "@/lib/cta";

const planLabels: Record<string, string> = {
  biweekly: "Every 2 weeks",
  monthly: "Monthly",
  quarterly: "Quarterly",
};

/** Dad's Club car/truck/SUV plans: price table by size, requirement,
 * what's included each visit, and the Join button. */
export function DadsClubCarPlans() {
  return (
    <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
      <div className="min-w-0 rounded-card bg-white p-5 shadow-card ring-1 ring-line sm:p-6">
        {/* Scrolls sideways inside the card on very narrow phones. */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[23rem] text-left">
            <caption className="mb-3 text-left font-heading text-xl font-bold">
              Cars, trucks &amp; SUVs
              <span className="block text-sm font-normal text-muted-text">
                Price per visit
              </span>
            </caption>
            <thead>
              <tr className="border-b-2 border-line text-sm">
                <th scope="col" className="py-2 pr-3 font-semibold">
                  Plan
                </th>
                {vehicleSizes.map((size) => (
                  <th key={size.id} scope="col" className="px-2 py-2 font-semibold">
                    {size.shortLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {maintenancePlans.car.map((plan) => (
                <tr key={plan.id} className="border-b border-line last:border-0">
                  <th scope="row" className="py-3 pr-3 font-heading font-bold">
                    {planLabels[plan.frequency]}
                  </th>
                  {vehicleSizes.map((size) => (
                    <td
                      key={size.id}
                      className="px-2 py-3 font-heading text-xl font-extrabold text-orange-strong"
                    >
                      {formatPrice(plan.prices[size.id])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 rounded-xl bg-warm-gray px-4 py-3 font-semibold">
          {dadsClubConfig.requirement}
        </p>
      </div>

      <div className="flex flex-col rounded-card bg-white p-5 shadow-card ring-1 ring-line sm:p-6">
        <h3 className="mb-3 text-xl">Included each visit</h3>
        <CheckList items={dadsClubConfig.includedEachVisit} />
        <p className="mt-4 grow text-sm text-muted-text">
          No contracts. Pause or cancel anytime.
        </p>
        <ButtonLink
          href={getDadsClubSmsHref()}
          className="mt-5 w-full"
          data-cta-location="dads-club-join"
        >
          Join Dad&apos;s Club
        </ButtonLink>
      </div>
    </div>
  );
}

/** The monthly motorcycle plan card. */
export function DadsClubBikePlans() {
  return (
    <>
      {maintenancePlans.motorcycle.map((plan) => (
        <PackageCard
          key={plan.id}
          name={plan.name}
          description={plan.description}
          price={formatPrice(plan.price)}
          priceNote={`Per visit · ${planLabels[plan.frequency]}`}
          features={plan.features}
          smsHref={getDadsClubSmsHref(plan.name)}
          buttonLabel="Text to Join"
        />
      ))}
    </>
  );
}

/** The monthly and quarterly RV plan cards. */
export function DadsClubRvPlans() {
  return (
    <>
      {maintenancePlans.camperRv.map((plan) => (
        <PackageCard
          key={plan.id}
          name={plan.name}
          description={plan.description}
          price={`${formatPrice(plan.pricePerFoot)}/ft`}
          priceNote={`Per visit · ${formatPrice(plan.minimumPrice)} minimum`}
          features={plan.features}
          smsHref={getDadsClubSmsHref(plan.name)}
          buttonLabel="Text to Join"
        />
      ))}
    </>
  );
}

/**
 * Charcoal homepage banner. No photo for now: the right-hand side shows
 * what's included each visit instead (from the pricing file).
 */
export function DadsClubBanner() {
  return (
    <section className="on-dark bg-charcoal text-white">
      <Container className="grid items-center gap-8 py-12 md:grid-cols-[3fr_2fr] md:gap-12 md:py-14">
        <div>
          <h2 className="text-[1.75rem] font-extrabold md:text-4xl">
            Never deal with a dirty car again.
          </h2>
          <p className="mt-4 max-w-md text-lg text-white/85">
            Join Dad&apos;s Club and we&apos;ll keep your car clean every two
            weeks or every month. Set it and forget it.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <ButtonLink
              href={getDadsClubSmsHref()}
              data-cta-location="dads-club-banner-join"
            >
              Join Dad&apos;s Club
            </ButtonLink>
            <Link
              href="/dads-club"
              className="font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:text-orange"
            >
              See how it works
            </Link>
          </div>
        </div>
        <div className="rounded-card border border-white/20 bg-white/5 p-6">
          <h3 className="mb-3 text-xl">Every visit includes</h3>
          <CheckList items={dadsClubConfig.includedEachVisit} />
          <p className="mt-4 border-t border-white/20 pt-4 font-heading font-bold">
            From {formatPrice(dadsClubFromPrice)} a visit
            <span className="block text-sm font-normal text-white/80">
              No contracts. Cancel anytime.
            </span>
          </p>
        </div>
      </Container>
    </section>
  );
}
