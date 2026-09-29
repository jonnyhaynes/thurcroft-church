import { createClient, type SanityClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

/**
 * True once a Sanity project id is supplied via env. Until then the site is
 * served from local seed content (src/lib/content/seed.ts).
 */
export const isSanityConfigured = Boolean(projectId);

export const client: SanityClient | null = isSanityConfigured
  ? createClient({
      projectId: projectId as string,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;
