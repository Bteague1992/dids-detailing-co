import type { NextConfig } from "next";

// The eight towns with a city page. Redirects only match these, so a made-up
// town still gets a real 404 instead of being redirected somewhere.
const CITY = ":city(hickory|morganton|lenoir|valdese|conover|newton|granite-falls|long-view)";
const cityPage = "/mobile-car-detailing/:city/nc";

/**
 * A permanent redirect for both the bare and trailing-slash form of an old
 * URL, each going straight to the final URL in one hop.
 */
function permanent(source: string, destination: string) {
  return [
    { source, destination, permanent: true },
    { source: `${source}/`, destination, permanent: true },
  ];
}

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  // Next's built-in "/page/" -> "/page" redirect runs before the redirects
  // below, which would turn "/gallery/" into two hops (/gallery/ -> /gallery
  // -> /portfolio). It's switched off here and re-added as the LAST rule in
  // redirects(), so old URLs with a trailing slash redirect in a single hop
  // and every other URL keeps the same trailing-slash behavior as before.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // =====================================================================
      // PERMANENT REDIRECTS — DO NOT REMOVE.
      // These URLs were live and indexed. Each one must keep redirecting
      // (308, treated by Google like a 301) straight to its final URL for as
      // long as the site exists. Removing one turns an old link or search
      // result into a 404 and throws away its ranking.
      // =====================================================================

      // --- 2026-10 consolidation: 53 pages -> 20 (see SEO-URL-MAP.md) ---
      ...permanent("/gallery", "/portfolio"),
      ...permanent("/services/camper-rv-detailing", "/rv-detailing"),
      ...permanent("/services/maintenance-plans", "/dads-club"),
      ...permanent(`/service-areas/${CITY}`, cityPage),
      ...permanent(`/service-areas/${CITY}/maintenance-plans`, cityPage),
      ...permanent(`/service-areas/${CITY}/camper-rv-detailing`, "/rv-detailing"),
      ...permanent(`/mobile-motorcycle-detailing/${CITY}/nc`, "/motorcycle-detailing"),

      // --- Older URL shapes, repointed so none of them chain through a
      // removed page ---
      ...permanent("/services/car-detailing", "/car-detailing"),
      ...permanent("/services/motorcycle-detailing", "/motorcycle-detailing"),
      ...permanent(`/service-areas/${CITY}/car-detailing`, cityPage),
      ...permanent(`/service-areas/${CITY}/motorcycle-detailing`, "/motorcycle-detailing"),
      // Original hyphenated city URLs, e.g. /mobile-car-detailing-hickory-nc
      ...permanent(`/mobile-car-detailing-${CITY}-nc`, cityPage),
      ...permanent(`/mobile-motorcycle-detailing-${CITY}-nc`, "/motorcycle-detailing"),

      // --- Trailing slash: "/anything/" -> "/anything". Must stay LAST so
      // the specific rules above win (see skipTrailingSlashRedirect). ---
      { source: "/:path+/", destination: "/:path+", permanent: true },
    ];
  },
};

export default nextConfig;
