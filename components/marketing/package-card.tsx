import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { servicesConfig } from "@/src/config/services";
import type { ServicePackage } from "@/src/config/services";
import { Check } from "lucide-react";

interface PackageCardProps {
  package: ServicePackage;
  showLaunchBadge?: boolean;
}

export function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div className="border-2 border-border/60 rounded-xl p-6 bg-card shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-heading font-bold">{pkg.name}</h3>
        </div>
        <p className="text-muted-foreground mb-6">{pkg.description}</p>

        <div className="mb-6 space-y-2">
          {pkg.features.map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="border-t-2 border-muted pt-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Sedan:</span>
            <span className="text-2xl font-heading font-bold">
              ${pkg.sedanPrice}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">SUV/Truck:</span>
            <span className="text-2xl font-heading font-bold">
              ${pkg.suvTruckPrice}
            </span>
          </div>
        </div>

        <Button asChild className="w-full">
          <a
            href={getSmsHref({
              packageName: pkg.name,
            })}
            aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a ${pkg.name}`}
          >
            Text to Book
          </a>
        </Button>
      </div>
    </div>
  );
}
