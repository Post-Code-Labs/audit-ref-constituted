import { describe, expect, it } from 'vitest';
import { truncateMiddle } from './truncateMiddle.ts';

describe('truncateMiddle', () => {
  it('returns short strings unchanged', () => {
    expect(truncateMiddle('short', 10)).toBe('short');
  });

  it('truncates the middle and keeps both ends', () => {
    expect(truncateMiddle('abcdefghij', 7)).toBe('abc…hij');
  });

  it('keeps the result exactly at maxLength', () => {
    expect(truncateMiddle('abcdefghijklmnop', 9)).toHaveLength(9);
  });

  it('rejects budgets too small to truncate meaningfully', () => {
    expect(() => truncateMiddle('abcdefghij', 4)).toThrow(RangeError);
    expect(() => truncateMiddle('abcdefghij', 7.5)).toThrow(RangeError);
  });
});
