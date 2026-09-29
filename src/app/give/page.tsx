import type { Metadata } from "next";
import Image from "next/image";

import { PageHeader } from "@/components/blocks/PageHeader";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { getDimensions } from "@/lib/content/image-dims";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Support us",
  description:
    "Support the work and ministry of St Simon and St Jude, Thurcroft — donate to the church walls project and our ongoing mission.",
};

export default function GivePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support us"
        title="Give to St Simon and St Jude"
        intro="Support our ministry and mission, and help us care for our much-loved church building."
      />

      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl text-ink">Thurcroft Parish Church walls project</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">
              If you would like to donate to the Thurcroft Parish Church Wall Fund, please use the
              button below and follow the instructions. Thank you.
            </p>
            <p className="mt-8">
              <a
                href={site.givingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-base font-medium text-paper no-underline transition-colors hover:bg-accent-deep"
              >
                Donate to the walls project
              </a>
            </p>
            <p className="mt-4 text-sm text-ink-mute">
              Donations are processed securely by SumUp and open in a new tab.
            </p>

            <h2 className="mt-14 font-serif text-2xl text-ink">Other ways to give</h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              If you would like to talk about giving, a legacy, or volunteering your time, please get
              in touch with us.
            </p>
          </div>

          <Card className="self-start">
            <Image
              src="/images/church/walls-fund-flyer.jpg"
              alt="Fundraising flyer for the Thurcroft Parish Church walls project"
              {...getDimensions("/images/church/walls-fund-flyer.jpg")}
              sizes="(min-width: 1024px) 380px, 100vw"
              className="h-auto w-full rounded-md"
            />
            <p className="mt-4 text-sm text-ink-mute">
              Our fundraising flyer for the walls project.
            </p>
          </Card>
        </div>
      </Container>
    </>
  );
}
