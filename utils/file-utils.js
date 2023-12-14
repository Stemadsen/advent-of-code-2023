import { readFileSync } from 'fs';

export function readInputFileAsLines(path = 'input.txt') {
  let lines = readFileSync(path, 'utf8').split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}
