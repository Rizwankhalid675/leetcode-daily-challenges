/**
 * 300. Longest Increasing Subsequence
 * https://leetcode.com/problems/longest-increasing-subsequence/
 * Patience sorting: tails[k] = smallest possible tail of an increasing subsequence of length k+1.
 * Each number replaces the first tail >= it (binary search) or extends the list.
 */
var lengthOfLIS = function (nums) {
  const tails = [];
  for (const x of nums) {
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
};

module.exports = { lengthOfLIS };
