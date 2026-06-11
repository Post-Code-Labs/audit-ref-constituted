const HOUR_MS = 3_600_000;
const MINUTE_MS = 60_000;
const SECOND_MS = 1_000;

/** Parses durations like "1h30m" or "90s" into milliseconds. */
export function parseDuration(input: string): number {
  const match = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(input.trim());
  const [, hours, minutes, seconds] = match ?? [];
  if (hours === undefined && minutes === undefined && seconds === undefined) {
    throw new SyntaxError(`unrecognized duration: "${input}"`);
  }
  return (
    Number(hours ?? 0) * HOUR_MS +
    Number(minutes ?? 0) * MINUTE_MS +
    Number(seconds ?? 0) * SECOND_MS
  );
}
