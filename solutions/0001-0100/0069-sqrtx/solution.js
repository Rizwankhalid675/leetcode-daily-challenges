/**
 * 69. Sqrt(x)
 * https://leetcode.com/problems/sqrtx/
 * Binary search the largest r with r*r <= x. Capping hi at 46340 (floor(sqrt(2^31 - 1))) keeps every
 * r*r an exact integer well below 2^53.
 */
var mySqrt = function (x) {
  let lo = 0, hi = Math.min(x, 46340);
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (mid * mid <= x) lo = mid;
    else hi = mid - 1;
  }
  return lo;
};

module.exports = { mySqrt };
