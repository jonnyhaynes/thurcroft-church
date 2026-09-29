import type { Metadata } from "next";

import { EventList } from "@/components/blocks/EventList";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Container } from "@/components/ui/Container";
import { getEvents } from "@/lib/content";

export const metadata: Metadata = {
  title: "What's on",
  description:
    "Events and activities at St Simon and St Jude, Thurcroft — Thursday mornings, coffee mornings and more.",
};

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <>
      <PageHeader
        eyebrow="What's on"
        title="Events and activities"
        intro="There is always something happening at St Simon and St Jude. Everyone is welcome — you do not need to book unless we say so."
      />

      <Container className="py-16">
        <EventList events={events} />
      </Container>
    </>
  );
}
