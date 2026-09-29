import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentBody } from "@/components/blocks/ContentBody";
import { PageHeader } from "@/components/blocks/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getAllPages, getPage } from "@/lib/content";

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.seo?.description ?? page.intro,
  };
}

export default async function ContentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) notFound();

  return (
    <>
      <PageHeader eyebrow={page.eyebrow} title={page.title} intro={page.intro} />
      <Container className="py-16">
        <ContentBody blocks={page.body} />

        <div className="mt-14 rounded-card border border-line bg-paper-deep p-8">
          <h2 className="font-serif text-2xl text-ink">Can we help?</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-soft">
            If you have any questions about {page.title.toLowerCase()}, please do get in touch — we
            would be glad to help.
          </p>
          <p className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Contact us</ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Service times
            </ButtonLink>
          </p>
        </div>
      </Container>
    </>
  );
}
