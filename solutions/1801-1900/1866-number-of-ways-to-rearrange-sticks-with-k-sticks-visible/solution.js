/**
 * 1866. Number of Ways to Rearrange Sticks With K Sticks Visible
 * https://leetcode.com/problems/number-of-ways-to-rearrange-sticks-with-k-sticks-visible/
 * Unsigned Stirling numbers of the first kind: place the shortest stick last-to-first thinking, dp[i][j] = dp[i-1][j-1] + (i-1)*dp[i-1][j] mod 1e9+7, with a rolling row.
 */
var rearrangeSticks = function (n, k) {
  const MOD = 1000000007;
  // dp[j] = number of arrangements of the current i sticks with j visible
  let dp = new Array(k + 1).fill(0);
  dp[0] = 1;
  for (let i = 1; i <= n; i++) {
    const next = new Array(k + 1).fill(0);
    const hi = Math.min(i, k);
    for (let j = 1; j <= hi; j++) {
      // (i - 1) * dp[j] < 1000 * 1e9 ~ 1e12, well inside 2^53
      next[j] = (dp[j - 1] + (i - 1) * dp[j]) % MOD;
    }
    dp = next;
  }
  return dp[k];
};

module.exports = { rearrangeSticks };
