const test = require('node:test');
const assert = require('node:assert');
const { productExceptSelf } = require('./solution');

function brute(nums) {
  return nums.map((_, i) => nums.reduce((p, v, j) => (j === i ? p : p * v), 1) + 0);
}

test('official examples', () => {
  assert.deepStrictEqual(productExceptSelf([1, 2, 3, 4]), [24, 12, 8, 6]);
  assert.deepStrictEqual(productExceptSelf([-1, 1, 0, -3, 3]), [0, 0, 9, 0, 0]); // strict: no -0
});

test('edge cases', () => {
  assert.deepStrictEqual(productExceptSelf([0, 0]), [0, 0]);
  assert.deepStrictEqual(productExceptSelf([2, 3]), [3, 2]);
  assert.deepStrictEqual(productExceptSelf([-2, 0, 5]), [0, -10, 0]);
});

test('matches brute force on random arrays', () => {
  for (let t = 0; t < 500; t++) {
    const nums = Array.from({ length: 2 + Math.floor(Math.random() * 8) }, () => Math.floor(Math.random() * 9) - 4);
    assert.deepStrictEqual(productExceptSelf(nums), brute(nums), JSON.stringify(nums));
  }
});
