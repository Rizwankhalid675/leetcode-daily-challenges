const test = require('node:test');
const assert = require('node:assert');
const { moveZeroes } = require('./solution');

const run = (input) => {
  const a = [...input];
  moveZeroes(a);
  return a;
};

test('official examples', () => {
  assert.deepStrictEqual(run([0, 1, 0, 3, 12]), [1, 3, 12, 0, 0]);
  assert.deepStrictEqual(run([0]), [0]);
});

test('edge cases', () => {
  assert.deepStrictEqual(run([1, 2, 3]), [1, 2, 3]);
  assert.deepStrictEqual(run([0, 0, 1]), [1, 0, 0]);
  assert.deepStrictEqual(run([-1, 0, -2]), [-1, -2, 0]);
});

test('matches filter-based reference', () => {
  for (let t = 0; t < 500; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => (Math.random() < 0.4 ? 0 : Math.floor(Math.random() * 7) - 3));
    const nz = a.filter((x) => x !== 0);
    assert.deepStrictEqual(run(a), [...nz, ...Array(a.length - nz.length).fill(0)]);
  }
});
