const test = require('node:test');
const assert = require('node:assert');
const { kConcatenationMaxSum } = require('./solution');

// Oracle: Kadane over the literally repeated array (small sizes), no modulus needed.
function brute(arr, k) {
  let best = 0;
  let cur = 0;
  for (let r = 0; r < k; r++) {
    for (const x of arr) {
      cur = Math.max(0, cur) + x;
      best = Math.max(best, cur);
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(kConcatenationMaxSum([1, 2], 3), 9);
  assert.strictEqual(kConcatenationMaxSum([1, -2, 1], 5), 2);
  assert.strictEqual(kConcatenationMaxSum([-1, -2], 7), 0);
});

test('k = 1 and wrap-around cases', () => {
  assert.strictEqual(kConcatenationMaxSum([5, -1, 5], 1), 9);
  assert.strictEqual(kConcatenationMaxSum([3, -10, 3], 2), 6);
  assert.strictEqual(kConcatenationMaxSum([2, -1, 2], 3), 9);
});

test('matches literal concatenation on random inputs', () => {
  for (let t = 0; t < 3000; t++) {
    const n = 1 + Math.floor(Math.random() * 6);
    const k = 1 + Math.floor(Math.random() * 6);
    const arr = Array.from({ length: n }, () => Math.floor(Math.random() * 21) - 10);
    assert.strictEqual(kConcatenationMaxSum(arr, k), brute(arr, k), JSON.stringify([arr, k]));
  }
});

test('max size: modulus applied to a ~1e14 sum exactly', () => {
  const arr = new Array(100000).fill(10000);
  const expected = Number((10000n * 100000n * 100000n) % 1000000007n);
  const t0 = Date.now();
  assert.strictEqual(kConcatenationMaxSum(arr, 100000), expected);
  assert.ok(Date.now() - t0 < 1000);
});
