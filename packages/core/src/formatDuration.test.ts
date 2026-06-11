import { describe, expect, it } from 'vitest';
import { formatDuration } from './formatDuration.ts';

describe('formatDuration', () => {
  it('formats hours, minutes and seconds with padding', () => {
    expect(formatDuration(3_723_000)).toBe('1h 02m 03s');
  });

  it('omits leading zero units', () => {
    expect(formatDuration(90_000)).toBe('1m 30s');
    expect(formatDuration(5_000)).toBe('5s');
  });

  it('rounds sub-second durations', () => {
    expect(formatDuration(499)).toBe('0s');
    expect(formatDuration(500)).toBe('1s');
  });

  it('rejects negative and non-finite input', () => {
    expect(() => formatDuration(-1)).toThrow(RangeError);
    expect(() => formatDuration(Number.NaN)).toThrow(RangeError);
    expect(() => formatDuration(Number.POSITIVE_INFINITY)).toThrow(RangeError);
  });
});
