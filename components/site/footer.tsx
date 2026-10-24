import Link from "next/link";
import { CalendarDays, Clock, MessageCircle, Phone } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { business, businessConfig } from "@/config/business";
import { getBookingHref, getCallHref, getSmsHref } from "@/lib/cta";

// Only pages that exist. No Terms or Gift Cards yet.
const footerLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/dads-club", label: "Dad's Club" },
  { href: "/car-detailing", label: "Car Detailing" },
  { href: "/motorcycle-detailing", label: "Motorcycles" },
  { href: "/rv-detailing", label: "RVs & Campers" },
  { href: "/services", label: "Services" },
  { href: "/service-areas", label: "Service Areas" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/faq", label: "FAQ" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const linkClass = "underline-offset-4 hover:text-orange hover:underline";

export function Footer() {
  const cities = businessConfig.serviceAreaCities;
  const bookingHref = getBookingHref();
  return (
    <footer className="on-dark pb-sticky-bar bg-charcoal text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[auto_1fr] md:items-center md:gap-14">
          <Link href="/" aria-label="Dad's Mobile Detailing Co. home" className="justify-self-center md:justify-self-start">
            <Logo variant="light" sizes="220px" className="h-[68px]" />
          </Link>

          <div className="text-center md:border-l md:border-white/20 md:pl-14 md:text-left">
            <p className="text-white/90">
              Serving{" "}
              {cities.map((city, i) => (
                <span key={city.slug}>
                  <Link
                    href={`/mobile-car-detailing/${city.slug}/nc`}
                    className={linkClass}
                  >
                    {city.name}
                  </Link>
                  {i < cities.length - 1 && (
                    <span aria-hidden="true"> · </span>
                  )}
                </span>
              ))}
            </p>

            <ul className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 md:justify-start">
              {bookingHref && (
                <li>
                  <Link href={bookingHref} className={`inline-flex items-center gap-2 font-semibold ${linkClass}`} data-cta-location="footer-book">
                    <CalendarDays aria-hidden="true" className="h-5 w-5 text-orange" />
                    Book Now
                  </Link>
                </li>
              )}
              <li>
                <a href={getCallHref()} className={`inline-flex items-center gap-2 font-semibold ${linkClass}`} data-cta-location="footer-call">
                  <Phone aria-hidden="true" className="h-5 w-5 text-orange" />
                  {business.PHONE}
                </a>
              </li>
              <li>
                <a href={getSmsHref()} className={`inline-flex items-center gap-2 font-semibold ${linkClass}`} data-cta-location="footer-text">
                  <MessageCircle aria-hidden="true" className="h-5 w-5 text-orange" />
                  {bookingHref ? "Text Dad" : "Text to Book"}
                </a>
              </li>
              <li className="inline-flex items-center gap-2">
                <Clock aria-hidden="true" className="h-5 w-5 text-orange" />
                {business.HOURS.full}
              </li>
            </ul>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-10 border-t border-white/20 pt-6">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-[0.95rem] text-white/90">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={linkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-6 text-center text-sm text-white/75">
          © {new Date().getFullYear()} {business.NAME} · Built by{" "}
          <a
            href="https://www.getbuiltdifferent.co"
            target="_blank"
            rel="noopener noreferrer"
            className={`underline ${linkClass}`}
          >
            Built Different Labs
          </a>
        </p>
      </div>
    </footer>
  );
}
