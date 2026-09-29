const test = require('node:test');
const assert = require('node:assert');
const { longestPalindrome } = require('./solution');

const isPal = (t) => t === [...t].reverse().join('');
function bruteLongest(s) {
  let best = 0;
  for (let i = 0; i < s.length; i++) for (let j = i + 1; j <= s.length; j++) if (j - i > best && isPal(s.slice(i, j))) best = j - i;
  return best;
}
function check(s) {
  const got = longestPalindrome(s);
  assert.ok(s.includes(got), 'must be a substring');
  assert.ok(isPal(got), 'must be a palindrome');
  assert.strictEqual(got.length, bruteLongest(s));
}

test('official examples', () => {
  assert.ok(['bab', 'aba'].includes(longestPalindrome('babad')));
  assert.strictEqual(longestPalindrome('cbbd'), 'bb');
});

test('edge cases', () => {
  assert.strictEqual(longestPalindrome('a'), 'a');
  assert.strictEqual(longestPalindrome('ab').length, 1);
  assert.strictEqual(longestPalindrome('aaaa'), 'aaaa');
  assert.strictEqual(longestPalindrome('racecar'), 'racecar');
  assert.strictEqual(longestPalindrome('1a2b2a3'), 'a2b2a');
});

test('matches brute force length on random strings', () => {
  for (let t = 0; t < 1000; t++) {
    const s = Array.from({ length: 1 + Math.floor(Math.random() * 12) }, () => 'ab1'[Math.floor(Math.random() * 3)]).join('');
    check(s);
  }
});

test('1000 identical letters (worst case) finishes quickly', () => {
  const t0 = Date.now();
  assert.strictEqual(longestPalindrome('a'.repeat(1000)).length, 1000);
  assert.ok(Date.now() - t0 < 1000);
});
