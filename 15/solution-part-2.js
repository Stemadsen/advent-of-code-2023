import { readInputFileAsLines } from '../utils/file-utils.js';
import { getHashOfChars } from './day-15-utils.js';

const input = readInputFileAsLines();
const solution = solve(input);
console.log(solution);

function solve(input) {
  const boxes = Array(256);
  input.map(line => processLine(line, boxes));
  return boxes.map((_, i) => i).reduce((acc, boxNumber) => {
    if (!boxes[boxNumber]) return acc;
    const box = boxes[boxNumber];
    return acc + box.map((_, j) => j).reduce((acc, lensIndex) => {
      return acc + (boxNumber + 1) * (lensIndex + 1) * box[lensIndex].focalLength;
    }, 0);
  }, 0);
}

function processLine(line, boxes) {
  line.split(',').map(step => processStep(step, boxes));
}

function processStep(step, boxes) {
  if (step.substring(step.length - 1) === '-') {
    const label = step.substring(0, step.length - 1);
    removeLens(label, boxes);
  } else {
    const [label, focalLength] = step.split('=');
    addLens(label, focalLength, boxes);
  }
}

function removeLens(label, boxes, boxNumber = getHashOfChars(label)) {
  if (!boxes[boxNumber]) return;
  boxes[boxNumber] = boxes[boxNumber].filter(lens => lens.label !== label);
}

function addLens(label, focalLength, boxes, boxNumber = getHashOfChars(label)) {
  if (!boxes[boxNumber]) {
    boxes[boxNumber] = [{ label, focalLength }];
    return;
  }
  const box = boxes[boxNumber];
  for (let i = 0; i < box.length; i++) {
    if (box[i].label === label) {
      box[i] = { label, focalLength };
      return;
    }
  }
  box.push({ label, focalLength });
}
