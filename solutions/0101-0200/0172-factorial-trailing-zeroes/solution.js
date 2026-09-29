/**
 * 172. Factorial Trailing Zeroes
 * https://leetcode.com/problems/factorial-trailing-zeroes/
 * Each trailing zero needs a factor 5 (2s are plentiful), so count factors of 5 in n!: n/5 + n/25 + n/125 + ...
 */
var trailingZeroes = function (n) {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
};

module.exports = { trailingZeroes };
