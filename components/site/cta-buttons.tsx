import { ButtonLink } from "@/components/ui/button";
import { getBookingHref, getSmsHref } from "@/lib/cta";
import { cn } from "@/lib/utils";

/**
 * The standard pair: "Book Online" (primary) + "Text Dad" (secondary).
 * While booking buttons are switched off (SHOW_BOOKING in config/business.ts),
 * only "Text Dad" shows, as the primary button.
 */
export function CtaButtons({
  location,
  size = "md",
  city,
  textHref,
  textLabel = "Text Dad",
  className,
}: {
  /** data-cta-location prefix for analytics. */
  location: string;
  size?: "md" | "lg";
  city?: string;
  /** Override the text button, e.g. "Join Dad's Club" with its own message. */
  textHref?: string;
  textLabel?: string;
  className?: string;
}) {
  const bookingHref = getBookingHref();
  const textVariant = bookingHref ? "secondary" : "primary";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {bookingHref && (
        <ButtonLink
          href={bookingHref}
          size={size}
          data-cta-location={`${location}-book`}
        >
          Book Online
        </ButtonLink>
      )}
      <ButtonLink
        href={textHref ?? getSmsHref({ city })}
        variant={textVariant}
        size={size}
        data-cta-location={`${location}-text`}
      >
        {textLabel}
      </ButtonLink>
    </div>
  );
}
