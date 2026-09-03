import { siteConfig } from "@/config/site";

export interface SmsOptions {
  packageName?: string;
  /**
   * Disambiguates packageName in the pre-filled text — e.g. "Motorcycle
   * Detailing" so a tier named just "Premium" doesn't read as ambiguous once
   * texted to the business owner out of context (a customer clicking the
   * motorcycle Premium tier should text "Premium (Motorcycle Detailing)",
   * not just "Premium").
   */
  categoryLabel?: string;
  vehicleType?: "sedan" | "suv-truck";
  city?: string;
}

/**
 * Generates an SMS link with a prefilled message for booking
 */
export function getSmsHref(options?: SmsOptions): string {
  const phone = siteConfig.phone.replace(/\D/g, ""); // Remove non-digits

  let message = "Hi, I'm interested in booking a detail.";

  if (options?.packageName) {
    const packageLabel = options.categoryLabel
      ? `${options.packageName} package (${options.categoryLabel})`
      : `${options.packageName} package`;

    message = `Hi, I'm interested in booking the ${packageLabel} for my `;
    if (options.vehicleType) {
      message +=
        options.vehicleType === "sedan" ? "sedan" : "SUV/Truck";
    } else {
      message += "vehicle";
    }
    if (options.city) {
      message += ` in ${options.city}`;
    }
    message += ". What availability do you have this week?";
  }

  const encodedMessage = encodeURIComponent(message);
  return `sms:${phone}?body=${encodedMessage}`;
}
