// Single source of truth for every service, package, price, add-on, plan, and
// pricing policy on the site. Pages and components read from here (mostly via
// lib/service-tiers.ts) — change a price or name in this file and it updates
// everywhere, including meta descriptions, FAQs, and prefilled text messages.

type MaintenanceFrequency = "biweekly" | "monthly" | "quarterly";

export type VehicleSizeId = "car" | "suvTruck" | "large";

export interface VehicleSize {
  id: VehicleSizeId;
  label: string;
  /** Compact label for the size toggle and table headings. */
  shortLabel: string;
}

/** Display order matters — pricing rows render in this order. */
export const vehicleSizes: VehicleSize[] = [
  { id: "car", label: "Car", shortLabel: "Car" },
  { id: "suvTruck", label: "SUV / Truck", shortLabel: "SUV/Truck" },
  {
    id: "large",
    label: "3-Row SUV, Minivan, or Large Truck",
    shortLabel: "3-Row/Minivan/Large Truck",
  },
];

export type SizePrices = Record<VehicleSizeId, number>;

export interface MotorcycleService {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  features: string[];
  /** Shown on the card and reused in FAQ answers, e.g. "about 1 hour". */
  duration: string;
  prices: SizePrices;
  mostPopular?: boolean;
}

export interface CamperRvService {
  id: string;
  name: string;
  description: string;
  features: string[];
  pricePerFoot: number;
  minimumPrice: number;
}

export interface CarMaintenancePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  /** Per-visit prices. */
  prices: SizePrices;
}

export interface MotorcycleMaintenancePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  price: number;
}

export interface CamperRvMaintenancePlan {
  id: string;
  name: string;
  description: string;
  features: string[];
  frequency: MaintenanceFrequency;
  pricePerFoot: number;
  minimumPrice: number;
}

export interface AddOn {
  id: string;
  name: string;
  /** Display-ready price, e.g. "$60" or "Light $40 / Heavy $75". */
  price: string;
  /** Lowest price in `price`, for "from $X" copy. Keep the two in sync. */
  fromPrice: number;
}

export const servicesConfig = {
  packages: [
    {
      id: "exterior-refresh",
      name: "Exterior Refresh",
      description: "A thorough hand wash to get your ride looking fresh again.",
      features: [
        "Hand wash and dry",
        "Wheels and tires cleaned",
        "Tire shine",
        "Door jambs wiped",
        "Exterior windows",
      ],
      duration: "about 1 hour",
      prices: { car: 75, suvTruck: 90, large: 110 },
    },
    {
      id: "interior-reset",
      name: "Interior Reset",
      description: "Every crumb, every cupholder, every vent.",
      features: [
        "Air-blast and full vacuum (seats, carpets, mats, trunk)",
        "All hard surfaces wiped and cleaned",
        "Vents and cupholders detailed",
        "Interior windows and mirrors",
        "Floor mats cleaned",
      ],
      duration: "about 2 hours",
      prices: { car: 110, suvTruck: 135, large: 160 },
    },
    {
      id: "full-dad-treatment",
      name: "The Full Dad Treatment",
      description: "Inside and out, done right. Our most popular for a reason.",
      features: [
        "Everything in the Exterior Refresh",
        "Everything in the Interior Reset",
      ],
      duration: "about 3 hours",
      prices: { car: 150, suvTruck: 175, large: 200 },
      mostPopular: true,
    },
    {
      id: "family-reset",
      name: "The Family Reset",
      description:
        "Our deepest clean, for the cars that have been through it all.",
      features: [
        "Everything in The Full Dad Treatment",
        "Ceramic spray sealant (about 6 months of protection)",
        "Full seat and carpet shampoo/extraction",
        "Cupholders and vents steam-cleaned",
        "Odor neutralizing",
      ],
      duration: "4–5 hours",
      prices: { car: 300, suvTruck: 350, large: 400 },
    },
  ] as ServicePackage[],
  motorcycleServices: [
    {
      id: "bike-wash-shine",
      name: "Bike Wash & Shine",
      description: "A thorough hand wash to keep your bike road-ready.",
      features: [
        "Hand wash and dry",
        "Wheels and tires",
        "Chrome and metal wiped down",
        "Tire shine",
        "Windshield cleaned",
      ],
      price: 85,
    },
    {
      id: "bike-full-detail",
      name: "Bike Full Detail",
      description: "The full treatment, chrome polish and all.",
      features: [
        "Everything in Bike Wash & Shine",
        "Chrome polish",
        "Paint protection",
        "Seat and leather cleaned and conditioned",
        "Crevices and engine surfaces detailed",
      ],
      price: 160,
    },
  ] as MotorcycleService[],
  camperRvServices: [
    {
      id: "rv-exterior",
      name: "Exterior",
      description: "A top-to-bottom hand wash to knock off the road grime.",
      features: [
        "Roof rinse",
        "Full exterior hand wash and dry",
        "Wheels and tires cleaned",
        "Tire shine",
        "Exterior windows",
      ],
      pricePerFoot: 9,
      minimumPrice: 175,
    },
    {
      id: "rv-interior",
      name: "Interior",
      description: "Fresh and tidy inside, ready for the next trip.",
      features: [
        "Full vacuum (cab, living area, sleeping area)",
        "Surfaces, cabinets, and counters wiped down",
        "Interior windows and mirrors",
        "Light spot cleaning on upholstery",
      ],
      pricePerFoot: 8,
      minimumPrice: 150,
    },
    {
      id: "rv-full-detail",
      name: "Full Detail",
      description: "Inside and out, so the rig's ready to roll.",
      features: [
        "Everything in the Exterior",
        "Everything in the Interior",
        "Extra attention to seams and awning tracks",
      ],
      pricePerFoot: 15,
      minimumPrice: 300,
    },
    {
      id: "rv-premium-full-detail",
      name: "Premium Full Detail",
      description:
        "Our deepest RV clean, with extra protection for the outside.",
      features: [
        "Everything in the Full Detail",
        "Machine-applied wax/sealant",
        "Light oxidation treatment",
        "Slide-out and awning seals conditioned",
        "Deep interior shampoo/extraction",
        "Odor neutralizing",
        "Tire dressing",
      ],
      pricePerFoot: 22,
      minimumPrice: 400,
    },
  ] as CamperRvService[],
} as const;

