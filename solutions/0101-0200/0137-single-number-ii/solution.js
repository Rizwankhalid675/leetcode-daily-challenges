/**
 * 137. Single Number II
 * https://leetcode.com/problems/single-number-ii/
 * Two bitmasks (ones, twos) act as a mod-3 counter per bit; after all numbers, ones holds the bits of the single element.
 */
var singleNumber = function (nums) {
  let ones = 0;
  let twos = 0;
  for (const x of nums) {
    ones = (ones ^ x) & ~twos;
    twos = (twos ^ x) & ~ones;
  }
  return ones;
};

module.exports = { singleNumber };
