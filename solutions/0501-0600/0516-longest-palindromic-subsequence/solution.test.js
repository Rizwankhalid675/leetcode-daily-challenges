const test = require('node:test');
const assert = require('node:assert');
const { longestPalindromeSubseq } = require('./solution');

const ri = (lo, hi) => lo + Math.floor(Math.random() * (hi - lo + 1));
const rarr = (n, lo, hi) => Array.from({ length: n }, () => ri(lo, hi));
function brute(s) {
  let best = 0;
  for (let mask = 1; mask < 1 << s.length; mask++) {
    let t = '';
    for (let i = 0; i < s.length; i++) if (mask >> i & 1) t += s[i];
    if (t.length > best && t === [...t].reverse().join('')) best = t.length;
  }
  return best;
}
const rstr = (n, k) => Array.from({ length: n }, () => 'abcd'[ri(0, k - 1)]).join('');

test('official examples', () => {
  assert.strictEqual(longestPalindromeSubseq('bbbab'), 4);
  assert.strictEqual(longestPalindromeSubseq('cbbd'), 2);
});

test('matches subsequence enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const s = rstr(ri(1, 12), ri(1, 4));
    assert.strictEqual(longestPalindromeSubseq(s), brute(s));
  }
});

test('max size runs fast', () => {
  const s = rstr(1000, 4);
  const t0 = Date.now();
  longestPalindromeSubseq(s);
  assert.ok(Date.now() - t0 < 1000);
  assert.strictEqual(longestPalindromeSubseq('a'.repeat(1000)), 1000);
});