/** Shown in its own section on the packages page. */
export const addOnsConfig = {
  intro:
    "Car need a little extra love? We'll always tell you the price before we start.",
  items: [
    {
      id: "pet-hair",
      name: "Pet hair removal",
      price: "Light $40 / Heavy $75",
      fromPrice: 40,
    },
    {
      id: "seat-carpet-shampoo",
      name: "Seat & carpet shampoo",
      price: "$75 car / $100 SUV and larger",
      fromPrice: 75,
    },
    {
      id: "child-car-seat",
      name: "Child car seat deep clean",
      price: "$35 each",
      fromPrice: 35,
    },
    {
      id: "spot-stain",
      name: "Spot stain extraction",
      price: "From $25",
      fromPrice: 25,
    },
    {
      id: "odor-treatment",
      name: "Odor treatment (smoke, vomit, spoiled milk)",
      price: "$60",
      fromPrice: 60,
    },
    {
      id: "heavy-mess",
      name: "Heavy mess fee (sand, mud, buried crumbs)",
      price: "$50",
      fromPrice: 50,
    },
    {
      id: "leather",
      name: "Leather clean & condition",
      price: "$40",
      fromPrice: 40,
    },
    {
      id: "headlights",
      name: "Headlight restoration",
      price: "$75",
      fromPrice: 75,
    },
    {
      id: "engine-bay",
      name: "Engine bay detail",
      price: "$50",
      fromPrice: 50,
    },
    {
      id: "ceramic-sealant",
      name: "Ceramic spray sealant (about 6 months)",
      price: "$40 car / $50 SUV and larger",
      fromPrice: 40,
    },
    {
      id: "paint-polish",
      name: "One-step paint polish",
      price: "+$200 car / +$250 SUV and larger",
      fromPrice: 200,
    },
  ] as AddOn[],
} as const;

/** Shown near pricing on the packages page (payment and cancellation terms
 * are added there from BOOKING_TERMS in config/business.ts). */
export const pricingPolicies: string[] = [
  "Second vehicle, same day: 10% off",
  "Travel: free in our home area; small $20 trip fee for some outer areas on jobs under $200",
  "Prices shown are starting prices. If your vehicle needs add-ons, we'll quote the exact price before we start. No surprises.",
];

/** Short version of the starting-price policy, shown on car package cards. */
export const startingPriceNote =
  "Starting prices. If your vehicle needs add-ons, we'll quote them before we start.";

/** The package every new Dad's Club member starts with (The Full Dad Treatment). */
export const dadsClubStarterPackage = servicesConfig.packages.find(
  (p) => p.id === "full-dad-treatment",
)!;

/** Dad's Club — the recurring plans (formerly "Maintenance Plans"). */
export const dadsClubConfig = {
  name: "Dad's Club",
  intro:
    "Never deal with a dirty car again. We'll keep it clean on a schedule, so you don't have to think about it. No contracts, cancel anytime.",
  requirement: `Starts with ${dadsClubStarterPackage.name} (from ${formatPrice(getFromPrice(dadsClubStarterPackage.prices))}), so we're always maintaining a clean car.`,
  includedEachVisit: [
    "Exterior hand wash",
    "Quick interior vacuum",
    "Wipe-down of surfaces",
    "Interior and exterior windows",
  ],
} as const;

