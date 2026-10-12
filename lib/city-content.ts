// Hand-written copy for every town. All of it appears on that town's page at
// /mobile-car-detailing/[city]/nc — the main intro plus one short paragraph
// each for motorcycles, RVs, and Dad's Club. Each entry is its own paragraph on
// purpose — never one template with the town name swapped in, which reads as
// thin content to people and to search engines.
//
// Facts used are public record, not invented landmarks:
//   Hickory       — Catawba County
//   Newton        — Catawba County seat
//   Conover       — Catawba County
//   Granite Falls — Caldwell County, on US-321
//   Morganton     — Burke County seat
//   Valdese       — Burke County, next to Connelly Springs (home base)
//   Lenoir        — Caldwell County seat
//   Long View     — on the Burke–Catawba county line, next to Hickory

import {
  bikeFullDetail,
  bikeWash,
  dadsClubConfig,
  motorcyclePriceSummary,
} from "@/config/services";
import { townList } from "@/config/business";
import type { FaqItem } from "@/components/site/faq-accordion";

type CityCopy = Record<string, string>;

/** Main intro. */
export const carCityIntros: CityCopy = {
  hickory:
    "Hickory keeps us busy, and we like it that way. We're here most days of the week, so there's a good chance we can get to you soon. Minivan after soccer season, work truck after a muddy week, whatever you've got. We pull up, you go about your day, and the car's clean when you come back out.",
  morganton:
    "Morganton is a short drive from our home base in Connelly Springs, so this is home turf. We detail cars, trucks, and SUVs all over town, right where they're parked. Work downtown? We're happy to clean the car in the lot while you're on the clock.",
  lenoir:
    "We head up to Lenoir, the Caldwell County seat, on a regular basis. If the truck's been down a gravel road or the kids have redecorated the back seat, no judgment. Text us your address and we'll bring everything to your driveway.",
  valdese:
    "Valdese is our neighbor. Connelly Springs is just down the road, so getting to you is easy. You don't need to haul the car to Morganton or Hickory and sit in a waiting room. We'll clean it in your driveway while you get on with your day.",
  conover:
    "Conover sits right beside Hickory in Catawba County, and we're through here all the time. Home, office, or the parking lot at work, we'll meet the car where it is. Snack crumbs, dog hair, job-site dust. We've seen worse.",
  newton:
    "Newton is the Catawba County seat and one of our regular stops. Whether the car lives in a garage near the square or on a gravel drive outside town, we come to you. Pick a time, hand us the keys, and come back to a clean ride.",
  "granite-falls":
    "Granite Falls is a quick trip up 321 for us. We bring our gear to your driveway in Caldwell County, so the only thing you have to do is point us to the spigot. Family SUV, commuter car, work truck. All welcome.",
  "long-view":
    "Long View sits right on the Burke–Catawba line, tucked up next to Hickory. We pass through on the way to just about everywhere, so fitting you in is simple. We come to your place, clean the car where it's parked, and leave it ready for the next mess.",
};

/** "Motorcycle detailing in [City]" section. */
export const motoCityIntros: CityCopy = {
  hickory:
    "Riders in Hickory, we've got you. We come to your garage or driveway and hand wash the bike right there. Bugs, road film, brake dust. Gone. You don't have to ride it anywhere or load it on a trailer.",
  morganton:
    "Morganton is a great place to own a bike, with the mountains and the Parkway not far up the road. Those rides leave their mark, though. We come to you in Burke County and get the bugs and road grime off, chrome and all.",
  lenoir:
    "Lenoir riders know what a day in the foothills does to a clean bike. We come to your place in Caldwell County, hand wash it, and get the chrome looking right again. No drop-off, no trailer.",
  valdese:
    "We're right down the road from Valdese, so getting to your bike is easy. Cruiser, sport bike, or tourer, we wash it by hand where it's parked and treat the chrome like it matters. Because it does.",
  conover:
    "Bike been sitting under a cover in Conover, or just back from a long weekend ride? Either way, we come to you. A careful hand wash, wheels and chrome cleaned up, and it's ready to roll.",
  newton:
    "In Newton, we come to wherever the bike lives: garage, carport, or driveway. Hand wash, wheels, chrome, and windshield, done on the spot while you do something else.",
  "granite-falls":
    "Granite Falls sits right on 321, which is a fine road to ride and a good way to collect bugs. We come to you in Caldwell County and clean the bike by hand in your own driveway.",
  "long-view":
    "Long View riders, we're next door in Hickory half the week anyway. We'll swing by, hand wash the bike where it's parked, and leave the chrome shining.",
};

