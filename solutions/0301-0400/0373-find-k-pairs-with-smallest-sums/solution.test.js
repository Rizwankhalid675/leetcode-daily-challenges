const test = require('node:test');
const assert = require('node:assert');
const { kSmallestPairs } = require('./solution');

function brute(a, b, k) {
  const all = [];
  for (const x of a) for (const y of b) all.push(x + y);
  return all.sort((p, q) => p - q).slice(0, k);
}

test('official examples', () => {
  assert.deepStrictEqual(kSmallestPairs([1, 7, 11], [2, 4, 6], 3), [[1, 2], [1, 4], [1, 6]]);
  assert.deepStrictEqual(kSmallestPairs([1, 1, 2], [1, 2, 3], 2), [[1, 1], [1, 1]]);
});

test('sums match the k smallest of all pairs (ties may be in any order)', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => Math.floor(Math.random() * 10) - 5).sort((p, q) => p - q);
    const b = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => Math.floor(Math.random() * 10) - 5).sort((p, q) => p - q);
    const k = 1 + Math.floor(Math.random() * a.length * b.length);
    const got = kSmallestPairs(a, b, k);
    assert.deepStrictEqual(got.map(([x, y]) => x + y), brute(a, b, k));
    for (const [x, y] of got) assert.ok(a.includes(x) && b.includes(y));
  }
});
