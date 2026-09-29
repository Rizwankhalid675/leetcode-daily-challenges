/**
 * 233. Number of Digit One
 * https://leetcode.com/problems/number-of-digit-one/
 * Count per decimal position: split n into high / current digit / low around place m; ones at that place = high*m plus m, low+1, or 0 depending on the current digit.
 */
var countDigitOne = function (n) {
  let total = 0;
  for (let m = 1; m <= n; m *= 10) {
    const high = Math.floor(n / (m * 10));
    const cur = Math.floor(n / m) % 10;
    const low = n % m;
    total += high * m;
    if (cur > 1) total += m;
    else if (cur === 1) total += low + 1;
  }
  return total;
};

module.exports = { countDigitOne };
