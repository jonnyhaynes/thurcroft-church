import type { MetadataRoute } from "next";

import { getAllPages, getEvents, getNews } from "@/lib/content";
import { site } from "@/lib/site";

const staticRoutes = [
  "",
  "/services",
  "/events",
  "/news",
  "/gallery",
  "/give",
  "/contact",
  "/accessibility",
  "/privacy",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [pages, events, news] = await Promise.all([getAllPages(), getEvents(), getNews()]);

  const url = (path: string) => `${site.url}${path}`;

  return [
    ...staticRoutes.map((path) => ({
      url: url(path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...pages.map((page) => ({
      url: url(`/${page.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...events.map((event) => ({
      url: url(`/events/${event.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...news.map((post) => ({
      url: url(`/news/${post.slug}`),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
