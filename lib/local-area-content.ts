// Hand-written, per-city copy for the /service-areas/[citySlug] and
// /service-areas/[citySlug]/[serviceSlug] pages. Deliberately NOT a single
// string-interpolated template — each entry is a distinct paragraph with its
// own structure, so these pages don't read as the same template with the
// city name swapped (a pattern search engines can flag as thin/doorway
// content). Facts used (county, county seat) are verified public record, not
// fabricated landmarks — see the county note on each entry.
//
// County facts, verified 2026-08:
//   Hickory       — primarily Catawba County (not the county seat; also
//                   touches Burke/Caldwell at the edges)
//   Newton        — Catawba County, county seat
//   Conover       — Catawba County
//   Granite Falls — Caldwell County
//   Morganton     — Burke County, county seat
//   Valdese       — Burke County
//   Lenoir        — Caldwell County, county seat
//   Long View     — straddles Burke and Catawba counties

export const cityHubIntros: Record<string, string> = {
  hickory:
    "As our home base, Hickory gets fast turnaround and priority scheduling. We bring every service we offer — car, motorcycle, camper, and RV detailing, plus recurring maintenance plans — straight to your driveway or workplace anywhere in the Catawba County area, with no drop-off required.",
  morganton:
    "Morganton is the Burke County seat, and we make the drive out regularly to detail cars, motorcycles, campers, and RVs right where they're parked. Whether you're at home or the office, we bring everything needed and never ask you to drop off your vehicle.",
  lenoir:
    "Out in Lenoir, the Caldwell County seat, we handle everything from a quick exterior wash to a full RV detail — all without you having to leave your driveway. Text us your address and we'll coordinate a time that works.",
  newton:
    "Newton sits right next to our Hickory home base in Catawba County, so scheduling here is easy and turnaround is quick. We detail cars, trucks, SUVs, motorcycles, campers, and RVs, and offer recurring maintenance plans for anyone who wants a consistently clean vehicle without lifting a finger.",
  valdese:
    "We travel out to Valdese in Burke County for everything from a single detail to an ongoing maintenance plan. No need to drive into Morganton or Hickory — we bring the full lineup of services to you.",
  conover:
    "Conover, just outside Hickory in Catawba County, is one of our most frequent stops. From a standard car detail to camper and RV work, we bring the whole shop to your location and handle it all on-site.",
  "granite-falls":
    "Granite Falls sits in Caldwell County, and we serve it regularly for car, motorcycle, camper, and RV detailing. Whether it's a one-time detail or a recurring maintenance plan, we come to you — no drop-off, no waiting room.",
  "long-view":
    "Long View sits along the Burke–Catawba county line right next to Hickory, and gets the same full lineup of services we offer everywhere else — cars, motorcycles, campers, RVs, and recurring maintenance plans — delivered right to your driveway or workplace.",
};

export const camperRvCityIntros: Record<string, string> = {
  hickory:
    "Whether you're parked at home in Hickory or storing your RV nearby, we bring full camper and RV detailing straight to you — no need to tow it anywhere. Pricing is based on the length of your rig, so a bigger rig just means a different number, not a different process.",
  morganton:
    "RVs and campers take up space Morganton driveways don't always have room to spare, so we come to wherever yours is parked — home, a storage lot, or a nearby campground. Pricing scales with the length of your rig.",
  lenoir:
    "Lenoir RV owners don't have to find a place to tow their rig for a wash — we handle campers and RVs of any length right at your home or storage location, with pricing based on how long your rig is.",
  newton:
    "From pop-up campers to full Class A motorhomes, we detail RVs and campers throughout Newton without you ever needing to move them. Length determines the price, and we'll give you a straight number before we start.",
  valdese:
    "If your camper or RV lives in Valdese, we'll come detail it wherever it's parked — home, storage, or a nearby lot — with pricing scaled to the length of your rig, no surprises.",
  conover:
    "Conover RV and camper owners get the same full-length detail we offer everywhere: roof rinse, exterior wash, and interior cleaning, all done on-site with pricing based on your rig's length.",
  "granite-falls":
    "We bring RV and camper detailing to Granite Falls without requiring you to tow anything anywhere — we come to your driveway, storage unit, or campground, and price by the length of the rig.",
  "long-view":
    "Long View campers and RVs get top-to-bottom detailing without ever leaving where they're parked. We price by length, so you know what to expect before we start the job.",
};

