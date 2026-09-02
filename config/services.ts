export type MaintenanceFrequency =
  | "weekly"
  | "biweekly"
  | "monthly"
  | "quarterly";

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

export interface CamperRvService {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  pricePerFoot: number;
  minimumPrice: number;
}

export interface CarMaintenancePlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  sedanPrice: number;
  suvTruckPrice: number;
}

export interface MotorcycleMaintenancePlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  price: number;
}

export interface CamperRvMaintenancePlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  pricePerFoot: number;
  minimumPrice: number;
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
      id: "basic-full-detail",
      name: "Basic Full Detail",
      slug: "basic-full-detail",
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
    // {
    //   id: "premium-full-detail",
    //   name: "Premium Full Detail",
    //   slug: "premium-full-detail",
    //   description:
    //     "Our top-tier detail — deep paint decontamination and protection paired with a full interior extraction for a true showroom finish.",
    //   features: [
    //     "Everything in Basic Full Detail",
    //     "Clay bar paint decontamination",
    //     "Machine-applied wax/sealant (3–6 month protection)",
    //     "Full carpet & upholstery shampoo/extraction",
    //     "Leather/vinyl conditioning",
    //     "Engine bay detail",
    //     "Headlight restoration",
    //     "Odor elimination treatment",
    //   ],
    //   sedanPrice: 200,
    //   suvTruckPrice: 240,
    // },
  ] as ServicePackage[],
  motorcycleServices: [
    {
      id: "motorcycle-basic",
      name: "Basic",
      slug: "motorcycle-basic",
      description:
        "A thorough hand wash to keep your bike looking clean and road-ready.",
      features: [
        "Foam bath + hand wash",
        "Wheels + tires cleaned",
        "Towel dry",
        "Tire shine",
        "Exterior surfaces wiped down",
      ],
      price: 80,
    },
    {
      id: "motorcycle-premium",
      name: "Premium",
      slug: "motorcycle-premium",
      description: "A complete detail to make your bike look showroom-ready.",
      features: [
        "Everything in Basic",
        "Chrome polished",
        "Engine bay wipe down",
        "Crevices and spokes detailed",
        "Brake calipers cleaned",
        "Seat cleaned and conditioned",
        "UV protectant on plastics and trim",
      ],
      price: 135,
    },
  ] as MotorcycleService[],
  camperRvServices: [
    {
      id: "rv-basic-exterior",
      name: "Basic Exterior",
      slug: "rv-basic-exterior",
      description:
        "A thorough top-to-bottom hand wash to knock off road grime and keep your rig road-ready.",
      features: [
        "Roof rinse",
        "Full exterior hand wash",
        "Wheels + tires cleaned",
        "Tire shine",
        "Exterior glass cleaned",
      ],
      pricePerFoot: 9,
      minimumPrice: 175,
    },
    {
      id: "rv-basic-interior",
      name: "Basic Interior",
      slug: "rv-basic-interior",
      description:
        "Interior cleaning to keep the inside of your rig fresh and tidy.",
      features: [
        "Full vacuum (cab, living area, sleeping area)",
        "Wipe down all surfaces, cabinets & counters",
        "Interior glass cleaned",
        "Light spot cleaning on upholstery",
      ],
      pricePerFoot: 8,
      minimumPrice: 150,
    },
    {
      id: "rv-basic-full-detail",
      name: "Basic Full Detail",
      slug: "rv-basic-full-detail",
      description:
        "Complete interior and exterior detail for a rig that looks and feels road-trip ready.",
      features: [
        "Everything in Basic Exterior",
        "Everything in Basic Interior",
        "Extra attention to seams & awning tracks",
      ],
      pricePerFoot: 15,
      minimumPrice: 300,
    },
    {
      id: "rv-premium-full-detail",
      name: "Premium Full Detail",
      slug: "rv-premium-full-detail",
      description:
        "Our top-tier RV detail — deep exterior protection paired with a full interior refresh.",
      features: [
        "Everything in Basic Full Detail",
        "Machine-applied wax/sealant",
        "Light oxidation treatment",
        "Slide-out & awning seals conditioned",
        "Deep interior shampoo/extraction",
        "Odor elimination treatment",
        "Tire dressing",
      ],
      pricePerFoot: 22,
      minimumPrice: 400,
    },
  ] as CamperRvService[],
} as const;

export const maintenancePlans = {
  car: [
    {
      id: "car-maintenance-weekly",
      name: "Weekly Maintenance Wash",
      slug: "car-maintenance-weekly",
      description:
        "Keep your car consistently clean with a weekly exterior maintenance wash — our best rate for our most frequent customers.",
      features: [
        "Quick exterior maintenance wash",
        "No contract — cancel anytime",
        "Priority scheduling",
      ],
      frequency: "weekly",
      sedanPrice: 44,
      suvTruckPrice: 56,
    },
    {
      id: "car-maintenance-biweekly",
      name: "Biweekly Maintenance Wash",
      slug: "car-maintenance-biweekly",
      description:
        "An exterior maintenance wash every two weeks to keep your car looking fresh between full details.",
      features: [
        "Quick exterior maintenance wash",
        "No contract — cancel anytime",
      ],
      frequency: "biweekly",
      sedanPrice: 47,
      suvTruckPrice: 60,
    },
    {
      id: "car-maintenance-monthly",
      name: "Monthly Maintenance Wash",
      slug: "car-maintenance-monthly",
      description:
        "A monthly exterior maintenance wash to maintain your car's shine year-round.",
      features: [
        "Quick exterior maintenance wash",
        "No contract — cancel anytime",
      ],
      frequency: "monthly",
      sedanPrice: 50,
      suvTruckPrice: 63,
    },
  ] as CarMaintenancePlan[],
  motorcycle: [
    {
      id: "motorcycle-maintenance-monthly",
      name: "Monthly Maintenance Wash",
      slug: "motorcycle-maintenance-monthly",
      description: "A monthly wash to keep your bike road-ready all season.",
      features: ["Everything in Basic", "No contract — cancel anytime"],
      frequency: "monthly",
      price: 68,
    },
  ] as MotorcycleMaintenancePlan[],
  camperRv: [
    {
      id: "rv-maintenance-monthly",
      name: "Monthly Maintenance Wash",
      slug: "rv-maintenance-monthly",
      description:
        "A monthly exterior wash to protect your rig from pollen, dust, and buildup between trips.",
      features: [
        "Everything in Basic Exterior",
        "No contract — cancel anytime",
      ],
      frequency: "monthly",
      pricePerFoot: 7.5,
      minimumPrice: 140,
    },
    {
      id: "rv-maintenance-quarterly",
      name: "Quarterly Maintenance Wash",
      slug: "rv-maintenance-quarterly",
      description:
        "A seasonal exterior wash to keep your rig protected between storage periods.",
      features: [
        "Everything in Basic Exterior",
        "No contract — cancel anytime",
      ],
      frequency: "quarterly",
      pricePerFoot: 8,
      minimumPrice: 150,
    },
  ] as CamperRvMaintenancePlan[],
} as const;

export const startingCarPrice = servicesConfig.packages.find(
  (p) => p.id === "basic-exterior",
)!.sedanPrice;

export const motorcycleBasicWashPrice = servicesConfig.motorcycleServices.find(
  (m) => m.id === "motorcycle-basic",
)!.price;

export const motorcycleFullDetailPrice = servicesConfig.motorcycleServices.find(
  (m) => m.id === "motorcycle-premium",
)!.price;
