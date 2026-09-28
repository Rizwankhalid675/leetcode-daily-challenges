const test = require('node:test');
const assert = require('node:assert');
const { removeElement } = require('./solution');

// The judge sorts the first k elements before comparing, so compare as multisets.
const check = (nums, val) => {
  const a = [...nums];
  const k = removeElement(a, val);
  const expected = nums.filter((x) => x !== val).sort((p, q) => p - q);
  assert.strictEqual(k, expected.length);
  assert.deepStrictEqual(a.slice(0, k).sort((p, q) => p - q), expected);
};

test('official examples', () => {
  check([3, 2, 2, 3], 3);
  check([0, 1, 2, 2, 3, 0, 4, 2], 2);
});

test('edge cases and random', () => {
  check([], 1);
  check([1, 1, 1], 1);
  check([1, 2, 3], 4);
  for (let t = 0; t < 500; t++) check(Array.from({ length: Math.floor(Math.random() * 10) }, () => Math.floor(Math.random() * 4)), Math.floor(Math.random() * 4));
});
