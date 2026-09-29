# St Simon & St Jude, Thurcroft — Website Rebuild Plan

## 1. Context & goals

**Client:** St Simon and St Jude, Thurcroft (Church of England parish, Rotherham, S66 9LH).
Part of a Mission Area with St Leonard's, Dinnington. An "excepted charity" (not Charity Commission registered).

**Current state:** Two live sources of content:
- the **ACNY listing** (`achurchnearyou.com/church/17517`) — the "official" directory entry; and
- the **Facebook page** (`facebook.com/SaintSimonandSaintJude`) — by far the **most active** channel, holding
  the **latest news and the much larger photo library**.

The old site `thurcroftchurch.co.uk` **is dead** (times out). The repo
(`/Users/jonnyhaynes/Projects/claude/church`) is **empty** — this is a greenfield build.

**Goals**
- A real, owned website that looks **timeless, calm and un-cheesy** — not a template, not stock-photo soup.
- **Accessible** (target WCAG 2.2 AA) and **easy to use** for a largely older, local congregation.
- **Free to host**, ~£10/yr total (domain only). Maintained by a **non-technical volunteer**.
- Consolidate ACNY **and Facebook** content into one owned, well-designed home, and lightly improve it.

## 2. Decisions (locked with user)

| Area | Decision |
|---|---|
| Framework | **Next.js (App Router) + TypeScript** |
| CMS | **Sanity v3** (hosted Studio, free tier) |
| Hosting | **Vercel** free (fallback: Cloudflare Pages if Hobby terms are a concern) |
| Scope v1 | Core pages + service times + events calendar + news + giving + photo gallery |
| Domain | **Register new** (old domain unusable) |
| Editor | **Non-technical volunteer** → CMS must be friendly, with docs + training |

## 3. Stack & running costs

- **Next.js 15 (App Router), TypeScript, Tailwind CSS v4**, `next/font`, `next/image`.
- **Sanity v3** as headless CMS, embedded Studio at `/studio`. Free tier is ample for a parish
  (a few editors, thousands of documents) — verify current limits at sanity.io/pricing before signup.
- **Vercel Hobby**: £0. Note its "non-commercial" clause — a church charity qualifies; if we want zero
  ambiguity, Cloudflare Pages has no such clause and also deploys Next.js.
- **Forms**: no-backend provider (Web3Forms or Formspree free tier) behind a honeypot + optional
  Cloudflare Turnstile. Alternative if we want full control: a Next.js route handler + Resend (free 3k/mo).
- **Analytics**: cookieless, no-consent-banner option — Cloudflare Web Analytics or Vercel Web Analytics (£0).
- **Domain**: new `.uk`/`.org.uk`, ~£8–10/yr (needs a UK address — they have one).

**Total: ~£10/year.**

## 4. Information architecture (sitemap)

```
/                       Home — hero, welcome, service times, next event, latest news, give CTA
/about                  About us (Thurcroft history — from ACNY "About us")
/services               Days & Times of Services (regular pattern)
/events                 What's On — recurring + one-off events, add-to-calendar
/news  /news/[slug]     News & notices (e.g. "A New Roof…", migrated Facebook posts)
/gallery                Photo gallery (lightbox)
/weddings               Wedding enquiries
/baptisms               Baptism / christening enquiries
/safeguarding           Safeguarding (statutory info + contacts)
/give                   Support us — SumUp donation link, wall fund
/contact                Contact details, enquiry form, map
/find-us                Directions, facilities, accessibility, parking  (may merge into /contact)
/[slug]                 Flexible content pages (Memorial Book, School Uniform Swap Point,
                        Parish Priests, Our Old Church Building, Health & Safety, Website)
/studio                 Sanity Studio (editing)
/accessibility          Accessibility statement
/privacy                Privacy policy
sitemap.xml  robots.txt  (generated)
```

