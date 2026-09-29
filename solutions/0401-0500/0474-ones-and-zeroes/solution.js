/**
 * 474. Ones and Zeroes
 * https://leetcode.com/problems/ones-and-zeroes/
 * 0/1 knapsack with two capacities (zeros, ones): dp[i][j] = largest subset within i zeros and j ones; iterate capacities downward per string.
 */
var findMaxForm = function (strs, m, n) {
  const W = n + 1;
  const dp = new Int32Array((m + 1) * W);
  for (const s of strs) {
    let zeros = 0;
    for (let k = 0; k < s.length; k++) if (s.charCodeAt(k) === 48) zeros++;
    const ones = s.length - zeros;
    if (zeros > m || ones > n) continue;
    for (let i = m; i >= zeros; i--) {
      for (let j = n; j >= ones; j--) {
        const v = dp[(i - zeros) * W + (j - ones)] + 1;
        if (v > dp[i * W + j]) dp[i * W + j] = v;
      }
    }
  }
  return dp[m * W + n];
};

module.exports = { findMaxForm };