/** Second intro paragraph: what we do in this town. */
export const cityHubIntros: CityCopy = {
  hickory:
    "Hickory is where we spend most of our time. Cars, trucks, SUVs, motorcycles, campers, and RVs. We do all of it here, in your driveway or at work. ",
  morganton:
    "Morganton is close to home for us, and we're here all the time. Everything we offer is available in Burke County's county seat: family cars, work trucks, bikes, campers, and Dad's Club visits.",
  lenoir:
    "Up in Lenoir, we handle everything from a quick exterior wash to a full camper detail. You don't have to leave the driveway. Text us your address and we'll sort out a time.",
  newton:
    "Newton gets our full lineup. Cars, trucks, SUVs, motorcycles, campers, and RVs, plus Dad's Club if you'd rather never think about washing the car again.",
  valdese:
    "Valdese is right next door to our home base, so we're here often. One-time detail or regular Dad's Club visits, we bring it all to you. No trip to Morganton or Hickory needed.",
  conover:
    "Conover is one of our most regular stops. From the family SUV to the camper out back, we bring the gear and handle it on the spot.",
  "granite-falls":
    "We serve Granite Falls regularly, cars and bikes and campers alike. One-time clean or regular Dad's Club visits, we come to you. No drop-off, no waiting room.",
  "long-view":
    "Long View gets everything we offer, same as Hickory next door: cars, motorcycles, campers, RVs, and Dad's Club, all in your own driveway.",
};

/** "RV & camper detailing in [City]" section. */
export const rvCityIntros: CityCopy = {
  hickory:
    "Parked at home in Hickory or kept in storage nearby, your rig doesn't have to go anywhere. We come to it. Pricing is by the foot, so a bigger rig just means a bigger number, not a different process.",
  morganton:
    "Campers take up room that Morganton driveways don't always have, so we go wherever yours is parked: home, a storage lot, or a campground nearby. We price by the foot and tell you the number first.",
  lenoir:
    "No need to tow the rig anywhere for a wash. We detail campers and RVs of any length right where they sit in Lenoir, priced by how long yours is.",
  newton:
    "Pop-up campers to full Class A motorhomes, we detail them all around Newton without you moving a thing. Length sets the price, and you'll have a straight number before we start.",
  valdese:
    "If your camper lives in Valdese, we'll come clean it where it's parked: home, storage, or a lot down the road. Priced by the foot. No surprises.",
  conover:
    "Conover camper and RV owners get the full works: roof rinse, hand wash, and interior cleaning, all done on site and priced by the length of your rig.",
  "granite-falls":
    "We bring RV and camper detailing to Granite Falls so you don't have to hook up and haul. Driveway, storage unit, or campground, we come to it and price by the foot.",
  "long-view":
    "Long View campers and RVs get a top-to-bottom clean without leaving their parking spot. We price by length, so you know the number before we start.",
};

