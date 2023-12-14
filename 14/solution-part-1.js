import { readInputFileAsLines } from '../utils/file-utils.js';
import { sum } from '../utils/number-utils.js';

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(rows) {
  const numColumns = rows[0].length;
  const columnLoads = Array(numColumns).fill(0);

  for (let x = 0; x < numColumns; x++) {
    let solidRockPos = -1;
    let roundRockCount = 0;
    for (let y = 0; y < rows.length; y++) {
      const char = rows[y][x];
      if (char === 'O') {
        roundRockCount++;
      }
      if (char === '#' || y === rows.length - 1) {
        const partialColumnLoad = calculatePartialColumnLoad(rows.length, solidRockPos, roundRockCount);
        columnLoads[x] += partialColumnLoad;
        solidRockPos = y;
        roundRockCount = 0;
      }
    }
  }
  return sum(columnLoads);
}

function calculatePartialColumnLoad(numRows, position, roundRockCount) {
  return sum(
      [...Array(roundRockCount).keys()]
          .map(y => numRows - position - y - 1)
  );
}
