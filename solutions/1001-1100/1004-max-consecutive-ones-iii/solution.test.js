const test = require('node:test');
const assert = require('node:assert');
const { longestOnes } = require('./solution');

function brute(nums, k) {
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    let zeros = 0;
    for (let j = i; j < nums.length; j++) {
      if (nums[j] === 0) zeros++;
      if (zeros <= k) best = Math.max(best, j - i + 1);
    }
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestOnes([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2), 6);
  assert.strictEqual(longestOnes([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3), 10);
});

test('edge cases', () => {
  assert.strictEqual(longestOnes([0, 0, 0], 0), 0);
  assert.strictEqual(longestOnes([0, 0, 0], 3), 3);
  assert.strictEqual(longestOnes([1], 0), 1);
});

test('matches brute force', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => (Math.random() < 0.5 ? 0 : 1));
    const k = Math.floor(Math.random() * (nums.length + 1));
    assert.strictEqual(longestOnes(nums, k), brute(nums, k), JSON.stringify([nums, k]));
  }
});
