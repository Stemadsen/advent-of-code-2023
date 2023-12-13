import { readInputFileAsLines } from '../utils/file-utils.js';
import { sum } from '../utils/number-utils.js';

const input = readInputFileAsLines();
const solution = sum(
    input.map((line) => {
      return Number.parseInt(getFirstNumber(line) + getLastNumber(line), 10);
    }),
);

console.log(solution);

function getFirstNumber(str) {
  for (let i = 0; i < str.length; i++) {
    const number = getNumberFromIndex(str, i);
    if (number) return number;
  }
}

function getLastNumber(str) {
  for (let i = str.length - 1; i >= 0; i--) {
    const number = getNumberFromIndex(str, i);
    if (number) return number;
  }
}

function getNumberFromIndex(str, i) {
  if (isNumber(str[i])) return str[i];
  let firstNumberStr = getFirstNumberStr(str.slice(i));
  if (firstNumberStr) return `${numberStrToNumber(firstNumberStr)}`;
  return null;
}

function getFirstNumberStr(str) {
  for (let i = 1; i <= str.length; i++) {
    let substring = str.slice(0, i);
    if (isNumber(numberStrToNumber(substring))) return substring;
  }
  return null;
}

function isNumber(character) {
  return !isNaN(Number.parseInt(character, 10));
}

function numberStrToNumber(str) {
  switch (str) {
    case 'one':
      return 1;
    case 'two':
      return 2;
    case 'three':
      return 3;
    case 'four':
      return 4;
    case 'five':
      return 5;
    case 'six':
      return 6;
    case 'seven':
      return 7;
    case 'eight':
      return 8;
    case 'nine':
      return 9;
  }
}
