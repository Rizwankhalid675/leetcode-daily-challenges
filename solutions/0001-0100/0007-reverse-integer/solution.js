/**
 * 7. Reverse Integer
 * https://leetcode.com/problems/reverse-integer/
 * Pop digits with % and Math.trunc, and before each push check that rev*10 + d stays inside the signed 32-bit range (never forming the out-of-range value).
 */
var reverse = function (x) {
  const LIMIT_HI = 214748364; // floor((2^31 - 1) / 10)
  const LIMIT_LO = -214748364; // trunc(-2^31 / 10)
  let rev = 0;
  while (x !== 0) {
    const d = x % 10; // keeps the sign of x
    x = Math.trunc(x / 10);
    if (rev > LIMIT_HI || (rev === LIMIT_HI && d > 7)) return 0;
    if (rev < LIMIT_LO || (rev === LIMIT_LO && d < -8)) return 0;
    rev = rev * 10 + d;
  }
  return rev;
};

module.exports = { reverse };
