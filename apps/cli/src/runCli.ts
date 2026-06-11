import { formatDuration, parseDuration, slugifyText } from '@audit-ref/core';

export interface CliResult {
  code: 0 | 1;
  output: string;
}

const USAGE = 'usage: refcli slug <text> | refcli dur <duration, e.g. 1h30m>';

/** Pure CLI core: maps argv to an exit code and a single output line. */
export function runCli(args: readonly string[]): CliResult {
  const [command, ...rest] = args;
  const value = rest.join(' ').trim();
  if (command === 'slug' && value !== '') {
    return { code: 0, output: slugifyText(value) };
  }
  if (command === 'dur' && value !== '') {
    try {
      return { code: 0, output: formatDuration(parseDuration(value)) };
    } catch (error) {
      return { code: 1, output: error instanceof Error ? error.message : String(error) };
    }
  }
  return { code: 1, output: USAGE };
}
