const test = require('node:test');
const assert = require('node:assert');
const { NumArray } = require('./solution');

test('official example', () => {
  const na = new NumArray([1, 3, 5]);
  assert.strictEqual(na.sumRange(0, 2), 9);
  na.update(1, 2);
  assert.strictEqual(na.sumRange(0, 2), 8);
});

test('matches a plain array under random operations', () => {
  for (let t = 0; t < 50; t++) {
    const n = 1 + Math.floor(Math.random() * 40);
    const ref = Array.from({ length: n }, () => Math.floor(Math.random() * 201) - 100);
    const na = new NumArray(ref);
    for (let op = 0; op < 300; op++) {
      if (Math.random() < 0.5) {
        const i = Math.floor(Math.random() * n);
        const v = Math.floor(Math.random() * 201) - 100;
        na.update(i, v); ref[i] = v;
      } else {
        let l = Math.floor(Math.random() * n);
        let r = Math.floor(Math.random() * n);
        if (l > r) [l, r] = [r, l];
        let s = 0;
        for (let i = l; i <= r; i++) s += ref[i];
        assert.strictEqual(na.sumRange(l, r), s);
      }
    }
  }
});

test('does not alias the input array', () => {
  const input = [1, 2, 3];
  const na = new NumArray(input);
  input[0] = 100;
  na.update(1, 5);
  assert.strictEqual(na.sumRange(0, 2), 9);
});

test('max size timing', () => {
  const n = 30000;
  const na = new NumArray(Array.from({ length: n }, (_, i) => (i % 201) - 100));
  const start = Date.now();
  for (let q = 0; q < 30000; q++) {
    if (q % 2) na.update(q % n, 7); else na.sumRange(0, n - 1);
  }
  assert.ok(Date.now() - start < 1000);
});
