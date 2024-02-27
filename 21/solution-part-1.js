import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { union } from '../utils/set-utils.js';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput, 6), 16, 'Test input solution is not correct!');

const input = readInputFileAsLines();
console.log(solve(input, 64));

function solve(grid, steps) {
  const startTile = findStartTile(grid);
  const tiles = buildGraph(grid);
  return findReachableTiles(tiles, startTile, steps).size;
}

function findStartTile(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === 'S') return `${x},${y}`;
    }
  }
}

function buildGraph(grid) {
  const tiles = new Map();
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') continue;
      tiles.set(`${x},${y}`, getNeighbors(x, y, grid));
    }
  }
  return tiles;
}

function getNeighbors(x, y, grid) {
  const neighbors = new Set();
  if (y > 0 && grid[y - 1][x] !== '#') neighbors.add(`${x},${y - 1}`);
  if (x > 0 && grid[y][x - 1] !== '#') neighbors.add(`${x - 1},${y}`);
  if (y < grid.length - 1 && grid[y + 1][x] !== '#') neighbors.add(`${x},${y + 1}`);
  if (x < grid[0].length - 1 && grid[y][x + 1] !== '#') neighbors.add(`${x + 1},${y}`);
  return neighbors;
}

function findReachableTiles(tilesToNeighbors, startTile, steps) {
  let fromTiles = new Set([startTile]);
  let reachableTiles = new Set();
  for (let i = 0; i < steps; i++) {
    reachableTiles = [...fromTiles].reduce((acc, fromTile) => union(acc, tilesToNeighbors.get(fromTile)), new Set());
    fromTiles = reachableTiles;
  }
  return reachableTiles;
}
