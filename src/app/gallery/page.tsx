import type { Metadata } from "next";

import { GalleryGrid } from "@/components/blocks/GalleryGrid";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Container } from "@/components/ui/Container";
import { getGallery } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs of St Simon and St Jude Parish Church, Thurcroft.",
};

export default async function GalleryPage() {
  const images = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Our church in pictures"
        intro="A selection of photographs of our church and the life of the parish. Select any photograph to view it larger."
      />
      <Container className="py-16">
        <GalleryGrid images={images} />
      </Container>
    </>
  );
}
