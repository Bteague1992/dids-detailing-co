import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/lib/cta";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/container";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative py-10 bg-linear-to-br from-secondary/90 via-accent to-primary/30 overflow-hidden">
      <Container className="relative">
        <div className="text-center max-w-3xl mx-auto">
          <Image
            src="/images/dmd-logo.png"
            alt="Dad's Mobile Detailing Co. Logo"
            width={300}
            height={300}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6">
            Mobile Car Detailing That Comes to You — Hickory, NC & Surrounding
            Areas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Affordable, convenient detailing for cars, trucks, SUVs &
            motorcycles — we come to you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
              className="text-lg px-8 py-6"
            >
              <a href="/packages">View Packages</a>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