Keep the ACNY listing live and pointed at the new site — it's the CofE directory other people search.
Keep the **Facebook page** active and linked from the footer/contact as the current social channel.

## 5. Sanity content model (`sanity/schemaTypes/`)

- `siteSettings` (singleton) — church name, tagline, address, phone, email, social (Facebook/Instagram),
  giving link, safeguarding officer, footer, default SEO.
- `homepage` (singleton) — hero image/heading, welcome text, featured service block, event & news refs, CTA cards.
- `page` — title, slug, hero, portable-text body, SEO. Powers `/about` and all flexible pages.
- `serviceTime` — label (Holy Communion / All Age / Said), day/pattern (e.g. "1st–3rd Sundays"),
  time, location, notes. Renders the services page + home summary.
- `event` — title, slug, date/time, `recurrence` (weekly/one-off), location, description, tags
  (Family Friendly, Refreshments…), image. Drives "Thursday Mornings" and one-offs; generates `Event` JSON-LD.
- `newsPost` — title, slug, date, cover image, excerpt, body. Also the home for migrated Facebook posts.
- `galleryImage` — image, **required alt**, caption, order.
- `person` — name, role, phone, email (clergy, wardens, Parish Safeguarding Officer).
- `seo` — reusable object for title/description/social image.
- `blockContent` — portable text with accessible image, link, quote, list → React renderer in `components/blocks/PortableText.tsx`.

**Editor safeguards:** alt text required on images (schema validation), slugs auto-from-title,
simple field groups, sensible defaults, and a "preview" note. Non-technical editor should be able to
add a news post, add an event, and change a service time unaided.

## 6. Design direction — timeless, warm, not cheesy

**Principles:** restraint, generous whitespace, real photography of the *actual* church and people,
large readable type, nothing decorative for its own sake.

Inspiration references (from awwwards church search): Friends of Friendless Churches (typographic,
heritage, calm), Cornerstone Church, Soul Church — studied for *layout discipline*, not copied.

- **Typography:** one refined serif for headings (Newsreader or EB Garamond) + one neutral humanist
  sans for body/UI (Inter or Source Sans 3), via `next/font`. Large display sizes, ~65–70ch measure.
- **Colour:** warm off-white "paper" background, deep ink text, a single restrained accent drawn from the
  building (deep slate-blue or muted ochre). All pairs tested to ≥4.5:1. Semantic tokens in `styles/globals.css`.
- **Layout:** 12-col grid, generous section rhythm, clear service-times block, unstyled-but-considered
  cards. Mobile-first; comfortable at 320px.
- **Motion:** minimal — subtle fade/rise on scroll, honour `prefers-reduced-motion`.
- **Imagery:** avoid clichés (sunsets, generic hands, clip-art crosses). Use real photos of *this* church and
  congregation — the **substantial Facebook photo library is the main pool**, topped up by ACNY's six images
  and a small new shoot for hero/seasonal shots.
- **Logo:** the church currently has no proper logo (only a photo). Plan a simple wordmark from the
  church name + a restrained device (or leave as type).

## 7. Accessibility (WCAG 2.2 AA) — a hard requirement, not a nice-to-have

- Semantic landmarks; one `<h1>` per page; logical heading order.
- Skip-to-content link; fully keyboard-operable nav, mobile menu and gallery lightbox.
- Visible focus styles; contrast ≥4.5:1 / ≥3:1; **target size ≥24px**; no drag-only interactions.
- Forms: real `<label>`s, clear error text tied to fields, `autocomplete` tokens.
- Every content image requires alt text (enforced in CMS); decorative images marked as such.
- `prefers-reduced-motion` respected; readable at 200% zoom; passes at 320px.
- Map embed: keyboard-reachable and labelled, lazy-loaded, with a text address fallback.
- Publish an **Accessibility statement** page.
- Verify with axe DevTools (0 critical/serious), Lighthouse a11y = 100, keyboard-only pass,
  VoiceOver spot-check.

