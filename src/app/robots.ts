import type { MetadataRoute } from "next";

/**
 * Prototype: this deployment must not appear in search results, so that it
 * cannot be mistaken for the parish's real website. Remove this restriction
 * only if the parish takes the site on and it goes live properly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
