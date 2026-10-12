// ---------------------------------------------------------------------------
// Business details — the one place to update contact info, hours, the booking
// link, and Google review numbers. Everything else on the site reads from here
// (config/site.ts re-exports the basics for older imports).
// ---------------------------------------------------------------------------

const PHONE = "828-548-0018";
const PHONE_DIGITS = PHONE.replace(/\D/g, "");
const DEFAULT_SMS_BODY = "Hi, I'm interested in booking a detail.";

export const business = {
  NAME: "Dad's Mobile Detailing Co.",
  TAGLINE: "Life gets messy. Dad's got it.",
  PHONE,
  PHONE_DIGITS,
  EMAIL: "dadsmobiledetailingnc@gmail.com",

  /** Message prefilled into generic "Text Dad" / "Book" links. */
  DEFAULT_SMS_BODY,

  /**
   * Show the "Book Online" / "Book" buttons? Set to false to hide every Book
   * button across the site ("Text Dad" then becomes the main button).
   */
  SHOW_BOOKING: true as boolean,

  /**
   * Where every "Book Online" / "Book" button goes: the booking request form
   * at /book. If you move to a booking system later, paste its https:// link
   * here and every Book button follows.
   */
  BOOKING_URL: "/book",

  HOURS: {
    days: "7 days a week",
    time: "8am–6pm",
    full: "7 days a week, 8am–6pm",
    /** 24h values for structured data. */
    opens: "08:00",
    closes: "18:00",
  },

  /** Paste your Google reviews link here. While empty, review links are hidden. */
  GOOGLE_REVIEWS_URL: "",
  GOOGLE_RATING: "5.0",
  GOOGLE_REVIEW_COUNT: 15,

  HOME_BASE: "Connelly Springs, NC",

  /** Shown wherever "The Dad Promise" appears. */
  DAD_PROMISE:
    "Not happy? Tell us within 48 hours and we'll come back and make it right, free.",

  /** Shown on the service areas page and FAQ. */
  TRAVEL_NOTE:
    "Free in our home area. Small trip fee for some outer areas on jobs under $200.",
} as const;

export interface ServiceCity {
  slug: string;
  name: string;
  /** County line shown on city cards, e.g. "Catawba County". */
  county: string;
  /** Short, town-specific blurb — city cards and the city page hero. */
  description: string;
}

// Order here is the order towns appear in the footer and on city cards.
// County facts are public record (see lib/local-area-content.ts).
export const businessConfig = {
  serviceAreaCities: [
    {
      slug: "hickory",
      name: "Hickory",
      county: "Catawba County",
      description:
        "We're in Hickory more than anywhere else, so getting on the schedule here is usually quick. Driveway, office lot, wherever the car is.",
    },
    {
      slug: "morganton",
      name: "Morganton",
      county: "Burke County",
      description:
        "Right down the road from us. We're in Morganton all the time, from downtown driveways to the neighborhoods out past the county seat.",
    },
    {
      slug: "lenoir",
      name: "Lenoir",
      county: "Caldwell County",
      description:
        "We make the run up to Lenoir regularly. You stay home, we bring the gear, and the car gets clean in your own driveway.",
    },
    {
      slug: "valdese",
      name: "Valdese",
      county: "Burke County",
      description:
        "Valdese is practically next door to our home base. No need to drive to Morganton or Hickory to get the car cleaned.",
    },
    {
      slug: "conover",
      name: "Conover",
      county: "Catawba County",
      description:
        "Conover is one of our regular stops. Home or work, we'll meet the car where it's parked and take it from there.",
    },
    {
      slug: "newton",
      name: "Newton",
      county: "Catawba County",
      description:
        "From the square to the edge of town, we come to you in Newton. Book a time, go about your day, come back to a clean ride.",
    },
    {
      slug: "granite-falls",
      name: "Granite Falls",
      county: "Caldwell County",
      description:
        "Just up 321 from Hickory. We bring everything to your driveway in Granite Falls, so there's no drop-off and no waiting room.",
    },
    {
      slug: "long-view",
      name: "Long View",
      county: "Burke and Catawba counties",
      description:
        "Long View sits right on the county line next to Hickory, so we pass through all the time. Easy to fit you in.",
    },
  ] as ServiceCity[],
} as const;

export function getCity(slug: string): ServiceCity | undefined {
  return businessConfig.serviceAreaCities.find((c) => c.slug === slug);
}

const townNames = businessConfig.serviceAreaCities.map((city) => city.name);

/**
 * Every town we serve as a sentence list, built from the list above:
 * "Hickory, Morganton, …, and Long View". Pass "or" or "&" for the last join.
 */
export function townList(join: "and" | "or" | "&" = "and"): string {
  const rest = townNames.slice(0, -1).join(", ");
  const last = townNames[townNames.length - 1];
  return join === "&" ? `${rest} & ${last}` : `${rest}, ${join} ${last}`;
}

// The first three towns in the list, used in titles and intros.
const [townA, townB, townC] = townNames;
/** "Hickory, Morganton & Lenoir" */
export const primaryTowns = `${townA}, ${townB} & ${townC}`;
/** "Hickory, Morganton, Lenoir" — for sentences that continue the list. */
export const primaryTownsComma = `${townA}, ${townB}, ${townC}`;
