import { GalleryGrid } from "@/components/marketing/gallery-grid";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getSmsHref } from "@/src/lib/cta";
import { siteConfig } from "@/src/config/site";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "View before and after photos of our mobile car detailing work. See the quality and care we bring to every detail.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Section variant="default" title="Our Work" description="See the transformation we bring to every vehicle. Quality detailing that makes your car look and feel like new." className="pt-8">
        <Container maxWidth="5xl">
          <GalleryGrid />
        </Container>
      </Section>
      <Section variant="contrast">
        <Container maxWidth="3xl" className="text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-secondary-foreground">
            Ready to Transform Your Vehicle?
          </h2>
          <p className="text-lg text-secondary-foreground/90 mb-8">
            Text us to book your detail and see the difference for yourself.
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6"
          >
            <a
              href={getSmsHref()}
              aria-label={`Text ${siteConfig.title} at ${siteConfig.phone} to book a detail`}
            >
              Text to Book
            </a>
          </Button>
        </Container>
      </Section>
    </>
  );
}
