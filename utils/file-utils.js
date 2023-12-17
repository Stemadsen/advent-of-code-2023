import { readFileSync } from 'fs';

export function readInputFileAsLines(path = 'input.txt') {
  let lines = readFileSync(path, 'utf8').split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines;
}

export function readInputFileAsLineChunks(path = 'input.txt') {
  const lineChunks = readFileSync(path, 'utf8').split('\n\n')
      .map(chunk => chunk.split('\n'));
  const lastChunk = lineChunks[lineChunks.length - 1];
  if (lastChunk[lastChunk.length - 1] === '') lastChunk.pop();
  return lineChunks;
}
