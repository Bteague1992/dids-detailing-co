import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { sitePages } from "@/config/pages";

// Only the 20 indexable pages, each with a real hand-maintained last-modified
// date — see config/pages.ts. No redirected, removed, or noindexed URLs, and
// no changefreq/priority (Google ignores both).
export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map((page) => ({
    // No trailing slash anywhere, including the homepage, to match canonicals.
    url: `${siteConfig.domain}${page.path === "/" ? "" : page.path}`,
    lastModified: page.lastModified,
  }));
}
