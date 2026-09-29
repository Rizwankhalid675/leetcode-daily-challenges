/**
 * 309. Best Time to Buy and Sell Stock with Cooldown
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
 * Three-state machine per day: hold (own a share), sold (sold today, so tomorrow is a cooldown), rest (no share, free to buy).
 */
var maxProfit = function (prices) {
  let hold = -Infinity, sold = 0, rest = 0;
  for (const p of prices) {
    const prevHold = hold;
    hold = Math.max(hold, rest - p); // keep holding, or buy (only from rest)
    rest = Math.max(rest, sold); // stay idle, or finish the cooldown
    sold = prevHold + p; // sell today
  }
  return Math.max(sold, rest);
};

module.exports = { maxProfit };
