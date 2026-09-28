const test = require('node:test');
const assert = require('node:assert');
const { merge } = require('./solution');

const run = (a, m, b, n) => {
  const x = [...a];
  merge(x, m, [...b], n);
  return x;
};

test('official examples', () => {
  assert.deepStrictEqual(run([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3), [1, 2, 2, 3, 5, 6]);
  assert.deepStrictEqual(run([1], 1, [], 0), [1]);
  assert.deepStrictEqual(run([0], 0, [1], 1), [1]);
});

test('matches concat + sort', () => {
  for (let t = 0; t < 1000; t++) {
    const m = Math.floor(Math.random() * 6), n = Math.floor(Math.random() * 6);
    const a = Array.from({ length: m }, () => Math.floor(Math.random() * 10) - 5).sort((p, q) => p - q);
    const b = Array.from({ length: n }, () => Math.floor(Math.random() * 10) - 5).sort((p, q) => p - q);
    assert.deepStrictEqual(run([...a, ...Array(n).fill(0)], m, b, n), [...a, ...b].sort((p, q) => p - q));
  }
});
