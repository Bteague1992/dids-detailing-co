export interface MotorcycleService {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  price: number;
}

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
  motorcycleServices: [
    {
      id: "motorcycle-basic-wash",
      name: "Motorcycle Basic Wash",
      slug: "motorcycle-basic-wash",
      description:
        "A thorough hand wash to keep your bike looking clean and road-ready.",
      features: [
        "Foam bath + hand wash",
        "Wheels + tires cleaned",
        "Towel dry",
        "Tire shine",
        "Exterior surfaces wiped down",
      ],
      price: 65,
    },
    {
      id: "motorcycle-full-detail",
      name: "Motorcycle Full Detail",
      slug: "motorcycle-full-detail",
      description: "A complete detail to make your bike look showroom-ready.",
      features: [
        "Everything in Basic Wash",
        "Chrome polished",
        "Engine bay wipe down",
        "Crevices and spokes detailed",
        "Brake calipers cleaned",
        "Seat cleaned and conditioned",
        "UV protectant on plastics and trim",
      ],
      price: 120,
    },
  ] as MotorcycleService[],
} as const;

export const startingCarPrice = servicesConfig.packages.find(
  (p) => p.id === "basic-exterior",
)!.sedanPrice;

export const motorcycleBasicWashPrice = servicesConfig.motorcycleServices.find(
  (m) => m.id === "motorcycle-basic-wash",
)!.price;

export const motorcycleFullDetailPrice = servicesConfig.motorcycleServices.find(
  (m) => m.id === "motorcycle-full-detail",
)!.price;
