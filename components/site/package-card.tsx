import type { ReactNode } from "react";
import { Check, Clock } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SizeLabel, SizePrice, SizeToggle } from "@/components/site/size-toggle";
import { servicesConfig, startingPriceNote } from "@/config/services";
import { getSmsHref } from "@/lib/cta";
import { cn } from "@/lib/utils";

export function MostPopularBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-orange-dark px-3 py-1 text-sm font-bold text-white",
        className,
      )}
    >
      Most Popular
    </span>
  );
}

/** Orange-check list used for "What's included". */
export function CheckList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <Check
            aria-hidden="true"
            strokeWidth={3}
            className="mt-1 h-4 w-4 shrink-0 text-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Put this on whatever wraps a PackageCard inside a grid (usually the <li>).
 * Each card has five rows — name, description, price, what's included, button
 * — and with CSS subgrid those rows are shared across every card in the same
 * grid row, so the prices, "What's included" headings, and buttons all line up
 * even when one card's name or description wraps onto more lines.
 */
export const packageCardRows = "row-span-5 grid grid-rows-subgrid gap-y-0";

/**
 * Detailed package card: name, price, time, "What's included", Text to Book.
 * Used for car, motorcycle, RV, and plan cards — pass whatever price markup
 * fits (a flat "$85", a <SizePrice>, or "$9/ft").
 */
export function PackageCard({
  name,
  description,
  price,
  priceNote,
  duration,
  features,
  smsHref,
  popular = false,
  buttonLabel = "Text to Book",
}: {
  name: string;
  description: string;
  price: ReactNode;
  /** Small line under the price, e.g. the selected size or "$175 minimum". */
  priceNote?: ReactNode;
  duration?: string;
  features: readonly string[];
  smsHref: string;
  popular?: boolean;
  buttonLabel?: string;
}) {
  return (
    <article
      className={cn(
        packageCardRows,
        "relative rounded-card bg-white p-6 shadow-card",
        popular ? "ring-2 ring-orange" : "ring-1 ring-line",
      )}
    >
      {popular && (
        <MostPopularBadge className="absolute -top-3.5 left-1/2 -translate-x-1/2" />
      )}
      {/* Row 1 */}
      <h3 className="text-xl">{name}</h3>
      {/* Row 2 */}
      <p className="mt-2 text-muted-text">{description}</p>

      {/* Row 3 */}
      <div className="mt-5">
        <p className="font-heading text-4xl font-extrabold text-orange-strong">
          {price}
        </p>
        {priceNote && (
          <p className="mt-1 text-sm text-muted-text">{priceNote}</p>
        )}
        {duration && (
          <p className="mt-3 flex items-center gap-2 text-sm font-medium">
            <Clock aria-hidden="true" className="h-4 w-4 text-orange" />
            Time: {duration}
          </p>
        )}
      </div>

      {/* Row 4 */}
      <div className="mt-5 border-t border-line pt-5">
        <h4 className="mb-3 font-heading text-base font-bold">
          What&apos;s included
        </h4>
        <CheckList items={features} />
      </div>

      {/* Row 5 */}
      <ButtonLink
        href={smsHref}
        variant={popular ? "primary" : "secondary"}
        className="mt-6 w-full self-end"
        aria-label={`${buttonLabel}: ${name}`}
        data-cta-location="package-card"
      >
        {buttonLabel}
      </ButtonLink>
    </article>
  );
}

/**
 * The four car/truck/SUV packages with the vehicle size toggle. Everything
 * comes from config/services.ts.
 */
export function CarPackages({ city }: { city?: string }) {
  return (
    <>
      <SizeToggle />
      <ul className="grid gap-x-5 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
        {servicesConfig.packages.map((pkg) => (
          <li key={pkg.id} className={packageCardRows}>
            <PackageCard
              name={pkg.name}
              description={pkg.description}
              price={<SizePrice prices={pkg.prices} />}
              priceNote={<SizeLabel />}
              duration={pkg.duration}
              features={pkg.features}
              popular={pkg.mostPopular}
              smsHref={getSmsHref({ packageName: pkg.name, city })}
            />
          </li>
        ))}
      </ul>
      <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted-text">
        {startingPriceNote}
      </p>
    </>
  );
}
