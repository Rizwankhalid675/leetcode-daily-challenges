const test = require('node:test');
const assert = require('node:assert');
const { removeDuplicates } = require('./solution');

const check = (nums) => {
  const a = [...nums];
  const k = removeDuplicates(a);
  assert.deepStrictEqual(a.slice(0, k), [...new Set(nums)]);
};

test('official examples', () => {
  check([1, 1, 2]);
  check([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);
});

test('edge cases and random sorted arrays', () => {
  check([7]);
  check([-100, -100, -100]);
  for (let t = 0; t < 500; t++) check(Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 5)).sort((p, q) => p - q));
});
