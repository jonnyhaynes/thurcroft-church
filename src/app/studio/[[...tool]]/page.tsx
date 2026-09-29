import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { isSanityConfigured } from "@/lib/sanity/client";

import StudioLoader from "./StudioLoader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content studio",
  robots: { index: false, follow: false },
};

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <Container className="py-24">
        <h1 className="font-serif text-3xl text-ink">Content studio is not connected yet</h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
          The editing studio needs a Sanity project. Once{" "}
          <code className="rounded bg-paper-deep px-1.5 py-0.5 text-base">
            NEXT_PUBLIC_SANITY_PROJECT_ID
          </code>{" "}
          is set, this page will show the studio for editing pages, news, events and photos.
        </p>
        <p className="mt-4 text-base text-ink-soft">
          See <code className="rounded bg-paper-deep px-1.5 py-0.5">docs/sanity-setup.md</code> in the
          project for the steps.
        </p>
      </Container>
    );
  }

  return <StudioLoader />;
}
