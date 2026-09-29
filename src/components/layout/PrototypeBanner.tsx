"use client";

import { useState } from "react";

import { Container } from "@/components/ui/Container";

const REPO_URL = "https://github.com/jonnyhaynes/thurcroft-church";

export function PrototypeBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-accent-deep text-paper">
      <Container className="flex items-start gap-4 py-3">
        <p className="flex-1 text-sm leading-relaxed">
          <span className="font-semibold">Prototype.</span> This is a demonstration build. It is not
          the live website of St Simon and St Jude, Thurcroft, and is not affiliated with or endorsed
          by the parish.{" "}
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-1 underline-offset-2 hover:decoration-2"
          >
            Read more
          </a>
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss prototype notice"
          className="-mr-1 -mt-1 inline-flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md hover:bg-white/15"
        >
          <svg
            width="18"
            height="18"
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
