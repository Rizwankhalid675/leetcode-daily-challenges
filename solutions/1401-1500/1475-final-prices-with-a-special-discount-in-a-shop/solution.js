/**
 * 1475. Final Prices With a Special Discount in a Shop
 * https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/
 * Next smaller-or-equal element via a monotonic stack of indices still waiting for their discount.
 */
var finalPrices = function (prices) {
  const answer = [...prices];
  const stack = [];
  prices.forEach((p, i) => {
    while (stack.length && prices[stack[stack.length - 1]] >= p) answer[stack.pop()] -= p;
    stack.push(i);
  });
  return answer;
};

module.exports = { finalPrices };
