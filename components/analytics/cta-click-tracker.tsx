"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/**
 * Fires cta_text_click / cta_call_click / cta_book_click GA4 events for every
 * "text us" (sms:), click-to-call (tel:), or Book link on the site, via a single delegated document
 * click listener rather than an onClick handler on every CTA. Each CTA anchor
 * carries a `data-cta-location` attribute (e.g. "hero", "nav", "footer",
 * "service-page") identifying which instance was clicked; this component just
 * reads that attribute off the nearest ancestor link.
 */
export function CtaClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") ?? "";
      const location = link.getAttribute("data-cta-location") ?? "unspecified";

      // Book buttons carry a data-cta-location ending in "-book" (they link to
      // the booking page, or to an outside booking system if one is set).
      if (location.endsWith("-book")) {
        trackEvent("cta_book_click", { location });
      } else if (href.startsWith("sms:")) {
        trackEvent("cta_text_click", { location });
      } else if (href.startsWith("tel:")) {
        trackEvent("cta_call_click", { location });
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
