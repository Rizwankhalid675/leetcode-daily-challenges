const test = require('node:test');
const assert = require('node:assert');
const { numDistinct } = require('./solution');

function brute(s, t) {
  // count index subsets of s spelling t (exponential; tiny inputs only)
  const go = (i, j) => (j === t.length ? 1 : i === s.length ? 0 : go(i + 1, j) + (s[i] === t[j] ? go(i + 1, j + 1) : 0));
  return go(0, 0);
}

test('official examples', () => {
  assert.strictEqual(numDistinct('rabbbit', 'rabbit'), 3);
  assert.strictEqual(numDistinct('babgbag', 'bag'), 5);
});

test('edge cases', () => {
  assert.strictEqual(numDistinct('a', 'a'), 1);
  assert.strictEqual(numDistinct('a', 'b'), 0);
  assert.strictEqual(numDistinct('ab', 'abc'), 0); // t longer than s
  assert.strictEqual(numDistinct('aaaa', 'aa'), 6); // C(4, 2)
  assert.strictEqual(numDistinct('Aa', 'a'), 1); // case-sensitive
});

test('matches brute force on random small strings', () => {
  for (let k = 0; k < 500; k++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 10) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const t = Array.from({ length: 1 + Math.floor(Math.random() * 4) }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    assert.strictEqual(numDistinct(s, t), brute(s, t), JSON.stringify([s, t]));
  }
});

test('large intermediates do not corrupt the answer', () => {
  // dp[500] reaches C(1000, 500) ~ 2.7e299 (inexact as a double) but never feeds dp[501]
  assert.strictEqual(numDistinct('a'.repeat(1000), 'a'.repeat(500) + 'b'), 0);
  // answer fits in 32 bits: choose the single 'b' and 1 of 999 'a's
  assert.strictEqual(numDistinct('a'.repeat(999) + 'b', 'ab'), 999);
});
