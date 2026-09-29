const test = require('node:test');
const assert = require('node:assert');
const { RangeFreqQuery } = require('./solution');

test('official example', () => {
  const q = new RangeFreqQuery([12, 33, 4, 56, 22, 2, 34, 33, 22, 12, 34, 56]);
  assert.strictEqual(q.query(1, 2, 4), 1);
  assert.strictEqual(q.query(0, 11, 33), 2);
});

test('value that never appears', () => {
  const q = new RangeFreqQuery([1, 2, 3]);
  assert.strictEqual(q.query(0, 2, 7), 0);
});

test('matches counting the slice', () => {
  for (let t = 0; t < 300; t++) {
    const n = 1 + Math.floor(Math.random() * 15);
    const arr = Array.from({ length: n }, () => 1 + Math.floor(Math.random() * 4));
    const q = new RangeFreqQuery(arr);
    for (let k = 0; k < 20; k++) {
      const a = Math.floor(Math.random() * n);
      const b = Math.floor(Math.random() * n);
      const l = Math.min(a, b);
      const r = Math.max(a, b);
      const v = 1 + Math.floor(Math.random() * 5);
      assert.strictEqual(q.query(l, r, v), arr.slice(l, r + 1).filter((x) => x === v).length);
    }
  }
});

test('1e5 elements and 1e5 queries run fast', () => {
  const arr = Array.from({ length: 100000 }, () => 1 + Math.floor(Math.random() * 3));
  const start = Date.now();
  const q = new RangeFreqQuery(arr);
  for (let k = 0; k < 100000; k++) q.query(0, 99999, 1 + (k % 3));
  assert.ok(Date.now() - start < 1000);
});
