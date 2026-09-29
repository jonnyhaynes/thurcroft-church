# St Simon & St Jude, Thurcroft — website

> ## ⚠️ This is a prototype, not a live website
>
> This repository is an **exploratory prototype / demonstration build**. It is **not** the live
> website of St Simon and St Jude, Thurcroft, and it is **not affiliated with, commissioned by or
> endorsed by** the parish, the Diocese of Sheffield, or the Church of England.
>
> Nothing here is production-ready: the content was assembled from publicly available sources
> (chiefly the parish's [A Church Near You](https://www.achurchnearyou.com/church/17517/) listing)
> for demonstration purposes, the photography is used as placeholder material, and some details
> are known to be unverified or unresolved (see [Outstanding items](#outstanding-items)).
>
> Do not deploy this as the parish's real website without the parish's involvement and consent.

A prototype website for St Simon and St Jude Parish Church, Thurcroft (Rotherham). Built to explore
how an accessible, fast, timeless and cheap-to-run site could work for a small parish.

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4 with a small set of design tokens
- **CMS:** Sanity (schemas ready; see `docs/sanity-setup.md`)
- **Hosting:** Vercel (free tier)

## Getting started

```bash
npm install
npm run dev
```

Visit <http://localhost:3000>. The site runs on local seed content
(`src/lib/content/seed.ts`) until Sanity credentials are provided — it builds and runs with no
CMS attached.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build |
| `npm run start` | Run the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript, no emit |

## Project structure

```
src/app/            Routes (App Router)
src/components/     UI primitives, layout shell, content blocks, forms
src/lib/site.ts     Site-wide config: name, address, nav, contact, social
src/lib/content/    Content layer + seed content (the CMS seam)
src/sanity/         Sanity schema types
sanity.config.ts    Sanity Studio config
docs/               Setup, editor guide, alt text review, original plan
```

## Content

All content currently lives in `src/lib/content/seed.ts`, assembled from the parish's
A Church Near You listing with a light editorial pass. To move to the CMS, see
`docs/sanity-setup.md`.

**Content is not covered by the code licence** — see [Licence](#licence).

## Accessibility

Targeting WCAG 2.2 AA: semantic landmarks, a skip link, keyboard-operable navigation and gallery,
visible focus, labelled form fields, reduced-motion support, and required alt text on images.
See `/accessibility` for the draft public statement.

Photo alt text is currently **provisional** and needs review — see `docs/alt-text-review.md`.

## Outstanding items

- [ ] Register a domain and set `NEXT_PUBLIC_SITE_URL`
- [ ] Supply the parish email address (`src/lib/site.ts`)
- [ ] Confirm the Sunday service time (ACNY contact page says 11:30am, services page 10:30am)
- [ ] Confirm the Wednesday said Communion frequency
- [ ] Set up the form provider and `WEB3FORMS_ACCESS_KEY`, and the destination inbox
- [ ] Review photo alt text — see `docs/alt-text-review.md`
- [ ] Migrate the latest news and photos from the parish's Facebook page
- [ ] Connect Sanity and move content into the CMS — see `docs/sanity-setup.md`
- [ ] Have the PCC review the privacy notice and accessibility statement before any real use
- [ ] Keep the A Church Near You listing live and pointed at the site

## Licence

**Code:** MIT — see [LICENSE](LICENSE). You are free to reuse the code.

**Content:** the text, names, contact details and photographs relating to St Simon and St Jude,
Thurcroft are the property of the parish or their respective owners. They are included in this
repository **for demonstration purposes only**, are **not** covered by the MIT licence, and should
not be reused elsewhere without permission.

## Disclaimer

Provided as-is, with no warranty of any kind. This is unaffiliated prototype work and does not
represent the parish. If you are looking for the real church, please use
[A Church Near You](https://www.achurchnearyou.com/church/17517/).
