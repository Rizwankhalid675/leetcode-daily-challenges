const test = require('node:test');
const assert = require('node:assert');
const { memoize } = require('./solution');

function counted(f) {
  const w = (...a) => { w.calls++; return f(...a); };
  w.calls = 0;
  return w;
}

test('official example 1 (sum)', () => {
  const s = counted((a, b) => a + b);
  const m = memoize(s);
  assert.strictEqual(m(2, 2), 4);
  assert.strictEqual(m(2, 2), 4);
  assert.strictEqual(s.calls, 1);
  assert.strictEqual(m(1, 2), 3);
  assert.strictEqual(s.calls, 2);
});

test('official examples 2 and 3 (factorial, fib)', () => {
  const fact = (n) => (n <= 1 ? 1 : n * fact(n - 1));
  const f = counted(fact);
  const mf = memoize(f);
  assert.deepStrictEqual([mf(2), mf(3), mf(2)], [2, 6, 2]);
  assert.strictEqual(f.calls, 2);
  assert.strictEqual(mf(3), 6);
  assert.strictEqual(f.calls, 2);
  const fib = (n) => (n <= 1 ? 1 : fib(n - 1) + fib(n - 2));
  const g = counted(fib);
  assert.strictEqual(memoize(g)(5), 8);
  assert.strictEqual(g.calls, 1);
});

test('argument order matters and keys do not collide', () => {
  const s = counted((a, b) => a - b);
  const m = memoize(s);
  assert.strictEqual(m(1, 2), -1);
  assert.strictEqual(m(2, 1), 1);
  assert.strictEqual(m(12, 3), 9);
  assert.strictEqual(m(1, 23), -22);
  assert.strictEqual(s.calls, 4);
});

test('call count equals number of distinct inputs (random, 1e5 calls)', () => {
  const s = counted((a, b) => a + b);
  const m = memoize(s);
  const seen = new Set();
  for (let t = 0; t < 1e5; t++) {
    const a = Math.floor(Math.random() * 50), b = Math.floor(Math.random() * 50);
    seen.add(a * 100 + b);
    assert.strictEqual(m(a, b), a + b);
  }
  assert.strictEqual(s.calls, seen.size);
});
