import type { Metadata } from "next";

import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { PageHeader } from "@/components/blocks/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getFacilities } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact and find us",
  description:
    "Contact St Simon and St Jude, Thurcroft. Church Street, Thurcroft, Rotherham S66 9LH. Telephone 01909 318059.",
};

export default async function ContactPage() {
  const facilities = await getFacilities();

  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact and find us"
        intro="Whether you have a question, would like to arrange a wedding or baptism, or simply want to say hello, we would love to hear from you."
      />

      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-8">
            <Card>
              <h2 className="font-serif text-2xl text-ink">Where to find us</h2>
              <address className="mt-4 not-italic text-lg leading-relaxed text-ink-soft">
                {site.name}
                <br />
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.region}
                <br />
                {site.address.postcode}
              </address>
              <p className="mt-4 text-lg">
                <a href={site.phoneHref} className="text-accent no-underline hover:underline">
                  {site.phone}
                </a>
              </p>
              <p className="mt-6">
                <ButtonLink href={site.directionsUrl} variant="secondary" external>
                  Get directions
                </ButtonLink>
              </p>
            </Card>

            <Card>
              <h2 className="font-serif text-2xl text-ink">When we are open</h2>
              <ul className="mt-4 space-y-3 text-lg leading-relaxed text-ink-soft">
                <li>
                  <strong className="font-medium text-ink">Sundays:</strong> services at 10:30am
                </li>
                <li>
                  <strong className="font-medium text-ink">Thursdays:</strong> open 9:30am–12:30pm
                </li>
              </ul>
              <p className="mt-4 text-base text-ink-soft">
                The church is open on different days and times throughout the week — please{" "}
                <a href="#enquiry" className="text-accent no-underline hover:underline">
                  ask us
                </a>{" "}
                if you would like to visit.
              </p>
            </Card>

            <Card>
              <h2 className="font-serif text-2xl text-ink">Getting here</h2>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">{site.welcome}</p>
              {site.email ? (
                <p className="mt-4 text-base">
                  Email{" "}
                  <a href={`mailto:${site.email}`} className="text-accent no-underline hover:underline">
                    {site.email}
                  </a>
                </p>
              ) : null}
            </Card>
          </div>

          <div>
            <div className="overflow-hidden rounded-card border border-line">
              <iframe
                title="Map showing the location of St Simon and St Jude, Church Street, Thurcroft"
                src={site.mapEmbedUrl}
                loading="lazy"
                className="h-80 w-full border-0"
              />
            </div>
            <p className="mt-3 text-sm text-ink-mute">
              Map data &copy;{" "}
              <a
                href="https://www.openstreetmap.org/copyright"
                rel="noopener noreferrer"
                target="_blank"
                className="no-underline hover:text-accent"
              >
                OpenStreetMap
              </a>{" "}
              contributors. If the map does not load, use our address above or{" "}
              <a
                href={site.directionsUrl}
                rel="noopener noreferrer"
                target="_blank"
                className="no-underline hover:text-accent"
              >
                open directions in Google Maps
              </a>
              .
            </p>

            <div id="enquiry" className="mt-12 scroll-mt-24">
              <h2 className="font-serif text-3xl text-ink">Send us a message</h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-soft">
                Fill in the form below and we will get back to you. Fields marked with * are
                required.
              </p>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <section className="border-y border-line bg-paper-deep">
        <Container className="py-16">
          <SectionHeading
            eyebrow="Facilities"
            title="Access and facilities"
            intro="We want everyone to be able to take part fully in the life of our church."
          />
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((group) => (
              <div key={group.heading}>
                <h3 className="font-serif text-xl text-ink">{group.heading}</h3>
                <ul className="mt-3 space-y-2 text-base leading-relaxed text-ink-soft">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
