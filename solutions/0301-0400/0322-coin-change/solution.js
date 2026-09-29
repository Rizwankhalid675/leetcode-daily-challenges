/**
 * 322. Coin Change
 * https://leetcode.com/problems/coin-change/
 * Unbounded-knapsack DP: dp[s] = fewest coins summing to s, relaxed coin by coin for s from c up to
 * amount. Unreachable amounts keep a sentinel (amount + 1) and give -1.
 */
var coinChange = function (coins, amount) {
  const INF = amount + 1;
  const dp = new Int32Array(amount + 1).fill(INF);
  dp[0] = 0;
  for (const c of coins) {
    for (let s = c; s <= amount; s++) {
      if (dp[s - c] + 1 < dp[s]) dp[s] = dp[s - c] + 1;
    }
  }
  return dp[amount] >= INF ? -1 : dp[amount];
};

module.exports = { coinChange };
