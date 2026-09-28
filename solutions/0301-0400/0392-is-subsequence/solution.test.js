const test = require('node:test');
const assert = require('node:assert');
const { isSubsequence } = require('./solution');

// Reference: recursive include/skip search.
function brute(s, t, i = 0, j = 0) {
  if (i === s.length) return true;
  if (j === t.length) return false;
  return (s[i] === t[j] && brute(s, t, i + 1, j + 1)) || brute(s, t, i, j + 1);
}

test('official examples', () => {
  assert.strictEqual(isSubsequence('abc', 'ahbgdc'), true);
  assert.strictEqual(isSubsequence('axc', 'ahbgdc'), false);
});

test('edge cases', () => {
  assert.strictEqual(isSubsequence('', ''), true); // empty s is always a subsequence
  assert.strictEqual(isSubsequence('', 'abc'), true);
  assert.strictEqual(isSubsequence('a', ''), false);
  assert.strictEqual(isSubsequence('aaa', 'aa'), false); // needs three separate a's
});

test('matches brute force', () => {
  for (let k = 0; k < 1000; k++) {
    const r = (n) => Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const s = r(Math.floor(Math.random() * 4));
    const t = r(Math.floor(Math.random() * 8));
    assert.strictEqual(isSubsequence(s, t), brute(s, t), JSON.stringify([s, t]));
  }
});
