const test = require('node:test');
const assert = require('node:assert');
const { containsNearbyDuplicate } = require('./solution');

function brute(nums, k) {
  for (let i = 0; i < nums.length; i++) for (let j = i + 1; j <= i + k && j < nums.length; j++) if (nums[i] === nums[j]) return true;
  return false;
}

test('official examples', () => {
  assert.strictEqual(containsNearbyDuplicate([1, 2, 3, 1], 3), true);
  assert.strictEqual(containsNearbyDuplicate([1, 0, 1, 1], 1), true);
  assert.strictEqual(containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2), false);
});

test('k = 0 and random', () => {
  assert.strictEqual(containsNearbyDuplicate([1, 1], 0), false);
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 4));
    const k = Math.floor(Math.random() * 5);
    assert.strictEqual(containsNearbyDuplicate(nums, k), brute(nums, k), JSON.stringify([nums, k]));
  }
});
