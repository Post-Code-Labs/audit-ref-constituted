# Agent instructions

> Owner: @builtbydoug. Last reviewed 2026-06-11.

This file is the source of truth for how agents and contributors work in this
repository. It is edited via PR, reviewed by the owner, and checked for
freshness in CI (`.github/workflows/agents-freshness.yml`). The repo itself is
a public reference target for the Post Code Constitution Audit — see
`README.md`.

## Layout

- `packages/core/` — shared utilities, dependency-free and pure.
- `apps/cli/` — the command-line app; depends on `@audit-ref/core`.
- Each package has its own scoped `AGENTS.md`; read it before working there.
- Deeper guidance loads on demand: @docs/architecture.md and @docs/testing.md.

## Conventions

- Source files are camelCase (`formatDuration.ts`); `index.ts` barrels and
  entry points (`main.ts`) excepted.
- Tests are colocated next to source: `formatDuration.test.ts`.
- Import within a package via `./` relative paths **with the `.ts` extension**
  (Node-native type stripping requires it); import across packages via the
  package name (`@audit-ref/core`). Never deep `../../` chains (lint-enforced).
- Packages are non-emitting TypeScript source: `exports` points at
  `src/index.ts` and there is no build step anywhere in the repo.

## Forbidden patterns

- No `any` — narrow the type instead. (Reason: `any` erases the contract the
  next agent relies on. Enforced: `@typescript-eslint/no-explicit-any`.)
- No `enum` — use a union type. (Reason: unions are erasable syntax and
  cheaper to reason about. Enforced: `no-restricted-syntax`.)
- No lodash or other utility libraries — this repo is stdlib-first.
  (Enforced: `no-restricted-imports`.)
- Exceptions require an inline `eslint-disable` with a reason comment and
  owner sign-off in review.

## Verification

Run before declaring work done:

```sh
pnpm run check   # typecheck + lint + format + tests
```

CI (`.github/workflows/check.yml`) runs the same `check` script, so local and
remote signals agree. The pieces individually: `pnpm run typecheck`,
`pnpm run lint`, `pnpm run format:check`, `pnpm run test`.

## Enforced vs advisory

Mechanically enforced — the toolchain blocks violations: formatting
(Prettier), the lint rules above (ESLint), types (tsc), secrets (gitleaks in
CI), staged-file checks (lefthook pre-commit, typecheck pre-push), and the
freshness of this file (CI cron). Advisory — review judgement: naming quality,
test depth, and scope of changes.

## Per-tool files

- `CLAUDE.md` is a symlink to this file (Claude Code).
- `.cursorrules` is a generated pointer to this file (Cursor). Do not edit it.

## Changing these rules

Change a rule and its enforcement together: a PR that edits this file should
also update the lint rule, hook, or workflow that enforces it (and vice
versa). Update the "Last reviewed" date when you do.
