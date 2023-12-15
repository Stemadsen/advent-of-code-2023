import { readInputFileAsLines } from '../utils/file-utils.js';
import { sum } from '../utils/number-utils.js';

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(input) {
  return sum(input.map(line => getSumForLine(line)))
}

function getSumForLine(line) {
  return sum(line.split(',').map(step => getHashOfChars(step)))
}

function getHashOfChars(chars) {
  let hash = 0;
  for (const char of chars) {
    hash = getHashOfChar(char, hash);
  }
  return hash;
}

function getHashOfChar(char, hash) {
  return ((hash + getAsciiCode(char)) * 17) % 256;
}

function getAsciiCode(char) {
  return char.charCodeAt(0)
}
