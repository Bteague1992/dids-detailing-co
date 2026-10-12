import { DadsClubPage } from "@/components/pages/dads-club-page";
import { FAQSchema } from "@/components/seo/faq-schema";
import { dadsClubFromPrice, formatPrice } from "@/config/services";
import { siteConfig } from "@/config/site";
import { dadsClubFaqs } from "@/lib/city-content";
import { createPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

export const metadata: Metadata = createPageMetadata({
  title: `Dad's Club | Recurring Car Cleaning From ${formatPrice(dadsClubFromPrice)} a Visit | ${siteConfig.title}`,
  description: `Never deal with a dirty car again. Dad's Club keeps your car clean every two weeks or every month, from ${formatPrice(dadsClubFromPrice)} a visit. Starts with a full detail. No contracts, cancel anytime.`,
  canonical: "/dads-club",
});

export default function DadsClubRoutePage() {
  return (
    <>
      <FAQSchema faqs={dadsClubFaqs} pagePath="/dads-club" />
      <DadsClubPage />
    </>
  );
}
