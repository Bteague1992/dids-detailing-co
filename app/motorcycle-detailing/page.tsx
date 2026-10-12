import { MotorcyclePage } from "@/components/pages/motorcycle-page";
import { FAQSchema } from "@/components/seo/faq-schema";
import { bikeFullDetail, bikeWash } from "@/config/services";
import { siteConfig } from "@/config/site";
import { getMotoFaqs } from "@/lib/city-content";
import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: `Mobile Motorcycle Detailing in NC | Hickory & the Catawba Valley | ${siteConfig.title}`,
  description: `Bike looking rough after the Parkway? Mobile motorcycle detailing around Hickory, NC from $${bikeWash.price}. ${bikeWash.name} and ${bikeFullDetail.name}. We come to you.`,
  canonical: "/motorcycle-detailing",
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
