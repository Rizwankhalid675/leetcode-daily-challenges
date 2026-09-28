const test = require('node:test');
const assert = require('node:assert');
const { jump } = require('./solution');

// Reference: shortest-path DP.
function brute(nums) {
  const dist = new Array(nums.length).fill(Infinity);
  dist[0] = 0;
  for (let i = 0; i < nums.length; i++) for (let j = 1; j <= nums[i] && i + j < nums.length; j++) dist[i + j] = Math.min(dist[i + j], dist[i] + 1);
  return dist[nums.length - 1];
}

test('official examples', () => {
  assert.strictEqual(jump([2, 3, 1, 1, 4]), 2);
  assert.strictEqual(jump([2, 3, 0, 1, 4]), 2);
});

test('edge cases and random reachable arrays', () => {
  assert.strictEqual(jump([0]), 0);
  assert.strictEqual(jump([1, 1, 1]), 2);
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 1 + Math.floor(Math.random() * 3)); // >= 1 keeps it reachable
    assert.strictEqual(jump(nums), brute(nums), JSON.stringify(nums));
  }
});
