const test = require('node:test');
const assert = require('node:assert');
const { longestCommonSubsequence } = require('./solution');

// Reference: enumerate subsequences of the shorter string, check against the longer.
function brute(a, b) {
  if (a.length > b.length) [a, b] = [b, a];
  const isSub = (s, t) => {
    let i = 0;
    for (const ch of t) if (ch === s[i]) i++;
    return i === s.length;
  };
  let best = 0;
  for (let mask = 0; mask < 1 << a.length; mask++) {
    let s = '';
    for (let i = 0; i < a.length; i++) if (mask & (1 << i)) s += a[i];
    if (s.length > best && isSub(s, b)) best = s.length;
  }
  return best;
}

test('official examples', () => {
  assert.strictEqual(longestCommonSubsequence('abcde', 'ace'), 3);
  assert.strictEqual(longestCommonSubsequence('abc', 'abc'), 3);
  assert.strictEqual(longestCommonSubsequence('abc', 'def'), 0);
});

test('matches subsequence enumeration', () => {
  for (let t = 0; t < 400; t++) {
    const r = (n) => Array.from({ length: n }, () => 'abc'[Math.floor(Math.random() * 3)]).join('');
    const a = r(1 + Math.floor(Math.random() * 8));
    const b = r(1 + Math.floor(Math.random() * 10));
    assert.strictEqual(longestCommonSubsequence(a, b), brute(a, b), JSON.stringify([a, b]));
  }
});

test('1000 x 1000 is fast', () => {
  const a = 'ab'.repeat(500);
  const t0 = Date.now();
  assert.strictEqual(longestCommonSubsequence(a, a), 1000);
  assert.ok(Date.now() - t0 < 1000);
});
