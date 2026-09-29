"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { getDimensions } from "@/lib/content/image-dims";
import type { ImageRef } from "@/lib/content/types";

export function GalleryGrid({ images }: { images: ImageRef[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const open = useCallback((index: number) => {
    setActive(index);
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  const step = useCallback(
    (delta: number) => {
      setActive((current) => {
        if (current === null) return current;
        return (current + delta + images.length) % images.length;
      });
    },
    [images.length],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setActive(null);
    dialog.addEventListener("close", onClose);
    dialog.addEventListener("cancel", onClose);
    return () => {
      dialog.removeEventListener("close", onClose);
      dialog.removeEventListener("cancel", onClose);
    };
  }, []);

  const current = active === null ? null : images[active];

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.src}>
            <button
              type="button"
              onClick={() => open(index)}
              className="group block w-full overflow-hidden rounded-card border border-line"
            >
              <span className="sr-only">View larger image: {image.alt}</span>
              <Image
                src={image.src}
                alt={image.alt}
                {...getDimensions(image.src)}
                sizes="(min-width: 640px) 33vw, 50vw"
                className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03] sm:h-52"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        aria-label="Photo gallery"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") step(1);
          if (event.key === "ArrowLeft") step(-1);
        }}
        className="m-auto w-[min(92vw,60rem)] rounded-card border border-line bg-paper p-0 backdrop:bg-ink/70"
      >
        {current ? (
          <div className="p-4">
            <Image
              src={current.src}
              alt={current.alt}
              {...getDimensions(current.src)}
              sizes="92vw"
              className="max-h-[70vh] w-full rounded-md object-contain"
            />
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="text-sm text-ink-soft">{current.caption ?? current.alt}</p>
              <div className="flex flex-shrink-0 gap-2">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:bg-paper-deep"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="rounded-full border border-line px-4 py-2 text-sm text-ink hover:bg-paper-deep"
                >
                  Next
                </button>
                <button
                  type="button"
                  onClick={close}
                  className="rounded-full bg-accent px-4 py-2 text-sm text-paper hover:bg-accent-deep"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
