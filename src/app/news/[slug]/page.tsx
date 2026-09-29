import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContentBody } from "@/components/blocks/ContentBody";
import { PageHeader } from "@/components/blocks/PageHeader";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getNews, getNewsPost } from "@/lib/content";

export async function generateStaticParams() {
  const posts = await getNews();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function NewsPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getNewsPost(slug);
  if (!post) notFound();

  const date = post.date
    ? new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(post.date))
    : null;

  return (
    <>
      <PageHeader eyebrow={date ?? "News"} title={post.title} image={post.coverImage} />
      <Container className="py-16">
        <ContentBody blocks={post.body} />
        <div className="mt-10">
          <ButtonLink href="/news" variant="secondary">
            All news
          </ButtonLink>
        </div>
      </Container>
    </>
  );
}
