const test = require('node:test');
const assert = require('node:assert');
const { findNumberOfLIS } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(a) {
  let best = 0, count = 0;
  for (let mask = 1; mask < 1 << a.length; mask++) {
    let ok = true, last = -Infinity, len = 0;
    for (let i = 0; i < a.length && ok; i++) if (mask >> i & 1) {
      if (a[i] <= last) ok = false;
      last = a[i]; len++;
    }
    if (!ok) continue;
    if (len > best) { best = len; count = 1; } else if (len === best) count++;
  }
  return count;
}

test('official examples', () => {
  assert.strictEqual(findNumberOfLIS([1, 3, 5, 4, 7]), 2);
  assert.strictEqual(findNumberOfLIS([2, 2, 2, 2, 2]), 5);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const a = rarr(ri(1, 12), -3, 5);
    assert.strictEqual(findNumberOfLIS(a), brute(a));
  }
});

test('max size runs fast', () => {
  const a = rarr(2000, -1e6, 1e6);
  const t0 = Date.now();
  findNumberOfLIS(a);
  assert.ok(Date.now() - t0 < 1000);
});
