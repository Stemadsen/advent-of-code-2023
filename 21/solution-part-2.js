import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { union } from '../utils/set-utils.js';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput, 6), 16, `Test input solution is not correct for 6 steps!`);
assert.equal(solve(testInput, 10), 50, `Test input solution is not correct for 10 steps!`);
assert.equal(solve(testInput, 50), 1594, `Test input solution is not correct for 50 steps!`);

const input = readInputFileAsLines();
console.log(solve(input, 26501365));

function solve(grid, steps) {
  return findReachableTiles(grid, findStartTile(grid), steps).size;
}

function findStartTile(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'S') return `${x},${y},0,0`;
    }
  }
}

function findReachableTiles(grid, startTile, steps) {
  let fromTiles = new Set([startTile]);
  let reachableTiles = new Set();
  for (let i = 0; i < steps; i++) {
    reachableTiles = [...fromTiles].reduce((acc, fromTile) => union(acc, getNeighbors(fromTile, grid)), new Set());
    fromTiles = reachableTiles;
  }
  return reachableTiles;
}

function getNeighbors(tile, grid) {
  const [x, y, X, Y] = tile.split(',').map(Number);
  const nextToUpperBoundary = y === 0;
  const nextToLowerBoundary = y === grid.length - 1;
  const nextToLeftBoundary = x === 0;
  const nextToRightBoundary = x === grid[0].length - 1;
  const rowAbove = nextToUpperBoundary ? grid.length - 1 : y - 1;
  const rowBelow = nextToLowerBoundary ? 0 : y + 1;
  const columnToTheLeft = nextToLeftBoundary ? grid[0].length - 1 : x - 1;
  const columnToTheRight = nextToRightBoundary ? 0 : x + 1;
  const neighbors = new Set();
  if (grid[rowAbove][x] !== '#') neighbors.add(`${x},${rowAbove},${X},${nextToUpperBoundary ? Y - 1 : Y}`);
  if (grid[rowBelow][x] !== '#') neighbors.add(`${x},${rowBelow},${X},${nextToLowerBoundary ? Y + 1 : Y}`);
  if (grid[y][columnToTheLeft] !== '#') neighbors.add(`${columnToTheLeft},${y},${nextToLeftBoundary ? X - 1 : X},${Y}`);
  if (grid[y][columnToTheRight] !== '#') neighbors.add(`${columnToTheRight},${y},${nextToRightBoundary ? X + 1 : X},${Y}`);
  return neighbors;
}
