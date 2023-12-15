import { getAsciiCode } from '../utils/string-utils.js';

export function getHashOfChars(chars) {
  let hash = 0;
  for (const char of chars) {
    hash = getHashOfChar(char, hash);
  }
  return hash;
}

function getHashOfChar(char, hash) {
  return ((hash + getAsciiCode(char)) * 17) % 256;
}
