import type { Metadata } from "next";

import { ServiceTimesList } from "@/components/blocks/ServiceTimesList";
import { PageHeader } from "@/components/blocks/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getHeroImage, getServiceTimes, getWeeklyActivities } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services & times",
  description:
    "Service times and weekly activities at St Simon and St Jude, Thurcroft — Holy Communion, All Age Service and said Communion.",
};

export default async function ServicesPage() {
  const [services, activities, image] = await Promise.all([
    getServiceTimes(),
    getWeeklyActivities(),
    getHeroImage(),
  ]);

  return (
    <>
      <PageHeader
        eyebrow="Worship"
        title="Services and times"
        intro="We meet throughout the month for Holy Communion and all-age worship. Everyone is welcome at every service."
        image={image}
      />

      <Container className="py-16">
        <SectionHeading eyebrow="Sunday and midweek" title="Our regular services" />
        <div className="mt-10">
          <ServiceTimesList services={services} />
        </div>
      </Container>

      <section className="border-y border-line bg-paper-deep">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Community"
            title="Through the week"
            intro="Beyond our services, the church is a busy and welcoming place."
          />
          <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {activities.map((activity) => (
              <div key={activity.id} className="border-t border-line pt-5">
                <dt className="font-serif text-xl text-ink">{activity.name}</dt>
                <dd className="mt-1 text-sm font-medium text-accent">{activity.when}</dd>
                <dd className="mt-2 text-base leading-relaxed text-ink-soft">
                  {activity.description}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <Container className="py-16">
        <Card className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-2xl text-ink">Your first visit</h2>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft">
              {site.welcome}
            </p>
          </div>
          <ButtonLink href="/contact" size="lg" className="flex-shrink-0">
            Get in touch
          </ButtonLink>
        </Card>
      </Container>
    </>
  );
}
