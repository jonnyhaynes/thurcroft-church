import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { EventList } from "@/components/blocks/EventList";
import { NewsList } from "@/components/blocks/NewsList";
import { ServiceTimesList } from "@/components/blocks/ServiceTimesList";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  getEvents,
  getHeroImage,
  getNews,
  getServiceTimes,
  getWeeklyActivities,
} from "@/lib/content";
import { getDimensions } from "@/lib/content/image-dims";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  description: site.description,
};

const ctaCards = [
  {
    title: "Weddings",
    body: "Thinking of marrying at Thurcroft Parish Church? Find out how to arrange your day.",
    href: "/weddings",
    cta: "Wedding enquiries",
  },
  {
    title: "Baptisms",
    body: "Baptisms, also known as christenings, take place on the 1st and 3rd Sunday of the month.",
    href: "/baptisms",
    cta: "Baptism enquiries",
  },
  {
    title: "Support us",
    body: "Your giving helps maintain our church building and supports our ministry in Thurcroft.",
    href: "/give",
    cta: "Give now",
  },
];

export default async function HomePage() {
  const [hero, services, events, news, activities] = await Promise.all([
    getHeroImage(),
    getServiceTimes(),
    getEvents(),
    getNews(),
    getWeeklyActivities(),
  ]);

  return (
    <>
      <section className="border-b border-line">
        <Container className="grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-gold">
              {site.tagline}
            </p>
            <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
              Everyone is welcome at {site.name}.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              At the heart of the community it serves. A warm, inclusive, family-friendly church in
              Thurcroft, Rotherham — part of a Mission Area with {site.missionArea}.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/services" size="lg">
                Service times
              </ButtonLink>
              <ButtonLink href="/contact" variant="secondary" size="lg">
                Plan a visit
              </ButtonLink>
            </div>
          </div>
          <div className="overflow-hidden rounded-card border border-line">
            <Image
              src={hero.src}
              alt={hero.alt}
              {...getDimensions(hero.src)}
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <SectionHeading
          eyebrow="Worship"
          title="Service times"
          intro="Whether it is your first visit or your five hundredth, you will find a warm welcome."
        />
        <div className="mt-10">
          <ServiceTimesList services={services} />
        </div>
        <p className="mt-6 text-base text-ink-soft">
          The church is also open every Thursday morning, 9:30am–12:30pm.{" "}
          <Link href="/services" className="text-accent no-underline hover:underline">
            See all services and activities
          </Link>
          .
        </p>
      </Container>

      <section className="border-y border-line bg-paper-deep">
        <Container className="py-16 sm:py-20">
          <SectionHeading
            eyebrow="What's on"
            title="Coming up"
            intro="There is always something happening at St Simon and St Jude."
          />
          <div className="mt-10">
            <EventList events={events} />
          </div>
          <p className="mt-8">
            <ButtonLink href="/events" variant="secondary" size="md">
              See everything on
            </ButtonLink>
          </p>
        </Container>
      </section>

      <Container className="py-16 sm:py-20">
        <SectionHeading eyebrow="News" title="Latest from the parish" />
        <div className="mt-10">
          <NewsList posts={news} />
        </div>
      </Container>

      <Container className="pb-16 sm:pb-20">
        <ul className="grid gap-6 md:grid-cols-3">
          {ctaCards.map((card) => (
            <li key={card.href}>
              <Card className="flex h-full flex-col">
                <h2 className="font-serif text-2xl text-ink">{card.title}</h2>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{card.body}</p>
                <p className="mt-5">
                  <ButtonLink href={card.href} variant="secondary" size="md">
                    {card.cta}
                  </ButtonLink>
                </p>
              </Card>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pb-20">
        <SectionHeading eyebrow="Community" title="Through the week" />
        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {activities.map((activity) => (
            <div key={activity.id} className="border-t border-line pt-5">
              <dt className="font-serif text-xl text-ink">{activity.name}</dt>
              <dd className="mt-1 text-sm font-medium text-accent">{activity.when}</dd>
              <dd className="mt-2 text-base leading-relaxed text-ink-soft">{activity.description}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </>
  );
}
