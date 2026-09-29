const test = require('node:test');
const assert = require('node:assert');
const { mostPoints } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(q) {
  let best = 0;
  for (let mask = 0; mask < 1 << q.length; mask++) {
    let ok = true, sum = 0, free = 0; // free: first index allowed to be solved
    for (let i = 0; i < q.length && ok; i++) if (mask >> i & 1) {
      if (i < free) ok = false;
      sum += q[i][0];
      free = i + q[i][1] + 1;
    }
    if (ok) best = Math.max(best, sum);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(mostPoints([[3, 2], [4, 3], [4, 4], [2, 5]]), 5);
  assert.strictEqual(mostPoints([[1, 1], [2, 2], [3, 3], [4, 4], [5, 5]]), 7);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const q = Array.from({ length: ri(1, 12) }, () => [ri(1, 20), ri(1, 4)]);
    assert.strictEqual(mostPoints(q), brute(q));
  }
});

test('max size: total above 2^31, fast', () => {
  const q = Array.from({ length: 100000 }, () => [100000, 1]);
  const t0 = Date.now();
  assert.strictEqual(mostPoints(q), 50000 * 100000);
  const r = Array.from({ length: 100000 }, () => [ri(1, 100000), ri(1, 100000)]);
  mostPoints(r);
  assert.ok(Date.now() - t0 < 1000);
});
