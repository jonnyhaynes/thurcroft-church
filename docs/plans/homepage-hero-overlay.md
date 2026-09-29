# Homepage hero — full-bleed image with overlaid text

**Branch:** `feat/homepage-hero-overlay`
**Status:** awaiting human approval — no code written yet (`docs/dev-workflow.md`, step 2)

## 1. What and why

The homepage hero is currently a two-column block: text on the left, the photograph in a bordered
card on the right, at roughly half the viewport. It reads as a document, not an arrival.

The parish's stated goal (`docs/plans/website-rebuild.md`) is a site that looks **timeless, calm and
un-cheesy — not a template, not stock-photo soup**. So the aim is not more decoration. It is one
confident image, a larger voice, and less furniture: the photograph fills the section, the words sit
on it, and the card border and half-width split go away.

## 2. Acceptance criteria

The contract for this change. There is no test runner, so each is verified by hand and checked off in
the PR (per `docs/dev-workflow.md`, step 4).

1. The hero image fills the full width of the section at every breakpoint, with no card border or
   visible letterboxing.
2. The eyebrow, `<h1>`, lead paragraph and both CTAs render **on** the photograph.
3. Every text run meets **WCAG 2.2 AA contrast** (4.5:1 normal text, 3:1 for the large `<h1>`) against
   the pixels actually behind it — verified by sampling the rendered screenshot, not by assumption.
4. The eyebrow, `<h1>` and primary CTA are the three things a squint test resolves first.
5. Keyboard: tab to both CTAs shows a **visible** focus ring (the global ring is dark teal and would
   be invisible on a dark photograph — see §5).
6. One `<h1>` per page, unchanged; the hero remains the page's only `<h1>`.
7. No horizontal scroll at 320px; no clipping at 200% zoom.
8. `npm run lint`, `npm run typecheck`, `npm run build` all pass.

## 3. Composition

- **Lane:** asymmetric, text anchored bottom-left. The photograph's subject (tower and arched west
  window) sits in the left third, so leading with text on the left keeps the subject beside the words
  rather than under them.
- **Image:** `next/image` with `fill` + `object-cover`, `priority`, `sizes="100vw"`.
  `fill` supersedes the manual `getDimensions()` call in this component (the Image no longer needs
  intrinsic dimensions), so that import comes out of `page.tsx`.
- **Focal point:** `object-position` biased left (~22%) so narrow crops keep the tower and window
  instead of centring on the aisle wall and cropping the subject out. On wide viewports the crop is
  vertical only, so the horizontal bias is a no-op there.
- **Height:** `min-h` floor of ~34rem (mobile) rising to ~46rem (desktop). The section grows with its
  content rather than clipping it.
- **Type:** run the `<h1>` up from `text-4xl/5xl` to `text-4xl → 5xl → 6xl`, `max-w-4xl`, tight
  leading. The lead paragraph is capped at `max-w-xl` to keep the measure readable over the image.

## 4. The contrast problem (the real work)

The photograph is **bright**: a pale blue sky across the top third and a vivid green lawn across the
bottom, with pale stone through the middle. There is no dark region in it to put white text on. Left
alone, paper-coloured text over the church wall lands around 2:1 and fails.

The fix is a deliberate scrim, tuned so it is strong exactly where the words are and clears towards
the top so the sky stays open:

- a bottom-up `ink` gradient, effectively solid below the text, easing to nothing by ~78% height.

Two knock-on effects I need to handle rather than discover later:

- **The eyebrow's gold.** `--color-gold` (#8f7226) is tuned for the paper background. On a dark scrim
  it drops to roughly 2.7:1 and fails for 14px text. I will add one token, `--color-gold-light`, for
  use on dark surfaces only, leaving every existing gold-on-paper use untouched.
- **The focus ring.** `:focus-visible` in `globals.css` is `--color-accent-deep`, which on a dark hero
  is very nearly invisible. The hero's CTAs will carry `focus-visible:outline-paper`, the same
  workaround `PrototypeBanner.tsx` already uses on its ink bar.

