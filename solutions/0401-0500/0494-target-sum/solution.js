/**
 * 494. Target Sum
 * https://leetcode.com/problems/target-sum/
 * Choosing a "+" set P gives sum(P) - (total - sum(P)) = target, so sum(P) = (total + target) / 2. Count subsets with that sum using a 0/1 knapsack count DP.
 */
var findTargetSumWays = function (nums, target) {
  let total = 0;
  for (const x of nums) total += x;
  if (Math.abs(target) > total || (total + target) % 2 !== 0) return 0;
  const want = (total + target) / 2;
  const dp = new Array(want + 1).fill(0);
  dp[0] = 1;
  for (const x of nums) {
    for (let s = want; s >= x; s--) dp[s] += dp[s - x];
  }
  return dp[want];
};

module.exports = { findTargetSumWays };
