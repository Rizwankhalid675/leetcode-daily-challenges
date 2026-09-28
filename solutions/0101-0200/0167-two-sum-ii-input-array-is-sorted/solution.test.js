const test = require('node:test');
const assert = require('node:assert');
const { twoSum } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [1, 2]);
  assert.deepStrictEqual(twoSum([2, 3, 4], 6), [1, 3]);
  assert.deepStrictEqual(twoSum([-1, 0], -1), [1, 2]);
});

test('random arrays with a unique planted pair', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = [...new Set(Array.from({ length: 2 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 40) - 20))].sort((a, b) => a - b);
    if (nums.length < 2) continue;
    const i = Math.floor(Math.random() * (nums.length - 1));
    const j = i + 1 + Math.floor(Math.random() * (nums.length - 1 - i));
    const target = nums[i] + nums[j];
    let pairs = 0;
    for (let a = 0; a < nums.length; a++) for (let b = a + 1; b < nums.length; b++) if (nums[a] + nums[b] === target) pairs++;
    if (pairs !== 1) continue; // the problem guarantees uniqueness
    assert.deepStrictEqual(twoSum(nums, target), [i + 1, j + 1]);
  }
});
