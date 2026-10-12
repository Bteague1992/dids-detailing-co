"use client";

import { usePathname } from "next/navigation";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass, Honeypot } from "@/components/site/form-parts";
import { useLeadForm } from "@/lib/use-lead-form";

const labelClass = "mb-1.5 block text-sm font-semibold";

export function ContactForm() {
  const pathname = usePathname();
  const { status, handleSubmit } = useLeadForm({
    source: "contact-form",
    pageContext: pathname,
    event: "contact_form_submit",
    getFields: (get) => ({
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      message: get("message"),
    }),
  });

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-12 w-12 text-orange mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold mb-2">
          Got it. Dad will be in touch soon.
        </h3>
        <p className="text-muted-text">
          We usually get back to you within a few hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <Honeypot id="company" />

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input type="text" id="name" name="name" required className={fieldClass} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input type="tel" id="phone" name="phone" required className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input type="email" id="email" name="email" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={fieldClass}
          placeholder="What do you drive, and what's going on with it?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong sending your message. Please try again, or text
          us instead.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send aria-hidden="true" className="h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
