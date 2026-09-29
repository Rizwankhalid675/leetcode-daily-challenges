/**
 * 1979. Find Greatest Common Divisor of Array
 * https://leetcode.com/problems/find-greatest-common-divisor-of-array/
 * Find the min and max in one pass, then run the Euclidean algorithm on them.
 */
var findGCD = function (nums) {
  let lo = Infinity;
  let hi = -Infinity;
  for (const x of nums) {
    if (x < lo) lo = x;
    if (x > hi) hi = x;
  }
  let a = hi;
  let b = lo;
  while (b !== 0) {
    const r = a % b;
    a = b;
    b = r;
  }
  return a;
};

module.exports = { findGCD };
