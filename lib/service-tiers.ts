import {
  servicesConfig,
  maintenancePlans,
  type MaintenanceFrequency,
} from "@/config/services";
import type { ServiceCategory } from "@/config/service-categories";

export interface PriceLine {
  label: string;
  value: string;
}

export interface NormalizedTier {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceLines: PriceLine[];
  frequency?: MaintenanceFrequency;
}

export interface TierGroup {
  /** Set for categories that combine multiple vehicle types (e.g. Maintenance Plans). */
  groupLabel?: string;
  tiers: NormalizedTier[];
}

function formatCurrency(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}

function carLines(sedanPrice: number, suvTruckPrice: number): PriceLine[] {
  return [
    { label: "Sedan", value: formatCurrency(sedanPrice) },
    { label: "SUV/Truck", value: formatCurrency(suvTruckPrice) },
  ];
}

function rvLines(pricePerFoot: number, minimumPrice: number): PriceLine[] {
  return [
    { label: "Starting at", value: `${formatCurrency(pricePerFoot)}/ft` },
    { label: "Minimum", value: formatCurrency(minimumPrice) },
  ];
}

/**
 * Normalizes a service category's underlying config data (which has different
 * shapes for cars/motorcycles/RVs/maintenance plans) into a single tier shape
 * so one card component can render pricing for the packages page, service
 * pages, and combined service+area pages alike.
 */
export function getCategoryTierGroups(category: ServiceCategory): TierGroup[] {
  switch (category.configSource) {
    case "packages": {
      let items = servicesConfig.packages;
      if (category.onlyIds) {
        items = items.filter((p) => category.onlyIds!.includes(p.id));
      }
      if (category.excludeIds) {
        items = items.filter((p) => !category.excludeIds!.includes(p.id));
      }
      return [
        {
          tiers: items.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            features: p.features,
            priceLines: carLines(p.sedanPrice, p.suvTruckPrice),
          })),
        },
      ];
    }
    case "motorcycleServices": {
      return [
        {
          tiers: servicesConfig.motorcycleServices.map((m) => ({
            id: m.id,
            name: m.name,
            description: m.description,
            features: m.features,
            priceLines: [{ label: "Price", value: formatCurrency(m.price) }],
          })),
        },
      ];
    }
    case "camperRvServices": {
      return [
        {
          tiers: servicesConfig.camperRvServices.map((r) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            features: r.features,
            priceLines: rvLines(r.pricePerFoot, r.minimumPrice),
          })),
        },
      ];
    }
    case "maintenancePlans": {
      return [
        {
          groupLabel: "Car & Truck Maintenance Plans",
          tiers: maintenancePlans.car.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            features: p.features,
            priceLines: carLines(p.sedanPrice, p.suvTruckPrice),
            frequency: p.frequency,
          })),
        },
        {
          groupLabel: "Motorcycle Maintenance Plans",
          tiers: maintenancePlans.motorcycle.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            features: p.features,
            priceLines: [{ label: "Price", value: formatCurrency(p.price) }],
            frequency: p.frequency,
          })),
        },
        {
          groupLabel: "Camper & RV Maintenance Plans",
          tiers: maintenancePlans.camperRv.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            features: p.features,
            priceLines: rvLines(p.pricePerFoot, p.minimumPrice),
            frequency: p.frequency,
          })),
        },
      ];
    }
  }
}

/** Lowest displayed price across a tier group, for "starting at $X" copy. */
export function getStartingPrice(groups: TierGroup[]): number {
  const allTiers = groups.flatMap((g) => g.tiers);
  const amounts = allTiers.flatMap((t) =>
    t.priceLines.map((line) => parseFloat(line.value.replace(/[^0-9.]/g, ""))),
  );
  return Math.min(...amounts);
}
