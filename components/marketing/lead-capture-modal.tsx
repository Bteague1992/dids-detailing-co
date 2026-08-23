"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { Loader2, Send, CheckCircle2, X } from "lucide-react";

const SESSION_STORAGE_KEY = "dmd-lead-capture-shown";
const MOBILE_TIMER_MS = 15000;
const MIN_PAGE_TIME_MS = 4000; // guard against exit-intent false positives right after load
const DESKTOP_BREAKPOINT = "(min-width: 768px)"; // matches the site's existing md breakpoint

type FormStatus = "idle" | "submitting" | "success" | "error";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function LeadCaptureModal() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>("idle");
  const dialogRef = useRef<HTMLDivElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  const skipPage = pathname === "/contact";

  // Trigger logic: exit intent on desktop, timed popup on mobile. Fires once per
  // browser session (sessionStorage), and never on the contact page itself.
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

  // Focus trap + return focus on close
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const dialog = dialogRef.current;
    const focusable = dialog?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    focusable?.[0]?.focus();

    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isOpen]);

  function handleClose() {
    setIsOpen(false);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      handleClose();
      return;
    }
    if (event.key !== "Tab") return;

    const dialog = dialogRef.current;
    if (!dialog) return;
    const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      message: String(formData.get("message") ?? ""),
      pageContext: pathname,
      company: String(formData.get("company") ?? ""), // honeypot
      source: "exit-intent-modal",
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
      if (!data.filtered) {
        trackEvent("exit_intent_modal_submit", { source: "exit-intent-modal" });
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-capture-title"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-md rounded-2xl bg-card border-2 border-primary/30 shadow-2xl p-6 md:p-8 max-h-[90vh] overflow-y-auto"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {status === "success" ? (
          <div className="text-center py-6">
            <CheckCircle2 className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 id="lead-capture-title" className="text-xl font-heading font-semibold mb-2">
              Thanks — we&apos;ll be in touch soon!
            </h2>
            <p className="text-muted-foreground">
              We typically respond within a few hours during business hours.
            </p>
          </div>
        ) : (
          <>
            <h2 id="lead-capture-title" className="text-2xl font-heading font-bold mb-2">
              Let&apos;s Get You Booked
            </h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Leave your info and we&apos;ll reach out to get you booked.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3" noValidate>
              {/* Honeypot — visually hidden off-screen, never seen by real users */}
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
                <label htmlFor="lead-company">Company</label>
                <input
                  type="text"
                  id="lead-company"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label htmlFor="lead-name" className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="lead-name"
                  name="name"
                  required
                  className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="lead-phone" className="block text-sm font-medium mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="lead-phone"
                    name="phone"
                    required
                    className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="lead-email" className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="lead-email"
                    name="email"
                    required
                    className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lead-message" className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  id="lead-message"
                  name="message"
                  rows={3}
                  className="w-full rounded-md border-2 border-border/60 bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-destructive">
                  Something went wrong. Please try again, or text us instead.
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
                    Send
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
