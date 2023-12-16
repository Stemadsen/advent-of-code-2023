import { readInputFileAsLines } from '../utils/file-utils.js';
import { range } from '../utils/array-utils.js';
import { DOWN, LEFT, RIGHT, solveForStartingTileAndDirection, UP } from './solution-part-1.js';
import * as assert from 'assert';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), 51, 'Test input solution is not correct!');

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(grid) {
  const xs = range(grid[0].length);
  const ys = range(grid.length);
  const startingTilesAndDirections = ys.map(y => ({x: 0, y: y, direction: RIGHT}))
      .concat(xs.map(x => ({x: x, y: 0, direction: DOWN})),
          ys.map(y => ({x: grid[0].length - 1, y: y, direction: LEFT})),
          xs.map(x => ({x: x, y: grid.length - 1, direction: UP})));
  let maxEnergizedTilesCount = 0;
  startingTilesAndDirections.map(({x, y, direction}) => solveForStartingTileAndDirection(grid, x, y, direction))
      .forEach(energizedTilesCount => maxEnergizedTilesCount = Math.max(energizedTilesCount, maxEnergizedTilesCount));
  return maxEnergizedTilesCount;
}
