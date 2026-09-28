const test = require('node:test');
const assert = require('node:assert');
const { removeDuplicates } = require('./solution');

const expected = (nums) => {
  const count = new Map();
  return nums.filter((x) => {
    count.set(x, (count.get(x) ?? 0) + 1);
    return count.get(x) <= 2;
  });
};
const check = (nums) => {
  const a = [...nums];
  const k = removeDuplicates(a);
  assert.deepStrictEqual(a.slice(0, k), expected(nums), JSON.stringify(nums));
};

test('official examples', () => {
  check([1, 1, 1, 2, 2, 3]);
  check([0, 0, 1, 1, 1, 1, 2, 3, 3]);
});

test('edge cases and random sorted arrays', () => {
  check([1]);
  check([1, 1]);
  check([5, 5, 5, 5, 5]);
  for (let t = 0; t < 500; t++) check(Array.from({ length: 1 + Math.floor(Math.random() * 14) }, () => Math.floor(Math.random() * 4)).sort((p, q) => p - q));
});
