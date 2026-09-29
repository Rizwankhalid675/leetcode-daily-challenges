const test = require('node:test');
const assert = require('node:assert');
const { maxDotProduct } = require('./solution');

function brute(a, b) {
  let best = -Infinity;
  const subs = (arr) => {
    const out = [];
    for (let mask = 1; mask < 1 << arr.length; mask++) {
      const s = [];
      for (let i = 0; i < arr.length; i++) if (mask >> i & 1) s.push(arr[i]);
      out.push(s);
    }
    return out;
  };
  const sb = subs(b);
  for (const x of subs(a)) for (const y of sb) {
    if (x.length !== y.length) continue;
    let d = 0;
    for (let i = 0; i < x.length; i++) d += x[i] * y[i];
    best = Math.max(best, d);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(maxDotProduct([2, 1, -2, 5], [3, 0, -6]), 18);
  assert.strictEqual(maxDotProduct([3, -2], [2, -6, 7]), 21);
  assert.strictEqual(maxDotProduct([-1, -1], [1, 1]), -1);
});

test('all-negative products must still pick one pair', () => {
  assert.strictEqual(maxDotProduct([-5], [3]), -15);
  assert.strictEqual(maxDotProduct([1, 2], [-3, -1]), -1);
});

test('matches brute force over all equal-length subsequence pairs', () => {
  for (let t = 0; t < 400; t++) {
    const r = () => Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => Math.floor(Math.random() * 11) - 5);
    const a = r(), b = r();
    assert.strictEqual(maxDotProduct(a, b), brute(a, b));
  }
});

test('max size runs fast', () => {
  const a = Array.from({ length: 500 }, () => Math.floor(Math.random() * 2001) - 1000);
  const b = Array.from({ length: 500 }, () => Math.floor(Math.random() * 2001) - 1000);
  const t0 = Date.now();
  maxDotProduct(a, b);
  assert.ok(Date.now() - t0 < 500);
});
