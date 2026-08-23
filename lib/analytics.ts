// Shared GA4 event helper. Safe to call from anywhere on the client — no-ops
// during SSR and when gtag isn't present (blocked by an ad blocker, GA script
// still loading, etc.) rather than throwing.
//
// GA4 key events (conversions) to register in the GA4 property config for this
// site (Admin > Events > Mark as key event) — these are also the canonical
// event names other code should fire by exact string match:
//   - contact_form_submit
//   - exit_intent_modal_submit
//   - cta_text_click
//   - cta_call_click
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", eventName, params);
  } catch {
    // Never let analytics break the page.
  }
}
