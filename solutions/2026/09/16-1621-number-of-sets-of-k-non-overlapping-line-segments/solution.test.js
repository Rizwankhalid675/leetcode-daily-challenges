const test = require('node:test');
const assert = require('node:assert');
const { numberOfSets } = require('./solution');

// Independent DP (no combinatorial identity), O(n*k) with prefix sums:
// dp[i][j] = ways to draw j segments using only points 0..i.
// Either no segment ends at i (dp[i-1][j]), or the last segment is [a, i] for some a < i,
// with the other j-1 segments inside 0..a: sum over a < i of dp[a][j-1].
function dpCount(n, k) {
  const MOD = 1_000_000_007;
  let prevDp = new Array(k + 1).fill(0); // dp[i-1][*]
  let prefix = new Array(k + 1).fill(0); // sum of dp[0..i-1][*]
  prevDp[0] = 1;
  prefix[0] = 1;
  for (let i = 1; i < n; i++) {
    const dp = new Array(k + 1).fill(0);
    dp[0] = 1;
    for (let j = 1; j <= k; j++) dp[j] = (prevDp[j] + prefix[j - 1]) % MOD;
    for (let j = 0; j <= k; j++) prefix[j] = (prefix[j] + dp[j]) % MOD;
    prevDp = dp;
  }
  return prevDp[k];
}

// Exhaustive enumeration for tiny n.
function brute(n, k) {
  const rec = (from, left) => {
    if (left === 0) return 1;
    let ways = 0;
    for (let a = from; a < n; a++) for (let b = a + 1; b < n; b++) ways += rec(b, left - 1);
    return ways;
  };
  return rec(0, k);
}

test('official examples', () => {
  assert.strictEqual(numberOfSets(4, 2), 5);
  assert.strictEqual(numberOfSets(3, 1), 3);
  assert.strictEqual(numberOfSets(30, 7), 796297179);
});

test('identity matches exhaustive enumeration and the DP', () => {
  for (let n = 2; n <= 9; n++)
    for (let k = 1; k < n; k++) {
      const b = brute(n, k);
      assert.strictEqual(numberOfSets(n, k), b, `n=${n} k=${k}`);
      assert.strictEqual(dpCount(n, k), b, `dp n=${n} k=${k}`);
    }
});

test('large inputs agree with the DP', () => {
  for (const [n, k] of [[1000, 1], [1000, 500], [1000, 999], [777, 123]]) {
    assert.strictEqual(numberOfSets(n, k), dpCount(n, k), `n=${n} k=${k}`);
  }
});
