import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { zip } from '../utils/array-utils.js';
import { sum } from '../utils/number-utils.js';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), 62, 'Test input solution is not correct!');

const input = readInputFileAsLines();
console.log(solve(input));

function solve(instructions) {
  return getArea(getPoints(instructions)) + getExtraBoundaryArea(instructions) + 1; // +1 for the origin
}

function getArea(points) {
  const segments = getPointSegments(points);
  return 0.5 * Math.abs(sum(segments.map(segment => (segment[0].x * segment[1].y - segment[1].x * segment[0].y))));
}

function getPointSegments(points) {
  return zip(points.slice(0, points.length - 1), points.slice(1));
}

function getPoints(instructions) {
  return instructions.reduce((points, instruction) => points.concat([getNewPoint(points[points.length - 1], instruction)]), [{ x: 0, y: 0 }]);
}

function getNewPoint(currentPoint, instruction) {
  let [ direction, distance, colorCode ] = instruction.split(' ');
  distance = parseInt(distance, 10);
  switch (direction) {
    case 'R': return { x: currentPoint.x + distance, y: currentPoint.y };
    case 'D': return { x: currentPoint.x, y: currentPoint.y + distance };
    case 'L': return { x: currentPoint.x - distance, y: currentPoint.y };
    case 'U': return { x: currentPoint.x, y: currentPoint.y - distance };
  }
}

function getExtraBoundaryArea(instructions) {
  return instructions.reduce((sum, instruction) => sum + getLengthOfInstruction(instruction), 0);
}

function getLengthOfInstruction(instruction) {
  let [ direction, distance, colorCode ] = instruction.split(' ');
  return ['R', 'D'].includes(direction) ? parseInt(distance, 10) : 0;
}
