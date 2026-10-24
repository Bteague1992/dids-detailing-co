import { MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { HowItWorks } from "@/components/site/how-it-works";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { business, primaryTowns } from "@/config/business";
import { siteConfig } from "@/config/site";
import { getCallHref, getSmsHref } from "@/lib/cta";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Book a Detail Online | ${siteConfig.title}`,
  description: `Book mobile detailing around ${primaryTowns}, NC. Pick your service and a time that works, and you're on the schedule. No deposit, takes about a minute.`,
  canonical: "/book",
});

export default function BookPage() {
  return (
    <>
      <PageHero
        location="book-hero"
        showCta={false}
        title="Book your detail."
        sub="Pick your service and a time that works. You'll get a confirmation right away. No deposit to book."
      />

      <Section tone="warm" width="3xl">
        <div className="overflow-hidden rounded-card bg-white shadow-card ring-1 ring-line">
          {/* The same iframe Square's embed script inserts, rendered directly
              so it doesn't depend on that script running inside React. */}
          <iframe
            src={business.SQUARE.WIDGET_URL}
            title="Book an appointment with Dad's Mobile Detailing Co."
            allow="payment app.squareup.com"
            className="block h-[52rem] w-full border-0"
          />
        </div>
        <p className="mt-4 text-center text-sm text-muted-text">
          Booking not loading?{" "}
          <a
            href={business.SQUARE.BOOKING_URL}
            className="font-semibold text-charcoal underline decoration-orange decoration-2 underline-offset-4"
            data-cta-location="book-page-square-book"
          >
            Open the booking page
          </a>
        </p>

        <ul className="mt-6 space-y-2 text-center text-sm text-muted-text">
          <li>{business.BOOKING_TERMS.payment}</li>
          <li>{business.BOOKING_TERMS.cancellation}</li>
        </ul>
      </Section>

      <Section
        tone="white"
        title="Rather just text?"
        subtitle={`That works too, and it's the way to go for RV quotes and Dad's Club. Text or call ${business.PHONE}, ${business.HOURS.full}.`}
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
