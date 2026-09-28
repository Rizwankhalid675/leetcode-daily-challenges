/**
 * 122. Best Time to Buy and Sell Stock II
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/
 *
 * With unlimited transactions and no fee, collect every upward day-to-day move: any
 * profitable holding period's gain equals the sum of its daily increases (and decreases),
 * so taking only the increases is optimal.
 *
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }
  return profit;
};

module.exports = { maxProfit };
