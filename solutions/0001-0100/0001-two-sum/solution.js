/**
 * 1. Two Sum
 * https://leetcode.com/problems/two-sum/
 *
 * One pass with a Map value -> index: for each number, check whether its complement was
 * already seen; otherwise remember this number.
 *
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return [];
};

module.exports = { twoSum };
