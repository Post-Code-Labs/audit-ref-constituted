# audit-ref-constituted

A deliberately **well-constituted** public reference repository for the
[Post Code Constitution Audit](https://github.com/Post-Code-Labs/postcode): a
small, real pnpm/TypeScript monorepo whose agent instructions are present,
current, accurate, and mechanically enforced.

It exists so the audit's live path — GitHub tarball fetch, commit-history
lookups, LLM judge — can be smoke-tested end-to-end against a stable
real-world target, paired with its deliberately messy sibling,
`audit-ref-messy` (Post-Code-Labs/postcode#224).

## What "well-constituted" looks like here

- `AGENTS.md` at the root: named owner, review date, conventions, forbidden
  patterns with reasons, and verification commands that actually exist.
- Scoped `AGENTS.md` files in `packages/core/` and `apps/cli/` with rules
  specific to each package.
- One source of truth across tools: `CLAUDE.md` is a symlink to `AGENTS.md`,
  and `.cursorrules` is a generated pointer to it.
- Rules are enforced by the toolchain — ESLint restrictions, lefthook hooks,
  a single CI `check` script, gitleaks secret scanning, and an `AGENTS.md`
  freshness gate — not just stated in prose.

## Stability

Audit expectations should pin a tag (`audit-v1`, …) so results stay
reproducible. A scheduled workflow refreshes the `Last reviewed` line monthly
so the constitution's commit history stays fresh for live-clock audit runs;
everything else changes only deliberately.
