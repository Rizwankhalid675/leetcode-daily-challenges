const test = require('node:test');
const assert = require('node:assert');
const { findMinArrowShots } = require('./solution');

// Reference: minimum hitting set by trying subsets of candidate x positions (all endpoints).
function brute(points) {
  const xs = [...new Set(points.flat())];
  for (let k = 1; k <= points.length; k++) {
    const rec = (start, chosen) => {
      if (chosen.length === k) return points.every(([a, b]) => chosen.some((x) => a <= x && x <= b));
      for (let i = start; i < xs.length; i++) if (rec(i + 1, [...chosen, xs[i]])) return true;
      return false;
    };
    if (rec(0, [])) return k;
  }
  return points.length;
}

test('official examples', () => {
  assert.strictEqual(findMinArrowShots([[10, 16], [2, 8], [1, 6], [7, 12]]), 2);
  assert.strictEqual(findMinArrowShots([[1, 2], [3, 4], [5, 6], [7, 8]]), 4);
  assert.strictEqual(findMinArrowShots([[1, 2], [2, 3], [3, 4], [4, 5]]), 2); // shared edge bursts both
});

test('extreme coordinates', () => {
  assert.strictEqual(findMinArrowShots([[-(2 ** 31), 2 ** 31 - 1], [0, 1]]), 1);
});

test('matches exhaustive hitting-set search', () => {
  for (let t = 0; t < 300; t++) {
    const p = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => {
      const s = Math.floor(Math.random() * 10);
      return [s, s + 1 + Math.floor(Math.random() * 4)];
    });
    assert.strictEqual(findMinArrowShots(p), brute(p), JSON.stringify(p));
  }
});
