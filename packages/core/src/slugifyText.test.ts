import { describe, expect, it } from 'vitest';
import { slugifyText } from './slugifyText.ts';

describe('slugifyText', () => {
  it('lowercases and hyphenates words', () => {
    expect(slugifyText('Hello World')).toBe('hello-world');
  });

  it('strips diacritics', () => {
    expect(slugifyText('Crème Brûlée')).toBe('creme-brulee');
  });

  it('collapses runs of punctuation and trims hyphens', () => {
    expect(slugifyText('  --Already / Slugged!! ')).toBe('already-slugged');
  });

  it('returns an empty slug when nothing survives', () => {
    expect(slugifyText('!!!')).toBe('');
  });
});
