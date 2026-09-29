/**
 * 123. Best Time to Buy and Sell Stock III
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/
 * Four running states updated per day: best balance after the first buy, first sell, second buy and
 * second sell. Each builds on the previous state, so at most two transactions are used.
 */
var maxProfit = function (prices) {
  let buy1 = -Infinity, sell1 = 0, buy2 = -Infinity, sell2 = 0;
  for (const p of prices) {
    buy1 = Math.max(buy1, -p);
    sell1 = Math.max(sell1, buy1 + p);
    buy2 = Math.max(buy2, sell1 - p);
    sell2 = Math.max(sell2, buy2 + p);
  }
  return sell2;
};

module.exports = { maxProfit };
