import { PackageCard } from "./package-card";
import { servicesConfig } from "@/src/config/services";

export function PackagesGrid() {
  const launchOffer = servicesConfig.launchOffer;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servicesConfig.packages.map((pkg) => (
        <PackageCard key={pkg.id} package={pkg} />
      ))}
    </div>
  );
}
