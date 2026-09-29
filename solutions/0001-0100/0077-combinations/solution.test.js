const test = require('node:test');
const assert = require('node:assert');
const { combine } = require('./solution');

const norm = (a) => a.map((c) => c.join(',')).sort();

function binom(n, k) {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
}

test('official examples', () => {
  assert.deepStrictEqual(norm(combine(4, 2)), norm([[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]]));
  assert.deepStrictEqual(combine(1, 1), [[1]]);
});

test('counts, sortedness and uniqueness for all n <= 12', () => {
  for (let n = 1; n <= 12; n++) {
    for (let k = 1; k <= n; k++) {
      const res = combine(n, k);
      assert.strictEqual(res.length, binom(n, k));
      assert.strictEqual(new Set(res.map((c) => c.join(','))).size, res.length);
      for (const c of res) {
        assert.strictEqual(c.length, k);
        for (let i = 0; i < k; i++) {
          assert.ok(c[i] >= 1 && c[i] <= n);
          if (i) assert.ok(c[i] > c[i - 1]);
        }
      }
    }
  }
});

test('largest output (n = 20, k = 10) is fast', () => {
  const t = Date.now();
  assert.strictEqual(combine(20, 10).length, 184756);
  assert.ok(Date.now() - t < 1000);
});
