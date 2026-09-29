const test = require('node:test');
const assert = require('node:assert');
const { lengthOfLIS } = require('./solution');

function quadratic(a) {
  const dp = a.map(() => 1);
  for (let i = 0; i < a.length; i++) for (let j = 0; j < i; j++) if (a[j] < a[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
  return Math.max(...dp);
}

test('official examples', () => {
  assert.strictEqual(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18]), 4);
  assert.strictEqual(lengthOfLIS([0, 1, 0, 3, 2, 3]), 4);
  assert.strictEqual(lengthOfLIS([7, 7, 7, 7, 7, 7, 7]), 1);
});

test('strictly increasing required', () => {
  assert.strictEqual(lengthOfLIS([1, 2, 2, 3]), 3);
  assert.strictEqual(lengthOfLIS([5]), 1);
});

test('matches O(n^2) DP', () => {
  for (let t = 0; t < 1000; t++) {
    const a = Array.from({ length: 1 + Math.floor(Math.random() * 20) }, () => Math.floor(Math.random() * 11) - 5);
    assert.strictEqual(lengthOfLIS(a), quadratic(a));
  }
});
