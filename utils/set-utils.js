export function union(setA, setB) {
  const union = new Set(setA);
  for (const b of setB) {
    union.add(b);
  }
  return union;
}
