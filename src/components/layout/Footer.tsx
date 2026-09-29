import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { footerNav, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-line bg-paper-deep">
      <Container className="py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="font-serif text-xl text-ink">{site.name}</p>
            <p className="mt-1 text-sm uppercase tracking-[0.16em] text-ink-mute">{site.tagline}</p>
            <address className="mt-5 not-italic text-sm leading-relaxed text-ink-soft">
              {site.address.street}
              <br />
              {site.address.locality}, {site.address.region}
              <br />
              {site.address.postcode}
            </address>
            <p className="mt-4 text-sm text-ink-soft">
              <a href={site.phoneHref} className="no-underline hover:text-accent">
                {site.phone}
              </a>
            </p>
            <div className="mt-5 flex gap-4 text-sm">
              <a
                href={site.social.facebook}
                rel="noopener noreferrer"
                target="_blank"
                className="text-ink-soft no-underline hover:text-accent"
              >
                Facebook
              </a>
              <a
                href={site.social.instagram}
                rel="noopener noreferrer"
                target="_blank"
                className="text-ink-soft no-underline hover:text-accent"
              >
                Instagram
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink">{group.heading}</h2>
              <ul className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-ink-soft no-underline hover:text-accent">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-6 text-sm text-ink-mute">
          <p>
            &copy; {year} {site.name}, {site.tagline}. Part of a Mission Area with{" "}
            {site.missionArea}.
          </p>
          <p className="mt-2">
            An &ldquo;excepted charity&rdquo;. Find us on{" "}
            <a
              href="https://www.achurchnearyou.com/church/17517/"
              rel="noopener noreferrer"
              target="_blank"
              className="no-underline hover:text-accent"
            >
              A Church Near You
            </a>
            .
          </p>
        </div>
      </Container>
    </footer>
  );
}
