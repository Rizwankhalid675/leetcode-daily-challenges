/**
 * 518. Coin Change II
 * https://leetcode.com/problems/coin-change-ii/
 * Unbounded-knapsack counting with coins in the outer loop, so each multiset of coins is counted once (combinations, not orderings).
 */
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 1;
  for (const c of coins) {
    for (let a = c; a <= amount; a++) dp[a] += dp[a - c];
  }
  return dp[amount];
};

module.exports = { change };
