import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), NaN, 'Test input solution is not correct!'); // TODO: Fill in expected test result

const input = readInputFileAsLines();
console.log(solve(input));

function solve(grid) {
  return 0;
}
