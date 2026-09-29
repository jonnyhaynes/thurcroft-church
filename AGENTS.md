# Agent guidance

The full context file for agents working in this repo is **[CLAUDE.md](./CLAUDE.md)** —
what the project is, the stack, the load-bearing principles, scope boundaries, and the
PR conventions.

`CLAUDE.md` is the single source of truth; this file only exists so that agents which
look for `AGENTS.md` find their way there. Please don't duplicate its content here, or
the two will drift.

Quick orientation, in case you read no further:

- **This is a prototype, not the parish's live website** — see the disclaimer in
  `README.md`.
- **It is deliberately kept out of search engines** (notice bar, `robots.txt`,
  `noindex`, `X-Robots-Tag`). Don't remove those protections casually.
- **No personal data, and no photographs of identifiable people**, especially
  children, without the parish's consent.
- **Accessibility (WCAG 2.2 AA) is a requirement**, not a polish step.
- **Don't commit straight to `main`** — branch, then open a PR for a human to review
  and merge. See `docs/dev-workflow.md`.
