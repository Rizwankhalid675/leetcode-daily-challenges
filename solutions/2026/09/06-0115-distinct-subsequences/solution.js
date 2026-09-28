/**
 * 115. Distinct Subsequences
 * https://leetcode.com/problems/distinct-subsequences/
 *
 * dp[j] = number of ways to form t[0..j) from the part of s processed so far.
 * For each character of s, walk j from right to left so every dp[j - 1] read is still
 * the value from *before* this character (each s character is used at most once per match).
 *
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
  const m = t.length;
  if (m > s.length) return 0;
  const dp = new Array(m + 1).fill(0);
  dp[0] = 1; // the empty prefix of t can be formed exactly one way
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    for (let j = m; j >= 1; j--) {
      if (t[j - 1] === ch) dp[j] += dp[j - 1];
    }
  }
  return dp[m];
};

module.exports = { numDistinct };
