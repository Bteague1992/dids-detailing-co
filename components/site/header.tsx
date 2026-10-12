"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/site/logo";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/packages", label: "Packages" },
  { href: "/dads-club", label: "Dad's Club" },
  { href: "/motorcycle-detailing", label: "Motorcycles" },
  { href: "/rv-detailing", label: "RVs" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function Header({
  bookingHref,
}: {
  /** null hides the Book Online buttons. */
  bookingHref: string | null;
}) {
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile menu is a native <dialog>: showModal() gives us the focus trap,
  // Escape-to-close, and screen reader semantics without extra code.
  const openMenu = () => menuRef.current?.showModal();
  const closeMenu = () => menuRef.current?.close();

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-shadow",
        scrolled ? "shadow-header" : "border-b border-line",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-6 md:h-20">
        <Link href="/" aria-label="Dad's Mobile Detailing Co. home" className="shrink-0">
          <Logo
            variant="dark"
            priority
            sizes="160px"
            className="h-[42px] md:h-[52px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-medium underline-offset-8 decoration-orange decoration-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {bookingHref && (
            <ButtonLink
              href={bookingHref}
              size="sm"
              className="hidden sm:inline-flex"
              data-cta-location="header-book"
            >
              Book Online
            </ButtonLink>
          )}
          <button
            type="button"
            onClick={openMenu}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
          >
            <Menu aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>
      </div>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-charcoal backdrop:bg-charcoal/50"
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo variant="dark" decorative sizes="160px" className="h-[42px]" />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="flex h-11 w-11 items-center justify-center rounded-full"
          >
            <X aria-hidden="true" className="h-7 w-7" />
          </button>
        </div>
        <nav aria-label="Mobile" className="px-5 pt-4">
          <ul className="divide-y divide-line border-y border-line">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-4 font-heading text-2xl font-bold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {bookingHref && (
            <ButtonLink
              href={bookingHref}
              size="lg"
              className="mt-8 w-full"
              onClick={closeMenu}
              data-cta-location="mobile-menu-book"
            >
              Book Online
            </ButtonLink>
          )}
        </nav>
      </dialog>
    </header>
  );
}
