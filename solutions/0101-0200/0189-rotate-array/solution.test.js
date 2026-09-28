const test = require('node:test');
const assert = require('node:assert');
const { rotate } = require('./solution');

const run = (nums, k) => {
  const a = [...nums];
  rotate(a, k);
  return a;
};
const reference = (nums, k) => nums.map((_, i) => nums[(i - (k % nums.length) + nums.length) % nums.length]);

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 3, 4, 5, 6, 7], 3), [5, 6, 7, 1, 2, 3, 4]);
  assert.deepStrictEqual(run([-1, -100, 3, 99], 2), [3, 99, -1, -100]);
});

test('k = 0, k = n, k > n, and random', () => {
  assert.deepStrictEqual(run([1, 2, 3], 0), [1, 2, 3]);
  assert.deepStrictEqual(run([1, 2, 3], 3), [1, 2, 3]);
  assert.deepStrictEqual(run([1, 2, 3], 4), [3, 1, 2]);
  assert.deepStrictEqual(run([1], 100000), [1]);
  for (let t = 0; t < 500; t++) {
    const nums = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, (_, i) => i);
    const k = Math.floor(Math.random() * 25);
    assert.deepStrictEqual(run(nums, k), reference(nums, k));
  }
});
