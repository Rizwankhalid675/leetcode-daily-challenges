const test = require('node:test');
const assert = require('node:assert');
const { longestSubsequence } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(a, d) {
  let best = 0;
  for (let mask = 1; mask < 1 << a.length; mask++) {
    const s = a.filter((_, i) => mask >> i & 1);
    let ok = true;
    for (let i = 1; i < s.length; i++) if (s[i] - s[i - 1] !== d) ok = false;
    if (ok) best = Math.max(best, s.length);
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestSubsequence([1, 2, 3, 4], 1), 4);
  assert.strictEqual(longestSubsequence([1, 3, 5, 7], 1), 1);
  assert.strictEqual(longestSubsequence([1, 5, 7, 8, 5, 3, 4, 2, 1], -2), 4);
});

test('difference 0 counts equal values', () => {
  assert.strictEqual(longestSubsequence([4, 1, 4, 4, 2, 4], 0), 4);
});

test('matches subset enumeration', () => {
  for (let t = 0; t < 500; t++) {
    const a = rarr(ri(1, 12), -4, 4);
    const d = ri(-2, 2);
    assert.strictEqual(longestSubsequence(a, d), brute(a, d));
  }
});

test('max size runs fast', () => {
  const a = rarr(100000, -10000, 10000);
  const t0 = Date.now();
  longestSubsequence(a, 3);
  assert.ok(Date.now() - t0 < 1000);
  assert.strictEqual(longestSubsequence(Array.from({ length: 100000 }, (_, i) => 10000 - (i % 20001)), -1), 20001);
});
