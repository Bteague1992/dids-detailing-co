import { createClient } from "@sanity/client";

export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
};

export const isSanityConfigured = Boolean(sanityConfig.projectId);

export const sanityClient = createClient({
  projectId: sanityConfig.projectId || "placeholder",
  dataset: sanityConfig.dataset,
  apiVersion: sanityConfig.apiVersion,
  useCdn: true,
});
