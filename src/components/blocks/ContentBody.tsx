import Image from "next/image";

import { getDimensions } from "@/lib/content/image-dims";
import type { Block } from "@/lib/content/types";

export function ContentBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="max-w-3xl">
      {blocks.map((block, index) => {
        switch (block._type) {
          case "paragraph":
            return (
              <p key={index} className="mt-5 text-lg leading-relaxed text-ink-soft">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2 key={index} className="mt-10 font-serif text-2xl text-ink sm:text-3xl">
                {block.text}
              </h2>
            );
          case "list": {
            const ListTag = block.style === "number" ? "ol" : "ul";
            return (
              <ListTag
                key={index}
                className={`mt-5 space-y-2 pl-6 text-lg leading-relaxed text-ink-soft ${
                  block.style === "number" ? "list-decimal" : "list-disc"
                }`}
              >
                {block.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ListTag>
            );
          }
          case "image":
            return (
              <figure key={index} className="mt-8">
                <div className="overflow-hidden rounded-card border border-line">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    {...getDimensions(block.src)}
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="h-auto w-full object-cover"
                  />
                </div>
                {block.caption ? (
                  <figcaption className="mt-3 text-sm text-ink-mute">{block.caption}</figcaption>
                ) : null}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={index} className="mt-8 border-l-4 border-gold pl-5">
                <p className="font-serif text-xl leading-relaxed text-ink">{block.text}</p>
                {block.attribution ? (
                  <footer className="mt-2 text-sm text-ink-mute">— {block.attribution}</footer>
                ) : null}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
