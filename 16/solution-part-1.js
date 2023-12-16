import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { sum } from '../utils/number-utils.js';

const UP = 0;
const LEFT = 1;
const DOWN = 2;
const RIGHT = 3;

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), 46, 'Test input solution is not correct!');

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(grid) {
  const cache = new Map();
  for (let y = 0; y < grid.length; y++) {
    cache.set(y, new Map());
    for (let x = 0; x < grid[0].length; x++) {
      cache.get(y).set(x, new Map());
    }
  }
  const beamQueue = [];
  followBeam({x: 0, y: 0, direction: RIGHT}, grid, cache, beamQueue);
  while (beamQueue.length > 0) {
    const nextPosition = beamQueue.shift();
    followBeam(nextPosition, grid, cache, beamQueue);
  }
  return calculateTotalNumberOfEnergizedTiles(cache);
}

function calculateTotalNumberOfEnergizedTiles(cache) {
  return sum([...cache.keys()].map(y => [...cache.get(y).values()].filter(map => map.size > 0).length))
      + (cache.get(0).get(0).size === 0 ? 1 : 0);
}

function followBeam({x, y, direction}, grid, cache, beamQueue) {
  const cacheForTile = cache.get(y).get(x);
  if (cacheForTile.get(direction)
      || (cacheForTile.get(reverse(direction))
          && ((grid[y][x] === '|' && [LEFT, RIGHT].includes(direction))
          || (grid[y][x] === '-' && [UP, DOWN].includes(direction))))) {
    return;
  }
  const nextPositions = getNextPositions({x, y, direction}, grid).filter(position => !isOutsideGrid(position, grid));
  cacheForTile.set(direction, nextPositions);
  if (nextPositions.length === 2) {
    beamQueue.push(nextPositions[1]);
  }
  if (nextPositions.length > 0) {
    followBeam(nextPositions[0], grid, cache, beamQueue);
  }
}

function getNextPositions({x, y, direction}, grid) {
  switch (grid[y][x]) {
    case '.': {
      switch (direction) {
        case UP:
          return [goUp(x, y)];
        case LEFT:
          return [goLeft(x, y)];
        case DOWN:
          return [goDown(x, y)];
        case RIGHT:
          return [goRight(x, y)];
      }
      break;
    }
    case '/': {
      switch (direction) {
        case UP:
          return [goRight(x, y)];
        case LEFT:
          return [goDown(x, y)];
        case DOWN:
          return [goLeft(x, y)];
        case RIGHT:
          return [goUp(x, y)];
      }
      break;
    }
    case '\\': {
      switch (direction) {
        case UP:
          return [goLeft(x, y)];
        case LEFT:
          return [goUp(x, y)];
        case DOWN:
          return [goRight(x, y)];
        case RIGHT:
          return [goDown(x, y)];
      }
      break;
    }
    case '|': {
      switch (direction) {
        case UP:
          return [goUp(x, y)];
        case DOWN:
          return [goDown(x, y)];
        case LEFT:
        case RIGHT:
          return [goUp(x, y), goDown(x, y)];
      }
      break;
    }
    case '-': {
      switch (direction) {
        case LEFT:
          return [goLeft(x, y)];
        case RIGHT:
          return [goRight(x, y)];
        case UP:
        case DOWN:
          return [goLeft(x, y), goRight(x, y)];
      }
      break;
    }
  }
}

function goUp(x, y) {
  return {x, y: y - 1, direction: UP};
}

function goLeft(x, y) {
  return {x: x - 1, y, direction: LEFT};
}

function goDown(x, y) {
  return {x, y: y + 1, direction: DOWN};
}

function goRight(x, y) {
  return {x: x + 1, y, direction: RIGHT};
}

function reverse(direction) {
  return direction + 2 % 4;
}

function isOutsideGrid({x, y}, grid) {
  return x < 0 || y < 0 || x >= grid.length || y >= grid.length;
}
