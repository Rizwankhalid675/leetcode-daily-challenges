/**
 * 13. Roman to Integer
 * https://leetcode.com/problems/roman-to-integer/
 *
 * Add each symbol's value, except subtract it when a larger symbol follows (IV, IX, XL, ...).
 *
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  const VALUE = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const v = VALUE[s[i]];
    if (i + 1 < s.length && v < VALUE[s[i + 1]]) total -= v;
    else total += v;
  }
  return total;
};

module.exports = { romanToInt };
