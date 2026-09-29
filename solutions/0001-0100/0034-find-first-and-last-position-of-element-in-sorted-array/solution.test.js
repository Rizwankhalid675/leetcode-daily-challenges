const test = require('node:test');
const assert = require('node:assert');
const { searchRange } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(searchRange([5, 7, 7, 8, 8, 10], 8), [3, 4]);
  assert.deepStrictEqual(searchRange([5, 7, 7, 8, 8, 10], 6), [-1, -1]);
  assert.deepStrictEqual(searchRange([], 0), [-1, -1]);
});

test('extreme values and single elements', () => {
  assert.deepStrictEqual(searchRange([1e9, 1e9], 1e9), [0, 1]);
  assert.deepStrictEqual(searchRange([-1e9], -1e9), [0, 0]);
});

test('matches indexOf / lastIndexOf', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 12) }, () => Math.floor(Math.random() * 7) - 3).sort((x, y) => x - y);
    const target = Math.floor(Math.random() * 9) - 4;
    assert.deepStrictEqual(searchRange(a, target), [a.indexOf(target), a.lastIndexOf(target)]);
  }
});
