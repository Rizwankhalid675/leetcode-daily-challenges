/**
 * 1027. Longest Arithmetic Subsequence
 * https://leetcode.com/problems/longest-arithmetic-subsequence/
 * dp[i][d] = extra steps of the longest arithmetic subsequence ending at i with common difference d; extend from every j < i. Differences are offset into 0..1000 and stored in a flat typed array.
 */
var longestArithSeqLength = function (nums) {
  const n = nums.length;
  const W = 1001; // differences -500..500 shifted by +500
  const dp = new Int16Array(n * W); // steps (length - 1) ending at i with difference d
  let best = 0;
  for (let i = 1; i < n; i++) {
    const rowI = i * W;
    for (let j = 0; j < i; j++) {
      const d = nums[i] - nums[j] + 500;
      const v = dp[j * W + d] + 1;
      if (v > dp[rowI + d]) {
        dp[rowI + d] = v;
        if (v > best) best = v;
      }
    }
  }
  return best + 1;
};

module.exports = { longestArithSeqLength };
