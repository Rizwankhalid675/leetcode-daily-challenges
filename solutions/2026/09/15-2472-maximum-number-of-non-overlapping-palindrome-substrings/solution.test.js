const test = require('node:test');
const assert = require('node:assert');
const { maxPalindromes } = require('./solution');

// Reference: DP over ALL palindromic substrings of length >= k (no shrinking trick).
function reference(s, k) {
  const n = s.length;
  const pal = (a, b) => {
    for (b--; a < b; a++, b--) if (s[a] !== s[b]) return false;
    return true;
  };
  const dp = new Array(n + 1).fill(0);
  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i - 1];
    for (let j = 0; i - j >= k; j++) if (pal(j, i)) dp[i] = Math.max(dp[i], dp[j] + 1);
  }
  return dp[n];
}

test('official examples', () => {
  assert.strictEqual(maxPalindromes('abaccdbbd', 3), 2);
  assert.strictEqual(maxPalindromes('adbcda', 2), 0);
});

test('edge cases', () => {
  assert.strictEqual(maxPalindromes('a', 1), 1);
  assert.strictEqual(maxPalindromes('aaaa', 1), 4); // every single char
  assert.strictEqual(maxPalindromes('aaaaa', 2), 2);
  assert.strictEqual(maxPalindromes('abcba', 5), 1); // whole string
  assert.strictEqual(maxPalindromes('abcdcba', 4), 1); // only a length-5+ palindrome exists: shrinks to 5 = k+1
});

test('matches the unrestricted DP on random strings', () => {
  for (let t = 0; t < 500; t++) {
    const n = 1 + Math.floor(Math.random() * 14);
    const s = Array.from({ length: n }, () => 'ab'[Math.floor(Math.random() * 2)]).join('');
    const k = 1 + Math.floor(Math.random() * n);
    assert.strictEqual(maxPalindromes(s, k), reference(s, k), JSON.stringify([s, k]));
  }
});
