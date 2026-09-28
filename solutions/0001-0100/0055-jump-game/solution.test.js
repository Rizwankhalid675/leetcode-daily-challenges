const test = require('node:test');
const assert = require('node:assert');
const { canJump } = require('./solution');

// Reference: BFS/DP over reachable indices.
function brute(nums) {
  const reach = new Array(nums.length).fill(false);
  reach[0] = true;
  for (let i = 0; i < nums.length; i++) if (reach[i]) for (let j = 1; j <= nums[i] && i + j < nums.length; j++) reach[i + j] = true;
  return reach[nums.length - 1];
}

test('official examples', () => {
  assert.strictEqual(canJump([2, 3, 1, 1, 4]), true);
  assert.strictEqual(canJump([3, 2, 1, 0, 4]), false);
});

test('edge cases and random', () => {
  assert.strictEqual(canJump([0]), true); // already at the end
  assert.strictEqual(canJump([0, 1]), false);
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 3));
    assert.strictEqual(canJump(nums), brute(nums), JSON.stringify(nums));
  }
});
