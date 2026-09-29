/**
 * 263. Ugly Number
 * https://leetcode.com/problems/ugly-number/
 * Divide out every factor 2, 3 and 5; the number is ugly exactly when 1 remains. Non-positive numbers are never ugly.
 */
var isUgly = function (n) {
  if (n <= 0) return false;
  for (const p of [2, 3, 5]) {
    while (n % p === 0) n /= p;
  }
  return n === 1;
};

module.exports = { isUgly };
