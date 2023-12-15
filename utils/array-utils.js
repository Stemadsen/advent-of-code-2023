import crypto from 'crypto';

export function clone2dArray(array) {
  return array.map((row) => [...row]);
}

export function hashArray(array) {
  return crypto.createHash('sha256')
      .update(JSON.stringify(array))
      .digest('hex');
}
