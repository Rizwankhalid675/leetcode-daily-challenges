const test = require('node:test');
const assert = require('node:assert');
const { candy } = require('./solution');

// Reference: brute-force minimum over all assignments with candies in 1..n (tiny n).
function brute(r) {
  const n = r.length;
  let best = Infinity;
  const c = new Array(n);
  const rec = (i, sum) => {
    if (sum >= best) return;
    if (i === n) {
      for (let k = 0; k < n; k++) {
        if (k > 0 && r[k] > r[k - 1] && c[k] <= c[k - 1]) return;
        if (k < n - 1 && r[k] > r[k + 1] && c[k] <= c[k + 1]) return;
      }
      best = sum;
      return;
    }
    for (let v = 1; v <= n; v++) (c[i] = v), rec(i + 1, sum + v);
  };
  rec(0, 0);
  return best;
}

test('official examples', () => {
  assert.strictEqual(candy([1, 0, 2]), 5);
  assert.strictEqual(candy([1, 2, 2]), 4); // equal neighbours need not differ
});

test('matches exhaustive minimum on small inputs', () => {
  for (let t = 0; t < 300; t++) {
    const r = Array.from({ length: 1 + Math.floor(Math.random() * 6) }, () => Math.floor(Math.random() * 4));
    assert.strictEqual(candy(r), brute(r), JSON.stringify(r));
  }
});
