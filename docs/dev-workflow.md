# Thurcroft Church Development Workflow

The repeatable process and standing conventions for building Thurcroft Church. This
captures *how* we build; *what* to build lives in the source-of-truth docs under
`/docs`. Read the relevant sections before starting a piece of work, and flag any
change to a load-bearing decision explicitly rather than slipping it in.

---

## Current state — read this first

This project is an early prototype, and some things the loop below assumes do not
exist yet. Being honest about that beats following a process that isn't real:

- **Deploys happen from `main`.** Vercel builds and deploys `main` automatically, so
  anything merged with a broken build goes straight to production.
- **There is no CI pipeline.** No GitHub Actions. The checks in step 6 are run
  locally by the agent or the person, not enforced by the repo. If you add CI, move
  the check list there and update this doc.
- **There is no test runner.** No Vitest, Jest or `npm test` script. The test-first
  step below is the aspiration; today the gates are `npm run lint`,
  `npm run typecheck` and `npm run build`.
- **There is no formatter.** ESLint only. There is no Prettier config, so don't
  introduce Prettier-style reformatting churn in unrelated files.
- **Sanity is not connected.** Content comes from `src/lib/content/seed.ts` via the
  seam in `src/lib/content/index.ts`. See `docs/sanity-setup.md`.

---

## The loop (per ticket / unit of work)

1. **Orient** -- read the ticket and the relevant repo docs. Work on an isolated
   branch so your work doesn't collide with others'.
2. **Plan** -- have Claude produce an implementation plan and save it to
   `docs/plans/<ticket>.md`. **A human reviews and approves the plan before any code
   is written.** This is the single biggest quality lever: the plan is diffable,
   referenceable, and decoupled from any one Claude session.
3. **Backlog** -- break the approved plan into tracked work (issues / tickets), each
   item carrying its acceptance criteria as the test contract.
4. **Build** -- work the plan task by task. Where there is a test runner, go
   test-first: each acceptance criterion becomes a failing test before the
   implementation. Today there isn't one, so the equivalent is checking each change
   against the running site and stating plainly what you verified and how. Prefer a
   fresh Claude context per task -- it keeps each unit focused and reviewable.
   Review between tasks: does it match the plan, and is the code good?
5. **Review** -- run a code review across the branch. **Vet the findings; don't
   blindly apply them.** Fix the real issues and strengthen any test that passed when
   it shouldn't have.
6. **Ship** -- run the checks green locally, then open a PR:

   ```bash
   npm run lint && npm run typecheck && npm run build
   ```

   There is no CI to wait on yet (see *Current state*), so do not claim a check
   passed unless you ran it.
7. **Land** -- a human reviews the diff against the plan and merges. Then sync the
   main branch, delete the branch, and file any deferred follow-up work as tracked
   tickets.

Automation never moves the human gates: **plan approval (step 2) and the merge
(step 7) are always a person's decision.**

---

## Standing conventions

### Stack & tooling

- **Package manager.** `npm`, with `package-lock.json` committed. Don't mix managers
  or add a second lockfile.
- **TypeScript.** Strict mode; avoid `any`. `npm run typecheck` (`tsc --noEmit`) must
  pass.
- **Testing.** No runner yet. The `PreToolUse` hook in `.claude/hooks/` is dormant
  because `package.json` has no `test` script — it will start routing direct
  `vitest`/`jest` calls through `npm test` as soon as one exists. Add tests before
  this stops being a prototype; content-shaped work (links, alt text, routing) is the
  obvious place to start.
- **Lint.** ESLint (`npm run lint`), green before opening a PR. No Prettier — don't
  reformat files you aren't otherwise changing.
- **Accessibility.** Every change to a page or component is checked against WCAG 2.2
  AA. New images need meaningful alt text; new interactive elements need to be
  keyboard operable.

### Guardrails (`.claude/`)

- `.claude/settings.json` holds this repo's permissions and hooks. It's versioned
  and shared so the guardrails don't depend on everyone remembering.
- A `PreToolUse` hook (`.claude/hooks/guard-test-command.sh`) routes test
  runs through the project's test command so agents and humans stay on the
  same path. It fails open and is removable -- delete the file and the
  `hooks` block in `settings.json` if it gets in the way.
- Sensitive paths are deny-listed and secrets never go in the repo or the model
  (`.env`, keys, client data). Anything touching sensitive data needs an explicit OK.
  This repo has already had personal contact details redacted from its history once.
- If a guardrail gets in the way for a legitimate reason, **change it in the open**
  -- don't route around it silently.

### Git & pull requests

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

---

*This doc is the standing process. Update it when a convention genuinely changes
(and say so), rather than re-deciding per ticket.*
