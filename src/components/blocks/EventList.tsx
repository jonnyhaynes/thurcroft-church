import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { getDimensions } from "@/lib/content/image-dims";
import type { ChurchEvent } from "@/lib/content/types";

export function EventList({ events }: { events: ChurchEvent[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <li key={event.slug}>
          <Card className="flex h-full flex-col p-0">
            {event.image ? (
              <div className="overflow-hidden rounded-t-card border-b border-line">
                <Image
                  src={event.image.src}
                  alt={event.image.alt}
                  {...getDimensions(event.image.src)}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-48 w-full object-cover"
                />
              </div>
            ) : null}
            <div className="flex flex-1 flex-col p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
                {event.recurring.day} · {event.recurring.time}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink">
                <Link href={`/events/${event.slug}`} className="no-underline hover:text-accent">
                  {event.title}
                </Link>
              </h3>
              <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{event.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3 py-1 text-xs text-ink-mute"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </li>
      ))}
    </ul>
  );
}
