/**
 * 191. Number of 1 Bits
 * https://leetcode.com/problems/number-of-1-bits/
 * Treat n as unsigned (>>> 0) and repeatedly clear the lowest set bit with n & (n - 1), counting the steps.
 */
var hammingWeight = function (n) {
  n = n >>> 0;
  let count = 0;
  while (n !== 0) {
    n = (n & (n - 1)) >>> 0;
    count++;
  }
  return count;
};

module.exports = { hammingWeight };
