import { readInputFileAsLineChunks } from '../utils/file-utils.js';
import * as assert from 'assert';
import { sum } from '../utils/number-utils.js';
import { rotate2dArrayCounterClockwise } from '../utils/array-utils.js';

const testInput = readInputFileAsLineChunks('test-input.txt');
assert.equal(solve(testInput), 405, 'Test input solution is not correct!');

const input = readInputFileAsLineChunks();
console.log(solve(input));

function solve(grids) {
  return sum(grids.map(grid => summarizeGrid(grid)));
}

function summarizeGrid(grid) {
  const horizontalReflectionLine = findHorizontalReflectionLine(grid);
  if (horizontalReflectionLine > 0) {
    return horizontalReflectionLine * 100;
  }
  return findVerticalReflectionLine(grid);
}

function findHorizontalReflectionLine(grid) {
  for (let i = 1; i < grid.length; i++) {
    let j = 1;
    while (true) {
      if (i - j < 0 || i + j - 1 >= grid.length) return i;
      if (grid[i - j] !== grid[i + j - 1]) break;
      j++;
    }
  }
  return 0;
}

function findVerticalReflectionLine(grid) {
  return findHorizontalReflectionLine(rotate2dArrayCounterClockwise(grid));
}
