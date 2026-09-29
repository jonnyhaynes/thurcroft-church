import * as seed from "./seed";
import type {
  ChurchEvent,
  ContentPage,
  FacilityGroup,
  ImageRef,
  NewsPost,
  ServiceTime,
  WeeklyActivity,
} from "./types";

export * from "./types";

/**
 * Content access layer.
 *
 * Everything currently reads from local seed content so the site builds and runs
 * without a CMS. When the Sanity project is connected, each function should query
 * Sanity instead — see docs/sanity-setup.md. Callers already `await`, and pages
 * are statically generated with ISR, so the swap is contained to this file.
 */

export async function getServiceTimes(): Promise<ServiceTime[]> {
  return seed.serviceTimes;
}

export async function getWeeklyActivities(): Promise<WeeklyActivity[]> {
  return seed.weeklyActivities;
}

export async function getFacilities(): Promise<FacilityGroup[]> {
  return seed.facilityGroups;
}

export async function getEvents(): Promise<ChurchEvent[]> {
  return seed.events;
}

export async function getEvent(slug: string): Promise<ChurchEvent | undefined> {
  return seed.events.find((event) => event.slug === slug);
}

export async function getFeaturedEvent(): Promise<ChurchEvent | undefined> {
  return seed.events.find((event) => event.featured) ?? seed.events[0];
}

export async function getNews(): Promise<NewsPost[]> {
  return seed.news;
}

export async function getNewsPost(slug: string): Promise<NewsPost | undefined> {
  return seed.news.find((post) => post.slug === slug);
}

export async function getGallery(): Promise<ImageRef[]> {
  return seed.gallery;
}

export async function getHeroImage(): Promise<ImageRef> {
  return seed.heroImage;
}

export async function getAllPages(): Promise<ContentPage[]> {
  return seed.pages;
}

export async function getPage(slug: string): Promise<ContentPage | undefined> {
  return seed.pages.find((page) => page.slug === slug);
}
