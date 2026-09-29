import type { Metadata } from "next";

import { ContentBody } from "@/components/blocks/ContentBody";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/site";
import type { Block } from "@/lib/content/types";

export const metadata: Metadata = {
  title: "Accessibility",
  description:
    "Our commitment to making the St Simon and St Jude, Thurcroft website accessible to everyone.",
};

const blocks: Block[] = [
  {
    _type: "paragraph",
    text: "This website is run by St Simon and St Jude Parish Church, Thurcroft. We want as many people as possible to be able to use it. For example, that means you should be able to change colours, increase text size, zoom in, and navigate the whole site using just a keyboard or a screen reader.",
  },
  { _type: "heading", text: "How accessible this website is" },
  {
    _type: "paragraph",
    text: "We have designed and built this site to meet the Web Content Accessibility Guidelines (WCAG) version 2.2 at level AA. We have aimed for this throughout, including clear headings, strong colour contrast, visible keyboard focus, and text alternatives for images.",
  },
  { _type: "heading", text: "Known limitations" },
  {
    _type: "list",
    style: "bullet",
    items: [
      "Some older photographs may have text alternatives that need reviewing. We are working through these with the church.",
      "The embedded map is provided by OpenStreetMap. We also give the full address and a link to directions as an alternative.",
      "We do not currently provide a BSL video or Easy Read version of the site.",
    ],
  },
  { _type: "heading", text: "Feedback and contact" },
  {
    _type: "paragraph",
    text: `If you find any problems, or think we are not meeting accessibility requirements, please contact us on ${site.phone}. We will consider your request and get back to you.`,
  },
  { _type: "heading", text: "How we test" },
  {
    _type: "paragraph",
    text: "We test the site with automated accessibility tools, keyboard-only navigation, screen readers and browser zoom. If you would like to report an issue, please get in touch.",
  },
];

export default function AccessibilityPage() {
  return (
    <>
      <PageHeader
        eyebrow="Information"
        title="Accessibility statement"
        intro="We are committed to making this website usable by everyone."
      />
      <Container className="py-16">
        <ContentBody blocks={blocks} />
        <p className="mt-10 text-sm text-ink-mute">
          This statement was prepared for the launch of the site. It will be reviewed regularly.
        </p>
      </Container>
    </>
  );
}
