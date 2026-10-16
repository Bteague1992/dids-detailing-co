import { DadsClubPage } from "@/components/pages/dads-club-page";
import { FAQSchema } from "@/components/seo/faq-schema";
import {
  dadsClubConfig,
  dadsClubFromPrice,
  formatPrice,
} from "@/config/services";
import { dadsClubFaqs } from "@/lib/city-content";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Car Detailing Subscription in Hickory, NC | ${dadsClubConfig.name}`,
  description: `Never deal with a dirty car again. ${dadsClubConfig.name} keeps your car clean around Hickory, NC every 2 weeks or monthly, from ${formatPrice(dadsClubFromPrice)} a visit. No contracts.`,
  canonical: "/dads-club",
  absoluteTitle: true,
});

export default function DadsClubRoutePage() {
  return (
    <>
      <FAQSchema faqs={dadsClubFaqs} pagePath="/dads-club" />
      <DadsClubPage />
    </>
  );
}
