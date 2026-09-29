/**
 * 509. Fibonacci Number
 * https://leetcode.com/problems/fibonacci-number/
 * Bottom-up with two rolling variables.
 */
var fib = function (n) {
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
};

module.exports = { fib };
