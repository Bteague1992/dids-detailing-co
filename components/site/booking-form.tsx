"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass as field, Honeypot } from "@/components/site/form-parts";
import { useLeadForm } from "@/lib/use-lead-form";

export interface BookingFormOptions {
  /** Grouped service choices, built from config/services.ts by the page. */
  services: { group: string; options: string[] }[];
  vehicleSizes: string[];
  towns: string[];
}

const label = "mb-1.5 block text-sm font-semibold";

/**
 * Booking request form on /book. It emails the request to Dad through the
 * same /api/contact endpoint as the contact form and the pop-up; nothing is
 * confirmed until he replies, and the copy around the form says so.
 */
export function BookingForm({ services, vehicleSizes, towns }: BookingFormOptions) {
  const { status, handleSubmit } = useLeadForm({
    source: "booking-form",
    pageContext: "/book",
    event: "booking_form_submit",
    getFields: (get) => ({
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      serviceInterest: get("service"),
      vehicleInfo: [get("vehicle"), get("vehicleSize")].filter(Boolean).join(" · "),
      town: get("town"),
      preferredTime: get("preferredTime"),
      message: get("notes"),
    }),
    getEventParams: (fields) => ({ service: fields.serviceInterest }),
  });

  if (status === "success") {
    return (
      <div className="py-8 text-center" role="status">
        <CheckCircle2
          aria-hidden="true"
          className="mx-auto mb-4 h-12 w-12 text-orange"
        />
        <h2 className="mb-2 font-heading text-2xl font-bold">
          Got it. Request sent.
        </h2>
        <p className="text-muted-text">
          Dad will text or call you to confirm a time, usually within a few
          hours during business hours. You&apos;re not booked until you hear
          back.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Honeypot id="booking-company" />

      <fieldset className="space-y-4">
        <legend className="mb-3 font-heading text-xl font-bold">
          What are we cleaning?
        </legend>
        <div>
          <label htmlFor="booking-service" className={label}>
            Service
          </label>
          <select
            id="booking-service"
            name="service"
            required
            defaultValue=""
            className={field}
          >
            <option value="" disabled>
              Pick one
            </option>
            {services.map((group) => (
              <optgroup key={group.group} label={group.group}>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </optgroup>
            ))}
            <option value="Not sure yet">Not sure yet. Help me pick.</option>
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-vehicle" className={label}>
              Vehicle
            </label>
            <input
              type="text"
              id="booking-vehicle"
              name="vehicle"
              required
              placeholder="e.g. 2019 Honda Odyssey"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="booking-size" className={label}>
              Size
            </label>
            <select
              id="booking-size"
              name="vehicleSize"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Pick one
              </option>
              {vehicleSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
              <option value="Motorcycle">Motorcycle</option>
              <option value="RV or camper">RV or camper</option>
            </select>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 font-heading text-xl font-bold">
          Where and when?
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-town" className={label}>
              Town
            </label>
            <select
              id="booking-town"
              name="town"
              required
              defaultValue=""
              className={field}
            >
              <option value="" disabled>
                Pick one
              </option>
              {towns.map((town) => (
                <option key={town} value={town}>
                  {town}
                </option>
              ))}
              <option value="Somewhere else">Somewhere else</option>
            </select>
          </div>
          <div>
            <label htmlFor="booking-time" className={label}>
              Day and time that works
            </label>
            <input
              type="text"
              id="booking-time"
              name="preferredTime"
              placeholder="e.g. Saturday morning"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="mb-3 font-heading text-xl font-bold">
          How do we reach you?
        </legend>
        <div>
          <label htmlFor="booking-name" className={label}>
            Name
          </label>
          <input
            type="text"
            id="booking-name"
            name="name"
            required
            autoComplete="name"
            className={field}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="booking-phone" className={label}>
              Phone
            </label>
            <input
              type="tel"
              id="booking-phone"
              name="phone"
              required
              autoComplete="tel"
              className={field}
            />
          </div>
          <div>
            <label htmlFor="booking-email" className={label}>
              Email
            </label>
            <input
              type="email"
              id="booking-email"
              name="email"
              required
              autoComplete="email"
              className={field}
            />
          </div>
        </div>
        <div>
          <label htmlFor="booking-notes" className={label}>
            Anything we should know? (optional)
          </label>
          <textarea
            id="booking-notes"
            name="notes"
            rows={3}
            placeholder="Pets, car seats, stains, a smell you can't find. No judgment."
            className={field}
          />
        </div>
      </fieldset>

      {status === "error" && (
        <p className="text-sm font-semibold text-red-700" role="alert">
          Something went wrong sending your request. Please try again, or text
          us instead.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-5 w-5" />
            Send booking request
          </>
        )}
      </Button>
      <p className="text-center text-sm text-muted-text">
        This sends Dad a request. He&apos;ll text or call to confirm your time.
        You pay when the job&apos;s done.
      </p>
    </form>
  );
}
