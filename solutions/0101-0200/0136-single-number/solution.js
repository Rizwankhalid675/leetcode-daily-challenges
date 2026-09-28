/**
 * 136. Single Number
 * https://leetcode.com/problems/single-number/
 *
 * XOR everything: x ^ x = 0 and x ^ 0 = x, and XOR is commutative/associative, so all
 * pairs cancel and only the single value remains. O(n) time, O(1) space.
 *
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let acc = 0;
  for (const x of nums) acc ^= x;
  return acc;
};

module.exports = { singleNumber };
