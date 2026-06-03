import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
