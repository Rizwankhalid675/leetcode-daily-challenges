/**
 * 50. Pow(x, n)
 * https://leetcode.com/problems/powx-n/
 * Fast exponentiation by squaring on |n|, then invert for negative n. |n| is kept as a plain number
 * (halved with Math.floor, not >> 1), so n = -2^31 needs no special case.
 */
var myPow = function (x, n) {
  let e = Math.abs(n); // exact in JS even for n = -2^31
  let base = x, result = 1;
  while (e > 0) {
    if (e % 2 === 1) result *= base;
    base *= base;
    e = Math.floor(e / 2);
  }
  return n < 0 ? 1 / result : result;
};

module.exports = { myPow };
