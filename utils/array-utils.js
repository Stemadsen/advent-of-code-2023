import crypto from 'crypto';

export function range(length, start = 0) {
  return new Array(length).fill(0).map((_, i) => i + start);
}

export function zip(A, B) {
  return A.map((a, i) => [a, B[i]]);
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

export function arraysAreEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
