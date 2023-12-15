import { readInputFileAsLines } from '../utils/file-utils.js';
import { clone2dArray, hashArray } from '../utils/array-utils.js';

const iterations = 1_000_000_000;

const input = readInputFileAsLines();

const numRows = input.length;
const numCols = input[0].length;
const startTime = new Date().getTime();
const solution = solve(input, iterations);
const durationMs = new Date().getTime() - startTime;
console.log('Done!');
console.log(`Time to solve: ${durationMs / 1000} s`);
console.log(`Solution: ${solution}`);

function solve(grid, iterations = 1_000_000_000) {
  return getTotalLoad(getFinalGrid(grid, iterations));
}

function getTotalLoad(grid) {
  const numRows = grid.length;
  const numCols = grid[0].length;
  let totalLoad = 0;

  for (let x = 0; x < numCols; x++) {
    for (let y = 0; y < numRows; y++) {
      if (grid[y][x] === 'O') {
        totalLoad += numRows - y;
      }
    }
  }
  return totalLoad;
}

function getFinalGrid(grid, iterations) {
  const gridHashes = new Map().set(hashArray(grid), 0);
  for (let i = 1; i <= iterations; i++) {
    grid = performCycle(grid);
    const newHash = hashArray(grid);
    if (gridHashes.get(newHash)) {
      const prevI = gridHashes.get(newHash);
      console.log(`Cycle detected at iteration ${i}`);
      const cycleLength = i - prevI;
      console.log(`Cycle length: ${cycleLength}`);
      const remainingIterations = (iterations - prevI) % cycleLength;
      console.log(`Remaining iterations: ${remainingIterations}`);
      for (let j = 0; j < remainingIterations; j++) {
        grid = performCycle(grid);
      }
      return grid;
    }
    gridHashes.set(newHash, i);
  }
  return grid;
}

function performCycle(grid) {
  let newGrid = moveAllRoundRocksNorth(grid);
  newGrid = moveAllRoundRocksWest(newGrid);
  newGrid = moveAllRoundRocksSouth(newGrid);
  return moveAllRoundRocksEast(newGrid);
}

function moveAllRoundRocksNorth(grid) {
  for (let x = 0; x < numCols; x++) {
    let solidRockY = -1;
    let roundRockCount = 0;

    // Iterate from North to South, moving rocks North in batches
    for (let y = 0; y < numRows; y++) {
      const char = grid[y][x];
      if (char === 'O') {
        roundRockCount++;
      }
      if (!(char === '#' || y === numRows - 1)) continue;
      if (roundRockCount === 0) {
        solidRockY = y;
        continue;
      }
      grid = moveRoundRocksNorth(grid, x, char === '#' ? y - 1 : y, solidRockY, roundRockCount);
      solidRockY = y;
      roundRockCount = 0;
    }
  }
  return grid;
}

function moveAllRoundRocksWest(grid) {
  for (let y = 0; y < numRows; y++) {
    let solidRockX = -1;
    let roundRockCount = 0;

    // Iterate from West to East, moving rocks West in batches
    for (let x = 0; x < numCols; x++) {
      const char = grid[y][x];
      if (char === 'O') {
        roundRockCount++;
      }
      if (!(char === '#' || x === numCols - 1)) continue;
      if (roundRockCount === 0) {
        solidRockX = x;
        continue;
      }
      grid = moveRoundRocksWest(grid, char === '#' ? x - 1 : x, y, solidRockX, roundRockCount);
      solidRockX = x;
      roundRockCount = 0;
    }
  }
  return grid;
}

function moveAllRoundRocksSouth(grid) {
  for (let x = 0; x < numCols; x++) {
    let solidRockY = numRows;
    let roundRockCount = 0;

    // Iterate from South to North, moving rocks South in batches
    for (let y = numRows - 1; y >= 0; y--) {
      const char = grid[y][x];
      if (char === 'O') {
        roundRockCount++;
      }
      if (!(char === '#' || y === 0)) continue;
      if (roundRockCount === 0) {
        solidRockY = y;
        continue;
      }
      grid = moveRoundRocksSouth(grid, x, char === '#' ? y + 1 : y, solidRockY, roundRockCount);
      solidRockY = y;
      roundRockCount = 0;
    }
  }
  return grid;
}

function moveAllRoundRocksEast(grid) {
  for (let y = 0; y < numRows; y++) {
    let solidRockX = numCols;
    let roundRockCount = 0;

    // Iterate from East to West, moving rocks East in batches
    for (let x = numCols - 1; x >= 0; x--) {
      const char = grid[y][x];
      if (char === 'O') {
        roundRockCount++;
      }
      if (!(char === '#' || x === 0)) continue;
      if (roundRockCount === 0) {
        solidRockX = x;
        continue;
      }
      grid = moveRoundRocksEast(grid, char === '#' ? x + 1 : x, y, solidRockX, roundRockCount);
      solidRockX = x;
      roundRockCount = 0;
    }
  }
  return grid;
}

function moveRoundRocksNorth(grid, x, y, solidRockY, rocksToMove) {
  const newGrid = clone2dArray(grid);
  for (let j = 0; j < y - solidRockY; j++) {
    newGrid[j + solidRockY + 1][x] = j < rocksToMove ? 'O' : '.';
  }
  return newGrid;
}

function moveRoundRocksWest(grid, x, y, solidRockX, rocksToMove) {
  const newGrid = clone2dArray(grid);
  for (let i = 0; i < x - solidRockX; i++) {
    newGrid[y][i + solidRockX + 1] = i < rocksToMove ? 'O' : '.';
  }
  return newGrid;
}

function moveRoundRocksSouth(grid, x, y, solidRockY, rocksToMove) {
  const newGrid = clone2dArray(grid);
  for (let j = 0; j < solidRockY - y; j++) {
    newGrid[solidRockY - j - 1][x] = j < rocksToMove ? 'O' : '.';
  }
  return newGrid;
}

function moveRoundRocksEast(grid, x, y, solidRockX, rocksToMove) {
  const newGrid = clone2dArray(grid);
  for (let i = 0; i < solidRockX - x; i++) {
    newGrid[y][solidRockX - i - 1] = i < rocksToMove ? 'O' : '.';
  }
  return newGrid;
}
