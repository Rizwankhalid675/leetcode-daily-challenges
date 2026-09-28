/**
 * 12. Integer to Roman
 * https://leetcode.com/problems/integer-to-roman/
 *
 * Greedy over a value table that already includes the six subtractive forms
 * (900, 400, 90, 40, 9, 4): repeatedly take the largest value that fits.
 *
 * @param {number} num
 * @return {string}
 */
var intToRoman = function (num) {
  const TABLE = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [value, symbol] of TABLE) {
    while (num >= value) {
      out += symbol;
      num -= value;
    }
  }
  return out;
};

module.exports = { intToRoman };
