/** Truncates long strings to maxLength by replacing the middle with an ellipsis. */
export function truncateMiddle(text: string, maxLength: number): string {
  if (!Number.isInteger(maxLength) || maxLength < 5) {
    throw new RangeError(`maxLength must be an integer >= 5, got ${maxLength}`);
  }
  if (text.length <= maxLength) return text;
  const budget = maxLength - 1;
  const head = Math.ceil(budget / 2);
  const tail = budget - head;
  return `${text.slice(0, head)}…${text.slice(text.length - tail)}`;
}
