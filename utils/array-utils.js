import crypto from 'crypto';

export function range(length) {
  return new Array(length).fill(0).map((_, i) => i);
}

export function clone2dArray(array) {
  return array.map((row) => [...row]);
}

export function rotate2dArrayCounterClockwise(array) {
  const rotatedGrid = [];
  for (let i = 0; i < array[0].length; i++) {
    rotatedGrid.push(array.map((row) => row[i]).reverse().join(''));
  }
  return rotatedGrid;
}

export function hashArray(array) {
  return crypto.createHash('sha256')
      .update(JSON.stringify(array))
      .digest('hex');
}
