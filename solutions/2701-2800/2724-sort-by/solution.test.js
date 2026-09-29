const test = require('node:test');
const assert = require('node:assert');
const { sortBy } = require('./solution');

test('official examples', () => {
  assert.deepStrictEqual(sortBy([5, 4, 1, 2, 3], (x) => x), [1, 2, 3, 4, 5]);
  assert.deepStrictEqual(sortBy([{ x: 1 }, { x: 0 }, { x: -1 }], (d) => d.x), [{ x: -1 }, { x: 0 }, { x: 1 }]);
  assert.deepStrictEqual(sortBy([[3, 4], [5, 2], [10, 1]], (x) => x[1]), [[10, 1], [5, 2], [3, 4]]);
});

test('numeric (not lexicographic) order, negatives and floats', () => {
  assert.deepStrictEqual(sortBy([10, 9, 100, -5, 2.5], (x) => x), [-5, 2.5, 9, 10, 100]);
});

test('fn is called once per element; input is not mutated', () => {
  let calls = 0;
  const a = [3, 1, 2];
  assert.deepStrictEqual(sortBy(a, (x) => { calls++; return x; }), [1, 2, 3]);
  assert.strictEqual(calls, 3);
  assert.deepStrictEqual(a, [3, 1, 2]);
});

test('random check and max-size timing', () => {
  for (let t = 0; t < 100; t++) {
    const a = Array.from({ length: Math.floor(Math.random() * 40) }, (_, i) => ({ i, k: Math.random() * 2000 - 1000 }));
    const got = sortBy(a, (o) => o.k);
    for (let j = 1; j < got.length; j++) assert.ok(got[j - 1].k <= got[j].k);
    assert.strictEqual(got.length, a.length);
  }
  const big = Array.from({ length: 5e5 }, () => Math.floor(Math.random() * 1e9));
  const t0 = Date.now();
  const s = sortBy(big, (x) => -x);
  assert.ok(Date.now() - t0 < 1500);
  for (let j = 1; j < s.length; j++) assert.ok(s[j - 1] >= s[j]);
});
