# cli — scoped instructions

The CLI is a thin shell over `@audit-ref/core`: parse argv, call core, print.

- Logic that does not touch argv or stdout belongs in core, not here.
- `src/main.ts` is the only file allowed to read `process` state or set the
  exit code; `runCli` stays pure (args in, `{ code, output }` out) so tests
  never spawn a process.
- Exit codes are a contract: `0` success, `1` usage or input error.
- New runtime dependencies need owner sign-off in the PR description.
- Run it locally with `pnpm --filter @audit-ref/cli run start -- slug "Some Text"`.
