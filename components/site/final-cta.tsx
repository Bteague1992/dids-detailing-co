import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section";
import { CtaButtons } from "@/components/site/cta-buttons";
import { business } from "@/config/business";

/** Closing call to action, rendered above the footer on every page (see SiteShell). */
export function FinalCta() {
  return (
    <section className="border-t border-line bg-white py-12 md:py-16">
      <Container className="text-center">
        <SectionHeading
          title="Ready for a clean car?"
          subtitle={business.TAGLINE}
          className="mb-6 md:mb-6"
        />
        <CtaButtons location="final-cta" size="lg" className="justify-center" />
      </Container>
    </section>
  );
}
