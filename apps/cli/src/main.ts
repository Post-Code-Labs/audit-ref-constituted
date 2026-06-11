import { runCli } from './runCli.ts';

const { code, output } = runCli(process.argv.slice(2));
console.log(output);
process.exitCode = code;
