import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dad's Mobile Detailing Co.",
    short_name: "Dad's Detailing",
    description: "Life gets messy. Dad's got it.",
    start_url: "/",
    display: "standalone",
    theme_color: "#2B2B2B",
    background_color: "#FFFFFF",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
