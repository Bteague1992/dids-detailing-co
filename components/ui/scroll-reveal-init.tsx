"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Drives the `.reveal` CSS class (see globals.css): watches every `.reveal`
 * element on the page and adds `.revealed` the first time it scrolls into
 * view, then stops observing it (one-time animation, not a re-trigger on
 * every scroll direction change). Mounted once in SiteShell rather than per
 * component so individual cards/sections only need a plain `reveal`
 * className — no per-component JS required.
 *
 * Re-scans on every route change (via the pathname dependency) since
 * SiteShell persists across client-side navigations — without this, a
 * page's `.reveal` elements would only ever get observed on the very first
 * page load and would stay stuck at opacity:0 on subsequent navigations.
 */
export function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.revealed)");
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
