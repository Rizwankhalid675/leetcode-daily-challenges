const test = require('node:test');
const assert = require('node:assert');
const { findMaxAverage } = require('./solution');

function brute(nums, k) {
  let best = -Infinity;
  for (let i = 0; i + k <= nums.length; i++) best = Math.max(best, nums.slice(i, i + k).reduce((a, b) => a + b, 0) / k);
  return best;
}

test('official examples', () => {
  assert.strictEqual(findMaxAverage([1, 12, -5, -6, 50, 3], 4), 12.75);
  assert.strictEqual(findMaxAverage([5], 1), 5);
});

test('edge cases', () => {
  assert.strictEqual(findMaxAverage([-1, -2, -3], 1), -1); // all negative
  assert.strictEqual(findMaxAverage([1, 2, 3], 3), 2); // k = n
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 21) - 10);
    const k = 1 + Math.floor(Math.random() * nums.length);
    assert.ok(Math.abs(findMaxAverage(nums, k) - brute(nums, k)) < 1e-9, JSON.stringify([nums, k]));
  }
});
