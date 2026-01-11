import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/mobile-car-detailing-:slug-nc",
        destination: "/mobile-car-detailing/:slug/nc",
      },
      {
        source: "/mobile-car-detailing-:slug-nc/:path*",
        destination: "/mobile-car-detailing/:slug/nc/:path*",
      },
    ];
  },
};

export default nextConfig;
