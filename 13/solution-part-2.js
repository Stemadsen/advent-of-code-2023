import { readInputFileAsLineChunks } from '../utils/file-utils.js';
import * as assert from 'assert';
import { sum } from '../utils/number-utils.js';
import { arraysAreEqual, clone2dArray, rotate2dArrayCounterClockwise } from '../utils/array-utils.js';

const testInput = readInputFileAsLineChunks('test-input.txt');
assert.equal(solve(testInput), 400, 'Test input solution is not correct!');

const input = readInputFileAsLineChunks();
console.log(solve(input));

function solve(grids) {
  return sum(grids.map((grid, i) => summarizeGrid(grid)));
}

function summarizeGrid(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      const fixedGrid = fixSmudge(grid, {x, y});
      const disqualifiedHorizontalReflectionLine = findHorizontalReflectionLine(grid, y);
      const horizontalReflectionLine = findHorizontalReflectionLine(fixedGrid, y, disqualifiedHorizontalReflectionLine);
      if (horizontalReflectionLine > 0) {
        return horizontalReflectionLine * 100;
      }
      const disqualifiedVerticalReflectionLine = findVerticalReflectionLine(grid, x);
      const verticalReflectionLine = findVerticalReflectionLine(fixedGrid, x, disqualifiedVerticalReflectionLine);
      if (verticalReflectionLine > 0) {
        return verticalReflectionLine;
      }
    }
  }
}

function fixSmudge(grid, smudgeTile) {
  const {x, y} = smudgeTile;
  const newGrid = clone2dArray(grid);
  newGrid[y][x] = newGrid[y][x] === '#' ? '.' : '#';
  return newGrid;
}

function findHorizontalReflectionLine(grid, mustIncludeY, disqualifiedReflectionLine = undefined) {
  for (let i = 1; i < grid.length; i++) {
    let j = 1;
    while (true) {
      const y1 = i - j;
      const y2 = i + j - 1;
      if (y1 < 0 || y2 >= grid.length) {
        if (!(y1 <= mustIncludeY && y2 >= mustIncludeY)) break;
        if (i === disqualifiedReflectionLine) break;
        return i;
      }
      if (!arraysAreEqual(grid[y1], grid[y2])) break;
      j++;
    }
  }
  return 0;
}

function findVerticalReflectionLine(grid, mustIncludeX, disqualifiedReflectionLine = undefined) {
  return findHorizontalReflectionLine(rotate2dArrayCounterClockwise(grid), mustIncludeX, disqualifiedReflectionLine);
}
