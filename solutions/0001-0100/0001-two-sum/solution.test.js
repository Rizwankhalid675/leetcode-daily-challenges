const test = require('node:test');
const assert = require('node:assert');
const { twoSum } = require('./solution');

const check = (nums, target) => {
  const [i, j] = twoSum(nums, target);
  assert.ok(i !== j && nums[i] + nums[j] === target, JSON.stringify([nums, target, i, j]));
};

test('official examples', () => {
  assert.deepStrictEqual(twoSum([2, 7, 11, 15], 9), [0, 1]);
  assert.deepStrictEqual(twoSum([3, 2, 4], 6), [1, 2]);
  assert.deepStrictEqual(twoSum([3, 3], 6), [0, 1]); // same value, different indices
});

test('random arrays with a planted pair', () => {
  for (let t = 0; t < 1000; t++) {
    const nums = Array.from({ length: 2 + Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 2e9) - 1e9);
    const i = Math.floor(Math.random() * nums.length);
    let j = Math.floor(Math.random() * nums.length);
    if (j === i) j = (i + 1) % nums.length;
    check(nums, nums[i] + nums[j]);
  }
});
