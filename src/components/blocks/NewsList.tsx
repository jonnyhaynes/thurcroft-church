import Image from "next/image";
import Link from "next/link";

import { Card } from "@/components/ui/Card";
import { getDimensions } from "@/lib/content/image-dims";
import type { NewsPost } from "@/lib/content/types";

function formatDate(date?: string) {
  if (!date) return null;
  return new Intl.DateTimeFormat("en-GB", { dateStyle: "long" }).format(new Date(date));
}

export function NewsList({ posts }: { posts: NewsPost[] }) {
  if (posts.length === 0) {
    return <p className="text-lg text-ink-soft">There is no news to show just yet.</p>;
  }

  return (
    <ul className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => {
        const date = formatDate(post.date);
        return (
          <li key={post.slug}>
            <Card className="flex h-full flex-col p-0">
              {post.coverImage ? (
                <div className="overflow-hidden rounded-t-card border-b border-line">
                  <Image
                    src={post.coverImage.src}
                    alt={post.coverImage.alt}
                    {...getDimensions(post.coverImage.src)}
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-6">
                {date ? (
                  <time dateTime={post.date} className="text-sm text-ink-mute">
                    {date}
                  </time>
                ) : null}
                <h3 className="mt-2 font-serif text-2xl text-ink">
                  <Link href={`/news/${post.slug}`} className="no-underline hover:text-accent">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{post.excerpt}</p>
                <p className="mt-4">
                  <Link
                    href={`/news/${post.slug}`}
                    className="text-sm font-medium text-accent no-underline hover:underline"
                  >
                    Read this story
                  </Link>
                </p>
              </div>
            </Card>
          </li>
        );
      })}
    </ul>
  );
}
