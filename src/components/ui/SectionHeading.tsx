import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  id?: string;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold">{eyebrow}</p>
      ) : null}
      <h2 id={id} className="font-serif text-3xl leading-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-soft">{intro}</p> : null}
    </div>
  );
}
