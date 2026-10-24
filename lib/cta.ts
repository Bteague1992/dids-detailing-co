import { business } from "@/config/business";
import { dadsClubConfig } from "@/config/services";

export interface SmsOptions {
  packageName?: string;
  /**
   * Disambiguates packageName in the pre-filled text — e.g. "Camper & RV
   * Detailing" so a tier named just "Exterior" doesn't read as ambiguous once
   * texted to the business owner out of context.
   */
  categoryLabel?: string;
  city?: string;
}

/**
 * Every "Book Now" / "Book" button. Returns null while booking buttons are
 * switched off (SHOW_BOOKING in config/business.ts) — callers hide the button.
 */
export function getBookingHref(): string | null {
  return business.SHOW_BOOKING ? business.BOOKING_URL : null;
}

/** "Call" buttons. */
export function getCallHref(): string {
  return `tel:+1${business.PHONE_DIGITS}`;
}

export function getEmailHref(): string {
  return `mailto:${business.EMAIL}`;
}

/**
 * "Text Dad" / "Text to Book" / "Text for a Quote" links: an sms: link with a prefilled message,
 * naming the package when one is given.
 */
export function getSmsHref(options?: SmsOptions): string {
  let message: string = business.DEFAULT_SMS_BODY;

  if (options?.packageName) {
    const packageLabel = options.categoryLabel
      ? `${options.packageName} (${options.categoryLabel})`
      : options.packageName;

    message = `Hi, I'm interested in booking ${packageLabel} for my vehicle`;
    if (options.city) {
      message += ` in ${options.city}`;
    }
    message += ". What availability do you have this week?";
  } else if (options?.city) {
    message = `Hi, I'm interested in booking a detail in ${options.city}.`;
  }

  return `sms:${business.PHONE_DIGITS}?body=${encodeURIComponent(message)}`;
}

/**
 * Every "Join Dad's Club" / "Text to Join" button: a text that says the
 * customer wants to join Dad's Club, naming the plan when one is given.
 */
export function getDadsClubSmsHref(planName?: string): string {
  const plan = planName ? ` (${planName})` : "";
  const message = `Hi, I'm interested in joining ${dadsClubConfig.name}${plan}. How do I get started?`;
  return `sms:${business.PHONE_DIGITS}?body=${encodeURIComponent(message)}`;
}
