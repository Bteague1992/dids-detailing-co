export interface ServicePackage {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  sedanPrice: number;
  suvTruckPrice: number;
}

export interface LaunchOffer {
  active: boolean;
  title: string;
  description: string;
  packageId: string; // ID of the package this applies to
  sedanPrice: number;
  suvTruckPrice: number;
}

export const servicesConfig = {
  packages: [
    {
      id: "basic-exterior",
      name: "Basic Exterior",
      slug: "basic-exterior",
      description:
        "A thorough exterior wash to get your vehicle looking clean and fresh.",
      features: [
        "Foam bath + hand wash",
        "Wheels + tires",
        "Towel dry",
        "Tire shine",
        "Exterior glass cleaned",
      ],
      sedanPrice: 70,
      suvTruckPrice: 90,
    },
    {
      id: "basic-interior",
      name: "Basic Interior",
      slug: "basic-interior",
      description:
        "Complete interior cleaning to make your car's inside feel fresh and tidy.",
      features: [
        "Full interior vacuum (seats, floors, mats)",
        "Wipe down plastics, dash, console, door panels",
        "Interior glass cleaned",
        "Light spot wipe on seats (no deep extraction)",
      ],
      sedanPrice: 80,
      suvTruckPrice: 100,
    },
    {
      id: "full-detail",
      name: "Full Detail",
      slug: "full-detail",
      description:
        "Complete interior and exterior detail for a showroom-ready finish.",
      features: [
        "Everything in Basic Exterior",
        "Everything in Basic Interior",
        "Extra attention to crevices & touchpoints",
      ],
      sedanPrice: 130,
      suvTruckPrice: 160,
    },
  ] as ServicePackage[],
  launchOffer: {
    active: true,
    title: "Spring Launch Special — Book Before May 1st",
    description:
      "Get a Full Detail at our launch price while the offer lasts. Limited time only.",
    packageId: "full-detail",
    sedanPrice: 100,
    suvTruckPrice: 130,
  } as LaunchOffer,
} as const;
