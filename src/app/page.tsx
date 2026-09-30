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
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={hero.src}
          alt={hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[22%_50%]"
        />
        {/* Decorative only: .hero-scrim is defined in globals.css and tuned against
            sampled screenshot pixels, because this photograph is too bright to carry
            paper-coloured text on its own. */}
        <div aria-hidden="true" className="hero-scrim pointer-events-none absolute inset-0" />

        <Container className="relative flex min-h-[32rem] flex-col justify-end pb-16 pt-16 sm:min-h-[38rem] sm:pb-20 lg:min-h-[42rem]">
          <p className="rise text-sm font-semibold uppercase tracking-[0.16em] text-gold-light">
            {site.tagline}
          </p>
          <h1 className="rise rise-1 mt-4 max-w-4xl font-serif text-4xl leading-[1.08] text-paper sm:text-5xl lg:text-6xl">
            Everyone is welcome at {site.name}.
          </h1>
          <p className="rise rise-2 mt-6 max-w-xl text-lg leading-relaxed text-paper/90">
            At the heart of the community it serves. A warm, inclusive, family-friendly church in
            Thurcroft, Rotherham — part of a Mission Area with {site.missionArea}.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink
              href="/services"
              variant="inverse"
              size="lg"
              className="focus-visible:outline-paper"
            >
              Service times
            </ButtonLink>
            <ButtonLink
              href="/contact"
              variant="inverseOutline"
              size="lg"
              className="focus-visible:outline-paper"
            >
              Plan a visit
            </ButtonLink>
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
