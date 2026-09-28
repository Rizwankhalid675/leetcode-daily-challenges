/**
 * 901. Online Stock Span
 * https://leetcode.com/problems/online-stock-span/
 *
 * Monotonic stack of [price, span] with strictly decreasing prices. A new price absorbs
 * (pops) every entry with price <= it, adding their spans to its own.
 */
var StockSpanner = function () {
  this.stack = [];
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  let span = 1;
  const stack = this.stack;
  while (stack.length > 0 && stack[stack.length - 1][0] <= price) span += stack.pop()[1];
  stack.push([price, span]);
  return span;
};

module.exports = { StockSpanner };
