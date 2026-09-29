const test = require('node:test');
const assert = require('node:assert');
const { combinationSum4 } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(nums, target) {
  if (target === 0) return 1;
  let ways = 0;
  for (const x of nums) if (x <= target) ways += brute(nums, target - x);
  return ways;
}
function exact(nums, target) {
  const dp = new Array(target + 1).fill(0n);
  dp[0] = 1n;
  for (let t = 1; t <= target; t++) for (const x of nums) if (x <= t) dp[t] += dp[t - x];
  return dp[target];
}
function distinct(k, lo, hi) {
  const s = new Set();
  while (s.size < k) s.add(ri(lo, hi));
  return [...s];
}

test('official examples', () => {
  assert.strictEqual(combinationSum4([1, 2, 3], 4), 7);
  assert.strictEqual(combinationSum4([9], 3), 0);
});

test('matches exhaustive enumeration of ordered sequences', () => {
  for (let t = 0; t < 400; t++) {
    const nums = distinct(ri(1, 4), 1, 6);
    const target = ri(1, 16);
    assert.strictEqual(combinationSum4(nums, target), brute(nums, target));
  }
});

test('stays exact when intermediate counts exceed 2^53 but the answer fits 32 bits', () => {
  const nums = Array.from({ length: 20 }, (_, i) => 2 * (i + 1)).concat([999]);
  assert.ok(exact(nums, 998) > 2n ** 53n);
  assert.strictEqual(combinationSum4(nums, 999), 1);
  let checked = 0;
  for (let t = 0; t < 25; t++) {
    const nums2 = distinct(ri(1, 50), 20, 1000);
    const target = ri(1, 1000);
    const want = exact(nums2, target);
    if (want > 2147483647n) continue;
    checked++;
    assert.strictEqual(combinationSum4(nums2, target), Number(want));
  }
  assert.ok(checked > 0);
});
