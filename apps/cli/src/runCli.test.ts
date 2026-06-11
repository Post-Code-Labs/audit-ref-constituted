import { describe, expect, it } from 'vitest';
import { runCli } from './runCli.ts';

describe('runCli', () => {
  it('slugs text', () => {
    expect(runCli(['slug', 'Hello', 'World'])).toEqual({ code: 0, output: 'hello-world' });
  });

  it('formats parsed durations', () => {
    expect(runCli(['dur', '1h2m3s'])).toEqual({ code: 0, output: '1h 02m 03s' });
  });

  it('reports malformed durations on the error path', () => {
    const result = runCli(['dur', 'soon']);
    expect(result.code).toBe(1);
    expect(result.output).toContain('soon');
  });

  it('prints usage for missing or unknown commands', () => {
    expect(runCli([]).code).toBe(1);
    expect(runCli(['nope']).output).toMatch(/^usage:/);
  });
});
