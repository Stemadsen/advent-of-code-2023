import { readFileSync } from 'fs';

export function readInputFileAsLines() {
  let lines = readFileSync('input.txt', 'utf8').split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}
