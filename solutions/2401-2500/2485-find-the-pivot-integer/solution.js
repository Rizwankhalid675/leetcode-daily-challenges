/**
 * 2485. Find the Pivot Integer
 * https://leetcode.com/problems/find-the-pivot-integer/
 * sum(1..x) = sum(x..n) simplifies to x^2 = n(n+1)/2, so x is the integer square root of the total if it is exact.
 */
var pivotInteger = function (n) {
  const total = (n * (n + 1)) / 2;
  const x = Math.round(Math.sqrt(total));
  return x * x === total ? x : -1;
};

module.exports = { pivotInteger };
