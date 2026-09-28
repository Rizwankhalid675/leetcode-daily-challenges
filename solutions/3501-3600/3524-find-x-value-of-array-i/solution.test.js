const test = require('node:test');
const assert = require('node:assert');
const { resultArray } = require('./solution');

// Reference: every subarray, product mod k computed incrementally.
function brute(nums, k) {
  const res = new Array(k).fill(0);
  for (let i = 0; i < nums.length; i++) {
    let p = 1 % k;
    for (let j = i; j < nums.length; j++) {
      p = (p * (nums[j] % k)) % k;
      res[p]++;
    }
  }
  return res;
}

test('official examples', () => {
  assert.deepStrictEqual(resultArray([1, 2, 3, 4, 5], 3), [9, 2, 4]);
  assert.deepStrictEqual(resultArray([1, 2, 4, 8, 16, 32], 4), [18, 1, 2, 0]);
  assert.deepStrictEqual(resultArray([1, 1, 2, 1, 1], 2), [9, 6]);
});

test('edge cases', () => {
  assert.deepStrictEqual(resultArray([7], 1), [1]); // everything is 0 mod 1
  assert.deepStrictEqual(resultArray([1e9, 1e9], 5), [3, 0, 0, 0, 0]);
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 500; t++) {
    const k = 1 + Math.floor(Math.random() * 5);
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 15) }, () => 1 + Math.floor(Math.random() * 1e9));
    assert.deepStrictEqual(resultArray(nums, k), brute(nums, k));
  }
});

test('n = 1e5: counts up to ~5e9 stay exact', () => {
  const nums = Array(1e5).fill(1);
  assert.deepStrictEqual(resultArray(nums, 2), [0, 1e5 * (1e5 + 1) / 2]);
});
