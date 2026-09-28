const test = require('node:test');
const assert = require('node:assert');
const { minOperations } = require('./solution');

// Reference: try every (take from left, take from right) split directly.
function brute(nums, x) {
  const n = nums.length;
  let best = Infinity;
  for (let l = 0; l <= n; l++)
    for (let r = 0; l + r <= n; r++) {
      let s = 0;
      for (let i = 0; i < l; i++) s += nums[i];
      for (let i = n - r; i < n; i++) s += nums[i];
      if (s === x) best = Math.min(best, l + r);
    }
  return best === Infinity ? -1 : best;
}

test('official examples', () => {
  assert.strictEqual(minOperations([1, 1, 4, 2, 3], 5), 2);
  assert.strictEqual(minOperations([5, 6, 7, 8, 9], 4), -1);
  assert.strictEqual(minOperations([3, 2, 20, 1, 1, 3], 10), 5);
});

test('edge cases', () => {
  assert.strictEqual(minOperations([1, 1], 3), -1); // x exceeds total
  assert.strictEqual(minOperations([1, 1], 2), 2); // remove everything
  assert.strictEqual(minOperations([5], 5), 1);
  assert.strictEqual(minOperations([1, 2, 3], 3), 1); // take just the right end
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 1 + Math.floor(Math.random() * 5));
    const x = 1 + Math.floor(Math.random() * 30);
    assert.strictEqual(minOperations(nums, x), brute(nums, x), JSON.stringify([nums, x]));
  }
});
