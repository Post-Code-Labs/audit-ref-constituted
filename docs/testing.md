# Testing

Vitest, run from the repo root (`pnpm run test`); the root `vitest.config.ts`
includes every `*.test.ts` under `packages/*/src` and `apps/*/src`.

- Tests are colocated: `formatDuration.ts` is specified by
  `formatDuration.test.ts` in the same directory.
- Every exported function gets edge-case coverage — invalid input, boundary
  rounding — not just the happy path.
- Tests stay hermetic: no network, no filesystem, no clocks. Core is pure
  functions, so there is nothing to mock; if you find yourself mocking,
  the logic probably belongs in `packages/core` in a purer shape.
