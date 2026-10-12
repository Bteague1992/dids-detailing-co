import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

// Primary buttons keep bold text at 19px+ so white on --orange-strong meets
// WCAG AA for large text. Don't shrink the label below that.
const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-heading font-bold leading-none text-center whitespace-nowrap transition-colors disabled:opacity-60 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-orange-strong text-white hover:bg-orange-dark",
  secondary:
    "bg-white text-charcoal border-2 border-charcoal hover:bg-charcoal hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-5 text-[1.1875rem]",
  md: "min-h-12 px-6 text-[1.1875rem]",
  lg: "min-h-12 px-6 text-[1.1875rem] sm:min-h-14 sm:px-8 sm:text-xl",
};

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: { variant?: Variant; size?: Size; className?: string } = {}) {
  return cn(base, variants[variant], sizes[size], className);
}

interface StyleProps {
  variant?: Variant;
  size?: Size;
}

export function Button({
  variant,
  size,
  className,
  ...props
}: ComponentProps<"button"> & StyleProps) {
  return (
    <button className={buttonClass({ variant, size, className })} {...props} />
  );
}

/** A link that looks like a button. Internal paths use next/link; sms:, tel:,
 * mailto: and external URLs render a plain anchor. */
export function ButtonLink({
  href,
  variant,
  size,
  className,
  children,
  ...props
}: Omit<ComponentProps<"a">, "href"> &
  StyleProps & { href: string; children: ReactNode }) {
  const classes = buttonClass({ variant, size, className });
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
