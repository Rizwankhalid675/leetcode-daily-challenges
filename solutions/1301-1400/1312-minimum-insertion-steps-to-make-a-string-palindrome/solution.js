/**
 * 1312. Minimum Insertion Steps to Make a String Palindrome
 * https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/
 * Characters already in the longest palindromic subsequence can stay; every other character needs one mirrored insertion. Answer = n - LPS, with LPS by a 1D interval DP.
 */
var minInsertions = function (s) {
  const n = s.length;
  const dp = new Int32Array(n); // dp[j] = LPS of s[i..j] for the current i
  for (let i = n - 1; i >= 0; i--) {
    let diag = 0;
    dp[i] = 1;
    for (let j = i + 1; j < n; j++) {
      const below = dp[j];
      if (s[i] === s[j]) dp[j] = diag + 2;
      else if (dp[j - 1] > dp[j]) dp[j] = dp[j - 1];
      diag = below;
    }
  }
  return n - dp[n - 1];
};

module.exports = { minInsertions };
