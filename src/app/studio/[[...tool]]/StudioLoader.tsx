"use client";

import dynamic from "next/dynamic";

/**
 * The Sanity Studio is a client-only application and cannot be server-rendered.
 * Loading it with `ssr: false` keeps it out of the server bundle entirely.
 */
const Studio = dynamic(() => import("./Studio"), {
  ssr: false,
  loading: () => <p className="p-8 text-ink-soft">Loading the content studio…</p>,
});

export default function StudioLoader() {
  return <Studio />;
}
