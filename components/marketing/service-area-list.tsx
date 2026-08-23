import Link from "next/link";
import { businessConfig } from "@/config/business";

export function ServiceAreaList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {businessConfig.serviceAreaCities.map((city, idx) => (
        <div
          key={city.slug}
          className="reveal rounded-xl border border-border/60 bg-card p-6 hover:shadow-lg hover:shadow-primary/10 hover:border-primary/40 hover:-translate-y-1"
          style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
        >
          <h3 className="text-xl font-heading font-semibold mb-2">
            {city.name}, NC
          </h3>
          <p className="text-muted-foreground text-sm mb-4">
            {city.description}
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href={`/mobile-car-detailing/${city.slug}/nc`}
              className="text-primary hover:underline"
            >
              Mobile Car Detailing in {city.name} →
            </Link>
            <Link
              href={`/mobile-motorcycle-detailing/${city.slug}/nc`}
              className="text-primary hover:underline"
            >
              Mobile Motorcycle Detailing in {city.name} →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
