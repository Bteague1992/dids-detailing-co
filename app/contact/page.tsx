import Link from "next/link";
import { Camera, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/site/page-hero";
import { ContactForm } from "@/components/site/contact-form";
import { CheckList } from "@/components/site/package-card";
import { buttonClass } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { business, businessConfig, primaryTownsComma } from "@/config/business";
import { siteConfig } from "@/config/site";
import { getCallHref, getEmailHref, getSmsHref } from "@/lib/cta";
import { cn } from "@/lib/utils";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Contact | Text, Call, or Email Dad | ${siteConfig.title}`,
  description: `Let's get your car clean. Text or call ${business.PHONE}, ${business.HOURS.full}. Mobile detailing in ${primaryTownsComma} & nearby. Texting is fastest.`,
  canonical: "/contact",
});

const methods = [
  {
    icon: MessageCircle,
    title: "Text",
    text: "The fastest way to reach us. Send a text anytime.",
    action: "Text Dad",
    href: getSmsHref(),
    primary: true,
    location: "contact-text",
  },
  {
    icon: Phone,
    title: "Call",
    text: "Rather talk it through? Call during business hours.",
    action: business.PHONE,
    href: getCallHref(),
    primary: false,
    location: "contact-call",
  },
  {
    icon: Mail,
    title: "Email",
    text: "Not in a hurry? Email works too.",
    action: "Email Dad",
    href: getEmailHref(),
    primary: false,
    location: "contact-email",
  },
];

const whatToSend = [
  "What you drive (car, SUV, truck, minivan, bike, or camper)",
  "Anything we should know about: pets, car seats, stains",
  "2–3 photos, so we can give you an exact quote",
  "Your town and a day that works",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        location="contact-hero"
        title="Let's get your car clean."
        sub="Text, call, or email. Texting is fastest, and it's how most folks book."
      />

      <Section tone="warm" title="Three ways to reach Dad">
        <ul className="grid gap-5 md:grid-cols-3">
          {methods.map(({ icon: Icon, title, text, action, href, primary, location }) => (
            <li
              key={title}
              className={cn(
                "flex flex-col items-center rounded-card bg-white p-7 text-center shadow-card",
                primary ? "ring-2 ring-orange" : "ring-1 ring-line",
              )}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-11 w-11 text-orange"
              />
              <h3 className="mt-3 text-2xl">{title}</h3>
              <p className="mt-1 grow text-muted-text">{text}</p>
              <a
                href={href}
                data-cta-location={location}
                className={buttonClass({
                  variant: primary ? "primary" : "secondary",
                  className: "mt-5 w-full",
                })}
              >
                {action}
              </a>
              {title === "Email" && (
                <p className="mt-3 text-sm break-all text-muted-text">
                  {business.EMAIL}
                </p>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" title="What to send us" width="5xl">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line">
            <Camera
              aria-hidden="true"
              strokeWidth={1.75}
              className="h-9 w-9 text-orange"
            />
            <h3 className="mt-3 mb-3 text-xl">For a fast, exact quote</h3>
            <CheckList items={whatToSend} />
          </div>
          <div className="space-y-5">
            <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line">
              <Clock
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-9 w-9 text-orange"
              />
              <h3 className="mt-3 text-xl">Hours</h3>
              <p className="mt-1">{business.HOURS.full}</p>
            </div>
            <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line">
              <MapPin
                aria-hidden="true"
                strokeWidth={1.75}
                className="h-9 w-9 text-orange"
              />
              <h3 className="mt-3 text-xl">Where we go</h3>
              <p className="mt-1">
                {businessConfig.serviceAreaCities.map((c) => c.name).join(" · ")}
              </p>
              <p className="mt-2 text-sm text-muted-text">
                {business.TRAVEL_NOTE}{" "}
                <Link
                  href="/service-areas"
                  className="font-semibold text-charcoal underline decoration-orange decoration-2 underline-offset-4"
                >
                  See service areas
                </Link>
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        tone="warm"
        title="Not a texter? Send a note."
        subtitle="Fill this out and Dad will get back to you."
        width="3xl"
      >
        <div className="rounded-card bg-white p-6 shadow-card ring-1 ring-line sm:p-8">
          <ContactForm />
        </div>
      </Section>
    </>
  );
}
