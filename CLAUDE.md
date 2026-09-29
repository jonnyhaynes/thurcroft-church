# Claude Code context for Thurcroft Church

This file orients Claude Code on this repo. Keep it lean -- it points, it doesn't
explain. Substantive design and rationale live in `/docs`; read those before any
non-trivial change. A bloated CLAUDE.md is a smell: if a section wants more than a
few lines, move it to its own doc under `/docs` and link it.

## What this is

Prototype website for St Simon and St Jude, Thurcroft — a Church of England parish in
Rotherham. Next.js, TypeScript and Sanity. **Exploration only: not the parish's live
site, and not affiliated with or endorsed by the parish or the diocese.**

Read `README.md` first — it carries the prototype disclaimer, current status and the
outstanding pre-launch items. See `docs/dev-workflow.md` for how we build here.

## Stack

**Node / TypeScript.**

- Next.js 15 (App Router) + React 19, deployed on Vercel. Package manager: `npm`
  (commit `package-lock.json`; don't mix managers).
- Tailwind CSS v4, configured CSS-first through `@theme` in `src/styles/globals.css`.
  The design tokens live there — use them rather than hard-coded colours or spacing.
- Sanity v4 + next-sanity v10. The schemas and the embedded Studio exist, but **no
  Sanity project is connected** and this repo holds no credentials. The site renders
  from seed content; see `docs/sanity-setup.md`.
- Strict TypeScript; avoid `any`. `npm run typecheck` (`tsc --noEmit`) and
  `npm run lint` (ESLint) are the checks. **There is no test runner configured** — if
  you add one, wire it into `docs/dev-workflow.md` at the same time.

## Load-bearing principles

These shape the code. Don't change them without a deliberate, flagged decision.

- **It is a prototype, and must keep saying so.** The notice bar pinned to the bottom
  of every page, the `noindex` metadata, `robots.txt`, and the `X-Robots-Tag` header
  in `next.config.ts` all stay until the parish takes the site on. `README.md` lists
  exactly what to remove if it goes live for real.
- **No personal data in content.** Enquiries route through the parish's public
  telephone number. Do not add individuals' mobile numbers, home addresses or emails
  — personal contact details were deliberately redacted from this repo's history once
  already, and the old values are still in anyone's earlier clone.
- **Accessibility is a requirement, not a polish step.** Target WCAG 2.2 AA: semantic
  landmarks, one `<h1>` per page, a skip link, keyboard-operable navigation and
  gallery, visible focus, labelled form fields, `prefers-reduced-motion`, and
  meaningful alt text on every content image.
- **Don't publish identifiable people.** No photograph showing identifiable
  individuals — and especially children — without the parish confirming consent.
- **Content sits behind one seam.** `src/lib/content/index.ts` is the only place pages
  read content from. Swapping seed content for Sanity must not require touching page
  components.
- **Stay free to run.** Free tiers only (Vercel Hobby, Sanity free tier). Flag
  anything that would introduce a recurring cost.

## Scope boundaries

What this project is **not**, and shouldn't drift towards. If a request would drift
here, push back before building.

- Not the parish's live website, and not a production system.
- Not CMS-backed yet — Sanity is unconnected and has no credentials in this repo.
- Not a booking, payments or donations platform; giving links out to the parish's
  existing SumUp page.
- No user accounts, sessions, database or members' area.
- Not a record-keeping system — no pastoral, safeguarding or personal data belongs in
  this repo.

## How we work (the short version)

Full process: `docs/dev-workflow.md`. The non-negotiables:

- **Plan first.** For non-trivial work, produce an implementation plan saved to
  `docs/plans/<ticket>.md` and have a human approve it before writing code. The
  plan is what gets reviewed, not the first code.
- **A human reviews and merges every PR.** Claude opens the PR with the checks green;
  a named person reviews the diff against the plan and merges. Claude never merges.
- **Never put secrets, credentials, or client data into the model.** If unsure,
  it's out of bounds until you've asked.
- **Mark AI-assisted work.** Prefix AI-assisted PR titles `[ai-assisted]`, reference
  the approved plan doc, and end the description with a `Manually reviewed by <name>`
  line. Keep the `Co-Authored-By` trailer on commits.

## Documents

Source of truth lives in `/docs`. Read the relevant doc before responding:

- `docs/dev-workflow.md` -- how we build (the loop + standing conventions)
- `docs/sanity-setup.md` -- connecting the CMS and swapping the content seam
- `docs/editor-guide.md` -- the plain-English guide for the parish volunteer who edits
  the site; keep it free of jargon
- `docs/alt-text-review.md` -- photo alt text, and the image curation problems that
  still need the parish
- `README.md` -- prototype disclaimer, status, outstanding pre-launch items
- `docs/plans/` -- approved implementation plans

## Working style

- Push back where appropriate rather than agreeing reflexively.
- When changing a load-bearing principle or scope boundary, flag it explicitly
  rather than slipping it in.
- Prefer pointing at a doc section over reproducing its content here.

## Raising pull requests

This project uses **GitHub**. Raise PRs with the `gh` CLI (or the REST API):

- Repo: `jonnyhaynes/thurcroft-church` · Target branch: `main`.
- Push the branch (`git push -u origin <branch>`), then `gh pr create`.
- **Mark AI-assisted PRs:** prefix the title `[ai-assisted]` (or add an `ai-assisted`
  label), reference the approved plan doc (`docs/plans/<ticket>.md`) in the body, and
  end it with a `Manually reviewed by <name>` line confirming the diff was read.
- Keep the `Co-Authored-By` trailer on commits. **A human merges** once the checks
  pass and the diff has been reviewed against the plan.
**Issue tracker: GitHub Issues.** One issue = one unit of work; acceptance criteria
are the test contract. Reference the issue in the branch name and PR, and close it from
the PR (`Closes #NN`) once merged.
