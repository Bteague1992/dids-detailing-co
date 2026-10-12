import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/site/logo";
import { business, businessConfig } from "@/config/business";
import { cn } from "@/lib/utils";

/**
 * "Hi, I'm Dad." on the homepage. The circle icon logo (the cartoon is Dad)
 * stands in for a photo.
 */
export function MeetDad() {
  return (
    <section className="bg-white py-12 md:py-16">
      <Container
        width="5xl"
        className="grid items-center gap-8 text-center md:grid-cols-[auto_1fr] md:gap-14 md:text-left"
      >
        <Logo
          variant="avatar"
          decorative
          sizes="(min-width: 768px) 256px, 160px"
          className="mx-auto h-40 md:h-64"
        />
        <div>
          <h2 className="text-[1.75rem] font-extrabold md:text-4xl">
            Hi, I&apos;m Dad.
          </h2>
          <span
            aria-hidden="true"
            className="mx-auto mt-3 block h-1 w-14 rounded-full bg-orange md:mx-0"
          />
          <p className="mt-5 text-lg">
            I&apos;m a husband, a dad, and a guy who knows what a family car
            goes through. I started Dad&apos;s Mobile Detailing because not
            everyone needs a mirror shine. Sometimes you just need the fries
            out of the backseat. My wife runs a mobile dog grooming business,
            so we&apos;re a family business through and through. When I show up
            in your driveway, I treat your car like it&apos;s my own
            family&apos;s.
          </p>
          <p className="mt-5 text-sm font-semibold text-muted-text">
            Proudly serving the Catawba Valley from Connelly Springs, NC
          </p>
          <p className="mt-4">
            <Link
              href="/about"
              className="font-semibold underline decoration-orange decoration-2 underline-offset-4 hover:text-orange-dark"
            >
              More about Dad →
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}

/** The Dad Promise feature block. */
export function DadPromise({ id, className }: { id?: string; className?: string }) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col items-center gap-4 rounded-card bg-white p-6 text-center shadow-card ring-2 ring-orange sm:flex-row sm:p-8 sm:text-left",
        className,
      )}
    >
      <ShieldCheck
        aria-hidden="true"
        strokeWidth={1.5}
        className="h-14 w-14 shrink-0 text-orange"
      />
      <div>
        <h3 className="text-2xl">The Dad Promise</h3>
        <p className="mt-1 text-lg">{business.DAD_PROMISE}</p>
      </div>
    </div>
  );
}

/** Links to every other town's page of the same type. */
export function NearbyAreas({
  currentSlug,
  hrefFor,
  label = "Nearby areas we serve",
}: {
  currentSlug: string;
  hrefFor: (citySlug: string) => string;
  label?: string;
}) {
  return (
    <nav aria-label={label} className="text-center">
      <h2 className="text-xl">{label}</h2>
      <ul className="mt-4 flex flex-wrap justify-center gap-3">
        {businessConfig.serviceAreaCities
          .filter((city) => city.slug !== currentSlug)
          .map((city) => (
            <li key={city.slug}>
              <Link
                href={hrefFor(city.slug)}
                className="inline-block rounded-full bg-white px-4 py-2 font-semibold shadow-card ring-1 ring-line hover:ring-2 hover:ring-orange"
              >
                {city.name}, NC
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}

/** "Towns we serve": every town, linking to its city page. */
export function TownsWeServe() {
  return (
    <NearbyAreas
      currentSlug=""
      hrefFor={(slug) => `/mobile-car-detailing/${slug}/nc`}
      label="Towns we serve"
    />
  );
}