## 8. SEO, performance & PII

- Static generation with ISR (`revalidate`) from Sanity; metadata API, `sitemap.ts`, `robots.ts`,
  OpenGraph images, canonical URLs.
- Structured data: `Church`/`Organization` + `Event` (JSON-LD).
- `next/image` with Sanity's CDN (`@sanity/image-url`) — no oversized photo downloads.
- Target Lighthouse ≥95 on all categories.
- Enquiry form emails go to the vicar/parish inbox; document data handling in the privacy policy.

## 9. Content migration (we do this — editor shouldn't have to)

**Sources:** ACNY pages (all retrieved) **plus the Facebook page** (`facebook.com/SaintSimonandSaintJude`).
Facebook is the live, up-to-date channel — latest notices, events and the bulk of the photo library — so it
must be harvested before launch, not just ACNY.

**Facebook harvesting (needs the church's page access — it cannot be scraped):**
- Facebook is JS-gated and its ToS forbid scraping; fetching the page returns only the title. Content must
  come from someone with admin access to the page.
- Preferred method: the page admin runs Facebook's **"Download your information"** export (or downloads the
  albums), and we take post text + photos from that.
- Alternative: work through the page's posts/albums together and copy text + save images manually.
- **Replicate natively — do not embed the Facebook feed.** An embed is slow, third-party-tracked, and would
  break accessibility and the "no cookie banner" goal. Posts become `newsPost` / `event` / `galleryImage`
  documents; the site links *out* to Facebook for the social side.
- Do a one-off **back-catalogue sweep**: every past post worth keeping becomes a dated news item; every good
  photo goes into the gallery with alt text.

Content to port, with a light editorial pass:

| New route | Source | Notes |
|---|---|---|
| `/` welcome | ACNY home | "Welcome to St Simon and St Jude… family friendly, inclusive" |
| `/about` | ACNY About us | Full Thurcroft history — **fix typos**: "costructed", "incumbant", "through out" |
| `/services` | ACNY Days & Times | 1st–3rd Sun Holy Communion 10:30; 4th Sun All Age; Wed after 4th Said HC 10:00 |
| `/weddings` | ACNY Wedding Enquiries | Banns, Thurs/Sun mornings |
| `/baptisms` | ACNY Baptism Enquiries | 1st & 3rd Sundays; booking process |
| `/safeguarding` | ACNY Safeguarding | PSO Rev Dave Johnson [redacted] + Diocesan advisers |
| `/give` | ACNY Fund Raising | SumUp link `pay.sumup.io/b2c/Q618SYSP` + wall fund flyer |
| `/contact` | ACNY Contact Details | Revd. Canon Miranda Hayes, 01909 318059, [redacted] |
| `/events` | ACNY Thursday Mornings + **Facebook events** | Weekly Thu 9:30–12:30; Willows SEN school gardening |
| `/news` | ACNY "A New Roof…" + **Facebook posts** | migrate the Facebook back-catalogue as dated news items |
| flexible pages | Memorial Book, Our Old Church Building, Parish Priests, School Uniform Swap Point, Health & Safety | thin pages; combine where sensible |
| `/gallery` | ACNY (6) **+ Facebook photo library** | the real pool of images; download, re-upload with alt text, curate |

**Discrepancies to resolve during migration (flag to client):**
- Contact page says church open "Sunday morning at 11.30am"; services page says Sunday service is **10.30am**.
- Confirm current service pattern and Wednesday Said HC frequency.

## 10. Project structure (greenfield paths)