export const maintenancePlans = {
  car: [
    {
      id: "dads-club-biweekly",
      name: "Dad's Club: Every 2 Weeks",
      description:
        "We swing by every two weeks, so the mess never gets a head start.",
      features: [...dadsClubConfig.includedEachVisit],
      frequency: "biweekly",
      prices: { car: 80, suvTruck: 90, large: 100 },
    },
    {
      id: "dads-club-monthly",
      name: "Dad's Club: Monthly",
      description: "A once-a-month visit to keep things fresh.",
      features: [...dadsClubConfig.includedEachVisit],
      frequency: "monthly",
      prices: { car: 95, suvTruck: 110, large: 125 },
    },
  ] as CarMaintenancePlan[],
  motorcycle: [
    {
      id: "motorcycle-maintenance-monthly",
      name: "Monthly Bike Wash",
      description: "A monthly wash to keep your bike road-ready all season.",
      features: ["Everything in Bike Wash & Shine", "No contracts, cancel anytime"],
      frequency: "monthly",
      price: 68,
    },
  ] as MotorcycleMaintenancePlan[],
  camperRv: [
    {
      id: "rv-maintenance-monthly",
      name: "Monthly RV Wash",
      description:
        "A monthly exterior wash to keep pollen, dust, and buildup off your rig between trips.",
      features: ["Everything in the RV Exterior", "No contracts, cancel anytime"],
      frequency: "monthly",
      pricePerFoot: 7.5,
      minimumPrice: 140,
    },
    {
      id: "rv-maintenance-quarterly",
      name: "Quarterly RV Wash",
      description:
        "A seasonal exterior wash to look after your rig between storage stretches.",
      features: ["Everything in the RV Exterior", "No contracts, cancel anytime"],
      frequency: "quarterly",
      pricePerFoot: 8,
      minimumPrice: 150,
    },
  ] as CamperRvMaintenancePlan[],
} as const;

// ---------------------------------------------------------------------------
// Derived values — used in page copy, meta tags, and FAQ answers so none of
// them hardcode a package name, price, or duration.
// ---------------------------------------------------------------------------

/** Lowest price across all vehicle sizes — the "From $X" number. */
export function getFromPrice(prices: SizePrices): number {
  return Math.min(...vehicleSizes.map((size) => prices[size.id]));
}

function joinList(parts: string[]): string {
  if (parts.length <= 2) return parts.join(" and ");
  return `${parts.slice(0, -1).join(", ")}, and ${parts[parts.length - 1]}`;
}

const carPackages = servicesConfig.packages;

/** The entry-level car package (Exterior Refresh) — drives "starting at $X" copy. */
const entryCarPackage = carPackages[0];

export const startingCarPrice = getFromPrice(entryCarPackage.prices);

/** e.g. "Exterior Refresh, Interior Reset, The Full Dad Treatment, and The Family Reset" */
export const carPackageNameList = joinList(carPackages.map((p) => p.name));

/** e.g. "Exterior Refresh takes about 1 hour, Interior Reset takes about 2 hours, …" */
export const carDurationSummary = `${joinList(
  carPackages.map((p) => `${p.name} takes ${p.duration}`),
)}.`;

/** e.g. "Exterior Refresh starts at $75, Interior Reset starts at $110, …" */
export const carPriceSummary = `${joinList(
  carPackages.map((p) => `${p.name} starts at $${getFromPrice(p.prices)}`),
)}.`;

export const bikeWash = servicesConfig.motorcycleServices[0];
export const bikeFullDetail = servicesConfig.motorcycleServices[1];

/** e.g. "Bike Wash & Shine is $85 and Bike Full Detail is $160." */
export const motorcyclePriceSummary = `${bikeWash.name} is $${bikeWash.price} and ${bikeFullDetail.name} is $${bikeFullDetail.price}.`;

/** The size the toggle starts on. */
export const defaultVehicleSize: VehicleSizeId = "suvTruck";

/** Lowest per-foot RV rate and its minimum, for "from $X/ft" copy. */
export const rvFromRate = Math.min(
  ...servicesConfig.camperRvServices.map((r) => r.pricePerFoot),
);

/** Lowest Dad's Club car price per visit. */
export const dadsClubFromPrice = Math.min(
  ...maintenancePlans.car.map((p) => getFromPrice(p.prices)),
);

/** Lowest add-on price, for "Add-ons from $X" copy. */
export const addOnFromPrice = Math.min(
  ...addOnsConfig.items.map((a) => a.fromPrice),
);

export function formatPrice(amount: number): string {
  return Number.isInteger(amount) ? `$${amount}` : `$${amount.toFixed(2)}`;
}
