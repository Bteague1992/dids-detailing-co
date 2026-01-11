import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import { servicesConfig } from "@/src/config/services";
import { Container } from "@/components/ui/container";
import Image from "next/image";

export function Hero() {
  const launchOffer = servicesConfig.launchOffer;
  const fullDetailPackage = servicesConfig.packages.find(
    (p) => p.id === launchOffer.packageId
  );

  return (
    <section className="relative py-10 bg-linear-to-br from-secondary/90 via-accent/100 to-primary/30 overflow-hidden">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(251,146,60,0.08),transparent_50%)] pointer-events-none" /> */}
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
            Mobile Car Detailing in Hickory & Surrounding Areas
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Affordable, convenient, dad-approved detailing that comes to you.
          </p>
          {launchOffer.active && fullDetailPackage && (
            <p className="text-lg text-foreground mb-8">
              <span className="font-semibold">Launch Special:</span> First 20
              Full Details from ${launchOffer.sedanPrice} (sedan) / $
              {launchOffer.suvTruckPrice} (SUV/Truck)
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <a
                href={getSmsHref()}
                aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
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
