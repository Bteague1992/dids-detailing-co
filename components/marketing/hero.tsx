import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-linear-to-br from-secondary via-secondary to-secondary-light text-secondary-foreground">
      <div className="absolute inset-0 bg-dot-grid-light opacity-25 pointer-events-none" />
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <Image
            src="/images/dmd-logo.png"
            alt="Dad's Mobile Detailing Co. Logo"
            width={130}
            height={130}
            className="rounded-xl inline-block p-3 mb-8 animate-in fade-in zoom-in-95 duration-700"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 text-secondary-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150 fill-mode-backwards">
            Mobile Car Detailing That Comes to You — Hickory, NC & Surrounding
            Areas
          </h1>
          <p className="text-xl md:text-2xl text-secondary-foreground/85 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-backwards">
            Affordable, convenient detailing for cars, trucks, SUVs &
            motorcycles — we come to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-backwards">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
                data-cta-location="hero"
              >
                Text to Book
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 bg-secondary-foreground/10 text-secondary-foreground border-secondary-foreground/30 hover:bg-secondary-foreground/20"
            >
              <a href="/packages">View Packages</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
