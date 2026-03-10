import Link from "next/link";
import { PackageCard } from "./package-card";
import { servicesConfig } from "@/src/config/services";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export function PackagesGrid() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesConfig.packages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>

      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-heading font-bold mb-2">
            Motorcycle Detailing
          </h2>
          <p className="text-muted-foreground">
            Professional mobile detailing for your bike — we come to you.{" "}
            <Link
              href="/motorcycle-detailing"
              className="text-primary hover:underline"
            >
              See all service cities →
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesConfig.motorcycleServices.map((service) => (
            <div
              key={service.id}
              className="border-2 border-border/60 rounded-xl p-6 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-heading font-bold mb-4">
                  {service.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <div className="mb-6 space-y-2">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="border-t-2 border-muted pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Price:
                    </span>
                    <span className="text-2xl font-heading font-bold">
                      ${service.price}
                    </span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <a
                    href={getSmsHref({ packageName: service.name })}
                    aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a ${service.name}`}
                  >
                    Text to Book
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
