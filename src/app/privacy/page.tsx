import type { Metadata } from "next";

import { ContentBody } from "@/components/blocks/ContentBody";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import type { Block } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How St Simon and St Jude, Thurcroft handles your information.",
};

const blocks: Block[] = [
  {
    _type: "paragraph",
    text: "This notice explains how St Simon and St Jude Parish Church, Thurcroft (the data controller) handles personal information collected through this website.",
  },
  { _type: "heading", text: "Information we collect" },
  {
    _type: "paragraph",
    text: "If you use our enquiry form we collect your name, email address, optional phone number, the topic of your enquiry, and your message. We use this only to respond to your enquiry.",
  },
  {
    _type: "paragraph",
    text: "We do not use advertising cookies, and we do not track you across other websites. Our analytics, where used, are privacy-friendly and do not identify you.",
  },
  { _type: "heading", text: "How long we keep it" },
  {
    _type: "paragraph",
    text: "We keep enquiry messages only for as long as needed to deal with your enquiry and for any necessary parish records.",
  },
  { _type: "heading", text: "Sharing" },
  {
    _type: "paragraph",
    text: "Enquiry messages are delivered to the parish by a form-handling service acting on our behalf. The embedded map is provided by OpenStreetMap. We do not sell your information.",
  },
  { _type: "heading", text: "Your rights" },
  {
    _type: "paragraph",
    text: "You have the right to ask for a copy of the information we hold about you, and to ask us to correct or delete it. Please contact the parish to make a request.",
  },
  { _type: "heading", text: "Contact" },
  {
    _type: "paragraph",
    text: `${site.name}, ${site.address.street}, ${site.address.locality}, ${site.address.region} ${site.address.postcode}. Telephone ${site.phone}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Information" title="Privacy notice" />
      <Container className="py-16">
        <ContentBody blocks={blocks} />
        <p className="mt-10 text-sm text-ink-mute">
          This notice is a starting point and should be reviewed by the PCC before launch.
        </p>
      </Container>
    </>
  );
}
