import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

/** The 1200×630 branded share image (scripts/generate-brand-assets.mjs). */
export const SHARE_IMAGE = {
  url: "/images/og-share.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.title} — ${siteConfig.tagline}`,
};

export function createPageMetadata({
  title,
  description,
  canonical,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    // Titles that already include the business name skip the root layout's
    // "%s | Dad's Mobile Detailing Co." template (absolute) — otherwise the
    // name is appended a second time. Short titles like "Gallery" still get it.
    title: title.includes(siteConfig.title) ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
    },
    ...(robots ? { robots } : {}),
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.title,
      type: "website",
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}
