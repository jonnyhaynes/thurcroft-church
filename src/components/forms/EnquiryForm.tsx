"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const topics = [
  "General enquiry",
  "Weddings",
  "Baptisms and christenings",
  "Memorial book",
  "Hall hire",
  "School uniform swap point",
  "Something else",
];

const fieldClass =
  "mt-2 block w-full rounded-md border border-line bg-white px-4 py-3 text-base text-ink placeholder:text-ink-mute";

export function EnquiryForm({ configured }: { configured: boolean }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("sending");
    setMessage("");

    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (response.ok && data.ok) {
        form.reset();
        setStatus("success");
        return;
      }

      setStatus("error");
      setMessage(
        data.error ??
          "Sorry, we could not send your message just now. Please try again, or call us instead.",
      );
    } catch {
      setStatus("error");
      setMessage("Sorry, we could not send your message just now. Please try again, or call us instead.");
    }
  }

  // Without a form provider configured, the form cannot deliver anything. Showing it
  // anyway means someone fills in six fields and only then finds out it did not work.
  if (!configured) {
    return (
      <div className="rounded-card border border-line bg-white p-6">
        <h3 className="font-serif text-2xl text-ink">Please contact us directly</h3>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Our online enquiry form is not available yet. In the meantime, please call us or
          call in — we would be glad to hear from you.
        </p>
        <p className="mt-4 text-lg">
          <a href={site.phoneHref} className="text-accent no-underline hover:underline">
            {site.phone}
          </a>
        </p>
        <p className="mt-1 text-base leading-relaxed text-ink-soft">
          {site.name}, {site.address.street}, {site.address.locality}, {site.address.region}{" "}
          {site.address.postcode}
        </p>
        <p className="mt-4 text-sm text-ink-mute">
          The church is open on Thursday mornings, 9:30am–12:30pm, and on Sunday mornings.
        </p>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card border border-line bg-white p-6">
        <h3 className="font-serif text-2xl text-ink">Thank you — your message has been sent.</h3>
        <p className="mt-3 text-base leading-relaxed text-ink-soft">
          Someone will get back to you as soon as they can. If your enquiry is urgent, please call{" "}
          <a href={site.phoneHref} className="text-accent no-underline hover:underline">
            {site.phone}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium text-ink">
            Your name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium text-ink">
            Email address <span aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="text-sm font-medium text-ink">
            Phone number (optional)
          </label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
        </div>
        <div>
          <label htmlFor="topic" className="text-sm font-medium text-ink">
            What is your enquiry about?
          </label>
          <select id="topic" name="topic" className={fieldClass} defaultValue={topics[0]}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Your message <span aria-hidden="true">*</span>
        </label>
        <textarea id="message" name="message" rows={6} required className={fieldClass} />
      </div>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div aria-live="polite">
        {status === "error" && message ? (
          <p className="mb-4 rounded-md border border-line bg-white p-4 text-sm text-ink">{message}</p>
        ) : null}
      </div>

      <Button type="submit" size="lg" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send your message"}
      </Button>

      <p className="text-sm text-ink-mute">
        We will only use your details to reply to your enquiry. See our{" "}
        <Link href="/privacy" className="text-accent no-underline hover:underline">
          privacy notice
        </Link>
        .
      </p>
    </form>
  );
}
