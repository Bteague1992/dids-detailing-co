import { RvPage } from "@/components/pages/rv-page";
import { FAQSchema } from "@/components/seo/faq-schema";
import { formatPrice, rvFromRate } from "@/config/services";
import { rvFaqs } from "@/lib/city-content";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile RV & Camper Detailing, Hickory NC | From ${formatPrice(rvFromRate)}/ft`,
  description: `Your rig, road-trip ready. Mobile RV and camper detailing around Hickory, NC, priced by the foot from ${formatPrice(rvFromRate)}/ft. We come to where it's parked.`,
  canonical: "/rv-detailing",
  absoluteTitle: true,
});

export default function RvDetailingPage() {
  return (
    <>
      <FAQSchema faqs={rvFaqs} pagePath="/rv-detailing" />
      <RvPage />
    </>
  );
}
