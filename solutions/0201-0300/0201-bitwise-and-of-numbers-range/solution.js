/**
 * 201. Bitwise AND of Numbers Range
 * https://leetcode.com/problems/bitwise-and-of-numbers-range/
 * The AND of a range is the common binary prefix of left and right. Clearing the lowest set bit of
 * right until right <= left leaves exactly that prefix.
 */
var rangeBitwiseAnd = function (left, right) {
  while (right > left) right &= right - 1;
  return right;
};

module.exports = { rangeBitwiseAnd };
