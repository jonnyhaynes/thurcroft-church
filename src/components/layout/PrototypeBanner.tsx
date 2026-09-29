"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";

const REPO_URL = "https://github.com/jonnyhaynes/thurcroft-church";

export function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    // `sticky bottom-0` keeps it pinned to the bottom of the screen the whole
    // time you are on the page, without overlaying the footer the way `fixed`
    // would. It sits at the end of the document flow.
    <div className="sticky bottom-0 z-50 border-t-2 border-gold bg-ink text-paper shadow-[0_-4px_16px_rgba(28,26,23,0.25)]">
      <Container className="flex items-start gap-4 py-4">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 flex-shrink-0 text-gold"
        >
          <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>

        <p className="flex-1 text-sm leading-relaxed sm:text-base">
          <span className="font-semibold">Prototype — this is not a live website.</span> A
          demonstration build only. It is not the website of St Simon and St Jude, Thurcroft, and is
          not affiliated with or endorsed by the parish.{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline decoration-1 underline-offset-2 hover:decoration-2"
          >
            Read more
          </a>
        </p>

        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss prototype notice"
          className="-mr-2 -mt-1 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md hover:bg-white/15 focus-visible:outline-paper"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      </Container>
    </div>
  );
}
