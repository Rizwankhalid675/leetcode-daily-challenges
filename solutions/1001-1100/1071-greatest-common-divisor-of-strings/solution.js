/**
 * 1071. Greatest Common Divisor of Strings
 * https://leetcode.com/problems/greatest-common-divisor-of-strings/
 *
 * If some string x divides both, then str1 + str2 and str2 + str1 are both x repeated the
 * same number of times, so they must be equal. Conversely, if they are equal, both strings
 * are repetitions of their common prefix of length gcd(len1, len2), which is the largest
 * possible divisor.
 *
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function (str1, str2) {
  if (str1 + str2 !== str2 + str1) return '';
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  return str1.slice(0, gcd(str1.length, str2.length));
};

module.exports = { gcdOfStrings };
