const test = require('node:test');
const assert = require('node:assert');
const { findKthLargest } = require('./solution');

test('official examples', () => {
  assert.strictEqual(findKthLargest([3, 2, 1, 5, 6, 4], 2), 5);
  assert.strictEqual(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4), 4); // duplicates count
});

test('edge cases', () => {
  assert.strictEqual(findKthLargest([1], 1), 1);
  assert.strictEqual(findKthLargest([-1, -1], 2), -1);
  assert.strictEqual(findKthLargest([5, 4, 3, 2, 1], 5), 1); // k = n -> minimum
});

test('matches sort-based answer', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 30) }, () => Math.floor(Math.random() * 21) - 10);
    const k = 1 + Math.floor(Math.random() * nums.length);
    const sorted = [...nums].sort((a, b) => b - a);
    assert.strictEqual(findKthLargest(nums, k), sorted[k - 1], JSON.stringify([nums, k]));
  }
});
