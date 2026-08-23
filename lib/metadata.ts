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

const DEFAULT_OG_IMAGE = "/images/dmd-logo.png";

export function createPageMetadata({
  title,
  description,
  canonical,
  robots,
}: PageMetadataOptions): Metadata {
  return {
    title,
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
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 512,
          height: 512,
          alt: `${siteConfig.title} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
