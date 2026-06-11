# core — scoped instructions

`@audit-ref/core` is the dependency-free heart of the repo. Rules that are
stricter here than at the root:

- No runtime dependencies in `packages/core/package.json`, ever. If a helper
  needs a library, it does not belong in core.
- Pure functions only: no I/O, no `process` or env access, no Node built-ins —
  lint blocks `node:*` imports inside this package.
- Every exported function ships with a colocated `*.test.ts` covering edge
  cases (invalid input, boundaries), not just the happy path.
- The public API is `src/index.ts`; nothing else is importable from outside.
- A breaking signature change updates `apps/cli` in the same PR.
