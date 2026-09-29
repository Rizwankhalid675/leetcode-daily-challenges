/**
 * 2626. Array Reduce Transformation
 * https://leetcode.com/problems/array-reduce-transformation/
 * Thread an accumulator through a for loop: acc = fn(acc, nums[i]); empty input returns init (no Array.prototype.reduce).
 */
/**
 * @param {number[]} nums
 * @param {Function} fn
 * @param {number} init
 * @return {number}
 */
var reduce = function (nums, fn, init) {
  let acc = init;
  for (let i = 0; i < nums.length; i++) acc = fn(acc, nums[i]);
  return acc;
};

module.exports = { reduce };
