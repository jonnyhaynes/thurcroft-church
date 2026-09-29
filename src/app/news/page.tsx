import type { Metadata } from "next";

import { NewsList } from "@/components/blocks/NewsList";
import { PageHeader } from "@/components/blocks/PageHeader";
import { Container } from "@/components/ui/Container";
import { getNews } from "@/lib/content";

export const metadata: Metadata = {
  title: "News and notices",
  description: "The latest news and notices from St Simon and St Jude, Thurcroft.",
};

export default async function NewsPage() {
  const posts = await getNews();

  return (
    <>
      <PageHeader
        eyebrow="News"
        title="News and notices"
        intro="Keep up to date with life at St Simon and St Jude."
      />
      <Container className="py-16">
        <NewsList posts={posts} />
      </Container>
    </>
  );
}
