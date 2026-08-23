import { cn } from "@/lib/utils";

type SectionVariant = "default" | "muted" | "contrast";

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  variant?: SectionVariant;
  className?: string;
  containerClassName?: string;
  withBorder?: boolean;
}

/**
 * Section component with standardized variants for visual hierarchy
 *
 * Variants:
 * - default: bg-background (light, primary content)
 * - muted: gradient off the deepened --muted token (secondary sections)
 * - contrast: navy gradient band with a dot-grid + glow accent (final CTAs)
 */
export function Section({
  id,
  title,
  description,
  children,
  variant = "default",
  className,
  containerClassName,
  withBorder = false,
}: SectionProps) {
  const variantStyles = {
    default: "bg-background text-foreground",
    muted: "bg-linear-to-b from-muted to-background text-foreground",
    contrast:
      "bg-linear-to-br from-secondary via-secondary to-secondary-light text-secondary-foreground",
  };

  return (
    <section
      id={id}
      className={cn(
        "relative py-12 md:py-16 overflow-hidden",
        variantStyles[variant],
        withBorder && "border-t border-border/60",
        className
      )}
    >
      {variant === "contrast" && (
        <>
          <div className="absolute inset-0 bg-dot-grid-light opacity-30 pointer-events-none" />
          <div className="absolute -top-24 -right-16 h-72 w-72 rounded-full bg-primary/25 blur-3xl pointer-events-none" />
        </>
      )}
      {variant === "muted" && (
        <div className="absolute inset-0 bg-dot-grid opacity-10 pointer-events-none" />
      )}
      <div
        className={cn(
          "container relative z-10 mx-auto px-4 sm:px-6 lg:px-8",
          containerClassName
        )}
      >
        {(title || description) && (
          <div className="mb-12 text-center">
            {title && (
              <h2
                className={cn(
                  "text-3xl md:text-4xl font-heading font-bold mb-4",
                  variant === "contrast" && "text-secondary-foreground"
                )}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                className={cn(
                  "text-lg max-w-2xl mx-auto",
                  variant === "contrast"
                    ? "text-secondary-foreground/90"
                    : "text-muted-foreground"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
