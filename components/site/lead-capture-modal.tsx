"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { usePathname } from "next/navigation";
import { CheckCircle2, Loader2, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass, Honeypot } from "@/components/site/form-parts";
import { trackEvent } from "@/lib/analytics";
import { useLeadForm } from "@/lib/use-lead-form";

const SESSION_STORAGE_KEY = "dmd-lead-capture-shown";
const MOBILE_TIMER_MS = 30000;
const MIN_PAGE_TIME_MS = 4000; // guard against exit-intent false positives right after load
const DESKTOP_BREAKPOINT = "(min-width: 768px)"; // matches the site's md breakpoint

const labelClass = "mb-1 block text-sm font-semibold";

export function LeadCaptureModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const { status, handleSubmit } = useLeadForm({
    source: "exit-intent-modal",
    pageContext: pathname,
    event: "exit_intent_modal_submit",
    getFields: (get) => ({
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      message: get("message"),
    }),
  });

  // Never on pages that already are a form.
  const skipPage = pathname === "/contact" || pathname === "/book";

  // Trigger logic: exit intent on desktop, timed popup on mobile. Fires once per
  // browser session (sessionStorage), and never on the contact or booking pages.
  useEffect(() => {
    if (skipPage) return;
    if (typeof window === "undefined") return;

    let alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode, etc.) — fall back to allowing it to show once per page load
    }
    if (alreadyShown) return;

    const isDesktop = window.matchMedia(DESKTOP_BREAKPOINT).matches;
    const loadedAt = Date.now();
    let triggered = false;

    function show(trigger: "exit-intent" | "mobile-timer") {
      if (triggered) return;
      triggered = true;
      setIsOpen(true);
      trackEvent("exit_intent_modal_shown", { trigger });
      try {
        sessionStorage.setItem(SESSION_STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }

    if (isDesktop) {
      const handleMouseLeave = (event: MouseEvent) => {
        if (Date.now() - loadedAt < MIN_PAGE_TIME_MS) return;
        if (event.clientY <= 0) {
          show("exit-intent");
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    } else {
      const timer = setTimeout(() => show("mobile-timer"), MOBILE_TIMER_MS);
      return () => clearTimeout(timer);
    }
  }, [skipPage]);

  // A native <dialog>: showModal() provides the focus trap, Escape-to-close,
  // the dimmed backdrop, and returning focus afterwards.
  useEffect(() => {
    if (isOpen) dialogRef.current?.showModal();
  }, [isOpen]);

  // Close when the click lands on the backdrop, i.e. outside the dialog's box.
  function handleBackdropClick(event: ReactMouseEvent<HTMLDialogElement>) {
    const box = event.currentTarget.getBoundingClientRect();
    const inside =
      event.clientX >= box.left &&
      event.clientX <= box.right &&
      event.clientY >= box.top &&
      event.clientY <= box.bottom;
    if (!inside) event.currentTarget.close();
  }

  if (!isOpen) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="lead-capture-title"
      onClose={() => setIsOpen(false)}
      onMouseDown={handleBackdropClick}
      className="m-auto max-h-[90vh] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-card bg-white p-6 text-charcoal shadow-card backdrop:bg-charcoal/60 md:p-8"
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
        className="absolute top-3 right-3 flex h-11 w-11 items-center justify-center rounded-full text-muted-text hover:bg-warm-gray hover:text-charcoal"
      >
        <X aria-hidden="true" className="h-5 w-5" />
      </button>

      {status === "success" ? (
        <div className="text-center py-6">
          <CheckCircle2 className="h-12 w-12 text-orange mx-auto mb-4" />
          <h2 id="lead-capture-title" className="text-xl font-heading font-bold mb-2">
            Got it. Dad will be in touch soon.
          </h2>
          <p className="text-muted-text">
            We usually get back to you within a few hours during business hours.
          </p>
        </div>
      ) : (
        <>
          <h2 id="lead-capture-title" className="text-2xl font-heading font-bold mb-2">
            Let&apos;s get you booked
          </h2>
          <p className="text-muted-text mb-6 text-sm">
            Leave your info and Dad will reach out to get you on the
            schedule. No pressure.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <Honeypot id="lead-company" />

            <div>
              <label htmlFor="lead-name" className={labelClass}>
                Name
              </label>
              <input type="text" id="lead-name" name="name" required className={fieldClass} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="lead-phone" className={labelClass}>
                  Phone
                </label>
                <input type="tel" id="lead-phone" name="phone" required className={fieldClass} />
              </div>
              <div>
                <label htmlFor="lead-email" className={labelClass}>
                  Email
                </label>
                <input type="email" id="lead-email" name="email" required className={fieldClass} />
              </div>
            </div>

            <div>
              <label htmlFor="lead-message" className={labelClass}>
                Message
              </label>
              <textarea id="lead-message" name="message" rows={3} className={fieldClass} />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-700">
                Something went wrong. Please try again, or text us instead.
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
                  Send
                </>
              )}
            </Button>
          </form>
        </>
      )}
    </dialog>
  );
}
