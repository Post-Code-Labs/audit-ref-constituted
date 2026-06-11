import { describe, expect, it } from 'vitest';
import { parseDuration } from './parseDuration.ts';

describe('parseDuration', () => {
  it('parses combined units', () => {
    expect(parseDuration('1h30m')).toBe(5_400_000);
    expect(parseDuration('1h2m3s')).toBe(3_723_000);
  });

  it('parses single units', () => {
    expect(parseDuration('90s')).toBe(90_000);
    expect(parseDuration('45m')).toBe(2_700_000);
  });

  it('tolerates surrounding whitespace', () => {
    expect(parseDuration(' 10s ')).toBe(10_000);
  });

  it('rejects malformed input', () => {
    expect(() => parseDuration('')).toThrow(SyntaxError);
    expect(() => parseDuration('h')).toThrow(SyntaxError);
    expect(() => parseDuration('30m1h')).toThrow(SyntaxError);
    expect(() => parseDuration('1.5h')).toThrow(SyntaxError);
  });
});
