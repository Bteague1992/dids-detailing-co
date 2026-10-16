import { MotorcyclePage } from "@/components/pages/motorcycle-page";
import { FAQSchema } from "@/components/seo/faq-schema";
import { bikeFullDetail, bikeWash, formatPrice } from "@/config/services";
import { getMotoFaqs } from "@/lib/city-content";
import type { Metadata } from "next";
import { createPageMetadata, SHORT_BRAND } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Motorcycle Detailing in Hickory, NC | ${SHORT_BRAND}`,
  description: `Bike looking rough after the Parkway? Mobile motorcycle detailing around Hickory, NC from ${formatPrice(bikeWash.price)}. ${bikeWash.name} and ${bikeFullDetail.name}. We come to you.`,
  canonical: "/motorcycle-detailing",
  absoluteTitle: true,
});

const faqs = getMotoFaqs();

export default function MotorcycleDetailingPage() {
  return (
    <>
      <FAQSchema faqs={faqs} pagePath="/motorcycle-detailing" />
      <MotorcyclePage faqs={faqs} />
    </>
  );
}
