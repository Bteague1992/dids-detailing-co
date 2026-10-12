import type { ReactNode } from "react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { FinalCta } from "@/components/site/final-cta";
import { StickyMobileBar } from "@/components/site/sticky-mobile-bar";
import { LeadCaptureModal } from "@/components/site/lead-capture-modal";
import { getBookingHref } from "@/lib/cta";

/**
 * Wraps every page: sticky header, the page itself, the closing call to
 * action, the footer, and the phone-only Book / Text / Call bar.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-charcoal focus:px-4 focus:py-2 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header bookingHref={getBookingHref()} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <FinalCta />
      <Footer />
      <StickyMobileBar />
      <LeadCaptureModal />
    </div>
  );
}
