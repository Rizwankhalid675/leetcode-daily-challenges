const test = require('node:test');
const assert = require('node:assert');
const { findMaximumXOR } = require('./solution');

function brute(nums) {
  let best = 0;
  for (let i = 0; i < nums.length; i++) for (let j = i; j < nums.length; j++) best = Math.max(best, (nums[i] ^ nums[j]) >>> 0);
  return best;
}

test('official examples', () => {
  assert.strictEqual(findMaximumXOR([3, 10, 5, 25, 2, 8]), 28);
  assert.strictEqual(findMaximumXOR([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]), 127);
});

test('single element and extremes', () => {
  assert.strictEqual(findMaximumXOR([0]), 0);
  assert.strictEqual(findMaximumXOR([2147483647]), 0);
  assert.strictEqual(findMaximumXOR([0, 2147483647]), 2147483647);
  assert.strictEqual(findMaximumXOR([1073741824, 1073741823]), 2147483647);
  assert.strictEqual(findMaximumXOR([7, 7, 7]), 0);
});

test('matches O(n^2) brute force on random inputs', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 30);
    const big = Math.random() < 0.5;
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * (big ? 2147483648 : 64)));
    assert.strictEqual(findMaximumXOR(nums), brute(nums));
  }
});

test('max size timing', () => {
  const nums = Array.from({ length: 200000 }, () => Math.floor(Math.random() * 2147483648));
  const start = Date.now();
  const res = findMaximumXOR(nums);
  assert.ok(res >= 0 && res <= 2147483647);
  assert.ok(Date.now() - start < 1000);
});
