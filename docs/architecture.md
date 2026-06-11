# Architecture

Two-workspace pnpm monorepo with one dependency direction:
`apps/cli → packages/core`.

## packages/core

Dependency-free, pure utility functions. Non-emitting TypeScript: `exports`
points at `src/index.ts` and consumers compile or strip types themselves —
there is no build step anywhere in the repo.

## apps/cli

A thin command shell over core. `src/main.ts` wires `process.argv` to
`runCli` and owns the only `process` access; `runCli` is pure (args in,
`{ code, output }` out), so the CLI contract is unit-testable without
spawning a process.

## Why no build step

Node 24 strips types natively, and Vitest/tsc resolve the workspace package
to its TypeScript source, so emitting JavaScript would only add drift. This
is also why relative imports carry the `.ts` extension — Node's ESM loader
requires explicit extensions.
