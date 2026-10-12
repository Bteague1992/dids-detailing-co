import { RvPage } from "@/components/pages/rv-page";
import { primaryTowns } from "@/config/business";
import { FAQSchema } from "@/components/seo/faq-schema";
import { formatPrice, rvFromRate } from "@/config/services";
import { siteConfig } from "@/config/site";
import { rvFaqs } from "@/lib/city-content";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `RV & Camper Detailing | From ${formatPrice(rvFromRate)}/ft | ${siteConfig.title}`,
  description: `Your rig, road-trip ready. Mobile RV and camper detailing around ${primaryTowns}, NC, priced by the foot from ${formatPrice(rvFromRate)}/ft. We come to where it's parked.`,
  canonical: "/rv-detailing",
});

export default function RvDetailingPage() {
  return (
    <>
      <FAQSchema faqs={rvFaqs} pagePath="/rv-detailing" />
      <RvPage />
    </>
  );
}
