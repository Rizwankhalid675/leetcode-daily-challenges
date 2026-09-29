/**
 * 377. Combination Sum IV
 * https://leetcode.com/problems/combination-sum-iv/
 * Counts ordered sequences: dp[t] = sum of dp[t - x] over all nums x, with the target in the outer loop.
 */
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let t = 1; t <= target; t++) {
    for (const x of nums) if (x <= t) dp[t] += dp[t - x];
  }
  return dp[target];
};

module.exports = { combinationSum4 };
