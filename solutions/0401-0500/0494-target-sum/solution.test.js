const test = require('node:test');
const assert = require('node:assert');
const { findTargetSumWays } = require('./solution');

function brute(nums, target) {
  let count = 0;
  const n = nums.length;
  for (let mask = 0; mask < 1 << n; mask++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += mask & (1 << i) ? nums[i] : -nums[i];
    if (s === target) count++;
  }
  return count;
}

test('official examples', () => {
  assert.strictEqual(findTargetSumWays([1, 1, 1, 1, 1], 3), 5);
  assert.strictEqual(findTargetSumWays([1], 1), 1);
});

test('zeros double the count', () => {
  assert.strictEqual(findTargetSumWays([0, 0, 0], 0), 8);
  assert.strictEqual(findTargetSumWays([0, 1], 1), 2);
});

test('unreachable targets', () => {
  assert.strictEqual(findTargetSumWays([1, 2], 4), 0);
  assert.strictEqual(findTargetSumWays([1, 2], -1000), 0);
  assert.strictEqual(findTargetSumWays([2, 2], 1), 0);
});

test('matches 2^n enumeration on random inputs', () => {
  for (let t = 0; t < 1500; t++) {
    const n = 1 + Math.floor(Math.random() * 10);
    const nums = Array.from({ length: n }, () => Math.floor(Math.random() * 6));
    const target = Math.floor(Math.random() * 31) - 15;
    assert.strictEqual(findTargetSumWays(nums, target), brute(nums, target));
  }
});

test('max size: 20 values summing to 1000', () => {
  const nums = new Array(20).fill(50);
  // 10 pluses and 10 minuses: C(20, 10)
  assert.strictEqual(findTargetSumWays(nums, 0), 184756);
});