```
src/app/            layout.tsx, page.tsx (home), about/, services/, events/, news/[slug]/,
                    gallery/, weddings/, baptisms/, safeguarding/, give/, contact/, find-us/,
                    [slug]/, studio/[[...index]]/, accessibility/, privacy/,
                    api/enquiry/route.ts, api/revalidate/route.ts,
                    sitemap.ts, robots.ts, opengraph-image.tsx
src/components/ui/          Button, Card, Container, SectionHeading, Prose
src/components/layout/      Header, Nav, MobileNav, Footer, SkipLink
src/components/blocks/      Hero, ServiceTimes, EventList, NewsList, GalleryGrid, MapEmbed,
                            PortableText, CtaCards
src/components/forms/       EnquiryForm
src/lib/sanity/             client.ts, image.ts, queries.ts, types.ts
src/styles/globals.css      design tokens
sanity/sanity.config.ts  sanity/schemaTypes/*
scripts/                    migrate-content.ts (ACNY + Facebook → Sanity seed), seed-images.ts
.env.example  next.config.ts  postcss/tailwind  package.json
docs/editor-guide.md  docs/dev-workflow.md  README.md
```

## 11. Delivery phases

1. **Foundations** — register domain; create Sanity + Vercel + GitHub accounts; scaffold Next.js +
   Tailwind + Sanity; CI deploy to a preview URL; design tokens + fonts.
2. **Content model** — schemas + embedded Studio + seed `siteSettings`/`homepage`.
3. **Design system** — layout shell (header/nav/footer/skip link), UI primitives, typography/spacing/colour.
4. **Pages** — home, about, services, events, news (+detail), gallery, weddings, baptisms, safeguarding,
   give, contact/find-us, flexible pages.
5. **Forms, SEO, analytics** — enquiry form + spam protection, metadata, sitemap/robots, JSON-LD, analytics.
6. **Accessibility & performance pass** — axe/Lighthouse/keyboard/screen-reader/zoom; fix findings.
7. **Content migration** — run seed script; **harvest Facebook** (export + back-catalogue sweep) into
   news/events/gallery; re-upload images with alt text; editorial pass; resolve discrepancies.
8. **Launch & handover** — DNS to Vercel, HTTPS, update ACNY link to new site, write `docs/editor-guide.md`,
   walk the volunteer through adding a news post / event / service-time change.

## 12. Verification

- `npm run build` clean; `next lint` + `tsc --noEmit` pass.
- Lighthouse (mobile + desktop): Performance ≥95, Accessibility 100, Best Practices ≥95, SEO 100.
- axe DevTools: zero critical/serious issues on every route.
- Keyboard-only walkthrough of nav, mobile menu, gallery lightbox, and enquiry form.
- VoiceOver spot-check of home, events, and form.
- `prefers-reduced-motion` + 200% zoom + 320px viewport render correctly.
- Enquiry form delivers to the correct inbox; honeypot blocks bots.
- All migrated content present (ACNY **and** Facebook), no placeholder text, every image has meaningful alt text.
- Structured data validates; `sitemap.xml` lists all routes.
- Editor can add a news post, add an event, and edit a service time unaided (rehearse with the volunteer).

## 13. Open questions / risks

- **Domain name** — which to register (e.g. `thurcroftchurch.uk`, `stsimonandstjude.uk`)? Requires client's UK address for a `.uk`.
- **Facebook access** — need admin access (or a "Download your information" export) to migrate the latest
  news, events and the photo library; also confirm whether they want new website posts cross-posted to Facebook.
- **Photography** — ACNY has only ~6 images, but the Facebook page holds many more; the richer pool depends
  on the above access. A short new shoot would still help for hero/seasonal shots.
- **Copy accuracy** — service-time discrepancy (10:30 vs 11:30) and Wednesday HC frequency must be confirmed.
- **Enquiry inbox** — which email(s) receive wedding/baptism/contact form submissions?
- **Vercel Hobby terms** — confirm non-commercial use is acceptable; else use Cloudflare Pages.
- **Sanity limits** — confirm the free tier's current editor/document/bandwidth caps before committing.
- **Giving** — stick with the existing SumUp link, or add Parish Giving Scheme / Give.net?
- **ACNY** — keep it updated in parallel (recommended) — it drives "find a church" traffic.
