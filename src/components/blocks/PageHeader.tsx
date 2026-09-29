import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { getDimensions } from "@/lib/content/image-dims";
import type { ImageRef } from "@/lib/content/types";

export function PageHeader({
  eyebrow,
  title,
  intro,
  image,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  image?: ImageRef;
}) {
  return (
    <section className="border-b border-line">
      <Container className="py-14 sm:py-20">
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>
        ) : null}
      </Container>
      {image ? (
        <Container className="pb-12">
          <div className="overflow-hidden rounded-card border border-line">
            <Image
              src={image.src}
              alt={image.alt}
              {...getDimensions(image.src)}
              priority
              sizes="(min-width: 1152px) 1152px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </Container>
      ) : null}
    </section>
  );
}
