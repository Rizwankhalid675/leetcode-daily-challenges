/**
 * 516. Longest Palindromic Subsequence
 * https://leetcode.com/problems/longest-palindromic-subsequence/
 * Interval DP L(i,j): equal ends give L(i+1,j-1)+2, otherwise max(L(i+1,j), L(i,j-1)). Computed with i descending and a rolling 1D row.
 */
var longestPalindromeSubseq = function (s) {
  const n = s.length;
  // dp[j] holds L(i+1, j) before row i is processed and L(i, j) after.
  const dp = new Int32Array(n);
  for (let i = n - 1; i >= 0; i--) {
    let diag = 0; // L(i+1, j-1) for the current j
    dp[i] = 1;
    for (let j = i + 1; j < n; j++) {
      const below = dp[j]; // L(i+1, j)
      if (s[i] === s[j]) dp[j] = diag + 2;
      else if (dp[j - 1] > dp[j]) dp[j] = dp[j - 1];
      diag = below;
    }
  }
  return dp[n - 1];
};

module.exports = { longestPalindromeSubseq };
