/**
 * 70. Climbing Stairs
 * https://leetcode.com/problems/climbing-stairs/
 * ways(n) = ways(n-1) + ways(n-2) (last step was 1 or 2). Roll two variables; this is Fibonacci.
 */
var climbStairs = function (n) {
  let a = 1; // ways to reach step i-2
  let b = 1; // ways to reach step i-1
  for (let i = 2; i <= n; i++) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
};

module.exports = { climbStairs };
