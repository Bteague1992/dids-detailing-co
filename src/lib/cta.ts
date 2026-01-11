import { siteConfig } from "@/src/config/site";

export interface SmsOptions {
  packageName?: string;
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
    message = `Hi, I'm interested in a ${options.packageName} for my `;
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
