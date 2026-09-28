const test = require('node:test');
const assert = require('node:assert');
const { maxScore } = require('./solution');

// Reference: try every k-subset.
function brute(a, b, k) {
  let best = 0;
  const n = a.length;
  const rec = (start, chosen) => {
    if (chosen.length === k) {
      const s = chosen.reduce((acc, i) => acc + a[i], 0);
      best = Math.max(best, s * Math.min(...chosen.map((i) => b[i])));
      return;
    }
    for (let i = start; i < n; i++) rec(i + 1, [...chosen, i]);
  };
  rec(0, []);
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3), 12);
  assert.strictEqual(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1), 30);
});

test('edge cases', () => {
  assert.strictEqual(maxScore([0, 0], [5, 5], 2), 0);
  assert.strictEqual(maxScore(Array(3).fill(1e5), Array(3).fill(1e5), 3), 3e5 * 1e5); // large but exact
});

test('matches brute force over all k-subsets', () => {
  for (let t = 0; t < 400; t++) {
    const n = 1 + Math.floor(Math.random() * 8);
    const a = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
    const b = Array.from({ length: n }, () => Math.floor(Math.random() * 10));
    const k = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(maxScore(a, b, k), brute(a, b, k), JSON.stringify([a, b, k]));
  }
});
