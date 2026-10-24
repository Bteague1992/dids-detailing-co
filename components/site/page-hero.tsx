import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { CtaButtons } from "@/components/site/cta-buttons";
import { Logo } from "@/components/site/logo";
import { cn } from "@/lib/utils";

/**
 * Top-of-page hero: H1, short sub, Book Now + Text Dad.
 * size="home" is the larger homepage version (two columns on desktop, with
 * the shield logo on the right); every other page uses the centered "page".
 */
export function PageHero({
  title,
  sub,
  size = "page",
  location,
  city,
  textHref,
  textLabel,
  showCta = true,
  children,
}: {
  title: ReactNode;
  sub: ReactNode;
  size?: "home" | "page";
  /** data-cta-location prefix for analytics. */
  location: string;
  city?: string;
  /** Override the text button (see CtaButtons). */
  textHref?: string;
  textLabel?: string;
  /** false hides the Book Now + Text Dad buttons (used on /book itself). */
  showCta?: boolean;
  /** Extra content under the buttons (e.g. the Google rating line). */
  children?: ReactNode;
}) {
  const home = size === "home";
  return (
    <section
      className={cn("bg-white", home ? "py-8 md:py-12" : "py-10 md:py-14")}
    >
      <Container>
        <div
          className={cn(
            home
              ? "grid items-center gap-8 lg:grid-cols-2 lg:gap-12"
              : "mx-auto max-w-3xl text-center",
          )}
        >
          <div>
            <h1
              className={cn(
                "font-extrabold",
                home
                  ? "text-[2.5rem] sm:text-5xl lg:text-6xl"
                  : "text-[2rem] sm:text-4xl lg:text-5xl",
              )}
            >
              {title}
            </h1>
            <p
              className={cn(
                "mt-4 text-muted-text",
                home ? "text-lg md:text-xl" : "text-lg",
                home ? "max-w-xl" : "mx-auto max-w-2xl",
              )}
            >
              {sub}
            </p>
            {showCta && (
              <CtaButtons
                location={location}
                size={home ? "lg" : "md"}
                city={city}
                textHref={textHref}
                textLabel={textLabel}
                className={cn("mt-6", !home && "justify-center")}
              />
            )}
            {children && <div className="mt-5">{children}</div>}
          </div>
          {home && <Logo className="hidden lg:block" variant="shield" />}
        </div>
      </Container>
    </section>
  );
}
