import { readInputFileAsLines } from '../utils/file-utils.js';
import { sum } from '../utils/number-utils.js';

const input = readInputFileAsLines();
const solution = sum(
    input.map((line) => Number.parseInt(getFirstNumberInString(line) + getLastNumberInString(line), 10)),
);

console.log(solution);

function getFirstNumberInString(str) {
  for (let i = 0; i < str.length; i++) {
    if (isNumber(str[i])) return str[i];
  }
}

function getLastNumberInString(str) {
  for (let i = str.length - 1; i >= 0; i--) {
    if (isNumber(str[i])) return str[i];
  }
}

function isNumber(character) {
  return !isNaN(Number.parseInt(character, 10));
}
