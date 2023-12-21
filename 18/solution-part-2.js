import { readInputFileAsLines } from '../utils/file-utils.js';
import * as assert from 'assert';
import { zip } from '../utils/array-utils.js';
import { sum } from '../utils/number-utils.js';

const testInput = readInputFileAsLines('test-input.txt');
assert.equal(solve(testInput), 952408144115, 'Test input solution is not correct!');

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
  const parsedInstruction = parseInstruction(instruction);
  switch (parsedInstruction.direction) {
    case '0': return { x: currentPoint.x + parsedInstruction.distance, y: currentPoint.y };
    case '1': return { x: currentPoint.x, y: currentPoint.y + parsedInstruction.distance };
    case '2': return { x: currentPoint.x - parsedInstruction.distance, y: currentPoint.y };
    case '3': return { x: currentPoint.x, y: currentPoint.y - parsedInstruction.distance };
  }
}

function getExtraBoundaryArea(instructions) {
  return instructions.reduce((sum, instruction) => sum + getLengthOfInstruction(instruction), 0);
}

function getLengthOfInstruction(instruction) {
  const parsedInstruction = parseInstruction(instruction);
  return ['0', '1'].includes(parsedInstruction.direction) ? parsedInstruction.distance : 0;
}

function parseInstruction(instruction) {
  const trueInstruction = instruction.split(' ')[2].slice(2, 8);
  const distance = parseInt(trueInstruction.slice(0, 5), 16);
  const direction = trueInstruction.slice(5);
  return { direction, distance };
}
