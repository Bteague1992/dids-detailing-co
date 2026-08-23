import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/mobile-car-detailing-:slug-nc",
        destination: "/mobile-car-detailing/:slug/nc",
        permanent: true,
      },
      {
        source: "/mobile-car-detailing-:slug-nc/:path*",
        destination: "/mobile-car-detailing/:slug/nc/:path*",
        permanent: true,
      },
      {
        source: "/mobile-motorcycle-detailing-:slug-nc",
        destination: "/mobile-motorcycle-detailing/:slug/nc",
        permanent: true,
      },
      {
        source: "/mobile-motorcycle-detailing-:slug-nc/:path*",
        destination: "/mobile-motorcycle-detailing/:slug/nc/:path*",
        permanent: true,
      },
      // --- New /services and /service-areas SEO structure vs. pre-existing
      // ranked URLs (see SEO-URL-MAP.md) ---
      // /car-detailing and /motorcycle-detailing already carry real ranking
      // equity, so the equivalent entries under the new /services/[slug]
      // structure are never statically generated (see excludeStaticServiceSlugs
      // in config/service-categories.ts) and instead redirect here.
      {
        source: "/services/car-detailing",
        destination: "/car-detailing",
        permanent: true,
      },
      {
        source: "/services/motorcycle-detailing",
        destination: "/motorcycle-detailing",
        permanent: true,
      },
      // Likewise, /mobile-car-detailing/[city]/nc and
      // /mobile-motorcycle-detailing/[city]/nc already rank per-city (e.g.
      // Morganton has 400+ Search Console impressions) — the car/motorcycle
      // entries under /service-areas/[city]/[service] redirect to them
      // instead of generating a near-duplicate page.
      {
        source: "/service-areas/:city/car-detailing",
        destination: "/mobile-car-detailing/:city/nc",
        permanent: true,
      },
      {
        source: "/service-areas/:city/motorcycle-detailing",
        destination: "/mobile-motorcycle-detailing/:city/nc",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
