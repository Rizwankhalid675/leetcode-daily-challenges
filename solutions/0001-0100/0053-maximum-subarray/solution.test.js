const test = require('node:test');
const assert = require('node:assert');
const { maxSubArray } = require('./solution');

function brute(a) {
  let best = -Infinity;
  for (let i = 0; i < a.length; i++) { let s = 0; for (let j = i; j < a.length; j++) { s += a[j]; best = Math.max(best, s); } }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]), 6);
  assert.strictEqual(maxSubArray([1]), 1);
  assert.strictEqual(maxSubArray([5, 4, -1, 7, 8]), 23);
});

test('all negative returns the largest element', () => {
  assert.strictEqual(maxSubArray([-3, -1, -2]), -1);
});

test('matches O(n^2) brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () => Math.floor(Math.random() * 21) - 10);
    assert.strictEqual(maxSubArray(a), brute(a));
  }
});
