import { sanityConfig } from "@/lib/sanity";

export interface SanityImageRef {
  asset?: {
    _ref?: string;
  };
}

/**
 * Hand-rolled Sanity image URL builder so we don't need the @sanity/image-url
 * dependency for what's just string formatting. Sanity asset refs look like
 * `image-<assetId>-<width>x<height>-<format>`.
 */
export function sanityImageUrl(image: SanityImageRef | undefined): string | null {
  const ref = image?.asset?._ref;
  if (!ref) return null;

  const parts = ref.split("-");
  if (parts.length < 4 || parts[0] !== "image") return null;

  const [, assetId, dimensions, format] = parts;
  return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${assetId}-${dimensions}.${format}`;
}
