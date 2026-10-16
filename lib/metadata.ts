import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  canonical: string;
  /** Use the title exactly as given, without the root layout's brand suffix.
   * For titles that carry their own short brand, e.g. "… | Dad's Club". */
  absoluteTitle?: boolean;
  robots?: {
    index: boolean;
    follow: boolean;
  };
}

/** Shorter brand for page titles that would run long with the full name. */
export const SHORT_BRAND = "Dad's Mobile Detailing";

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
  absoluteTitle,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    // Titles that already include the business name skip the root layout's
    // "%s | Dad's Mobile Detailing Co." template (absolute) — otherwise the
    // name is appended a second time. Short titles like "Gallery" still get it.
    title:
      absoluteTitle || title.includes(siteConfig.title)
        ? { absolute: title }
        : title,
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
