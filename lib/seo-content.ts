import type { ServiceCity } from "@/config/business";
import {
  motorcycleBasicWashPrice,
  motorcycleFullDetailPrice,
  startingCarPrice,
} from "@/config/services";

// County facts verified 2026-08 (see lib/local-area-content.ts for the source
// note) — used here for genuine per-city variation rather than a single
// template with the city name swapped in, which search engines can flag as
// thin/doorway content.
const cityCarIntros: Record<string, string> = {
  hickory: `Dad's Mobile Detailing Co. is based right here in Hickory, NC — so when you book, you get fast turnaround from a local you can trust. We come to your driveway or workplace to detail your car, truck, SUV, or motorcycle. No drop-off, no waiting rooms. Exterior washes start at $${startingCarPrice}. Text us to get on the schedule today.`,
  newton: `Dad's Mobile Detailing Co. brings professional car detailing directly to Newton, NC — no drop-off required. We come to your home or office in Catawba County to detail your car, truck, or SUV at a time that works for you. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  morganton: `Dad's Mobile Detailing Co. brings professional car detailing directly to Morganton, NC — no drop-off required. We travel to Burke County to detail your car, truck, or SUV right where it sits. Whether you're at home or at the office, we handle everything. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  lenoir: `Dad's Mobile Detailing Co. brings professional car detailing directly to Lenoir, NC — no drop-off required. We come to you in Caldwell County to detail your car, truck, or SUV on your schedule. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  valdese: `Dad's Mobile Detailing Co. brings professional car detailing directly to Valdese, NC — no drop-off required. We travel out from Hickory into Burke County to detail your car, truck, or SUV right where it's parked. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  conover: `Dad's Mobile Detailing Co. brings professional car detailing directly to Conover, NC — no drop-off required. Conover sits just outside our Hickory home base in Catawba County, so we're often in the area and can get you scheduled quickly. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  "granite-falls": `Dad's Mobile Detailing Co. brings professional car detailing directly to Granite Falls, NC — no drop-off required. We travel out to Caldwell County to detail your car, truck, or SUV wherever it's parked. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
  "long-view": `Dad's Mobile Detailing Co. brings professional car detailing directly to Long View, NC — no drop-off required. Long View sits along the Burke–Catawba county line right next to Hickory, so we're already in the area often. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`,
};

const cityMotoIntros: Record<string, string> = {
  hickory: `Dad's Mobile Detailing Co. is based right here in Hickory, NC — so when you book a motorcycle detail, you get fast, local service from someone who knows the area. We come to wherever your bike is parked with everything needed to make it shine. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
  newton: `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Newton, NC — no drop-off required. We come to you in Catawba County whether you ride a cruiser, sport bike, or touring bike. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book your motorcycle detail today.`,
  morganton: `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Morganton, NC — no drop-off required. We travel to Burke County to detail your bike wherever it's parked, with everything needed for a thorough clean and shine. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
  lenoir: `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Lenoir, NC — no drop-off required. We come to you in Caldwell County to detail your bike on your schedule. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book your motorcycle detail today.`,
  valdese: `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Valdese, NC — no drop-off required. We travel out from Hickory into Burke County to detail your bike wherever it's parked. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
  conover: `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Conover, NC — no drop-off required. Conover is just outside our Hickory home base in Catawba County, so scheduling here is quick and easy. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
  "granite-falls": `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Granite Falls, NC — no drop-off required. We travel out to Caldwell County to detail your bike wherever it's parked, with everything needed for a thorough clean and shine. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
  "long-view": `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to Long View, NC — no drop-off required. Long View straddles the Burke–Catawba county line right next to Hickory, so we're already in the area often. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book today.`,
};

// Last-resort fallback only — every city currently in config/business.ts has
// a hand-written entry above. Kept in case a new city is added without copy.
const DEFAULT_CAR_INTRO = (cityName: string) =>
  `Dad's Mobile Detailing Co. brings professional car detailing directly to ${cityName}, NC — no drop-off required. We come to you to detail your car, truck, SUV, or motorcycle. Exterior washes start at $${startingCarPrice}. Text us to book your detail today.`;

const DEFAULT_MOTO_INTRO = (cityName: string) =>
  `Dad's Mobile Detailing Co. brings professional motorcycle detailing directly to ${cityName}, NC — no drop-off required. Whether you ride a cruiser, sport bike, or touring bike, we come to wherever your bike is parked with everything needed to make it shine. Basic wash starts at $${motorcycleBasicWashPrice}, Premium detail at $${motorcycleFullDetailPrice}. Text us to book your motorcycle detail today.`;

export function generateCitySeoIntro(city: ServiceCity): string {
  return cityCarIntros[city.slug] ?? DEFAULT_CAR_INTRO(city.name);
}

// Distinct wording/order from the homepage's meta description on purpose —
// this targets booking-intent searches ("book mobile detailing in X") rather
// than the homepage's broad branded query. See canonical note in app/page.tsx.
export function generateCityMetaDescription(city: ServiceCity): string {
  return `Book mobile car detailing in ${city.name}, NC today. We come to your driveway or workplace — no drop-off. Cars, trucks, SUVs & motorcycles starting at $${startingCarPrice}.`;
}

export function generateMotorcycleCitySeoIntro(city: ServiceCity): string {
  return cityMotoIntros[city.slug] ?? DEFAULT_MOTO_INTRO(city.name);
}

export function generateMotorcycleCityMetaDescription(
  city: ServiceCity,
): string {
  return `Mobile motorcycle detailing in ${city.name}, NC starting at $${motorcycleBasicWashPrice}. We come to you — no drop-off needed. Basic wash & Premium detail available. Text to book today.`;
}
