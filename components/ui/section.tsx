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
 * - muted: bg-muted (subtle contrast, secondary sections)
 * - contrast: bg-secondary text-secondary-foreground (navy band, final CTAs)
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
    muted: "bg-muted text-foreground",
    contrast: "bg-secondary text-secondary-foreground",
  };

  return (
    <section
      id={id}
      className={cn(
        "py-12 md:py-16",
        variantStyles[variant],
        withBorder && "border-t border-border/60",
        className
      )}
    >
      <div
        className={cn(
          "container mx-auto px-4 sm:px-6 lg:px-8",
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
