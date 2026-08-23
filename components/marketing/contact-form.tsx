"use client";

import { useState, type FormEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Loader2, Send, CheckCircle2 } from "lucide-react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const pathname = usePathname();
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    // Capture the form element synchronously — event.currentTarget is nulled
    // out once the event finishes dispatching, which has already happened by
    // the time an `await` below resolves, so it can't be read after that.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      pageContext: pathname,
      company: String(formData.get("company") ?? ""), // honeypot
      source: "contact-form",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const data: { filtered?: boolean } = await res.json();
      // Only count genuine leads as a conversion — not honeypot/phone-only
      // spam that still got the same silent success response.
      if (!data.filtered) {
        trackEvent("contact_form_submit", { source: "contact-form" });
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-8">
        <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h3 className="text-xl font-heading font-semibold mb-2">
          Thanks — we&apos;ll be in touch soon!
        </h3>
        <p className="text-muted-foreground">
          We typically respond within a few hours during business hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot field — visually hidden off-screen (not display:none, which some
          bots skip filling in because they detect it). Real users never see or tab
          into this. Any non-empty value here flags the submission as spam server-side. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
      >
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
          placeholder="Tell us about your vehicle and what you're looking for..."
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          Something went wrong sending your message. Please try again, or text
          us instead.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4 mr-2" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
