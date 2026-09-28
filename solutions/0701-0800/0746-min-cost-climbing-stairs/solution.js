/**
 * 746. Min Cost Climbing Stairs
 * https://leetcode.com/problems/min-cost-climbing-stairs/
 *
 * dp[i] = cheapest cost to stand on step i (before paying cost[i]).
 * dp[0] = dp[1] = 0 (free start), dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2]).
 * The answer is dp[n] (the top, one past the last step). Rolling two variables.
 *
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  let twoBack = 0; // dp[i-2]
  let oneBack = 0; // dp[i-1]
  for (let i = 2; i <= cost.length; i++) {
    const here = Math.min(oneBack + cost[i - 1], twoBack + cost[i - 2]);
    twoBack = oneBack;
    oneBack = here;
  }
  return oneBack;
};

module.exports = { minCostClimbingStairs };
