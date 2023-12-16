import crypto from 'crypto';

export function range(length) {
  return new Array(length).fill(0).map((_, i) => i);
}

export function clone2dArray(array) {
  return array.map((row) => [...row]);
}

export function hashArray(array) {
  return crypto.createHash('sha256')
      .update(JSON.stringify(array))
      .digest('hex');
}
