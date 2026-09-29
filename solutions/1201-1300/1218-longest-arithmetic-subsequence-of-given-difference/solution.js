/**
 * 1218. Longest Arithmetic Subsequence of Given Difference
 * https://leetcode.com/problems/longest-arithmetic-subsequence-of-given-difference/
 * Hash map from value to the longest valid subsequence ending at that value: best[x] = best[x - difference] + 1.
 */
var longestSubsequence = function (arr, difference) {
  const best = new Map();
  let ans = 0;
  for (const x of arr) {
    const len = (best.get(x - difference) || 0) + 1;
    best.set(x, len);
    if (len > ans) ans = len;
  }
  return ans;
};

module.exports = { longestSubsequence };
