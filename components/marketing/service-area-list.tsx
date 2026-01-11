import Link from "next/link";
import { businessConfig } from "@/src/config/business";

export function ServiceAreaList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businessConfig.serviceAreaCities.map((city) => (
        <div
          key={city.slug}
          className="border-2 border-border/60 rounded-xl p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300 bg-card hover:-translate-y-1"
        >
          <h3 className="text-xl font-heading font-semibold mb-2">
            {city.name}, NC
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {city.description}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href={`/mobile-car-detailing-${city.slug}-nc`}
              className="text-primary hover:underline"
            >
              Mobile Car Detailing in {city.name} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
