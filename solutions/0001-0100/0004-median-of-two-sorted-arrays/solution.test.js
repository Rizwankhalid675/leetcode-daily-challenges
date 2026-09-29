const test = require('node:test');
const assert = require('node:assert');
const { findMedianSortedArrays } = require('./solution');

function merged(a, b) {
  const c = [...a, ...b].sort((x, y) => x - y);
  const k = c.length;
  return k % 2 ? c[(k - 1) / 2] : (c[k / 2 - 1] + c[k / 2]) / 2;
}
const sortedRand = (len, span) => Array.from({ length: len }, () => Math.floor(Math.random() * (2 * span + 1)) - span).sort((x, y) => x - y);

test('official examples', () => {
  assert.strictEqual(findMedianSortedArrays([1, 3], [2]), 2);
  assert.strictEqual(findMedianSortedArrays([1, 2], [3, 4]), 2.5);
});

test('one empty array', () => {
  assert.strictEqual(findMedianSortedArrays([], [1]), 1);
  assert.strictEqual(findMedianSortedArrays([2], []), 2);
  assert.strictEqual(findMedianSortedArrays([], [2, 3]), 2.5);
  assert.strictEqual(findMedianSortedArrays([1, 2, 3, 4], []), 2.5);
});

test('disjoint ranges and duplicates', () => {
  assert.strictEqual(findMedianSortedArrays([1, 2, 3], [10, 11, 12, 13]), 10);
  assert.strictEqual(findMedianSortedArrays([10, 11, 12, 13], [1, 2, 3]), 10);
  assert.strictEqual(findMedianSortedArrays([5, 5, 5], [5, 5]), 5);
  assert.strictEqual(findMedianSortedArrays([-1e6], [1e6]), 0);
});

test('matches merge-and-pick on random inputs', () => {
  for (let t = 0; t < 3000; t++) {
    let a = sortedRand(Math.floor(Math.random() * 8), 6);
    let b = sortedRand(Math.floor(Math.random() * 8), 6);
    if (a.length + b.length === 0) b = [3];
    assert.strictEqual(findMedianSortedArrays(a, b), merged(a, b));
  }
});

test('max size', () => {
  const a = sortedRand(1000, 1e6), b = sortedRand(1000, 1e6);
  assert.strictEqual(findMedianSortedArrays(a, b), merged(a, b));
});
