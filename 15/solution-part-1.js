import { readInputFileAsLines } from '../utils/file-utils.js';
import { sum } from '../utils/number-utils.js';
import { getHashOfChars } from './day-15-utils.js';

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(input) {
  return sum(input.map(line => getSumForLine(line)))
}

function getSumForLine(line) {
  return sum(line.split(',').map(step => getHashOfChars(step)))
}
