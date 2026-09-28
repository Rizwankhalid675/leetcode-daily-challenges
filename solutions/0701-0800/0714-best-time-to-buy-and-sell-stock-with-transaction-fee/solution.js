/**
 * 714. Best Time to Buy and Sell Stock with Transaction Fee
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 *
 * State machine over days with two states:
 *   cash = best profit while holding no stock
 *   hold = best profit while holding one stock
 * Each day: cash = max(cash, hold + price - fee) (sell), hold = max(hold, cash - price) (buy).
 *
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
var maxProfit = function (prices, fee) {
  let cash = 0;
  let hold = -Infinity;
  for (const price of prices) {
    const newCash = Math.max(cash, hold + price - fee);
    const newHold = Math.max(hold, cash - price);
    cash = newCash;
    hold = newHold;
  }
  return cash;
};

module.exports = { maxProfit };
