import { CalendarDays, MessageCircle, Phone } from "lucide-react";
import { getBookingHref, getCallHref, getSmsHref } from "@/lib/cta";
import { ButtonLink, buttonClass } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Phone-only bar pinned to the bottom of every page: Book · Call · Text.
 * Book is the main button; when booking buttons are switched off (SHOW_BOOKING
 * in config/business.ts) it disappears and Text becomes the main one.
 * Pages reserve room for the bar with the .pb-sticky-bar utility (see SiteShell).
 */
export function StickyMobileBar() {
  const bookingHref = getBookingHref();
  const item = "w-full px-2";
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-2 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgb(43_43_43/0.08)] md:hidden"
    >
      <ul className={cn("grid gap-2", bookingHref ? "grid-cols-3" : "grid-cols-2")}>
        {bookingHref && (
          <li>
            <ButtonLink
              href={bookingHref}
              className={item}
              data-cta-location="sticky-bar-book"
            >
              <CalendarDays aria-hidden="true" className="h-5 w-5" />
              Book
            </ButtonLink>
          </li>
        )}
        <li>
          <a
            href={getCallHref()}
            className={buttonClass({ variant: "secondary", className: item })}
            data-cta-location="sticky-bar-call"
          >
            <Phone aria-hidden="true" className="h-5 w-5" />
            Call
          </a>
        </li>
        <li>
          <a
            href={getSmsHref()}
            // Text is the main action while Book is hidden.
            className={buttonClass({
              variant: bookingHref ? "secondary" : "primary",
              className: item,
            })}
            data-cta-location="sticky-bar-text"
          >
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            Text
          </a>
        </li>
      </ul>
    </nav>
  );
}