export const maintenancePlanCityIntros: Record<string, string> = {
  hickory:
    "As locals, we run our Hickory maintenance routes the most often, so weekly and biweekly plans here get the tightest, most reliable scheduling. No contract — pause or cancel any time.",
  morganton:
    "Our Morganton maintenance customers get a recurring exterior wash on whatever schedule fits — weekly, biweekly, or monthly — without ever signing a contract. Cancel or pause whenever you need to.",
  lenoir:
    "For Lenoir residents who'd rather not think about washing their car, our maintenance plans handle it on a set schedule — no contract, no hassle, just a consistently clean vehicle.",
  newton:
    "Newton is close enough to our home base that keeping a regular maintenance schedule here is easy — pick weekly, biweekly, or monthly, and we'll show up on schedule with no contract required.",
  valdese:
    "Valdese customers on a maintenance plan get the same reliable, no-contract scheduling we offer everywhere — set a frequency that works for you and we'll handle the rest.",
  conover:
    "Conover maintenance plan customers can set it and forget it — choose your frequency, and we'll keep your vehicle looking clean on a recurring basis with no long-term commitment.",
  "granite-falls":
    "In Granite Falls, our maintenance plans keep your vehicle consistently clean between full details, on whatever schedule works for you — with no contract standing in the way if your needs change.",
  "long-view":
    "Straddling the Burke–Catawba county line, Long View residents on a maintenance plan never have to remember to book a wash — we handle it on a recurring schedule, and you can adjust or cancel any time.",
};

export interface CategoryFaq {
  question: string;
  answer: string;
}

export function getCityHubFaqs(cityName: string): CategoryFaq[] {
  return [
    {
      question: `Do you really come to me in ${cityName}?`,
      answer: `Yes — every service we offer is mobile. We bring the equipment to your home or workplace in ${cityName} and detail your vehicle on-site. There's no drop-off and no waiting room.`,
    },
    {
      question: "How do I book a detail?",
      answer:
        "Text us your vehicle type, the service you're interested in, and your location. We'll coordinate a time that works for you — no forms, no hassle.",
    },
    {
      question: "Do I need to provide water or power?",
      answer:
        "Yes, we need access to a water hookup and power outlet at your location. Most driveways, workplaces, and storage lots work fine.",
    },
  ];
}

export const camperRvFaqs: CategoryFaq[] = [
  {
    question: "Do you detail Class A, B, and C motorhomes?",
    answer:
      "Yes — we detail campers, travel trailers, and Class A, B, and C motorhomes of any length. Pricing is based on the length of your rig.",
  },
  {
    question: "How is RV/camper pricing calculated?",
    answer:
      "Pricing is per foot of length, with a minimum charge per package. Text us your rig's length and we'll give you an exact quote before we book.",
  },
  {
    question: "Do I need to move my RV or camper for the detail?",
    answer:
      "No — we come to wherever it's parked, whether that's your home, a storage lot, or a campground.",
  },
  {
    question: "Do you need water and power access?",
    answer:
      "Yes, we need access to a water hookup and power outlet at the location. Most driveways and storage lots work fine — just let us know ahead of time if that's not available.",
  },
];

export const maintenancePlanFaqs: CategoryFaq[] = [
  {
    question: "Is there a contract for maintenance plans?",
    answer: "No — all of our maintenance plans are no-contract. Pause or cancel anytime.",
  },
  {
    question: "How often will my vehicle be washed?",
    answer:
      "You choose the frequency — weekly, biweekly, monthly, or quarterly for campers/RVs — depending on the plan.",
  },
  {
    question: "Can I switch plans or cancel?",
    answer: "Yes, anytime. Just text us and we'll adjust your schedule.",
  },
  {
    question: "What's included in a maintenance wash?",
    answer:
      "A maintenance wash covers the exterior — a quick wash, wheels and tires, and a towel dry — to keep your vehicle looking clean between full details.",
  },
];

export function getCategoryFaqs(categorySlug: string): CategoryFaq[] {
  switch (categorySlug) {
    case "camper-rv-detailing":
      return camperRvFaqs;
    case "maintenance-plans":
      return maintenancePlanFaqs;
    default:
      return [];
  }
}

export function getCategoryCityIntro(categorySlug: string, citySlug: string): string | null {
  switch (categorySlug) {
    case "camper-rv-detailing":
      return camperRvCityIntros[citySlug] ?? null;
    case "maintenance-plans":
      return maintenancePlanCityIntros[citySlug] ?? null;
    default:
      return null;
  }
}
