import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentBody } from "@/components/blocks/ContentBody";
import { PageHeader } from "@/components/blocks/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getEvent, getEvents } from "@/lib/content";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) return {};
  return { title: event.title, description: event.summary };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getEvent(slug);
  if (!event) notFound();

  return (
    <>
      <PageHeader
        eyebrow={`${event.recurring.day} · ${event.recurring.time}`}
        title={event.title}
        intro={event.summary}
        image={event.image}
      />

      <Container className="py-16">
        <ContentBody blocks={event.body} />

        <dl className="mt-10 grid gap-6 border-t border-line pt-8 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">When</dt>
            <dd className="mt-1 text-lg text-ink">
              {event.recurring.day}, {event.recurring.time}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">Where</dt>
            <dd className="mt-1 text-lg text-ink">{event.venue}</dd>
          </div>
        </dl>

        <ul className="mt-8 flex flex-wrap gap-2">
          {event.tags.map((tag) => (
            <li key={tag} className="rounded-full border border-line px-3 py-1 text-xs text-ink-mute">
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/events" variant="secondary">
            All events
          </ButtonLink>
          <ButtonLink href="/contact">Get in touch</ButtonLink>
        </div>
      </Container>
    </>
  );
}
