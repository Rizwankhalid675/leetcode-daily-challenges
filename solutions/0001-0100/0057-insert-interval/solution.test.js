const test = require('node:test');
const assert = require('node:assert');
const { insert } = require('./solution');
const { merge } = require('../0056-merge-intervals/solution');

test('official examples', () => {
  assert.deepStrictEqual(insert([[1, 3], [6, 9]], [2, 5]), [[1, 5], [6, 9]]);
  assert.deepStrictEqual(insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8]), [[1, 2], [3, 10], [12, 16]]);
});

test('edge cases and agreement with merge(intervals + new)', () => {
  assert.deepStrictEqual(insert([], [5, 7]), [[5, 7]]);
  assert.deepStrictEqual(insert([[1, 5]], [6, 8]), [[1, 5], [6, 8]]); // after
  assert.deepStrictEqual(insert([[6, 8]], [1, 5]), [[1, 5], [6, 8]]); // before
  assert.deepStrictEqual(insert([[1, 5]], [5, 7]), [[1, 7]]); // touching point merges
  for (let t = 0; t < 1000; t++) {
    const base = merge(Array.from({ length: Math.floor(Math.random() * 5) }, () => {
      const s = Math.floor(Math.random() * 20);
      return [s, s + Math.floor(Math.random() * 3)];
    }));
    const s = Math.floor(Math.random() * 22);
    const nw = [s, s + Math.floor(Math.random() * 5)];
    assert.deepStrictEqual(insert(base.map((x) => [...x]), nw), merge([...base.map((x) => [...x]), nw]), JSON.stringify([base, nw]));
  }
});
