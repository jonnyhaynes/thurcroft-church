# Connecting Sanity

The site currently renders from local seed content in `src/lib/content/seed.ts`, so it builds
and runs with no CMS. This document covers connecting the Sanity project.

## 1. Create the project

1. Sign up at <https://www.sanity.io> (free tier is plenty for a parish).
2. Create a project, and a dataset named `production` (public).
3. Note the **project ID**.

## 2. Configure environment

Copy `.env.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SANITY_PROJECT_ID="your-project-id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-01-01"
NEXT_PUBLIC_SITE_URL="https://your-domain.org.uk"
```

In Sanity project settings → **API** → **CORS origins**, add your site URLs
(`http://localhost:3000` and the production domain) and allow credentials.

## 3. Use the studio

Run the site and visit `/studio`. The schemas in `src/sanity/schemaTypes/` define what can be
edited: `siteSettings`, `page`, `serviceTime`, `event`, `newsPost`, `galleryImage`, `person`.

Seed the content by copying the copy from `src/lib/content/seed.ts` into the matching documents.

## 4. Switch the site over to Sanity

`src/lib/content/index.ts` is the single seam. Each function currently returns seed data. Replace
the bodies with GROQ queries, for example:

```ts
import { client } from "@/lib/sanity/client";

const servicesQuery = `*[_type == "serviceTime"] | order(order asc){
  "id": _id, title, pattern, time, description, order
}`;

export async function getServiceTimes(): Promise<ServiceTime[]> {
  if (!client) return seed.serviceTimes;
  return client.fetch(servicesQuery);
}
```

Keep the `if (!client) return seed...` fallback so the site still builds without credentials.

Because every caller already `await`s and pages are statically generated, no page components need
to change. Add `export const revalidate = 60` (or similar) to pages, or a revalidation webhook, so
edits appear without a redeploy.

## 5. Revalidation (optional)

Add a Sanity webhook pointing at `/api/revalidate` to refresh pages when content changes. See the
Sanity docs for webhook setup; the route can call `revalidatePath("/")`.
