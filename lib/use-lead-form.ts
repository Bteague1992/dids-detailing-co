"use client";

import { useState, type FormEvent } from "react";
import { trackEvent } from "@/lib/analytics";

export type FormStatus = "idle" | "submitting" | "success" | "error";

/** Reads a named field's trimmed value from the submitted form. */
type FieldReader = (name: string) => string;

/**
 * Submit logic shared by the booking form, the contact form, and the pop-up.
 * All three post to /api/contact, which emails the lead (lib/lead-email.ts).
 */
export function useLeadForm({
  source,
  pageContext,
  event,
  getFields,
  getEventParams,
}: {
  /** Which form this is: "booking-form" | "contact-form" | "exit-intent-modal". */
  source: string;
  /** The page the form was submitted from. */
  pageContext: string;
  /** GA4 event fired for real (non-spam) submissions. */
  event: string;
  /** Picks this form's fields out of the submission. */
  getFields: (get: FieldReader) => Record<string, string>;
  /** Extra GA4 event params; defaults to { source }. */
  getEventParams?: (fields: Record<string, string>) => Record<string, unknown>;
}) {
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(submitEvent: FormEvent<HTMLFormElement>) {
    submitEvent.preventDefault();
    // Capture the form synchronously — event.currentTarget is null after an await.
    const form = submitEvent.currentTarget;
    setStatus("submitting");

    const data = new FormData(form);
    const get: FieldReader = (name) => String(data.get(name) ?? "").trim();
    const fields = getFields(get);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...fields,
          pageContext,
          company: get("company"), // honeypot, see <Honeypot>
          source,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const result: { filtered?: boolean } = await res.json();
      // Only count genuine leads as a conversion — not honeypot/phone-only
      // spam, which gets the same silent success response.
      if (!result.filtered) {
        trackEvent(event, getEventParams ? getEventParams(fields) : { source });
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return { status, handleSubmit };
}