I will not claim 4.5:1 from arithmetic. §8 samples the real pixels.

## 5. Files touched

| File | Change |
|---|---|
| `src/app/page.tsx` | Hero section rebuilt; `getDimensions` import removed (unused after `fill`) |
| `src/styles/globals.css` | `--color-gold-light` token; hero entrance keyframes |
| `src/components/ui/Button.tsx` | Two variants the hero needs on a dark ground: `inverse` (solid paper) and `inverseOutline` |

The hero stays inline in `page.tsx` — it is used once, and extracting a one-caller component is
churn. If a second dark hero appears, extract it then.

**Why the button variants are in scope:** the existing `secondary` variant is ink-on-paper
(`border-ink/25 text-ink`) and is invisible on a dark ground, and `ghost` is `text-accent`, which
fails contrast on dark. The hero needs two legible actions, so the variants belong in the component
rather than as class overrides — overriding `bg-accent` with `bg-paper` through the `className` prop
depends on Tailwind's internal utility ordering and is brittle.

## 6. Motion

One entrance, once, on load: the eyebrow, `<h1>`, lead and CTAs rise in sequence — `opacity` +
~14px `translateY` + a small `blur` clear, staggered ~100ms, ~640ms each, quart-style ease.

Written as **opt-in**: the animation is declared only inside
`@media (prefers-reduced-motion: no-preference)`, so with reduced motion requested the hero simply
renders — no animation, no delay, no flash of missing text. This complements the blanket
`0.01ms` override already in `globals.css` rather than relying on it.

`transform`/`opacity`/`filter` only; nothing animates a layout property.

## 7. Deliberately refused

- **Ken Burns / slow zoom on the image** — a looping animation running near reading content, and
  under §2's "anything moving on its own for over 5s needs a pause control" it would need one.
- **Scroll parallax** — first thing cut under reduced motion; it buys nothing here.
- **Scroll-jacking, scroll-triggered reveals of every later section** — same reason, plus it delays
  an audience that is largely older and local.
- **A transparent header floating over the hero** — a bigger change that would affect inner pages.
  Worth considering later; not this ticket.

## 8. How I will verify

1. `npm run lint && npm run typecheck && npm run build`.
2. Run the dev server and screenshot the hero at **320 / 375 / 768 / 1440**.
3. **Sample the rendered pixels** behind the eyebrow, `<h1>`, lead and CTAs in the screenshot and
   confirm the measured ratios clear 4.5:1 (3:1 for the `<h1>`). If a run fails, adjust the scrim and
   re-measure — the numbers go in the PR.
4. Walk the hero by keyboard and confirm both focus rings are visible on the dark ground.
5. Re-run with `prefers-reduced-motion: reduce` and confirm the text appears immediately with no
   animation.
6. Stop the dev server.

## 9. Risks and limits I cannot design away

- **The photograph is the ceiling on "wow".** It is a bright, documentary, mid-day snapshot with mild
  clutter at the edges (neighbouring houses left, a bin store and bare tree right). A scrim dark
  enough to carry text also flattens the image, so the gain here is composition and voice, not
  drama. **A stronger photograph — golden hour or dusk light, or a portrait crop of the tower and
  west window — is what would actually unlock a cinematic hero.** The current file is placeholder
  material (`README.md`), so this is a curation task for the parish, not a code change. I will not
  paper over it with effects.
- **The prototype notice bar** is `sticky bottom-0`, so it overlays the bottom of the viewport and
  will sit over the foot of the hero. The hero's bottom padding has to clear it, and the bar's height
  changes with how the text wraps, so I will check the CTAs are not covered at each breakpoint and
  tune the padding to suit. Long term the bar and a tall hero are in tension; noted, not solved here.
- A brighter hero makes the ink-bottomed hero meet the paper content below on a hard edge. That is
  intentional — it is the page's strongest tonal break, and it puts the photograph at the top.

## 10. Out of scope

Inner-page `PageHeader`, the header/nav, and every section below the hero on the homepage. The hero
alt text is unchanged.