/** "Dad's Club in [City]" section. */
export const dadsClubCityIntros: CityCopy = {
  hickory:
    "We're on Hickory streets more than anywhere else, so Dad's Club visits here are the easiest to schedule, every 2 weeks or once a month. No contracts, cancel anytime.",
  morganton:
    "Dad's Club members in Morganton get a regular visit every 2 weeks or once a month. A wash outside, a quick tidy inside, and no contracts. Cancel anytime.",
  lenoir:
    "For Lenoir folks who'd rather not think about washing the car, Dad's Club handles it on a set schedule. No contracts, cancel anytime.",
  newton:
    "Newton is an easy stop for us, so keeping a regular schedule here is simple. Pick every 2 weeks or monthly and we'll show up. No contracts.",
  valdese:
    "Valdese is next door to our home base, which makes it a great fit for Dad's Club. Pick every 2 weeks or monthly and we'll handle the rest. No contracts, cancel anytime.",
  conover:
    "Conover Dad's Club members can set it and forget it. Pick every 2 weeks or monthly and we'll keep your vehicle clean. No contracts.",
  "granite-falls":
    "In Granite Falls, Dad's Club keeps your vehicle clean on a schedule, every 2 weeks or once a month. No contracts, so you can change things up anytime.",
  "long-view":
    "Long View sits right on the Burke–Catawba county line, and Dad's Club members here never have to remember to book a wash. We show up on schedule, and you can adjust or cancel anytime.",
};

// ---------------------------------------------------------------------------
// FAQs shared across pages
// ---------------------------------------------------------------------------

export const WATER_POWER_ANSWER =
  "Right now we use your outdoor spigot and a regular outlet. Most driveways are all set. If that's a problem where you're parked, text us and we'll figure something out.";


export const rvFaqs: FaqItem[] = [
  {
    question: "Do you detail Class A, B, and C motorhomes?",
    answer:
      "Yes. Campers, travel trailers, and Class A, B, and C motorhomes of any length. The price depends on how long your rig is.",
  },
  {
    question: "How do you price an RV or camper?",
    answer:
      "By the foot. Length times the rate for the package you pick, with a minimum for each package. Text us your rig's length and we'll give you the exact number before we book.",
  },
  {
    question: "Do I need to move my RV or camper?",
    answer:
      "Nope. We come to wherever it's parked: your home, a storage lot, or a campground.",
  },
  {
    question: "Do you bring your own water and power?",
    answer: WATER_POWER_ANSWER,
  },
];

export const dadsClubFaqs: FaqItem[] = [
  {
    question: `Is there a contract for ${dadsClubConfig.name}?`,
    answer: "Nope. No contracts. Pause or cancel anytime.",
  },
  {
    question: "How often will you come out?",
    answer:
      "You pick. Cars, trucks, and SUVs can go every 2 weeks or monthly. Motorcycles are monthly. Campers and RVs are monthly or quarterly.",
  },
  {
    question: "Can I switch plans or cancel?",
    answer: "Yes, anytime. Just text us and we'll adjust your schedule.",
  },
  {
    question: "What's included in each visit?",
    answer: `For cars, trucks, and SUVs, each visit includes: ${dadsClubConfig.includedEachVisit.join(", ").toLowerCase()}. ${dadsClubConfig.requirement}`,
  },
];

export function getMotoFaqs(): FaqItem[] {
  return [
    {
      question: "Where do you detail motorcycles?",
      answer: `All over the Catawba Valley: ${townList()}. We come to you, so there's no drop-off.`,
    },
    {
      question: "How much does motorcycle detailing cost?",
      answer: `${motorcyclePriceSummary} We come to you, so there's no drop-off.`,
    },
    {
      question: "What kinds of bikes do you work on?",
      answer:
        "Cruisers, sport bikes, touring bikes, and most anything else on two wheels. Not sure about yours? Text us a photo.",
    },
    {
      question: "How long does it take?",
      answer: `${bikeWash.name} takes about 45-60 minutes. ${bikeFullDetail.name} usually takes 1.5-2 hours, depending on the bike.`,
    },
    {
      question: "Do you bring your own water and power?",
      answer: WATER_POWER_ANSWER,
    },
  ];
}
