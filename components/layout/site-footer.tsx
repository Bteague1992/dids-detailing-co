import Link from "next/link";
import { siteConfig } from "@/src/config/site";
import { businessConfig } from "@/src/config/business";
import { getSmsHref } from "@/src/lib/cta";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-border/60 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">
              {siteConfig.title}
            </h3>
            <p className="text-sm text-secondary-foreground/80 mb-4">
              Mobile car detailing in {businessConfig.address.region} and
              surrounding areas.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-secondary-foreground hover:text-primary"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-secondary-foreground hover:text-primary"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-secondary-foreground/80">
                Hours: {siteConfig.hours.full}
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-secondary-foreground">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/packages"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  Packages & Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-secondary-foreground/80 hover:text-secondary-foreground"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Service Area */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4 text-secondary-foreground">
              Service Areas
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="pt-2 border-t border-secondary-foreground/20 mt-2">
                <ul className="space-y-1">
                  {businessConfig.serviceAreaCities.map((city) => (
                    <li key={`seo-${city.slug}`}>
                      <Link
                        href={`/mobile-car-detailing-${city.slug}-nc`}
                        className="text-secondary-foreground/80 hover:text-secondary-foreground text-xs"
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center">
          <p className="text-sm text-secondary-foreground/80 mb-4">
            Ready to book your detail?
          </p>
          <Button asChild size="lg">
            <a
              href={getSmsHref()}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
            >
              Text to Book
            </a>
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-secondary-foreground/20 text-center text-sm text-secondary-foreground/80">
          <p>
            © {currentYear} {siteConfig.title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
