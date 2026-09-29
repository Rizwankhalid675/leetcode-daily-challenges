const test = require('node:test');
const assert = require('node:assert');
const { canPartition } = require('./solution');

function brute(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  for (let mask = 0; mask < 1 << nums.length; mask++) {
    let s = 0;
    for (let i = 0; i < nums.length; i++) if ((mask >> i) & 1) s += nums[i];
    if (2 * s === total) return true;
  }
  return false;
}

test('official examples', () => {
  assert.strictEqual(canPartition([1, 5, 11, 5]), true);
  assert.strictEqual(canPartition([1, 2, 3, 5]), false);
});

test('edge cases', () => {
  assert.strictEqual(canPartition([1]), false);
  assert.strictEqual(canPartition([2, 2]), true);
  assert.strictEqual(canPartition([100, 1]), false);
});

test('matches brute force over all subsets', () => {
  for (let t = 0; t < 1000; t++) {
    const n = 1 + Math.floor(Math.random() * 12);
    const nums = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 20));
    assert.strictEqual(canPartition(nums), brute(nums));
  }
});

test('max size runs fast', () => {
  const nums = Array.from({ length: 199 }, () => 100).concat([99]);
  const t0 = Date.now();
  assert.strictEqual(canPartition(nums), false);
  assert.ok(Date.now() - t0 < 1000);
});
