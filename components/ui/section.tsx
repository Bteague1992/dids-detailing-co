import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type Tone = "white" | "warm" | "charcoal";

const tones: Record<Tone, string> = {
  white: "bg-white",
  warm: "bg-warm-gray",
  charcoal: "on-dark bg-charcoal text-white",
};

/** Section heading with the short orange underline accent. */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  onDark = false,
  as: Tag = "h2",
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  onDark?: boolean;
  as?: "h2" | "h3";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-8 md:mb-10",
        align === "center" && "text-center",
        className,
      )}
    >
      <Tag className="text-[1.75rem] md:text-4xl font-extrabold">{title}</Tag>
      <span
        aria-hidden="true"
        className={cn(
          "mt-3 block h-1 w-14 rounded-full bg-orange",
          align === "center" && "mx-auto",
        )}
      />
      {subtitle && (
        <p
          className={cn(
            "mt-4 max-w-2xl",
            align === "center" && "mx-auto",
            onDark ? "text-white/85" : "text-muted-text",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * Page section. Alternate tone="white" and tone="warm" down the page.
 */
export function Section({
  id,
  tone = "white",
  title,
  subtitle,
  align = "center",
  width = "6xl",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  title?: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "left";
  width?: "3xl" | "4xl" | "5xl" | "6xl";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("py-12 md:py-16", tones[tone], className)}>
      <Container width={width}>
        {title && (
          <SectionHeading
            title={title}
            subtitle={subtitle}
            align={align}
            onDark={tone === "charcoal"}
          />
        )}
        {children}
      </Container>
    </section>
  );
}
