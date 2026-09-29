import { Card } from "@/components/ui/Card";
import type { ServiceTime } from "@/lib/content/types";

export function ServiceTimesList({ services }: { services: ServiceTime[] }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service) => (
        <li key={service.id}>
          <Card className="flex h-full flex-col">
            <p className="text-sm font-semibold uppercase tracking-[0.12em] text-gold">
              {service.pattern}
            </p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{service.title}</h3>
            <p className="mt-1 text-lg font-medium text-accent">{service.time}</p>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">{service.description}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
